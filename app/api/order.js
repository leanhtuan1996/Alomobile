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
                if (element) {
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
        promoCode = parameters.promoCode,
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
        var errors = [];
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (!product.id || !product.color || !product.quantity) {
                workflow.emit('response', {
                    error: `Sản phẩm thứ ${i + 1} bị thiếu tham số!`
                });
                return
            }

            Product.findById(product.id).select('name details').exec((err, element) => {
                if (err) {
                    errors.push(err)
                }

                if (!element) {
                    errors.push({
                        error: "Sản phẩm không tìm thấy!"
                    });
                }

                var details = element.details;
                if (!details) {
                    errors.push({
                        error: "Chi tiết sản phẩm không tìm thấy!"
                    });
                }

                var detail = details.find(e => {
                    return e.color.hex == product.color
                });

                if (!detail) {
                    errors.push({
                        error: "Chi tiết sản phẩm không tìm thấy!"
                    });
                }

                if (detail.quantity < product.quantity) {
                    errors.push({
                        error: `Số lượng sản phẩm ${element.name} hiện không đủ để tiến hành thanh toán, số lượng còn lại là: ${detail.quantity}`
                    });
                }

                var newElement = {
                    id: product.id,
                    quantity: product.quantity,
                    price: detail.price,
                    color: detail.color
                }

                newProducts.push(newElement);

                if (i == products.length - 1) {
                    if (errors.length > 0) {
                        workflow.emit('response', {
                            error: errors
                        });
                        return
                    }

                    if (newProducts.length - 1 == i) {
                        workflow.emit('init', newProducts);
                    }
                }
            });
        }
    });

    workflow.on('init', (newProducts) => {
        var newOrder = new Order();
        newOrder.products = newProducts;
        newOrder.alias = helper.getRamdomNumber();

        if (user) {
            newOrder.byUser = user._id;
        }

        if (parameters.promoCode && parameters.discount) {
            var promoCode = {
                id: parameters.promoCode,
                discount: parameters.discount
            }
            newOrder.promoCode = promoCode
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

            if (parameters.checkoutMethod) {
                order.checkoutMethod = parameters.checkoutMethod;
            }

            order.save((err) => {

                //save to user
                if (!err && order.status >= 1) {
                    User.findById(order.byUser).select('orders').exec((err, user) => {
                        if (err) {
                            workflow.emit('response', {
                                error: err
                            });
                            return
                        }

                        if (!user) {
                            workflow.emit('response', {
                                error: "Không tìm thấy người dùng, vui lòng đăng nhập để tiếp tục"
                            });
                            return
                        }
                        if (order.status == 1) {
                            var orders = user.orders || [];
                            orders.push(order);
                            user.orders = orders;
                        }

                        user.save((err) => {
                            //send Email
                            if (!err) {
                                Order.populate(order, {
                                    path: 'products.id',
                                    model: 'Product'
                                }, (err, order) => {
                                    workflow.emit('response', {
                                        error: err,
                                        order: order
                                    });
                                });
                            } else {
                                workflow.emit('response', {
                                    error: err
                                });
                            }
                        });
                    });
                } else {
                    workflow.emit('response', {
                        error: err,
                        order: order
                    });
                }
            });
        });
    });

    workflow.emit('validate-parameters');
}

var updateStatus = (id, status, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id is required!"
            });
            return
        }

        if (!status) {
            workflow.emit('response', {
                error: "Status is required!"
            });
            return
        } else {
            try {
                status = Number.parseInt(status)
            } catch (error) {
                workflow.emit('response', {
                    error: error
                })
            }
        }

        workflow.emit('update')
    });

    workflow.on('response', (response) => {
        return cb(response)
    })

    workflow.on('update', () => {
        Order.findById(id, (err, order) => {
            if (order) {
                order.status = status;
                order.save((err) => {
                    workflow.emit('response', {
                        error: err,
                        order: order
                    });
                });
            } else {
                workflow.emit('response', {
                    error: "Order not found"
                });
            }
        })
    })

    workflow.emit('validate-parameters')
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

