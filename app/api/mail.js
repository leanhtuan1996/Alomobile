'use strict';

const event = require('events');
const mongoose = require('mongoose');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const config = require('config');

const helper = require('../helpers/index').helper;

var sendMail = (transporter, parameters, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!transporter) {
            workflow.emit('response', {
                error: "Transporter is required!"
            });
            return
        }

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

            if (!parameters.action) {
                workflow.emit('response', {
                    error: "Action of email is required!"
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

        let mailOptions = {
            from: 'support@alomobile.tech', // sender address
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
}

var resetPassword = ``
var registerNewsLetters = ``
var registerAccount = ``
var orderSuccessfully = ``


module.exports = {
    nodemailer: nodemailer,
    sendMail: sendMail
}