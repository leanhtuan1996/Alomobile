'use strict';

var event = require('events');

var helper = require('../helpers/index').helper;
var Product = require('../models/index').product;


var getProducts = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products')
    });

    workflow.on('response', (reponse) => {
        return result(reponse);
    });

    workflow.on('get-products', () => {
        Product.find({}, (err, products) => {
            if (err) {
                workflow.emit('response', err);
            } else {
                workflow.emit('response', {
                    error: null,
                    products: products || []
                });
            }
        });
    });

    workflow.emit('validate-parameters');
}

var getProduct = (id, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', 'Id product is required!');
        } else {
            workflow.emit('get-product');
        }
    });

    workflow.on('response', (response) => {
        return result(response)
    });

    workflow.on('get-product', () => {
        Product.findById(id, (err, product) => {
            if (err) {
                workflow.emit('response', {
                    error: err,
                    product: null
                });
            } else {
                workflow.emit('response', {
                    error: null,
                    product: product
                })
            }
        })
    });

    workflow.emit('validate-parameters');
}

var getProductsByCategory = (id) => {

}

var getProductsByManufacturer = (id) => {

}

module.exports = {
    getProducts: getProducts,
    getProduct: getProduct,
    getProductsByCategory: getProductsByCategory,
    getProductsByManufacturer: getProductsByManufacturer
}