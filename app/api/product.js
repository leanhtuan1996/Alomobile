'use strict';

var session = require('express-session');
var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var User = require('../models/index').user;
var Product = require('../models/index').product;
var Brand = require('../models/index').brand;

var getProducts = (prevProduct, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product.find({
                created_at: {
                    $lte: prevProduct == null ? Date.now() : (prevProduct.created_at == null ? Date.now() : prevProduct.created_at)
                }
            })
            .populate('brand')
            .limit(15)
            .sort('-created_at')            
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getProductById = (id, result) => {
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

var getSpecialProducts = (limit, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product
            .find({})
            .limit(limit || 10)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getProductsByType = (idType, limit, result) => {
    
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!idType) {
            workflow.emit('response', {
                error: "Type of product is required!"
            });
            return
        }

        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product
            .find({
                type: idType
            })
            .populate('promotions')
            .limit(limit || 10)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products || []
                });
            });

    });

    workflow.emit('validate-parameters');
}

var getNewProducts = (limit, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product
            .find({})
            .limit(limit || 10)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getHotProducts = (limit, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product
            .find({})
            .limit(limit || 10)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var newProduct = (product, result) => {
    var workflow = new event.EventEmitter();

    var name = product.name;
    var alias = product.alias;
    var colors = product.colors;
    var brand = product.brand;
    var price = product.price;
    var specifications = product.specifications;
    var images = product.newNames;
    var type = product.type;
    var descriptions = product.descriptions;
    var metaTitle = product.metaTitle;
    var metaKeyword = product.metaKeyword;
    var category = product.category;

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
        if (!price) {
            workflow.emit('response', {
                error: "Please enter price of product"
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

        if (!category) {
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

    workflow.on('new-product', () => {
        var newProduct = new Product();

        newProduct.name = name;
        newProduct.alias = alias;
        newProduct.colors = colors;
        newProduct.brand = brand;
        newProduct.category = category;
        newProduct.type = type;
        newProduct.descriptions = descriptions;
        newProduct.metaTitle = metaTitle;
        newProduct.metaKeyword = metaKeyword;
        newProduct.price = price;

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


        newProduct.save((err) => {
            workflow.emit('response', {
                error: err
            });
        });

    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getProducts: getProducts,
    getProductById: getProductById,
    getProductsByType: getProductsByType,
    getHotProducts: getHotProducts,
    getSpecialProducts: getSpecialProducts,
    getNewProducts: getNewProducts,
    newProduct: newProduct
}