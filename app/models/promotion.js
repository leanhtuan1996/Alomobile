'use strict';
var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('ShippingMethod', new Schema({
    name: String,
    code: String,
    discount: Number,
    uses_Total: Number,
    use_Orders: [{
        type: Schema.Types.ObjectId, ref: "Order"
    }],
    use_Users: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],
    status: Boolean,
    start_at: Number,
    finish_at: Number,    
    created_at: Number,
    updated_at: Number
}));
