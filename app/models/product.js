
'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Product', new Schema({
    name: { type: Schema.Types.String },
    alias: String,
    colors: [{
        hex: String,
        name: String
    }],
    details: [{
        color: {
            hex: String,
            name: String
        },
        basePrice: Number,
        price: Number,
        quantity: { type: Schema.Types.Number, default: 0 }
    }],
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
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    promotions: [{
        type: Schema.Types.ObjectId,
        ref: "Promotion"
    }],
    descriptions: String,
    status: { type: Schema.Types.Boolean, default: true },
    metaTitle: String,
    metaKeyword: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: "Type"
    },
    category: {
        idRootCategory: { type: Schema.Types.ObjectId, ref: "Category" },
        idCategory: { type: Schema.Types.ObjectId, ref: "Category" }
    },
    totalOrders: Number,
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    created_at: Number,
    updated_at: Number
}).pre('save', function (next) {
    var product = this;

    product.updated_at = Date.now();

    if (!product.created_at) {
        product.created_at = Date.now();
    }

    next();

}).index({
    name: "text",
    alias: "text",
    status: "text",
    metaTitle: "text",
    metaKeyword: "text",
    price: "text",
    category: "text",
    _id: "text"
}));