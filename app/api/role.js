'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var Role = require('../models/index').role;

var getRoles = (result) => {

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-roles');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-roles', () => {
        Role.find({}, (err, roles) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!roles) {
                workflow.emit('response', {
                    error: "Roles is empty"
                });
            }

            workflow.emit('response', {
                roles: roles
            });
        });
    });

    workflow.emit('validate-parameters');
};

var getRole = (id, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {       
        if (!id) {
            workflow.emit('response', {
                error: "Id of Role is required!"
            });
            return
        }

        workflow.emit('get-role');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-role', () => {
        Role.findById(id, (err, role) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!role) {
                workflow.emit('response', {
                    error: "Role not found"
                });
                return
            }

            workflow.emit('response', {
                role: role
            });
        });
    });

    workflow.emit('validate-parameters');


}

var editRole = (roleEdited, result) => {
    var id = roleEdited.id;
    var name = roleEdited.name;
    var allows = [];
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {

        if (!roleEdited) {
            workflow.emit('response', {
                error: "Parameters were missed!"
            });
            return
        }

        if (!id || id == 'undefined') {
            workflow.emit('response', {
                error: "Id of role is required!"
            });
            return
        }

        if (!name || name == 'undefined') {
            workflow.emit('response', {
                error: "name of role is required!"
            });
            return
        }

        if (roleEdited.allows) {
            allows = JSON.parse(roleEdited.allows);
        }

        workflow.emit('edit-role');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('edit-role', () => {
        Role.findById(id, (err, role) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!role) {
                workflow.emit('response', {
                    error: "Role not found"
                });
                return
            }

            role.name = name;
            role.allows = allows;            

            role.save((err) => {
                workflow.emit('response', {
                    error: err
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var newRole = (newRole, result) => {
    var name = newRole.name,
        allows = [];

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!newRole) {
            workflow.emit('response', {
                error: "New role is required!"
            });
            return
        }

        if (!name) {
            workflow.emit('response', {
                error: "Name of Role is required!"
            });
            return
        }

        if (newRole.allows) {
            allows = JSON.parse(newRole.allows)
        }

        workflow.emit('new-role');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('new-role', () => {
        var role = new Role({
            name: name,
            allows: allows
        });

        role.save((err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var deleteRole = (parameter, result) => {

    var id = parameter.id;

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id of Role is required!"
            });
            return
        }

        workflow.emit('delete-role');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('delete-role', () => {
        Role.findByIdAndRemove(id, (err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getRoles: getRoles,
    getRole: getRole,
    editRole: editRole,
    newRole: newRole,
    deleteRole: deleteRole
}