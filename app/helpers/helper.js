'use strict';

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken-refresh');
const crypto = require('crypto');
const _ = require('lodash');

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

var signSHA = (string) => {
    return crypto.createHash('sha256').update(string, 'utf8').digest('hex');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

var getRamdomNumber = () => {
    var time = Math.round(Date.now() / 1000);
    var random = Math.floor(Math.random() * (99 - 1 + 1) + 10)
    return Number.parseInt(`${time}${random}`)
}

var getAllRouter = (stack, cb) => {
    var route, routes = [];
    stack.forEach((middleware) => {
        if (middleware.route) { // routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === 'router') { // router middleware 
            middleware.handle.stack.forEach((handler) => {
                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    var response = [];

    for (let i = 0; i < routes.length; i++) {
        const element = routes[i];
        var methods = "";
        for (var method in element.methods) {
            methods += method;
        }
        //just get all router of admin
        if (element.path.startsWith('/admin') || element.path.startsWith('/api')) {
            response.push({
                method: methods,
                path: element.path
            });
        }

        if (i == routes.length - 1) {
            if (response && response.length > 0) {
                var oriRouters = response;
                var newRouters = [];
                for (let i = 0; i < oriRouters.length; i++) {
                    const router = oriRouters[i];

                    //method

                    var method = router.method;
                    //path
                    var path = router.path;

                    var methods = []
                    methods.push(router.method);

                    //element
                    var temp = {
                        methods: methods,
                        path: path
                    }

                    if (newRouters.length == 0) {
                        newRouters.push(temp)
                    } else {
                        //find this path in newRouters
                        var index = _.findIndex(newRouters, (e) => {
                            return e.path == path;
                        });

                        if (index >= 0) {
                            newRouters[index].methods.push(router.method);
                        } else {
                            newRouters.push(temp)
                        }
                    }
                }

                return cb(newRouters);
            } else {
                return cb([]);
            }
        }
    }
}

var removeUnicode = (str) => {
    // str = str.replace("?", " ");
    // str = str.replace(/!/g, "");
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

module.exports = {
    hashPw: hashPw,
    comparePw: comparePw,
    dateToTimeStamp: dateToTimeStamp,
    copySync: copySync,
    encodeToken: encodeToken,
    decodeToken: decodeToken,
    refreshToken: refreshToken,
    signSHA: signSHA,
    numberWithCommas: numberWithCommas,
    getRamdomNumber: getRamdomNumber,
    removeUnicode: removeUnicode,
    getAllRouter: getAllRouter
}