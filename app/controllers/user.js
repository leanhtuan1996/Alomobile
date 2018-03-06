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

module.exports = {
    signIn: signIn,
    signUp: signUp,
    verify: verify
}