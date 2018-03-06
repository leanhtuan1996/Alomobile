'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Product', new Schema({
    name: String,
    alias: String,
    colors: [String],
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    specifications: {}, //thong so ky thuat
    images: [{
        _id: Schema.Types.ObjectId,
        url: String,
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
    descriptions: String,
    quantity: Number,
    status: Boolean,
    metaTitle: String,
    metaKeyword: String,
    isAvailable: Boolean,
    type: { type: Schema.Types.String },
    categoryOn: { type: Schema.Types.ObjectId, ref: "Category" },
    totalOrders: Number,
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    created_at: Number,
    updated_at: Number
}));
