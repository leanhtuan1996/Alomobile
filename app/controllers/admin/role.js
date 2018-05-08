'use strict';

var roleApi = require('../../api/index').role;

var getRoles = (cb) => {
    roleApi.getRoles((result) => {
        return cb(result);
    });
}

var getRole = (id, cb) => {
    roleApi.getRole(id, (result) => {
        return cb(result);
    });
}

var editRole = (roleEdited, cb) => {
    roleApi.editRole(roleEdited, (result) => {
        return cb(result);
    });
}

var newRole = (newRole, cb) => {
    roleApi.newRole(newRole, (result) => {
        return cb(result);
    });
}

var deleteRole = (parameter, cb) => {
    roleApi.deleteRole(parameter, (result) => {
        return cb(result);
    });
}

module.exports = {
}