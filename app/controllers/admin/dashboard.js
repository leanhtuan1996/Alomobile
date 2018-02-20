'use strict';

var session = require('express-session');
var event = require('events');

var helper = require('../../helpers/index').helper;
var User = require('../../models/index').user;
var Product = require('../../models/index').product;
var productController = require('../index').product;

var dashboard = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {        
        workflow.emit('dashboard')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('dashboard', () => {
        workflow.emit('response', {
            error: null
        })
    });

    workflow.emit('validate-parameters');
}

var getAllProducts = (result) => {
    productController.getProducts((response) => {
        return result({
            error: response.error,
            products: response.products
        });
    });
}

module.exports = {
    dashboard: dashboard
}