
'use strict';
var mongoose = require('../config/index').db;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Warehouse', new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    color: { type: Schema.Types.ObjectId, ref: "Color" },
    quantity: Number,
    created_at: Number,
    updated_at: Number,
    logs: [{
        previousQuantity: Number,
        newQuantity: Number,
        descriptions: String,
        created_at: Number,
        updated_at: Number
    }]
}));
