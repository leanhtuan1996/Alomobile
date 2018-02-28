'use strict';

var jwt = require('jsonwebtoken');
var config = require('config');
var User = require('../models/index').user;

var requireAuth = (req, res, next) => {
    var token = req.body.token || req.params.token || req.session.token;

    if (!token) {
        var err = new Error("Token is required!");
        err.status(401);
        return next(err);
    }

    jwt.decode(token, config.get("keyJWT"), (err, decoded) => {
        if (err) {
            return next(err);
        }

        if (!decoded) {
            var error = new Error("Invalid token");
            error.status(401);
            return next(error);
        }

        var id = decoded.id;
        if (!id) {
            var error = new Error("Invalid token");
            error.status(401);
            return next(error);
        }


        User.findById(id, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                var error = new Error("User not found");
                return next(error);
            }

            req.session.token = token;
            req.session.user = user;
            next();
        });
    });
}

var generateToken = (id) => {
    return jwt.sign(id, config.get("keyJWT"), {
        expiresIn: 15 * 24 * 60 * 60
    });
}

module.exports = {
    requireAuth: requireAuth,
    generateToken: generateToken
}