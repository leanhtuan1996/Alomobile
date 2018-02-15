'use strict';
var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Color', new Schema({
    name: String,
    hex: String,
    rgb: {
        r: String,
        g: String,
        b: String
    },
    created_at: Number,
    updated_at: Number
}));
