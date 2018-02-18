'use strict';

var event = require('events');

var helper = require('../helpers/index').helper;
var Category = require('../models/index').category;

var getCategories = () => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-categories')
    });

    workflow.on('handler-error', (err) => {
        return [];
    });

    workflow.on('get-categories', () => {
        Category.find({}, (err, data) => {
            if (err) {
                workflow.emit('handler-error', err);
            } else {
                return data || [];
            }
        })
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getCategories: getCategories
}