'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Order', new Schema({
    products: [{
        id: { type: Schema.Types.ObjectId, ref: "Product" },
        color: {
            name: String,
            hex: String
        }, 
        price: Number,
        quantity: Number
    }],
    byUser: { type: Schema.Types.ObjectId, ref: "User" },
    status: Number,
    toAddress: {
        fullName: String,
        phone: Number,
        address: String,
        city: String,
        state: String,
        zipPostalCode: Number
    },
    note: String,
    checkoutMethod: { type: Schema.Types.ObjectId, ref: "CheckoutMethod" },
    promoCode: [{ type: Schema.Types.ObjectId, ref: "Promotion" }],
    created_at: Number,
    updated_at: Number
}).pre('save', function (next) {
    var order = this;

    order.updated_at = Date.now();

    if (!order.created_at) {
        order.created_at = Date.now();
    }

    next();

}).index({ '$**': 'text' }));
