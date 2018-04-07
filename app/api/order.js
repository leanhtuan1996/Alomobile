'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;

var Product = require('../models/index').product;
var Order = require('../models/index').order;
var User = require('../models/index').user;

var checkingAvailable = (id, quantity, color, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "id is required!"
            });
            return
        }

        if (!quantity) {
            workflow.emit('response', {
                error: "Quantity is required!"
            });
            return
        }

        if (!color) {
            workflow.emit('response', {
                error: "Color is required!"
            });
            return
        }

        workflow.emit('checking');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('checking', () => {
        Product.findById(id).select('details').exec((err, product) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!product) {
                workflow.emit('response', {
                    error: "product not found"
                });
                return
            }

            var details = product.details;
            if (!details) {
                workflow.emit('response', {
                    error: "Product is missing!"
                });
                return
            }

            var detail = details.find(element => {
                return element.quantity >= quantity && element.color.hex == color
            });

            if (!detail) {
                workflow.emit('response', {
                    error: "Product out of stock!"
                });
            } else {
                workflow.emit('response', {
                    product: product
                });
            }
        });
    });

    workflow.emit('validate-parameters');
}

var detailCart = (products, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!products) {
            workflow.emit('response', {
                error: "Cart is empty!"
            });
            return
        }

        try {
            products = JSON.parse(products);
        } catch (error) {
            workflow.emit('response', {
                error: error
            });
            return;
        }

        if (!Array.isArray(products)) {
            workflow.emit('response', {
                error: "Cart is empty"
            });
            return;
        }

        workflow.emit('detail');
    });

    var detailProducts = [];

    workflow.on('response', (response) => {
        if (response.error) {
            return cb(response);
        }

        if (response.product) {
            detailProducts.push(response.product);
        }

        if (detailProducts.length == products.length) {
            return cb({
                products: detailProducts
            });
        }
    });

    workflow.on('detail', () => {
        products.forEach((product, index) => {
            Product.findById(product.id).select('name alias details images').lean().exec((err, element) => {
                if (product) {
                    var detail = element.details.find((e) => {
                        return String(e.color.hex).trim() == String(product.color).trim();
                    });

                    element.quantity = product.quantity;
                    element.detail = detail;

                    workflow.emit('response', {
                        product: element
                    });
                }
            });
        });
    });

    workflow.emit('validate-parameters');
}

var verify = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: 'Mã thanh toán không tồn tại!'
            });
            return
        }

        workflow.emit('verify');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('verify', () => {
        Order.findById(id, (err, order) => {
            workflow.emit('response', {
                error: err,
                order: order
            });
        });
    });

    workflow.emit('validate-parameters');
}

var initOrder = (parameters, cb) => {
    var products = parameters.products,
        user = parameters.byUser;

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!products || products.length == 0) {
            workflow.emit('response', {
                error: "Giỏ hàng không có sản phẩm nào!"
            });
            return
        }

        workflow.emit('find-products', products);
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('find-products', (products) => {
        var newProducts = [];
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (!product.id) {
                workflow.emit('response', {
                    error: `Sản phẩm thứ ${i + 1} bị thiếu tham số!`
                });
                break;
            }

            if (!product.color) {
                workflow.emit('response', {
                    error: `Sản phẩm thứ ${i + 1} bị thiếu tham số!`
                });
                break;
            }

            if (!product.quantity) {
                workflow.emit('response', {
                    error: `Sản phẩm thứ ${i + 1} bị thiếu tham số!`
                });
                break;
            }

            Product.findById(product.id).select('name details').exec((err, element) => {
                if (err) {
                    workflow.emit('response', {
                        error: err
                    });
                    return
                }

                if (!element) {
                    workflow.emit('response', {
                        error: "Sản phẩm không tìm thấy!"
                    });
                    return
                }

                var details = element.details;
                if (!details) {
                    workflow.emit('response', {
                        error: "Chi tiết sản phẩm không tìm thấy!"
                    });
                    return
                }

                var detail = details.find(e => {
                    return e.color.hex == product.color
                });

                if (!detail) {
                    workflow.emit('response', {
                        error: "Chi tiết sản phẩm không tìm thấy!"
                    });
                    return
                }

                if (detail.quantity < product.quantity) {
                    workflow.emit('response', {
                        error: `Số lượng sản phẩm ${element.name} hiện không đủ để tiến hành thanh toán, số lượng còn lại là: ${detail.quantity}`
                    });
                    return
                }

                var newElement = {
                    id: product.id,
                    quantity: product.quantity,
                    price: detail.price,
                    color: detail.color
                }

                newProducts.push(newElement);

                workflow.emit('init', newProducts)
            });
        }
    });

    workflow.on('init', (newProducts) => {
        var newOrder = new Order();
        newOrder.products = newProducts;

        if (user) {
            newOrder.byUser = user._id;
        }

        newOrder.status = 0;
        newOrder.save((err) => {
            workflow.emit('response', {
                error: err,
                order: newOrder
            });
        });
    });

    workflow.emit('validate-parameters');
};

