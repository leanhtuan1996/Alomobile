'use strict';

var session = require('express-session');
var event = require('events');

var Session = require('../../models/index').session;

var productApi = require('../../api/index').product;
var userApi = require('../../api/index').user;
var orderApi = require('../../api/index').order;
var analyticApi = require('../../api/index').analytic;

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
                orderApi.getCountOrders((r3) => {     
                    Session.count({}, (err, c) => {
                        analyticApi.satisfiedClient((r4) => {
                            console.log(r4);
                            workflow.emit('response', {
                                error: null,
                                countUsers: r2.count,
                                countProducts: r1.count,
                                countOrders: r3.count,
                                countTraffic: c,
                                satisfiedClient: r4
                            });
                        })                        
                    });                    
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    dashboard: dashboard
}