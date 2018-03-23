'use strict';

var event = require('events');

var helper = require('../helpers/index').helper;
var User = require('../models/index').user;
var InvalidToken = require('../models/index').invalidToken;

var _ = require('lodash');

var authenticate = require('../middleware/index').authenticate;

var signIn = (user, result) => {
    var workflow = new event.EventEmitter();

    var email = user.email,
        password = user.password;

    workflow.on('validate-parameters', () => {
        if (!email) {
            workflow.emit('response', { error: 'Email không được bỏ trống' });
            return
        }

        if (!password) {
            workflow.emit('response', { error: 'Password không được bỏ trống' });
            return
        }

        workflow.emit('sign-in');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('sign-in', () => {

        User.findOne({ email: email })
            .populate('role')
            .exec((err, user) => {
                if (err) {
                    workflow.emit('response', {
                        error: err
                    });
                    return
                }

                if (!user) {
                    workflow.emit('response', {
                        error: 'Tài khoản không tồn tại.',
                        errorType: 'incorrect'
                    });
                    return
                }

                if (!user.email) {
                    workflow.emit('response', {
                        error: 'Email không tồn tại',
                        errorType: 'incorrect'
                    });
                    return
                }

                if (!user.password) {
                    workflow.emit('response', {
                        error: 'Lỗi không xác định, vui lòng thử lại!',
                        errorType: 'incorrect'
                    });
                    return
                }

                if (helper.comparePw(password, user.password)) {

                    if (user.status != true) {
                        workflow.emit('response', {
                            error: 'Your account is currently temporarily locked!'
                        });
                        return
                    }

                    workflow.emit('response', {
                        user: user
                    });

                } else {
                    workflow.emit('response', ({
                        error: 'Email hoặc mật khẩu không đúng, vui lòng kiểm tra lại.',
                        errorType: 'incorrect'
                    }));
                }
            });
    });

    workflow.emit('validate-parameters');
}/***/

var signUp = (user, result) => {

    var workflow = new event.EventEmitter();
    var email = user.email,
        password = user.password,
        fullName = user.fullName,
        birthDay = user.birthDay,
        sex = user.sex,
        isRegistered_NewLetters = user.isRegistered_NewLetters || false;

    workflow.on('validate-parameters', () => {
        if (!email) {
            workflow.emit('response', { error: 'Email không được bỏ trống' });
            return
        }

        if (!password) {
            workflow.emit('response', { error: 'Password không được bỏ trống' });
            return
        }

        if (!fullName) {
            workflow.emit('response', { error: 'Họ tên không được bỏ trống' });
            return
        }

        if (!sex) {
            workflow.emit('response', { error: 'Giới tính không được bỏ trống' });
            return
        }
        workflow.emit('sign-up');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('sign-up', () => {
        User.findOne({ email: email }, (err, user) => {

            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (user) {
                workflow.emit('response', { error: 'Email này đã được sử dụng.' })
            } else {

                var newUser = new User();
                newUser.fullName = fullName
                newUser.email = email
                newUser.password = password

                if (birthDay) {
                    newUser.birthDay = helper.dateToTimeStamp(birthDay)
                }

                newUser.sex = sex
                newUser.isRegistered_NewLetters = isRegistered_NewLetters
                newUser.save((err) => {
                    if (err) {
                        workflow.emit('response', { error: err });
                    } else {
                        workflow.emit('response', {
                            user: newUser
                        });
                    }
                });
            }
        });
    });

    workflow.emit('validate-parameters');
}/***/

var registerNewLetters = (res, email) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {

    });

    workflow.on('handler-error', (err) => {

    });

    workflow.on('register-new-letters', () => {

    });

    workflow.emit('validate-paremeters');
}

var getInformations = (req, res) => {
    var workflow = new event.EventEmitter();
    var currentUser = helper.getSession(req, 'currentUser');

    workflow.on('validate-parameters', () => {
        if (!currentUser) {
            helper.destroySession(req, 'currentUser');
            workflow.emit('handler-error', 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
            return
        }

        var idUser = currentUser._id;

        if (!idUser) {
            helper.destroySession(req, 'currentUser');
            workflow.emit('handler-error', 'Chứng thực tài khoản thất bại, vui lòng đăng nhập lại.');
            return
        }

        workflow.emit('get-informations', idUser);
    });

    workflow.on('handler-error', (err) => {
        res.render('my-informations', {
            error: err
        });
    });

    workflow.on('get-informations', (idUser) => {
        User.findById(idUser, (error, user) => {
            if (error) {
                workflow.emit('handler-error', error);
                return
            }

            res.render('my-informations', {
                user: user
            });
        });
    });

    workflow.emit('validate-paremeters');
}

var getUsers = (result) => {

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-users');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-users', () => {
        User.find({}, (err, users) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!users) {
                workflow.emit('response', {
                    error: "Data is empty"
                });
                return
            }

            workflow.emit('response', {
                users: users
            });
        })
    });

    workflow.emit('validate-parameters');
};

