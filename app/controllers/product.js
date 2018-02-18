'use strict';

var event = require('events');

var helper = require('../helpers/index').helper;
var Product = require('../models/index').product;


var getProducts = () => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products')
    });

    workflow.on('handler-error', (err) => {
        return [];
    });

    workflow.on('get-products', () => {
        Product.find({}, (err, products) => {
            if (err) {
                workflow.emit('handler-error', err);
            } else {
                return products || [];
            }
        });
    });

    workflow.emit('validate-parameters');
}

var getProduct = (id) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('handler-error', 'Id product is required!');
        } else {
            workflow.emit('get-product');
        }
    });

    workflow.on('handler-error', (err) => {

    });

    workflow.on('get-product', () => {
        Product.findById(id, (err, product) => {
            if (err) {
                workflow.emit('handler-error', err);
            } else {
                return product || {}
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