'use strict';

var productApi = require('../api/index').product;

var getProducts = (result) => {
    productApi.getProducts(null, (response) => {
        return result(response);
    });
}

var getProductById = (id, result) => {
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

var getProductsByType = (id, result) => {
    productApi.getProductsByType(id, 20, (response) => {
        return result(response);
    });
}

var getHotProducts = (result) => {
    productApi.getHotProducts(20, (response) => {
        return result(response);
    });
}

module.exports = {
    getProducts: getProducts,
    getProductById: getProductById,
    getProductsByType: getProductsByType,
    getSpecialProducts: getSpecialProducts,
    getHotProducts: getHotProducts,
    getNewProducts: getNewProducts
}