'use strict';

var session = require('express-session');
var event = require('events');

var helper = require('../helpers/index').helper;
var User = require('../models/index').user;


var signIn = (req, res, user) => {
    var workflow = new event.EventEmitter();

    var email = user.email,
        password = user.password;

    workflow.on('validate-parameters', () => {
        if (!email) {
            workflow.emit('handler-error', ('Email không được bỏ trống'));
            return
        }

        if (!password) {
            workflow.emit('error-handler', ('Password không được bỏ trống'));
            return
        }

        workflow.emit('sign-in');
    });

    workflow.on('handler-error', (err) => {
        res.send({
            error: err
        });
    });

    workflow.on('sign-in', () => {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                workflow.emit('handler-error', err);
                return
            }

            if (!user) {
                workflow.emit('handler-error', 'Email không tồn tại')
                return
            }

            if (!user.password) {
                workflow.emit('handler-error', 'Lỗi không xác định, vui lòng thử lại!')
                return
            }

            if (helper.comparePw(password, user.password)) {
                req.session.currentUser = user;
                res.send({
                    success: true
                });
            } else {
                workflow.emit('handler-error', 'Email hoặc mật khẩu không đúng, vui lòng thử lại.');
            }
        });
    });

    workflow.emit('validate-parameters');
}/***/


var signUp = (req, res, user) => {

    var workflow = new event.EventEmitter();
    var email = user.email,
        password = user.password,
        fullName = user.fullName,
        birthDay = user.birthDay,
        sex = user.sex,
        isRegistered_NewLetters = user.isRegistered_NewLetters || false;

    workflow.on('validate-parameters', () => {
        if (!email) {
            workflow.emit('handler-error', 'Email không được bỏ trống');
            return
        }

        if (!password) {
            workflow.emit('handler-error', 'Password không được bỏ trống');
            return
        }

        if (!fullName) {
            workflow.emit('handler-error', 'Họ tên không được bỏ trống');
            return
        }

        if (!sex) {
            workflow.emit('handler-error', 'Giới tính không được bỏ trống');
            return
        }
        workflow.emit('sign-up');
    });

    workflow.on('handler-error', (err) => {
        res.send({
            result: err
        });
    });

    workflow.on('sign-up', () => {
        User.findOne({ email: email }, (err, user) => {

            if (err) {
                workflow.emit('handler-error', err);
                return
            }

            if (user) {
                workflow.emit('handler-error', 'Email này đã được sử dụng.')
                return
            } else {
                var hashPw = helper.hashPw(password);
                if (!hashPw) {
                    workflow.emit('handler-error', 'Có lỗi xảy ra trong quá trình đăng ký, vui lòng thử lại sau!');
                } else {

                    var newUser = new User();
                    newUser.fullName = fullName
                    newUser.email = email
                    newUser.password = hashPw

                    if (birthDay) {
                        newUser.birthDay = helper.dateToTimeStamp(birthDay)
                    }

                    newUser.sex = sex
                    newUser.isRegistered_NewLetters = isRegistered_NewLetters
                    newUser.created_at = Date.now() / 1000

                    console.log(newUser);

                    newUser.save((err) => {
                        if (err) {
                            workflow.emit('handler-error', err);
                        } else {
                            res.send({
                                result: 'Đăng kí tài khoản thành công, vui lòng nhấn vào <a href="/sign-in">đây</a> để đăng nhập.'
                            });
                        }
                    });
                }
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

var getOrders = (res) => {

}

var review = (res, review) => {

}

module.exports = {
    signIn: signIn,
    signUp: signUp,
    registerNewLetters: registerNewLetters
}