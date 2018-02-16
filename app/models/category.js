'use strict';
var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema({
    name: String,
    alias: String,
    image: String,
    icon: String,
    style: String,
    parent: String,  
    descriptions: String,
    meta_Descriptions: String,  
    meta_Keywords: String,
    created_at: Number,
    updated_at: Number
}));
