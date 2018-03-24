'use strict';

var bcrypt = require('bcryptjs');
var config = require('config');
var jwt = require('jsonwebtoken-refresh');

var hashPw = (pw) => {
    var saltRounds = config.get("salt");
    var salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(pw, salt);
}

var comparePw = (pw, hash) => {
    return bcrypt.compareSync(pw, hash);
}

var encodeToken = (payload, expire = 3 * 24 * 60 * 60) => {
    //token will expire in 3 days
    return jwt.sign({
        id: String(payload)
    }, config.get("keyJWT"), { expiresIn: expire });
}

var decodeToken = (token, cb) => {
    jwt.verify(token, config.get("keyJWT"), (error, decoded) => {
        if (error) {
            return cb({
                error: error
            });
        }

        var id = decoded.id;

        if (!id) {
            return cb({
                error: "Invalid token!"
            });
        }

        return cb({
            id: id
        });
    });
}

var refreshToken = (token, cb) => {
    jwt.refresh(token, 3 * 24 * 60 * 60, config.get('keyJWT'), (err, newToken) => {
        return cb({ error: err, newToken: newToken })
    });
}

/**
 * supporting for ISO formation: YYYY-MM-DD
 * @param {*} date 
 */
var dateToTimeStamp = (date) => {
    //format: YYYY-MM-DD
    var newDate = new Date(date);
    return newDate.getTime() / 1000
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
    hashPw: hashPw,
    comparePw: comparePw,
    dateToTimeStamp: dateToTimeStamp,
    copySync: copySync,
    encodeToken: encodeToken,
    decodeToken: decodeToken,
    refreshToken: refreshToken
}