'use strict';

var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Warehouse', new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    color: { type: Schema.Types.ObjectId, ref: "Color" },
    quantity: Number,
    created_at: Number,
    updated_at: Number,
    histories: [{
        previous_Quantity: Number,
        new_Quantity: Number,
        descriptions: String,
        created_at: Number,
        updated_at: Number
    }]
}));
