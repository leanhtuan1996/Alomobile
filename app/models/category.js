'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema({
    name: String,
    alias: String,
    icon: String,
    subCategories: [{
        _id: { type: Schema.Types.ObjectId },
        name: String,
        alias: String,        
        descriptions: String,
        metaDescriptions: String,
        metaKeywords: String,
        created_at: Number,
        updated_at: Number
    }],
    descriptions: String,
    metaDescriptions: String,
    metaKeywords: String,
    created_at: Number,
    updated_at: Number
}).pre('save', function(next) {
    var category = this;

    category.updated_at = Date.now();

    if (!category.created_at) {
        category.created_at = Date.now();
    }

    next();

}).index({ '$**': 'text' }));