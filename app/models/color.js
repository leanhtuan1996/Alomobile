'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Color', new Schema({
    hex: String,    
    created_at: Number,
    updated_at: Number
}));
