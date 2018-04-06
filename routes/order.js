var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;
var Order = require('../app/controllers/index').order;

var helper = require('../app/helpers/index').helper;
var middleware = require('../app/middleware/index').middleware
var mailbox = require('../app/controllers/index').mailbox;

router.post('/order/beginOrder', (req, res) => {

});

router.get('/thanh-toan', (req, res) => {
    if (req.session.token) {
        User.verify(req.session.token, (cb) => {
            var user;
            if (cb.error || !cb.user) {
                req.session.destroy();
                res.render('check-out', {
                    data: {
                    }
                });
            } else {
                req.session.user = cb.user;
                res.render('check-out', {
                    data: {
                        token: req.session.token,
                        user: cb.user
                    }
                });
            }       
        });
    } else {
        res.render('check-out', {
            data: {
            }
        });
    }
});

router.post('/check-out', (req, res) => {
    
    if (!req.body.parameters) {
        res.json({
            error: 'No parameters'
        });
        return
    }
    var parameters = {};
    parameters.products = req.body.parameters.products;
    if (req.session.token) {
        User.verify(req.session.token, (cb) => {
            var user;
            if (cb.error || !cb.user) {
                req.session.destroy();
            } else {
                user = cb.user
            }           

        

            parameters.byUser = user;

            Order.initOrder(parameters, (response) => {
                console.log(response);
                res.json(response);
            });
        });
    } else {
        Order.initOrder(parameters, (response) => {
            console.log(response);
            res.json(response);
        });
    }
});

module.exports = router