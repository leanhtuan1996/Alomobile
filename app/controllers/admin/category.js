'use strict';

var categoryApi = require('../../api/index').category;

var getCategories = (result) => {
    categoryApi.getCategories((response) => {
        return result(response);
    });
}

var addCategory = (category, result) => {
    categoryApi.addCategory(category, (response) => {
        return result(response);
    });
}

var delCategory = (parameters, result) => {
    categoryApi.delCategory(parameters, (response) => {
        return result(response);
    });
}

var editCategory = (parameters, result) => {
    categoryApi.editCategory(parameters, (response) => {
        return result(response);
    });
}

var deleteCategory = (idSub, idRoot, result) => {
    categoryApi.deleteCategory(idSub, idRoot, (response) => {
        return result(response);
    });
}

module.exports = {
}