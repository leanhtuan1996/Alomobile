'use strict';

var brandApi = require('../../api/index').brand;

var getBrands = (result) => {
    brandApi.getBrands((response) => {
        return result(response);
    });
};

var newBrand = (brand, result) => {
    brandApi.newBrand(brand, (response) => {
        return result(response);
    });
}

var editBrand = (brand, result) => {
    brandApi.editBrand(brand, (response) => {
        return result(response);
    });
}

var deleteBrand = (parameters, result) => {
    brandApi.deleteBrand(parameters, (response) => {
        return result(response);
    });
}

module.exports = {
}