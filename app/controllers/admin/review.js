'use strict';

var reviewApi = require('../../api/index').review;

var getRequestReviews = (cb) => {
    reviewApi.getRequestReviews((result) => {
        return cb(result)
    })
}
var updateReview = (id, parameters, cb) => {
    reviewApi.updateReview(id, parameters, (result) => {
        return cb(result)
    });
}
var deleteReview = (id, cb) => {
    reviewApi.deleteReview(id, (result) => {
        return cb(result)
    });
}

var getReviews = (cb) => {
    reviewApi.getReviews((result) => {
        return cb(result)
    })
}

var getDismissReviews = (cb) => {
    reviewApi.getDismissReviews((result) => {
        return cb(result)
    })

    
}

module.exports = {
    getRequestReviews: getRequestReviews,
    updateReview: updateReview,
    deleteReview: deleteReview,
    getDismissReviews: getDismissReviews,
    getReviews: getReviews
}