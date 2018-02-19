'use strict';

var event = require('events');

var helper = require('../helpers/index').helper;
var Category = require('../models/index').category;

var getCategories = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-categories')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-categories', () => {
        Category.find({}, (err, data) => {
            if (err) {
                workflow.emit('response', {
                    error: err,
                    categories: null
                });
            } else {
                workflow.emit('response', {
                    error: null,
                    categories: data || []
                });
            }
        })
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getCategories: getCategories
}