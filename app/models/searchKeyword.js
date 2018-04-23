'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('SearchKeyword', new Schema({
    keyword: String,
    created_at: { type: Schema.Types.Number, default: Date.now() }
}));
