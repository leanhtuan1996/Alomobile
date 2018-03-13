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
        err.status = 401;
        err.href = "admin/sign-in"
        return next(err);
    }

    helper.decodeToken(token, (cb) => {
        if (cb.error) {
            return next(cb.error);
        }

        var id = cb.id;

        if (!id) {
            var err = new Error("Invalid token");
            err.status = 401
            err.href = "admin/sign-in"
            return next(err);
        }

        User.findById(id).populate('role').exec((err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                var err = new Error("User not found");
                err.status = 401
                err.href = "admin/sign-in"
                return next(err);
            }

            req.role = user.role

            req.user = user

            next();
        });
    });
}

var requireRole = (req, res, next) => {
    //get current role of user

    
    var role = req.role;

    if (!role) {
        var err = new Error("Role of user not found!");
        err.status = 403;
        err.href = "admin/403"

        return next(err);
    }

    var allows = role.allows;
    var name = role.name;

    var originalUrl = req.originalUrl,
        method = req.method;

    if (!(allows && name)) {
        var err = new Error("User can not access to this page!");
        err.status = 403;
        err.href = "admin/403"
        return next(err);
    }

    if (!(originalUrl && method)) {
        var err = new Error("User can not access to this page!");
        err.status = 403;
        err.href = "admin/403"
        return next(err);
    }

    if (allows.length == 0) {
        var err = new Error("User can not access to this page!");
        err.status = 403;
        err.href = "admin/403"
        return next(err);
    }

    _.forEach(allows, (allow) => {
        if (allow) {
            var permissions = allow.permissions,
                resources = allow.resources;

            if (!(permissions && resources)) {
                var err = new Error("User can not access to this page!");
                err.status = 403;
                err.href = "admin/403"
                return next(err);
            }

            if (permissions.length == 0) {
                var err = new Error("User can not access to this page!");
                err.status = 403;
                err.href = "admin/403"
                return next(err);
            }

            //full permissions
            if (permissions == '*' && resources == '*') {
                return next();
            }

            _.forEach(permissions, (permission) => {
                if (permission) {
                    if ((permission.toLowerCase() == method.toLowerCase()) && (resources.toLowerCase() == originalUrl.toLowerCase())) {
                        return next();
                    } else {
                        var err = new Error("User can not access to this page!");
                        err.status = 403;
                        err.href = "admin/403";

                        return next(err);
                    }
                } else {
                    var err = new Error("User can not access to this page!");
                    err.status = 403;
                    err.href = "admin/403";
                    return next(err);
                }
            });
        }
    });
}

module.exports = {
    requireAuth: requireAuth,
    requireRole: requireRole
}