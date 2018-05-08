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

var productApi = require('../../api/index').product;
var brandApi = require('../../api/index').brand;
var categoryApi = require('../../api/index').category;

var index = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('index')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('index', () => {

        categoryApi.getCategories((r1) => {
            productApi.getProducts((r2) => {
                brandApi.getBrands((r3) => {
                    workflow.emit('response', {
                        error: null,
                        categories: r1.categories || [],
                        products: r2.products || [],
                        brands: r3.brands || []
                    });
                });
            });
        });

        /** get categories */
        // category.getCategories((result) => {
        //     var categories = result.categories || [];

        //     getAllProducts((r) => {
        //         brandController.getBrands((r1) => {
        //             workflow.emit('response', {
        //                 error: null,
        //                 categories: categories,
        //                 products: r.products || [],
        //                 brands: r1.brands
        //             });
        //         });
        //     });
        // });
    });

    workflow.emit('validate-parameters');
}

var getAllProducts = (prevProduct = null, result) => {
    productApi.getProducts(prevProduct, (response) => {
        return result(response);
    });
}

var getPrevProducts = (prevProduct = null, result) => {
    productApi.getPrevProducts(prevProduct, (response) => {
        return result(response);
    });
}

var getProduct = (id, result) => {
    productApi.getProductById(id, (response) => {
        return result(response);
    });
}

var getNewProducts = (result) => {
    productApi.getNewProducts(20, (response) => {
        return result(response);
    });
}

var getSpecialProducts = (result) => {
    productApi.getSpecialProducts(20, (response) => {
        return result(response);
    });
}

var getProductsByType = (type, result) => {
    productApi.getProductsByType(type, 20, (response) => {
        return result(response);
    });
}

var getHotProducts = (result) => {
    productApi.getHotProducts(20, (response) => {
        return result(response);
    });
}

var newProduct = (product, result) => {
    productApi.newProduct(product, (response) => {
        return result(response);
    });
}

var getCountProducts = (result) => {
    productApi.getCountProducts((response) => {
        return result(response.count || 1);
    });
}

var searchProduct = (text, result) => {
    productApi.searchProducts(text, (response) => {
        return result(response);
    });
}

var deleteProduct = (id, result) => {
    productApi.deleteProduct(id, (response) => {
        return result(response);
    });
}

var editProduct = (product, result) => {
    productApi.editProduct(product, (response) => {
        return result(response);
    });
}


module.exports = {
}