'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('ShippingMethod', new Schema({
    name: String,
    code: String,
    discount: Number,
    totalUsage: Number,
    usedOrders: [{
        type: Schema.Types.ObjectId, ref: "Order"
    }],
    usedUsers: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],
    status: Boolean,
    start_at: Number,
    finish_at: Number,    
    created_at: Number,
    updated_at: Number
}));
