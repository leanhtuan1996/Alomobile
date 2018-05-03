'use strict';

var reviewApi = require('../api/index').review;

var getMyReviews = (id, result) => {
    reviewApi.getMyReviews(id, (cb) => {
        return result(cb)
    })
}

module.exports = {
    getMyReviews: getMyReviews
}