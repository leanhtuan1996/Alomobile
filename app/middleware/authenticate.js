'use strict';

var jwt = require('jsonwebtoken');
var config = require('config');
var User = require('../models/index').user;
var helper = require('../helpers/index').helper;
var _ = require('lodash');

var requireAuth = (req, res, next) => {
    var token = req.body.token || req.params.token || req.session.token;

    if (!token) {
        var err = new Error("Token is required!");
        err.status = 401
        return next(err);
    }

    helper.decodeToken(token, (cb) => {
        if (cb.error) {
            return next(cb.error);
        }

        var id = cb.id;

        if (!id) {
            var error = new Error("Invalid token");
            error.status = 401
            return next(error);
        }

        User.findById(id).populate('role').exec((err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                var error = new Error("User not found");
                return next(error);
            }

            req.role = user.role

            req.user = user

            next();
        });
    });
}

var requireRole = (req, res, next) => {
    //get current role of user
    var role = req.role,
        allows = role.allows,
        name = role.name;

    var originalUrl = req.originalUrl,
        method = req.method;


    if (!role) {
        var error = new Error("Role of user not found!");
        error.status = 401;
        return next(error);
    }

    if (!(allows && name)) {
        var error = new Error("User can not access to this page!");
        error.status = 401;
        return next(error);
    }

    if (!(originalUrl && method)) {
        var error = new Error("User can not access to this page!");
        error.status = 401;
        return next(error);
    }

    if (allows.length == 0) {
        var error = new Error("User can not access to this page!");
        error.status = 401;
        return next(error);
    }

    _.forEach(allows, (allow) => {
        if (allow) {
            var permissions = allow.permissions,
                resources = allow.resources;

            if (!(permissions && resources)) {
                var error = new Error("User can not access to this page!");
                error.status = 401;
                return next(error);
            }

            if (permissions.length == 0) {
                var error = new Error("User can not access to this page!");
                error.status = 401;
                return next(error);
            }

            //full permissions
            if (permissions == '*' && resources == '*') {
                return next();
            }

            _.forEach(permissions, (permission) => {
                if (permission) {
                    //console.log(permission.toLowerCase() + " | " + method.toLowerCase());
                    //console.log(resources.toLowerCase() + " | " + originalUrl.toLowerCase());
                    if ((permission.toLowerCase() == method.toLowerCase()) && (resources.toLowerCase() == originalUrl.toLowerCase())) {
                        return next();
                    } else {
                        var error = new Error("User can not access to this page!");
                        error.status = 401;
                        return next(error);
                    }
                } else {
                    var error = new Error("User can not access to this page!");
                    error.status = 401;
                    return next(error);
                }
            });
        }
    });
}

module.exports = {
    requireAuth: requireAuth,
    requireRole: requireRole
}