
'use strict';
var mongoose = require('../../config/db');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Role', new Schema({
    name: String,  
    created_at: Number,
    updated_at: Number
}));
