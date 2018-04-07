'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('CheckoutMethod', new Schema({
    name: String,
    price: Number,
    created_at: Number,
    updated_at: Number
}).pre('save', function(next) {
    var sm = this;

    sm.updated_at = Date.now();

    if (!sm.created_at) {
        sm.created_at = Date.now();
    }

    next();

}).index({ '$**': 'text' }));
