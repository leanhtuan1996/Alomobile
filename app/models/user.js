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
    phone: String,
    sex: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    },
    addresses: [{
        address: String,
        city: String,
        state: String,
        zipPostalCode: Number,
        Country: String
    }],
    status: { type: Schema.Types.Boolean, default: true },
    orders: [{
        id: { type: Schema.Types.ObjectId, ref: "Order" }
    }],
    isRegisteredNewLetters: Boolean,
    lastSignIn: Number,
    created_at: Number,
    updated_at: Number
}));
