'use strict';

var categoryApi = require('../api/index').category;

var getCategories = (result) => {
   categoryApi.getCategories((response) => {
       return result(response);
   });
}

module.exports = {
    getCategories: getCategories
}