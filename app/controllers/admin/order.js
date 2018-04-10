'use strict';

var orderApi = require('../../api/index').order;

var getRequestOrders = (cb) => {
    orderApi.getPendingOrders((result) => {
        return cb(result)
    })
}
var updateOrder = (id, parameters, cb) => {
    orderApi.updateOrder({ _id: id }, parameters, (result) => {
        return cb(result)
    });
}

var getOrders = (cb) => {
    orderApi.getOrders((result) => {
        return cb(result)
    });
}

var getOrder = (id, cb) => {
    orderApi.getDetailOrder(id, (result) => {
        return cb(result)
    })
}

module.exports = {
    getRequestOrders: getRequestOrders,
    getOrders: getOrders,
    getOrder: getOrder,
    updateOrder: updateOrder
}