'use strict';

const event = require('events');
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('config');
const nodemailer = require('nodemailer');

const helper = require('../helpers/index').helper;

var transporter = nodemailer.createTransport({
    host: 'us2.smtp.mailhostbox.com',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.get("mailbox.user"), // generated ethereal user
        pass: config.get("mailbox.password") // generated ethereal password
    }
});

var sendMail = (parameters, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {      
        if (!parameters) {
            workflow.emit('response', {
                error: "Parameters is required!"
            });
            return
        } else {
            if (!parameters.to) {
                workflow.emit('response', {
                    error: "Email receiver is required!"
                });
                return
            }

            if (!parameters.subject) {
                workflow.emit('response', {
                    error: "Subject of email is required!"
                });
                return
            }

            if (!parameters.html) {
                workflow.emit('response', {
                    error: "Content of email is required!"
                });
                return
            }
        }

        workflow.emit('send-email');
    });

    workflow.on('response', (response) => {
        console.log(response);
        return cb(response);
    });

    workflow.on('send-email', () => {
        let mailOptions = {
            from: '"Alomobile" <admin@alomobile.tech>', // sender address
            to: `${parameters.to}`, // list of receivers
            subject: `${parameters.subject}`, // Subject line
            html: `${parameters.html}` // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            workflow.emit('response', {
                error: error,
                info: info
            });
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    sendMail: sendMail
}