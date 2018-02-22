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
    var newDate = new Date(date);
    console.log(newDate);
    return newDate.getTime() / 1000
}

var validateISODateTime = (string) => {
    
}

var copySync = (src, dest) => {
    if (!fs.existsSync(src)) {
      return false;
    }
      fs.readFile(src, function (err, data) {
      if (err) throw err;
      fs.writeFile(dest, data, function (err) {
          if (err) throw err;
          return true;
      });
    });
}

module.exports = {
    getSession: getSession,
    setSession: setSession,
    getDomain: getDomain,
    redirect: redirect,
    hashPw: hashPw,
    comparePw: comparePw,
    dateToTimeStamp: dateToTimeStamp,
    destroySession: destroySession,
    copySync: copySync
}