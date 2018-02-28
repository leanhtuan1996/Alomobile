'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../../helpers/index').helper;
var User = require('../../models/index').user;

var getUsers = (result) => {

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-users');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-users', () => {
       User.find({}, (err, users) => {
           if (err) {
               workflow.emit('response', {
                   error: err
               });
               return
           }

           if (!users) {
               workflow.emit('response', {
                   error: "Data is empty"
               });
               return
           }

           workflow.emit('response', {
               users: users
           });
       })
    });

    workflow.emit('validate-parameters');
};



module.exports = {
    getUsers: getUsers
}