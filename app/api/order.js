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
                    return e.color.hex == product.color && e.quantity >= Number.parseInt(product.quantity)
                });

                if (!detail) {
                    workflow.emit('response', {
                        error: `Sản phẩm ${element.name} không đủ số lượng!`
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

                workflow.emit('update-quantity', newProducts)
            });
        }
    });

    workflow.on('update-quantity', (newProducts) => {
        if (newProducts.length == products.length) {
            for (let i = 0; i < newProducts.length; i++) {
                const product = newProducts[i];
                Product.find(product.id, (err, element) => {
                    if (element) {
                        var idx = element.details.findIndex(e => {
                            return e.color.hex == product.color.hex
                        });
                        if (idx) {
                            var oldQuantity = element.details[idx].quantity;
                            element.details[idx].quantity = oldQuantity - Number.parseInt(product.quantity);
                            element.save();
                        }
                    }

                    if (i == newProducts.length - 1) {
                        workflow.emit('init', newProducts);
                    }
                });
            }
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
            if (err) {
                workflow.emit('response', {
                    error: err
                });
            } else {
                workflow.emit('response', {
                    order: newOrder
                });
            }
        });
    });

    workflow.emit('validate-parameters');
};

var updateOrder = (order, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {

    });

    workflow.on('response', (response) => {

    });

    workflow.on('update', () => {

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

module.exports = {
    checkingAvailable: checkingAvailable,
    detailCart: detailCart,
    initOrder: initOrder
}