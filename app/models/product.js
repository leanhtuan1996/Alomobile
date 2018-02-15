'use strict';
var mongoose = require('../config/index').db;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Product', new Schema({
    name: String,
    alias: String,
    color: [{
        hex: String,
        rgb: {
            red: Number,
            green: Number,
            blue: Number
        },
        name: String
    }],
    manufacturer: {
        type: Schema.Types.ObjectId,
        ref: "Manufacturer"
    },
    specifications: {}, //thong so ky thuat
    images: {
        thumbnail: String,
        fullsize: [{ type: Schema.Types.String }]
    },
    reviews: [{
        quantity: Number,
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
    totalOrders: Number,
    orderes: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    created_at: Number,
    updated_at: Number
}));
