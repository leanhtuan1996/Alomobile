'use strict';

var session = require('express-session');
var event = require('events');

var helper = require('../helpers/index').helper;
var User = require('../models/index').user;
var Product = require('../models/index').product;

const category = require('./category'),
    product = require('./product');


var index = (req, res, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('index')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('index', () => {
        res.redis.getItem('category', `get-categories`, (data) => {
            if (data) {
                workflow.emit('response', {
                    categories: data
                });
            } else {
                category.getCategories((result) => {
                    if (result.categories) {
                        res.redis.setItem('category', `get-categories`, result.categories);
                    }                
                    workflow.emit('response', {
                        categories: result.categories || []
                    });
                });
            }
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    index: index
}