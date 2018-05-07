'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

/**
 * STATUS
 * 0: KHOI TAO
 * 1: DANG DOI DUYET
 * 2: DA DUYET
 * 3: BI TU CHOI
 * 4: BI HUY
 * 5: DANG GIAO HANG
 * 6: DA GIAO   
 */

module.exports = mongoose.model('Order', new Schema({
    alias: { type: Schema.Types.Number, unique: true },
    products: [{
        id: { type: Schema.Types.ObjectId, ref: "Product" },
        color: {
            name: String,
            hex: String
        },
        basePrice: Number,
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
    checkoutMethod: String,
    promoCode: {
        id: { type: Schema.Types.ObjectId, ref: "Promotion" },
        discount: Number
    },
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
