'use strict';

var orderApi = require('../api/order');

var initOrder = (parameters, cb) => {
    orderApi.initOrder(parameters, (response) => {
        return cb(response);
    });
}

module.exports = {
    initOrder: initOrder
}