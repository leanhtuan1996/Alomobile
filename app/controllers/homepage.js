'use strict';

var session = require('express-session');
var event = require('events');

var helper = require('../helpers/index').helper;
var User = require('../models/index').user;
var Product = require('../models/index').product;

var index = (req, res) => {
    var workflow = new event.EventEmitter();

   // var currentUser = req.session.currentUser;

    workflow.on('validate-parameters', () => {
        //validate session
        //console.log(currentUser);

        workflow.emit('index')
    });

    workflow.on('handler-error', (err) => {

    });

    workflow.on('index', () => {

        // var products = parameters.products,
        //     user = parameters.user,
        //     categories = parameters.categories;

        // res.render('/sign-in', {
        //     products: products,
        //     user: user,
        //     categories: categories
        // })

        res.render('index', {
            data: {
                currentUser: req.session.currentUser
            }
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    index: index
}