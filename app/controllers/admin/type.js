'use strict';

var typeApi = require('../../api/index').type;

var getTypes = (result) => {
    typeApi.getTypes((response) => {
        return result(response);
    });
};


module.exports = {
    getTypes: getTypes
}