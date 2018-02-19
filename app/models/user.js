'use strict';
var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    fullName: {
        firstName: String,
        lastName: String,
    },
    email: String,
    password: String,
    birthDay: Number,
    phone: String,
    sex: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: "AuthGroup"
    },
    addresses: [{
        alias: String,  //bi danh
        company: String,
        address: String,
        address_Complement: String,
        City: String,
        State: String,
        Zip_PostalCode: Number,
        Country: String
    }],
    status: { type: Schema.Types.Boolean, default: true },
    orders: [{
        id: { type: Schema.Types.ObjectId, ref: "Order" }
    }],
    isRegistered_NewLetters: Boolean,
    last_sign_in: Number,
    created_at: Number,
    updated_at: Number
}));
