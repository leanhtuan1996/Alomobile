'use strict';

var brandApi = require('../api/index').brand;

var getBrands = (result) => {
    brandApi.getBrands((response) => {
        return result(response);
    });
}

module.exports = {
    getBrands: getBrands
}