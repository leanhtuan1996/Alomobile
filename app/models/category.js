'use strict';
var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema({
    name: String,
    alias: String,
    icon: String,
    style: String,
    subCategories: {
        _id: { type: Schema.Types.ObjectId },
        name: String,
        alias: String,
        icon: String,
        style: String,
        items: [{
            _id: { type: Schema.Types.ObjectId },
            name: String,
            alias: String,
            descriptions: String,
            meta_Descriptions: String,
            meta_Keywords: String,
        }],
        descriptions: String,
        meta_Descriptions: String,
        meta_Keywords: String,
        created_at: Number,
        updated_at: Number
    },
    descriptions: String,
    meta_Descriptions: String,
    meta_Keywords: String,
    created_at: Number,
    updated_at: Number
}));