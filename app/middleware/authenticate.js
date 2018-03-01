'use strict';

var jwt = require('jsonwebtoken');
var config = require('config');
var User = require('../models/index').user;
var helper = require('../helpers/index').helper;

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

            next();
        });
    });
}

var requireRole = (req, res, next) => {
    var role = req.role;

    console.log(req);

    next();
}

module.exports = {
    requireAuth: requireAuth,
    requireRole: requireRole
}