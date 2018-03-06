'use strict';

var user = require('./user');
var order = require('./order');
var product = require('./product');
var category = require('./category');
var brand = require('./brand');
var role = require('./role');
var type = require('./type');

module.exports = {
    user: user,
    order: order,
    product: product,
    category: category,
    brand: brand,
    role: role,
    type: type
}