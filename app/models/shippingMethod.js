'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('ShippingMethod', new Schema({
    name: String,
    price: Number,
    created_at: Number,
    updated_at: Number
}));
