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
                    element.detail = detail

                    workflow.emit('response', {
                        product: element
                    });
                }
            });
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    checkingAvailable: checkingAvailable,
    detailCart: detailCart
}