'use strict';

var event = require('events');

var helper = require('../helpers/index').helper;
var Brand = require('../models/index').brand;

var getBrands = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-brands')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-brands', () => {
        Brand.find({}, (err, brands) => {
            workflow.emit('response', {
                error: err,
                brands: brands || []
            });
            return
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getBrands: getBrands
}