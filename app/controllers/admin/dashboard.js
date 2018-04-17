'use strict';

var session = require('express-session');
var event = require('events');

var mongoose = require('../../../config/db').mongoose;
var Schema = mongoose.Schema;

var productApi = require('../../api/index').product;
var userApi = require('../../api/index').user;
var orderApi = require('../../api/index').order;

const Session = mongoose.model('Session', new Schema({}, {strict: false}))

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
                        workflow.emit('response', {
                            error: null,
                            countUsers: r2.count,
                            countProducts: r1.count,
                            countOrders: r3.count,
                            countTraffic: c
                        });
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