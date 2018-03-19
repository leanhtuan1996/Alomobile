'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../../helpers/index').helper;
var User = require('../../models/index').user;

var userApi = require('../../api/index').user;

var getUsers = (result) => {

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-users');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-users', () => {
       User.find({})
            .populate('role', 'name', 'Role')
            .exec((err, users) => {
                workflow.emit('response', {
                    error: err,
                    users: users
                });
            });
    });

    workflow.emit('validate-parameters');
};

var signIn = (parameters, result) => {
    userApi.signIn(parameters, (response) => {
        // if (response.error) {
        //     return result(response);
        // }

        // if (response.user) {
        //     var role = response.user.role;

        //     if (!role) {
        //         return result({
        //             error: "Role not found"
        //         });
        //     } 

            

        // } else {
        //     return result({
        //         error: "User not found"
        //     });
        // }

        return result(response);
    });
}


module.exports = {
    getUsers: getUsers,
    signIn: signIn
}