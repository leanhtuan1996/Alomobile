
'use strict';
var mongoose = require('../../config/db').mongoose;;
var Schema = mongoose.Schema;

module.exports = mongoose.model('Role', new Schema({
    name: String,  
    allows: [{
        resources: String,
        permissions: [String]
    }],
    created_at: Number,
    updated_at: Number
}));    
