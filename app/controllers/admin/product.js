'use strict';

var session = require('express-session');
var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../../helpers/index').helper;
var User = require('../../models/index').user;
var Product = require('../../models/index').product;
var Brand = require('../../models/index').brand;
var brandController = require('../index').brand;

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
                brandController.getBrands((r1) => {
                    workflow.emit('response', {
                        error: null,
                        categories: categories,
                        products: r.products || [],
                        brands: r1.brands
                    });
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
    var colors = product.colors;
    var brand = product.brand;
    var specifications = product.specifications;
    var images = product.newNames;
    var type = product.type;
    var descriptions = product.descriptions;
    var metaTitle = product.metaTitle;
    var metaKeyword = product.metaKeyword;

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
        if (!type) {
            workflow.emit('response', {
                error: "Please choose type of product"
            });
            return
        }
        if (!brand) {
            workflow.emit('response', {
                error: "Please choose brand of product"
            });
            return
        }
        if (!descriptions) {
            workflow.emit('response', {
                error: "Please enter descriptions of product"
            });
            return
        }
        if (!colors || colors.length == 0) {
            workflow.emit('response', {
                error: "Please choose colors of product"
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
        newProduct.colors = colors;
        newProduct.brand = brand;
        if (specifications) {
            newProduct.specifications = JSON.parse(specifications);
        }
        newProduct.images = [];
        _.forEach(images, (image) => {
            var object = {}
            object._id = mongoose.Types.ObjectId();
            object.url = '/static/img/' + image;
            object.alt = name;

            newProduct.images.push(object);
        });

        console.log(newProduct.specifications);

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