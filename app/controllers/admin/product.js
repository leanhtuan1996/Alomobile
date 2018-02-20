'use strict';

var session = require('express-session');
var event = require('events');

var helper = require('../../helpers/index').helper;
var User = require('../../models/index').user;
var Product = require('../../models/index').product;
var productController = require('../index').product;

var index = (req, res, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('index')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('index', () => {

        /** get categories */
        category.getCategories((result) => {
            var categories = result.categories || [];

            getAllProducts((r) => {
                var products = r.products || [];

                workflow.emit('response', {
                    error: null,
                    categories: categories,
                    currentUser: req.session.currentUser,
                    products: products
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getAllProducts = (result) => {
    productController.getProducts((response) => {
        return result({
            error: response.error,
            products: response.products
        });
    });
}

var getProduct = (id, result) => {
    productController.getProduct(id, (response) => {
        return result({
            error: response.error,
            product: response.product
        });
    })
}

var newProduct = (product, result) => {
    var workflow = new event.EventEmitter();

    var name = product.name;
    var alias = product.alias;
    var color = product.color;
    var manufacturer = product.manufacturer;
    var specifications = product.specifications;
    var images = product.images;
    var status = product.status;
    var category_on = product.category_on;

    workflow.on('validate-parameters', () => {
        if (!name) {
            workflow.emit('response', {
                error: "Please enter name of product"
            });
            return
        }

        if (!alias) {
            workflow.emit('response', {
                error: "Please enter alias of product"
            });
            return
        }

        if (!images) {
            workflow.emit('response', {
                error: "Please provide images of product"
            });
            return
        }

        if (!status) 
        {
            workflow.emit('response', {
                error: "Please enter status of product"
            });
            return
        }

        if (!category_on) {
            workflow.emit('response', {
                error: "Please choose category of product"
            });
            return
        }

        workflow.emit('new-product');

    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('new-product', ()  => {
        var newProduct = new Product();
        newProduct.name = name;
        newProduct.alias = alias;
        newProduct.color = color;
        newProduct.manufacturer = manufacturer;
        newProduct.specifications = specifications;
        newProduct.images = images;
        newProduct.status = status;
        newProduct.created_at = Date.now() / 1000;
        newProduct.updated_at = Date.now() / 1000;

        newProduct.save((err) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
            } else {
                workflow.emit('response', {
                    error: null
                });
            }
        })
    });

    workflow.emit('validate-parameters');
}


module.exports = {
    index: index,
    getAllProducts: getAllProducts,
    getProduct: getProduct,
    newProduct: newProduct
}