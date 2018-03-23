'use strict';

var jwt = require('jsonwebtoken');
var config = require('config');
var User = require('../models/index').user;
var UserCtl = require('../controllers/admin/index').user;
var helper = require('../helpers/index').helper;
var _ = require('lodash');

var newError = (content, status, href) => {
    var e = new Error(content);
    e.status = status;
    e.href = href;
    return e;
}

var requireAuth = (req, res, next) => {
    var token = req.body.token || req.params.token || req.session.token;

    if (!token) {
        return next(newError('The login session has expired, please log in again.', 401, 'admin/sign-in'));
    }

    helper.decodeToken(token, (cb) => {
        if (cb.error) {
            UserCtl.pushInvalidToken(token, (result) => {
                return next(cb.error);
            });
        }

        var id = cb.id;

        if (!id) {
            UserCtl.pushInvalidToken(token, (cb) => {
                return next(newError('This token is not allows, please log in again.', 401, 'admin/sign-in'));
            });
        }

        UserCtl.findInvalidToken(token, (exist) => {
            if (exist) {
                UserCtl.removeValidToken(token, id, (r) => {
                    return next(newError('The login session has expired, please log in again.', 401, 'admin/sign-in'));
                });
            } else {
                User.findById(id).populate('role').exec((err, user) => {
                    if (err) {
                        UserCtl.pushInvalidToken(token, (cb) => {
                            return next(err);
                        });
                    }

                    if (!user) {
                        UserCtl.pushInvalidToken(token, (cb) => {
                            return next(newError('This token is not allows, please log in again.', 401, 'admin/sign-in'));
                        });
                    }

                    helper.refreshToken(token, (r) => {
                        if (r.newToken) { UserCtl.pushValidToken(r.newToken, id, (cb) => { }); } 

                        req.role = user.role;

                        req.user = user;

                        next();
                    });
                });
            }
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
    if (!userMethod) { return false }
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
                        if (element.match(regex)) {
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