'use strict';
var mongoose = require('../config/index').db;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema({
    name: String,
    alias: String,
    image: String,
    icon: String,
    style: String,
    parent: String,  
    descriptions: String,
    metaDescriptions: String,  
    metaKeywords: String,
    created_at: Number,
    updated_at: Number
}));
