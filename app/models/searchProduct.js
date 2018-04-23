'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('SearchProduct', new Schema({
    keyword: String,
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    name: String
}, {
    timestamps: true
}).index({ '$**': 'text' }));
