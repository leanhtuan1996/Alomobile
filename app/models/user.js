'use strict';
var mongoose = require('../config/index').db;
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
    addresses: [{
        alias: String,  //bi danh
        company: String,
        address: String,
        AddressComplement: String,
        City: String,
        State: String,
        Zip_PostalCode: Number,
        Country: String
    }],
    status: Boolean,
    orders: [{
        id: { type: Schema.Types.ObjectId, ref: "Order" }
    }],
    isRegisteredNewLetters: Boolean,
    created_at: Number,
    updated_at: Number
}));
