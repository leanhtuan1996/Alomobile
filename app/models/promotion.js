'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Promotion', new Schema({
    description: String,
    code: { type: Schema.Types.String, unique: true },
    discount: Number,
    type: String,
    used: { type: Schema.Types.Number, default: 0 },
    limit: Number,  //limit usage of promo code
    status: { type: Schema.Types.Boolean, default: true },
    totalMinOrder: Number,
    maxDiscount: Number,
    start_at: Number,
    finish_at: Number,
    created_at: Number,
    updated_at: Number
}).pre('save', function (next) {
    var promotion = this;

    promotion.updated_at = Date.now();

    if (!promotion.created_at) {
        promotion.created_at = Date.now();
    }

    next();

}).index({ '$**': 'text' }));
