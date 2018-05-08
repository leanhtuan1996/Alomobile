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

var getUser = (id, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id || id == 'undefined') {
            workflow.emit('response', {
                error: 'Id of User is required!'
            });
            return
        }

        workflow.emit('get-user');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-user', () => {
        User.findById(id)
            .populate('role', 'name', 'Role')
            .exec((err, user) => {
                workflow.emit('response', {
                    error: err,
                    user: user
                });
            });
    });

    workflow.emit('validate-parameters');
}

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

var newUser = (parameters, result) => {
    var fullName = parameters.fullName,
        email = parameters.email,
        password = parameters.password || 'alomobile',
        phone = parameters.phone,
        sex = parameters.sex,
        role = parameters.role;

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!parameters) {
            workflow.emit('response', {
                error: "Please provide informations of user"
            });
            return
        }

        if (!fullName) {
            workflow.emit('response', {
                error: "Fullname of User is required!"
            });
            return
        } else {
            fullName = JSON.parse(fullName);
            if (!fullName.firstName) {
                workflow.emit('response', {
                    error: "First name is required!"
                });
                return
            }

            if (!fullName.lastName) {
                workflow.emit('response', {
                    error: "Last name is required!"
                });
                return
            }
        }

        if (!role) {
            workflow.emit('response', {
                error: "Role of user is required!"
            });
            return
        }

        if (!phone) {
            workflow.emit('response', {
                error: "Phone of user is required!"
            });
            return
        }

        if (!sex) {
            workflow.emit('response', {
                error: "Sex of user is required!"
            });
            return
        }

        if (!email) {
            workflow.emit('response', {
                error: "Email is required!"
            });
            return
        }

        workflow.emit('new-user');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('new-user', () => {
        var newUser = new User({
            fullName: fullName,
            email: email,
            password: password,
            role: role,
            sex: sex,
            phone: phone
        });

        newUser.save((err) => {
            workflow.emit('response', {
                error: err,
                user: newUser
            });
        });
    });

    workflow.emit('validate-parameters');
}

var editUser = (id, properties, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id is required!"
            });
            return
        }

        if (!properties) {
            workflow.emit('response', {
                error: "Properties of user to edit is required!"
            });
            return
        } else {
            properties = JSON.parse(properties);
        }

        workflow.emit('edit-user');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('edit-user', () => {

        User.findById(id, (err, user) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!user) {
                workflow.emit('response', {
                    error: "User not found"
                });
                return
            }

            if (!properties) {
                workflow.emit('response', {
                    user: user
                });
                return
            }

            if (properties.fullName) {
                if (!properties.fullName.firstName) {
                    workflow.emit('response', {
                        error: "First name is required!"
                    });
                    return
                }

                if (!properties.fullName.lastName) {
                    workflow.emit('response', {
                        error: "Last name is required!"
                    });
                    return
                }

                user.fullName = properties.fullName;
            }

            if (properties.email) {
                user.email = properties.email;
            }

            if (properties.password) {
                user.password = properties.password;
            }

            if (properties.phone) {
                user.phone = properties.phone;
            }

            if (properties.sex) {
                user.sex = properties.sex;
            }

            if (properties.role) {
                user.role = properties.role;
            }

            if (properties.status) {
                user.status = properties.status;
            } else {
                user.status = false;
            }

            if (properties.isRegisteredNewLetters) {
                user.isRegisteredNewLetters = properties.isRegisteredNewLetters;
            }
            user.save((err) => {
                workflow.emit('response', {
                    error: err
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var pushValidToken = (token, user, cb) => {
    userApi.pushValidToken(token, user, (r) => {
        return cb(r);
    });
}

var pushInvalidToken = (token, cb) => {
    userApi.pushInvalidToken(token, (r) => {
        return cb(r);
    });
}

var signOut = (token, cb) => {
    userApi.signOut(token, (r) => {
        return cb(r);
    });
}

var findInvalidToken = (token, cb) => {
    userApi.findInvalidToken(token, (r) => {
        return cb(r);
    });
}

var removeValidToken = (token, id, cb) => {
    userApi.removeValidToken(token, id, (r) => {
        return cb(r);
    });
}

var verify = (token, cb) => {
    userApi.verify(token, (response) => {
        return cb(response);
    });
}

module.exports = {
}