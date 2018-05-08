var express = require('express');
var router = express.Router();

var User = require('../app/api/index').user;
var Order = require('../app/api/index').order;

var helper = require('../app/helpers/index').helper;
var middleware = require('../app/middleware/index').middleware

var auth = require('../app/middleware/index').authenticate;

router.get('/thanh-toan', (req, res) => {
    if (!req.session.order) {
        res.redirect('/gio-hang');
        return
    }

    if (req.session.order && !req.session.token) {
        Order.verify(req.session.order._id, (cb) => {

            if (cb.error) {
                req.session.destroy();
                res.redirect('/gio-hang');
                return
            }

            if (!cb.order) {
                req.session.destroy();
                res.redirect('/gio-hang');
                return
            }

            if (cb.order.status == 1) {
                res.redirect('/dat-hang-thanh-cong');
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
                        res.redirect('/gio-hang');
                    } else {
                        req.session.destroy();
                        res.redirect('/gio-hang');
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
        res.redirect('/gio-hang');
    }
});

router.get('/dat-hang-thanh-cong', (req, res) => {
    res.render('order-successfully', {
        data: {
            email: req.query.email,
            id: req.query.id
        }
    });
});

router.get('/tra-cuu-don-hang', (req, res) => {

    if (!req.query.id || !req.query.email) {
        if (req.session.token && req.session.user) {
            User.verify(req.session.token, (cb) => {
                if (cb.error || !cb.user) {
                    req.session.destroy();
                    res.render('check-order', {
                        data: {
                        }
                    });
                } else {
                    //find newest status order
                    Order.getLastestOrder(cb.user._id, (result) => {
                        if (result.order) {
                            res.render('status-order', {
                                data: {
                                    token: req.session.token,
                                    user: req.session.user,
                                    order: result.order
                                }
                            });
                        } else {
                            res.render('check-order', {
                                data: {
                                    user: cb.user,
                                    token: req.session.token
                                }
                            });
                        }
                    })
                }
            });
        } else {
            res.render('check-order', {
                data: {
                    token: req.session.token,
                    user: req.session.user
                }
            })
        }
    } else {
        res.redis.getItem('order', `get-order?id=${req.query.id}&email=${req.query.email}`, (data) => {
            if (data) {
                res.render('status-order', {
                    data: {
                        token: req.session.token,
                        user: req.session.user,
                        order: data
                    }
                });
            } else {
                Order.checkOrder(req.query.id, req.query.email, (result) => {
                    if (result.order) {
                        res.redis.setItem('order', `get-order?id=${req.query.id}&email=${req.query.email}`, result.order);
                    }
                    res.render('status-order', {
                        data: {
                            token: req.session.token,
                            user: req.session.user,
                            error: result.error,
                            order: result.order
                        }
                    });
                });
            }
        });
    }
});

module.exports = router