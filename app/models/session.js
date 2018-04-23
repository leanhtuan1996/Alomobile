'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Session', new Schema({
    session: String,
    expires: Date
}, {
    timestamps: true
}));
