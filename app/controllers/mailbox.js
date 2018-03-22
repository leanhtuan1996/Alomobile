'use strict';

const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

var mailApi = require('../api/index').mail;

var sendMailWithSignUp = (parameters, cb) => {

    fs.readFile(path.join(__dirname, '..', 'views', 'emailTemplates', 'registerAccount.html'), 'utf-8', (err, html) => {

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