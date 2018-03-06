
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
}).pre('save', function(next) {
    var role = this;

    role.updated_at = Date.now();

    if (!role.created_at) {
        role.created_at = Date.now();
    }

    next();

}));    
