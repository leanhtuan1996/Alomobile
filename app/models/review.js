'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Review', new Schema({
    byUser: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    star: Number,
    title: String,
    content: String,
    status: { type: Schema.Types.Boolean, default: false },
    created_at: Number,
    updated_at: Number
}).pre('save', function(next) {
    var review = this;

    review.updated_at = Date.now();

    if (!review.created_at) {
        review.created_at = Date.now();
    }

    next();

}).index({ '$**': 'text' }));
