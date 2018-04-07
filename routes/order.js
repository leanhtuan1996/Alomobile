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
    if (!req.session.order) {
        res.redirect('/cart');
        return
    }

    if (req.session.order && !req.session.token) {
        Order.verify(req.session.order._id, (cb) => {

            if (cb.error) {
                req.session.destroy();
                res.redirect('/cart');
                return
            }

            if (!cb.order) {
                req.session.destroy();
                res.redirect('/cart');
                return
            }

            res.render('check-out', {
                data: {
                    order: cb.order
                }
            });
        })
    } else if (req.session.token && req.session.order) {
        User.verify(req.session.token, (result) => {
            Order.verify(req.session.order._id, (result1) => {
                if (result1.error || !result1.order) {
                    if (result.error || !result.user) {
                        res.redirect('/cart');
                    } else {
                        req.session.destroy();
                        res.redirect('/cart');
                    }
                } else {
                    req.session.order = result1.order;
                    if (result.error || !result.user) {
                        res.render('check-out', {
                            data: {
                                order: order
                            }
                        });
                    } else {
                        req.session.user = result.user;
                        res.render('check-out', {
                            data: {
                                order: result1.order,
                                user: result.user,
                                token: req.session.token
                            }
                        });
                    }
                }
            });
        });
    } else {
        req.session.destroy();
        res.redirect('/cart');
    }
});

router.post('/thanh-toan', (req, res) => {

    if (req.session.order) {
        res.json({
            order: req.session.order
        });
        return
    }

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
                if (response.order) {
                    req.session.order = response.order;
                }

                res.json(response);
            });
        });
    } else {
        Order.initOrder(parameters, (response) => {
            if (response.order) {
                req.session.order = response.order;
            }
            res.json(response);
        });
    }
});

router.put('/thanh-toan', (req, res) => {
    if (!req.session.order) {
        res.json({
            error: 'Your order not found'
        });
        return
    }

    Order.updateOrder(req.session.order, req.body, (result) => {
        console.log(result);
        res.json(result)
    });
})

module.exports = router