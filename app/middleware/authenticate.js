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

    var err = new Error("User can not access to this page!");
    err.status = 403;
    err.href = "admin/403";
    err.message = "User can not access to this page!";

    if (!role) {
        return next(err);
    }

    var allows = role.allows;
    var name = role.name;

    var originalUrl = req.originalUrl,
        method = req.method;

    if (!(allows && name)) {
        return next(err);
    }

    if (!(originalUrl && method)) {
        return next(err);
    }

    if (allows.length == 0) {
        return next(err);
    }

    if (!isMatchingRouter(originalUrl.trim(), method.toLowerCase().trim(), allows)) {
        return next(err);
    }
    return next();
}

var isMatchingRouter = (userPath, userMethod, allows) => {

    if (!userPath) { return false }
    if (!userMethod ) { return false }
    if (!allows && allows.length == 0) { return false }

    for (let i = 0; i < allows.length; i++) {
        const allow = allows[i];        
        if (allow) {
            var path = allow.resources.trim();;
            var methods = allow.permissions;

            if (path && methods && methods.length > 0) {

                //split path with path
                var pathSplited = path.split('/');
                var userPathSplited = userPath.split('/');

                if (pathSplited.length == userPathSplited.length) {

                    var x = [];
                    for (let a = 0; a < pathSplited.length; a++) {
                        if (pathSplited[a].trim() == userPathSplited[a].trim()) {
                            x.push(pathSplited[a]);
                        }                        
                    }

                    //find index of paths that are match and remove this
                    var indexParameters = [];
                    var regex = /:[a-z]{1,}/gi;
                    for (let y = 0; y < pathSplited.length; y++) {
                        const element = pathSplited[y];
                        if(element.match(regex)) {
                            indexParameters.push(y);
                        }
                    }
                    indexParameters.forEach(e => {
                        pathSplited.splice(e, 1);
                        userPathSplited.splice(e, 1);
                    });      

                    var newParametersMatched = [];
                    for (let z = 0; z < pathSplited.length; z++) {
                        if (pathSplited[z].trim() == userPathSplited[z].trim()) {
                            newParametersMatched.push(pathSplited[z]);
                        }
                    }

                    if (newParametersMatched.length == pathSplited.length) {                        
                        if (_.includes(methods, userMethod.toLowerCase().trim()) == true) {
                            return true;
                        }
                    } 
                }
            }
        }
    }

    return false;
}

module.exports = {
    requireAuth: requireAuth,
    requireRole: requireRole
}