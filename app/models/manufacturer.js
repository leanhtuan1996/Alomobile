'use strict';
var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Manufacturer', new Schema({
    name: String,
    alias: String,
    image: String,
    created_at: Number,
    updated_at: Number
}));
