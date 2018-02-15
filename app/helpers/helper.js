'use strict';

var bcrypt = require('bcryptjs');
var config = require('config');

var hashPw = (pw) => {
    var saltRounds = config.get("salt");
	var salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(pw, salt);
}

var comparePw = (pw, hash) => {
    return bcrypt.compareSync(pw, hash);
}

var getSession = (req, alias) => {
    return req.session.alias
}

var setSession = (res, alias, data) => {
    res.session.alias = data
}

var destroySession = (req, alias) => {
    req.session.destroy();
}

var getDomain = () => {

}

var redirect = (res, to) => {
    res.redirect(to);
}

/**
 * supporting for ISO formation: YYYY-MM-DD
 * @param {*} date 
 */
var dateToTimeStamp = (date) => {
    //format: YYYY-MM-DD
    var date = new Date(date);
    return date.getTime() / 1000
}

module.exports = {
    getSession: getSession,
    setSession: setSession,
    getDomain: getDomain,
    redirect: redirect,
    hashPw: hashPw,
    comparePw: comparePw,
    dateToTimeStamp: dateToTimeStamp
}