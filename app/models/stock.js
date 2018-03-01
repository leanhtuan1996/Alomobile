'use strict';

var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Stock', new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    color: { type: Schema.Types.ObjectId, ref: "Color" },
    availableQuantity: Number,
    histories: [{
        previousQuantity: Number,
        newQuantity: Number,
        descriptions: String,
        created_at: Number
    }],
    created_at: Number,
    updated_at: Number
}));