var updateOrder = (order, parameters, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!order) {
            workflow.emit('response', {
                error: "Order is required!"
            });
            return
        }

        if (!order._id) {
            workflow.emit('response', {
                error: "Id of order is required!"
            });
            return
        }

        if (!parameters) {
            workflow.emit('response', {
                error: null
            });
            return
        }

        workflow.emit('update');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('update', () => {
        Order.findById(order._id).populate('byUser').exec((err, order) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!order) {
                workflow.emit('response', {
                    error: "Order not found"
                });
                return
            }

            try {
                if (parameters.status) {
                    order.status = Number.parseInt(parameters.status);
                }
            } catch (error) {
                workflow.emit('response', {
                    error: error
                });
                return;
            }

            if (parameters.byUser) {
                if (parameters.byUser.id) {
                    if (parameters.byUser.id.match(/^[a-z0-9]{24}$/g)) {
                        order.byUser = parameters.byUser.id
                    }
                } else if (parameters.byUser._id) {
                    if (parameters.byUser._id.match(/^[a-z0-9]{24}$/g)) {
                        order.byUser = parameters.byUser._id
                    }
                    return
                }
            }

            if (parameters.toAddress) {
                var toAddress = parameters.toAddress;
                var fullName = toAddress.fullName,
                    phone = toAddress.phone,
                    address = toAddress.address,
                    city = toAddress.city,
                    state = toAddress.state,
                    zipPostalCode = toAddress.zipPostalCode;

                if (!fullName) {
                    workflow.emit('response', {
                        error: 'Họ và tên người nhận không được bỏ trống!'
                    });
                } else if (!phone) {
                    workflow.emit('response', {
                        error: "Số điện thoại không được bỏ trống!"
                    });
                } else if (!address || !city || !state) {
                    workflow.emit('response', {
                        error: "Địa chỉ giao hàng không được bỏ trống!"
                    });
                } else if (!zipPostalCode) {
                    workflow.emit('response', {
                        error: "Mã bưu điện không được bỏ trống!"
                    });
                } else {
                    order.toAddress = toAddress;
                }
            }

            if (parameters.note) {
                order.note = parameters.note;
            }

            if (parameters.checkoutMethod && parameters.checkoutMethod._id) {
                if (parameters.checkoutMethod._id.match(/^[a-z0-9]{24}$/g)) {
                    order.checkoutMethod = parameters.checkoutMethod._id;
                }
            }

            order.save((err) => {
                workflow.emit('response', {
                    error: err,
                    order: order
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var newOrder = (order, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {

    });

    workflow.on('response', (response) => {

    });

    workflow.on('new', () => {

    });

    workflow.emit('validate-parameters');
}

var processProductBeforeCheckout = (id, color, quantity, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id is required!"
            });
            return
        }

        if (!color) {
            workflow.emit('response', {
                error: "Color is required!"
            });
            return
        }

        workflow.emit('find');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('find', () => {
        Product.findById(id).select('details name').exec((err, product) => {
            if (!err) {
                workflow.emit('response', {
                    error: err,
                });
                return
            }

            if (!product) {
                workflow.emit('response', {
                    error: "Product not found"
                });
                return
            }

            var details = product.details;
            if (!details || details.length == 0) {
                workflow.emit('response', {
                    error: "Details of product not found"
                });
                return
            }

            var detail = details.find(e => {
                return e.color == color;
            });

            if (!detail) {
                workflow.emit('response', {
                    error: "Product not found"
                });
                return
            }

            if (Number.parseInt(detail.quantity) <= Number.parseInt(quantity)) {
                workflow.emit('response', {
                    error: `Sản phẩm ${product.name} không đủ hoặc không sẵn có`
                });
                return
            }

            workflow.emit('response', {
                detail: detail
            });
        })
    });

    workflow.emit('validate-parameters');
}

var getOrder = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Mã đơn hàng không tìm thấy"
            });
            return;
        };

        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('get', () => {
        Order.findById(id).populate('byUser').exec((err, order) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!order) {
                workflow.emit('response', {
                    error: "Đơn hàng không tìm thấy"
                });
                return
            }

            if (order.status != 0) {
                workflow.emit('response', {
                    error: "Đơn hàng đã được chấp nhận"
                });
                return
            }

            workflow.emit('response', {
                order: order
            });
        });
    })

    workflow.emit('validate-parameters');
}

var requestPayment = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Mã đơn hàng không được bỏ trống"
            });
            return
        }

        workflow.emit('get-order', id);
    })

    workflow.on('get-order', (id) => {
        getOrder(id, (result) => {
            if (result.error) {
                workflow.emit('response', {
                    error: result.error
                });
                return
            }
            if (!result.order) {
                workflow.emit('response', {
                    error: "Đơn hàng không được tìm thấy!"
                });
                return
            }

            workflow.emit('request-payment', result.order);
        })
    });

    workflow.on('request-payment', (order) => {
        if (!order) {
            workflow.emit('response', {
                error: "Đơn hàng không được tìm thấy"
            });
            return
        }

        var products = order.products,
            user = order.byUser,
            address = order.toAddress,
            note = order.note;
        if (!products) {
            workflow.emit('response', {
                error: "Sản phẩm trong đơn hàng không được tìm thấy"
            });
            return
        }
        if (!user) {
            workflow.emit('response', {
                error: "Người mua không tìm thấy"
            });
            return
        }
        if (!address) {
            workflow.emit('response', {
                error: "Địa chỉ giao hàng không tìm thấy"
            });
            return
        }

        var total = 0;
        products.forEach(product => {
            total = product.price * product.quantity
        });

        var website_id = 5737,  //39088
        currency = 'VND',
        receiver_account = '01629680825',
        reference_number = id,
        amount = total;

        var sign = helper.signSHA(`${amount}|${currency}|${receiver_account}|${reference_number}|${website_id}|@LeAnhTuan11051996`);

        var href = `https://pay.vtc.vn/bank-gateway/checkout.html?website_id=${website_id}&currency=${currency}&reference_number=${reference_number}&amount=${amount}&receiver_account=${receiver_account}&signature=${sign}`

        workflow.emit('response', {
            href: href
        });
    });

    workflow.on('response', (response) => {
        return cb(response);
    })

    workflow.emit('validate-parameters');
}

module.exports = {
    checkingAvailable: checkingAvailable,
    detailCart: detailCart,
    initOrder: initOrder,
    verify: verify,
    updateOrder: updateOrder,
    getOrder: getOrder,
    requestPayment: requestPayment
}