'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Brand', new Schema({
    name: String,
    alias: String,
    image: String,
    created_at: Number,
    updated_at: Number
}).pre('save', function(next) {
    var brand = this;

    brand.updated_at = Date.now();
   
    if (!brand.created_at) {
        brand.created_at = Date.now();
    }

    next();

}).index({ '$**': 'text' }));
