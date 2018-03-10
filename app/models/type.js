'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Type', new Schema({
    name: String,
    alias: String,
    created_at: Number,
    updated_at: Number
}).pre('save', function(next) {
    var type = this;

    type.updated_at = Date.now();

    if (!type.created_at) {
        type.created_at = Date.now();
    }

    next();

}).index({ '$**': 'text' }));
