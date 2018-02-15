'use strict';
var mongoose = require('../config/index').db;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Order', new Schema({
    products: [{
        id: { type: Schema.Types.ObjectId, ref: "Product" },
        color: { type: Schema.Types.ObjectId, ref: "Color" },
        price: Number,
        quantity: Number,
        subTotal: Number
    }],
    byUser: { type: Schema.Types.ObjectId, ref: "User" },
    status: String,
    toAddress: {
        fullName: String,
        phone: Number,
        company: String,
        address: String,
        addressComplement: String,
        city: String,
        state: String,
        zip_PostalCode: Number,
        country: String
    },
    note: String,
    shippingMethod: { type: Schema.Types.ObjectId, ref: "ShippingMethod" },
    promoCode: { type: Schema.Types.ObjectId, ref: "Promotion"},
    total: Number,
    created_at: Number,
    updated_at: Number
}));
