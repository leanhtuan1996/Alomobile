'use strict';
var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Product', new Schema({
    name: String,
    alias: String,
    color: [String],
    manufacturer: {
        type: Schema.Types.ObjectId,
        ref: "Manufacturer"
    },
    specifications: {}, //thong so ky thuat
    images: [{
        _id: Schema.Types.ObjectId,
        url: String,
        name: String,
        alt: String
    }],
    reviews: [{
        _id: Schema.Types.ObjectId,
        byUser: { type: Schema.Types.ObjectId, ref: "User" },
        star: Number,
        title: String,
        content: String
    }],
    promotions: [{
        type: Schema.Types.ObjectId,
        ref: "Promotion"
    }],
    quantity: Number,
    status: Boolean,
    isAvailable: Boolean,
    category_on: { type: Schema.Types.ObjectId, ref: "Category" },
    total_Orders: Number,
    orderes: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    created_at: Number,
    updated_at: Number
}));
