'use strict';

const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

var mailApi = require('../api/index').mail;

var sendMailWithSignUp = (parameters, cb) => {

    var file = path.join(__dirname, '..', 'views', 'emailTemplates', 'registerAccount.html');
    fs.readFile(file, 'utf-8', (err, html) => {

        var $ = cheerio.load(html);   

        var fullName = `${parameters.fullName.firstName || ""} ${parameters.fullName.lastName || ""}`

        $('#welcomeFullName').html(`Chào ${fullName}`)    
        $('#email').html(parameters.to);
        
        var newParameters = {
            to: parameters.to,
            subject: parameters.subject,
            html: $.html()
        }

        mailApi.sendMail(newParameters, (result) => {
            return cb(result);
        });
    });
}

var sendMailWithForgetPassword = (user, token, cb) => {
    var file = path.join(__dirname, '..', 'views', 'emailTemplates', 'resetPassword.html');
    fs.readFile(file, 'utf-8', (err, html) => {

        var $ = cheerio.load(html);   

        if (!user.fullName) {
            return cb({
                error: "Full name is required!"
            });
        }

        if (!user.email) {
            return cb({
                error: "Email is required!"
            });
        }

        if (!token) {
            return cb({
                error: "Token is required!"
            });
        }

        var fullName = `${user.fullName.firstName || ""} ${user.fullName.lastName || ""}`;
        var link = `http://alomobile.tech/password-recovery/${user.email}/${token}`

        $('#fullName').html(`Chào ${fullName}`)    
        $('#link').attr('href', link);
        
        var newParameters = {
            to: user.email,
            subject: 'Khôi phục mật khẩu tài khoản Alomobile.',
            html: $.html()
        }

        mailApi.sendMail(newParameters, (result) => {
            return cb(result);
        });
    });
}

module.exports = {
    sendMailWithSignUp: sendMailWithSignUp,
    sendMailWithForgetPassword: sendMailWithForgetPassword
}