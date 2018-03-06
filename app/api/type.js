'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var Type = require('../models/index').type;

var getTypes = (result) => {

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-types');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-types', () => {
        Type.find({}, (err, types) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!types) {
                workflow.emit('response', {
                    error: "Types is empty"
                });
            }

            workflow.emit('response', {
                types: types
            });
        });
    });

    workflow.emit('validate-parameters');
};

module.exports = {
    getTypes: getTypes
}