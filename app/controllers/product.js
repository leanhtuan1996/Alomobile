'use strict';

var productApi = require('../api/index').product;

var getProducts = (result) => {
    productApi.getProducts((response) => {
        return result(response);
    });
}

var getProductById = (id, result) => {
    productApi.getProductById(id, (response) => {
        return result(response);
    });
}
module.exports = {
    getProducts: getProducts,
    getProductById: getProductById
}