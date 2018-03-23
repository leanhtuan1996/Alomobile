'use strict';

var userApi = require('../api/index').user;

var signIn = (user, result) => {
    userApi.signIn(user, (response) => {
        return result(response);
    });
}/***/

var signUp = (user, result) => {
    userApi.signUp(user, (response) => {
        return result(response);
    });
}/***/

var verify = (token, cb) => {
    userApi.verify(token, (response) => {
        return cb(response);
    });
}

var pushValidToken = (token, id, cb) => {
    userApi.pushValidToken(token, id, (r) => {
        return cb(r);
    });
}

var pushInvalidToken = (token, user, cb) => {
    userApi.pushInvalidToken(token, (r) => {
        return cb(r);
    });
}

var signOut = (token, cb) => {
    userApi.signOut(token, (r) => {
        return cb(r);
    });
}

module.exports = {
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    verify: verify,
    pushValidToken: pushValidToken,
    pushInvalidToken: pushInvalidToken
}