'use strict';

var userApi = require('../api/index').user;
var orderApi = require('../api/index').order;
var reviewApi = require('../api/index').review;

var canRecoveryPassword = (email, token, cb) => {
    userApi.canRecoveryPassword(email, token, (r) => {
        return cb(r);
    });
}

var getMyOrders = (id, cb) => {
    orderApi.getMyOrders(id, (result) => {
        return cb(result)
    });
}

var getMyReviews = (id, cb) => {
    reviewApi.getMyReviews(id, (result) => {
        return cb(result)
    })
}

module.exports = {
}