var verify = (token, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!token) {
            workflow.emit('response', {
                error: "Token is required!"
            });
            return
        }

        workflow.emit('verify');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('verify', () => {
        helper.decodeToken(token, (result) => {
            var id = result.id;
            if (!id) {
                workflow.emit('response', {
                    error: 'Invalid token - 1'
                });
                return
            }

            User.findById(id, (error, user) => {
                if (error) {
                    workflow.emit('response', {
                        error: error
                    });
                    return
                }

                if (!user) {
                    workflow.emit('response', {
                        error: "User not found"
                    });
                    return
                }

                //the first, check token that it exist in invalidToken?
                findInvalidToken(token, (isExist) => {
                    if (isExist) {
                        //remove this
                        removeValidToken(token, id, (cb) => { });

                        workflow.emit('response', {
                            error: "Invalid token!"
                        });
                        return
                    }

                    //the second, check it in validTokens
                    var validTokens = user.validTokens || [];

                    if (validTokens.length > 0) {

                        var idx = validTokens.findIndex(t => {
                            return t == token.trim();
                        });

                        if (!idx && idx < 0) {
                            workflow.emit('response', {
                                error: "Invalid token - 2"
                            });
                        } else {
                            //extend expire token
                            helper.refreshToken(token, (cb) => {
                                if (cb.newToken) {

                                    //replace this with new tokenq
                                    user.validTokens[idx] = cb.newToken;

                                    user.save((err) => {
                                        if (err) {
                                            workflow.emit('response', {
                                                user: user
                                            });
                                        } else {
                                            workflow.emit('response', {
                                                user: user,
                                                newToken: cb.newToken
                                            });
                                        }
                                    });
                                } else {
                                    workflow.emit('response', {
                                        user: user
                                    });
                                }
                            });
                        }
                    } else {
                        workflow.emit('response', {
                            error: "Invalid token - 3"
                        });
                    }
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getCountUsers = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-count');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-count', () => {
        User.count({}, (err, count) => {
            workflow.emit('response', {
                error: err,
                count: count
            });
        });
    });

    workflow.emit('validate-parameters');
}

var pushValidToken = (token, id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!token) {
            workflow.emit('response', {
                error: "Token not found"
            });
            return
        }

        if (!id) {
            workflow.emit('response', {
                error: "User not found"
            });
            return
        }

        workflow.emit('push');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('push', () => {

        User.findById(id, (err, user) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!user) {
                workflow.emit('response', {
                    error: "User not found"
                });
                return
            }

            var validTokens = user.validTokens || [];
            validTokens.push(token);
    
            user.validTokens = validTokens;
            user.save((err) => {
                workflow.emit('response', {
                    error: err,
                    user: user
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var pushInvalidToken = (token, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!token) {
            workflow.emit('response', {});
            return
        }

        workflow.emit('push');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('push', () => {

        var invalidToken = new InvalidToken();
        invalidToken.token = token;

        invalidToken.save((err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var removeValidToken = (token, id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!token) {
            workflow.emit('response', {
                error: "Token not found"
            });
            return
        }

        if (!id) {
            workflow.emit('response', {
                error: "User not found"
            });
            return
        }

        workflow.emit('remove');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('remove', () => {

        User.findById(id, (err, user) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!user) {
                workflow.emit('response', {
                    error: "User not found"
                });
                return
            }

            var validTokens = user.validTokens || [];
            validTokens = _.remove(validTokens, token);
            user.validTokens = validTokens || [];
            user.save((err) => {
                workflow.emit('response', {
                    error: err,
                    user: user
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var findInvalidToken = (token, cb) => {
    if (!token) { return cb({ error: "Token is required!" }); }
    InvalidToken.findOne({ token: token }, (err, invalidToken) => {
        if (err) {
            return cb(false)
        }

        if (!invalidToken) {
            return cb(false)
        }
        return cb(true)
    });
}

var signOut = (token, cb) => {
    pushInvalidToken(token, (result) => {
        return cb(result);
    });
}

module.exports = {
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    registerNewLetters: registerNewLetters,
    verify: verify,
    getUsers: getUsers,
    getCountUsers: getCountUsers,
    pushValidToken: pushValidToken,
    pushInvalidToken: pushInvalidToken,
    findInvalidToken: findInvalidToken,
    removeValidToken: removeValidToken
}