var getDetailOrder = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Mã đơn hàng không tìm thấy"
            });
            return
        }

        workflow.emit('get')
    });

    workflow.on('response', (response) => {
        return cb(response)
    })

    workflow.on('get', () => {
        Order.findById(id).populate('byUser').populate({
            path: "promoCode.id",
            model: "Promotion"
        }).exec((err, doc) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!doc) {
                workflow.emit('response', {
                    error: "Đơn hàng không được tìm thấy"
                });
                return
            }

            Order.populate(doc, {
                path: 'products.id',
                model: 'Product'
            }, (err, order) => {
                console.log(order);
                workflow.emit('response', {
                    error: err,
                    order: order
                });
            });
        });
    });

    workflow.emit('validate-parameters')
}

var requestPayment = (id, method, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Mã đơn hàng không được bỏ trống"
            });
            return
        }

        if (!method) {
            workflow.emit('response', {
                error: "Không tìm thấy phương thức thanh toán vui lòng chọn loại phương thức khác!"
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

        var href;

        switch (method) {
            case 'vtc-pay':
                var website_id = 5737,  //39088, 5737
                    currency = 'VND',
                    receiver_account = '01629680825',
                    reference_number = id,
                    amount = total;

                var sign = helper.signSHA(`${amount}|${currency}|${receiver_account}|${reference_number}|${website_id}|@LeAnhTuan11051996`);

                href = `https://pay.vtc.vn/bank-gateway/checkout.html?website_id=${website_id}&currency=${currency}&reference_number=${reference_number}&amount=${amount}&receiver_account=${receiver_account}&signature=${sign}`

                break;

            default:
                break;
        }

        workflow.emit('response', {
            href: href
        });
    });

    workflow.on('response', (response) => {
        return cb(response);
    })

    workflow.emit('validate-parameters');
}

var deleteOrder = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Mã đơn hàng không tìm thấy"
            });
            return
        };

        workflow.emit('delete');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('delete', () => {
        Order.findByIdAndRemove(id, (err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getOrders = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('get', () => {
        Order.find({
            status: {
                $gt: 0
            }
        }).select('products byUser status created_at alias').populate({
            path: "byUser",
            model: "User",
            select: "fullName"
        }).exec((err, docs) => {
            Order.populate(docs, {
                path: "products.id",
                model: "Product",
                select: "images name"
            }, (err, orders) => {
                workflow.emit('response', {
                    error: err,
                    orders: orders
                });
            });
        });
    });

    workflow.emit('validate-parameters')
}

var getPendingOrders = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('get', () => {
        Order.find({ status: 1 }).select('products byUser status created_at').populate({
            path: "byUser",
            model: "User",
            select: "fullName"
        }).exec((err, docs) => {
            Order.populate(docs, {
                path: "products.id",
                model: "Product",
                select: "images name"
            }, (err, orders) => {
                workflow.emit('response', {
                    error: err,
                    orders: orders
                });
            });
        });
    });

    workflow.emit('validate-parameters')
}

var getCountOrders = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-count');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('get-count', () => {
        Order.count({
            status: {
                $gt: 0
            }
        }, (err, count) => {
            workflow.emit('response', {
                error: err,
                count: count
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getNewOrders = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('get', () => {
        Order.find({
            status: {
                $gt: 0
            }
        }).select('products byUser status created_at').populate({
            path: "byUser",
            model: "User",
            select: "fullName"
        })
            .limit(10)
            .sort('-created_at')
            .exec((err, docs) => {
                Order.populate(docs, {
                    path: "products.id",
                    model: "Product",
                    select: "images name"
                }, (err, orders) => {
                    workflow.emit('response', {
                        error: err,
                        orders: orders
                    });
                });
            });
    });

    workflow.emit('validate-parameters')
}

var checkOrder = (id, email, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id is required!"
            });
            return
        }

        workflow.emit('check');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('check', () => {
        Order.findOne({
            alias: id
        }).populate({
            path: 'byUser',
            model: 'User',
            select: 'email'
        }).exec((err, order) => {
            if (order) {
                if (order.byUser.email != email) {
                    workflow.emit('response', {
                        error: "Không có đơn hàng nào được tìm thấy!"
                    });
                } else {
                    Order.populate(order, {
                        path: 'products.id',
                        model: 'Product',
                        select: 'name alias'
                    }, (err, data) => {
                        workflow.emit('response', {
                            error: err,
                            order: data
                        });
                    })
                }
            } else {
                workflow.emit('response', {
                    error: "Không có đơn hàng nào được tìm thấy!"
                });
            }
        })
    });

    workflow.emit('validate-parameters');
}

var getMyOrders = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id is required!"
            });
            return
        }

        workflow.emit('get-my-orders');
    });

    workflow.on('response', (response) => {
        console.log(response);
        return cb(response);
    });

    workflow.on('get-my-orders', () => {

        Order.find({
            byUser: id
        }).populate({
            path: 'byUser',
            model: 'User',
            select: 'email fullName'
        }).exec((err, docs) => {
            if (docs && docs.length > 0) {
                Order.populate(docs, {
                    path: 'products.id',
                    model: 'Product',
                    select: 'name alias'
                }, (err, orders) => {
                    workflow.emit('response', {
                        error: err,
                        orders: orders
                    })
                })
            } else {
                workflow.emit('response', {
                    error: "Không có đơn hàng nào"
                })
            }
        })
    });

    workflow.emit('validate-parameters');
}

