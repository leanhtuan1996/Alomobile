'use strict';
var mongoose = require('../../config/db');
var helper = require('../helpers/index').helper;
var bcrypt = require('bcryptjs');
var config = require('config');


var Schema = mongoose.Schema;

var userSchema = new Schema({
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
});

var User = mongoose.model('User', userSchema);

userSchema.pre('save', (next) => {
    var user = this;

    if (!user.isModified("password")) {
        return next();
    }

    user.updated_at = Date.now();    

    if (!user.created_at) {
        user.created_at = Date.now();
    }

    var salt = config.get("salt");
    if (!salt) {
        var error = new Error("Có lỗi trong quá trình lưu dữ liệu.");
        return next(error)
    }

    bcrypt.genSalt(salt, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash
            next();
        });
    });
});


module.exports = User

