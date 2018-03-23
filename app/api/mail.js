'use strict';

const event = require('events');
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('config');
const sgMail = require('@sendgrid/mail');

const helper = require('../helpers/index').helper;

sgMail.setApiKey(config.get('mailbox.apiKey'));

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
        return cb(response);
    });

    workflow.on('send-email', () => {
        const mailData = {
            to: `${parameters.to}`,
            from: 'Alomobile <admin@alomobile.tech>',
            subject: `${parameters.subject}`,
            html: `${parameters.html}`
        };

        sgMail.send(mailData, (err, result) => {
            workflow.emit('response', {
                error: err,
                result: result
            });
        });

    });

    workflow.emit('validate-parameters');
}

module.exports = {
    sendMail: sendMail
}