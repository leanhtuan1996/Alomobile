'use strict';

var orderApi = require('../api/order');

var initOrder = (parameters, cb) => {
    orderApi.initOrder(parameters, (response) => {
        return cb(response);
    });
}

var verify = (id, cb) => {
    orderApi.verify(id, (result) => {
        return cb(result);
    });
}

var updateOrder = (order, parameters, cb) => {
    orderApi.updateOrder(order, parameters, (result) => {
        return cb(result)
    })
}

module.exports = {
    initOrder: initOrder,
    verify: verify,
    updateOrder: updateOrder
}