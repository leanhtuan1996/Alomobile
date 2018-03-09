'use strict';

var session = require('express-session');
var event = require('events');

var productApi = require('../../api/index').product;
var userApi = require('../../api/index').user;

var dashboard = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {        
        workflow.emit('dashboard')
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('dashboard', () => {

        //get count
        productApi.getCountProducts((r1) => {
            userApi.getCountUsers((r2) => {
                workflow.emit('response', {
                    error: null,
                    countUsers: r2.count,
                    countProducts: r1.count
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    dashboard: dashboard
}