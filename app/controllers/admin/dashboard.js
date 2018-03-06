'use strict';

var session = require('express-session');
var event = require('events');

var productApi = require('../../api/index').product;

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

module.exports = {
    dashboard: dashboard
}