var getLastestOrder = (idUser, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!idUser) {
            workflow.emit('response', {
                error: "Id user is required!"
            });
            return
        }

        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('get', () => {
        Order.findOne({
            byUser: idUser,
            status: {
                $gt: 0
            }
        }).sort('-created_at').limit(1).select('_id').exec((err, order) => {
            if (!order || err) {
                workflow.emit('response', {
                    error: "Order not found"
                });
            } else {
                getDetailOrder(order._id, (result) => {
                    workflow.emit('response', result);
                });
            }
        });
    });

    workflow.emit('validate-parameters');
}

var getMyOrdersWithExcept = (idOrder, idUser, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!idOrder) {
            workflow.emit('response', {
                error: "Id of order's except is required"
            });
            return
        }

        if (!idUser) {
            workflow.emit('response', {
                error: "Id of User is required!"
            });
            return
        }

        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response)
    })

    workflow.on('get', () => {
        Order.find({
            byUser: idUser,
            status: {
                $gt: 0
            },
            alias: {
                $ne: idOrder
            }
        }).populate({
            path: 'byUser',
            model: 'User',
            select: 'email'
        })
        .sort('-created_at')
            .exec((err, docs) => {
                if (docs && docs.length > 0) {
                    Order.populate(docs, {
                        path: 'products.id',
                        model: "Product",
                        select: 'name alias'
                    }, (err, orders) => {
                        workflow.emit('response', {
                            error: err,
                            orders: orders
                        })
                    })
                } else {
                    workflow.emit('response', {
                        error: "No orders finded"
                    })
                }
            })
    })

    workflow.emit('validate-parameters');
}

var cancelOrder = (idOrder, idUser, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!idOrder) {
            workflow.emit('response', {
                error: "Id is required!"
            });
            return
        }

        if (!idUser) {
            workflow.emit('response', {
                error: "Id user is required!"
            });
            return
        }

        workflow.emit('cancel');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('cancel', () => {

        Order.findOne({
            '_id': idOrder,
            'byUser': idUser
        }, (err, order) => {
            if (err || !order) {
                workflow.emit('response', {
                    error: "Order not found"
                });
                return
            }

            order.status = 4;

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


module.exports = {
    checkingAvailable: checkingAvailable,
    detailCart: detailCart,
    initOrder: initOrder,
    verify: verify,
    updateOrder: updateOrder,
    getOrder: getOrder,
    requestPayment: requestPayment,
    deleteOrder: deleteOrder,
    getOrders: getOrders,
    getPendingOrders: getPendingOrders,
    getDetailOrder: getDetailOrder,
    getCountOrders: getCountOrders,
    getNewOrders: getNewOrders,
    checkOrder: checkOrder,
    getMyOrders: getMyOrders,
    getLastestOrder: getLastestOrder,
    cancelOrder: cancelOrder,
    updateStatus: updateStatus,
    getMyOrdersWithExcept: getMyOrdersWithExcept
}