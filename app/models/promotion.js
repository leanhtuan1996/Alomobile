'use strict';
var mongoose = require('../config/index').db;
var Schema = mongoose.Schema;

module.exports = mongoose.model('ShippingMethod', new Schema({
    name: String,
    code: String,
    discount: Number,
    usesTotal: Number,
    useOrders: [{
        type: Schema.Types.ObjectId, ref: "Order"
    }],
    useUsers: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],
    status: Boolean,
    start_at: Number,
    finish_at: Number,    
    created_at: Number,
    updated_at: Number
}));
