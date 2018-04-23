'use strict';

var user = require('./user');
var order = require('./order');
var product = require('./product');
var category = require('./category');
var brand = require('./brand');
var role = require('./role');
var type = require('./type');
var invalidToken = require('./invalidToken');
var review = require('./review');
var checkoutMethod = require('./checkoutMethod');
var session = require('./session');
var searchKeyword = require('./searchKeyword');
var searchProduct = require('./searchProduct');

module.exports = {
    user: user,
    order: order,
    product: product,
    category: category,
    brand: brand,
    role: role,
    type: type,
    invalidToken: invalidToken,
    review: review,
    checkoutMethod: checkoutMethod,
    session: session,
    searchKeyword: searchKeyword,
    searchProduct: searchProduct
}