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

var getOrder = (id, cb) => {
    orderApi.getOrder(id, (result) => {
        return cb(result)
    });
}

var requestPayment = (id, cb) => {
   orderApi.requestPayment(id, (result) => {
       return cb(result);
   });
}

module.exports = {
    initOrder: initOrder,
    verify: verify,
    updateOrder: updateOrder,
    getOrder: getOrder,
    requestPayment: requestPayment
}