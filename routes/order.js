var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;
var Order = require('../app/controllers/index').order;

var helper = require('../app/helpers/index').helper;
var middleware = require('../app/middleware/index').middleware
var mailbox = require('../app/controllers/index').mailbox;

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

router.post('/thanh-toan', (req, res) => {

    if (req.session.order) {
        if (Order.compareCurrentOrder(req.session.order._id, req.session.order.products, req.body.parameters.products)) {
            res.json({
                order: req.session.order
            });
            return
        }
        delete req.session.order;
    }

    if (!req.body.parameters) {
        res.json({
            error: 'No parameters'
        });
        return
    }
    var parameters = {
        products: req.body.parameters.products
    };

    if (req.session.token) {
        User.verify(req.session.token, (cb) => {
            if (cb.error || !cb.user) {
                req.session.destroy();
            } else {
                parameters.byUser = cb.user
            }

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
        if (result.order) {
            req.session.order = result.order;

            if (result.order.status == 1) {
                res.io.emit('new-order', [result.order])
                delete req.session.order;
            }
        }
        res.json(result)
    });
});

router.post('/request-payment', (req, res) => {

    if (!req.session.order || !req.session.token) {
        res.json({
            error: "Đơn hàng không hợp lệ hoặc đã bị lỗi."
        });
        return
    }

    var id = req.session.order._id;
    if (!id) {
        res.json({
            error: "Đơn hàng không hợp lệ hoặc đã bị lỗi."
        });
    }

    if (!req.body.method) {
        workflow.emit('response', {
            error: "Không tìm thấy phương thức thanh toán vui lòng chọn loại phương thức khác!"
        });
        return
    }

    Order.requestPayment(id, req.body.method, (result) => {
        res.json(result);
    });
});

router.post('/confirm-checkout', (req, res) => {
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
        res.render('check-order', {
            data: {
                token: req.session.token,
                user: req.session.user
            }
        })
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
                    res.render('check-order', {
                        token: req.session.token,
                        user: req.session.user,
                        error: result.error,
                        order: result.order
                    });
                });
            }
        });
    }
});

router.post('/tra-cuu-don-hang', (req, res) => {
    var id = req.body.id,
        email = req.body.email;
    if (!id) {
        res.json({
            error: "Mã đơn hàng bị thiếu"
        });
        return
    }

    if (!email) {
        res.json({
            error: "Email bị thiếu"
        });
        return
    }

    res.redis.getItem('order', `get-order?id=${id}&email=${email}`, (data) => {
        if (data) {
            res.json({
                order: data,
                token: req.session.token,
                user: req.session.user,
            });
        } else {
            Order.checkOrder(id, email, (result) => {
                if (result.order) {
                    res.redis.setItem('order', `get-order?id=${id}&email=${email}`, result.order);
                }
                res.json({
                    token: req.session.token,
                    user: req.session.user,
                    error: result.error,
                    order: result.order
                });
            });
        }
    })
});

module.exports = router