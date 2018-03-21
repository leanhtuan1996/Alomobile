'use strict';

const fs = require('fs');
const cheerio = require('cheerio');

var mailApi = require('../api/index').mail;

var sendMailWithSignUp = (parameters, cb) => {

    fs.readFile('/Users/tuan/Documents/GitHub/Alomobile/app/views/emailTemplates/registerAccount.html', 'utf-8', (err, html) => {

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

module.exports = {
    sendMailWithSignUp
}