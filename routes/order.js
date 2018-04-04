var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;
var helper = require('../app/helpers/index').helper;
var middleware = require('../app/middleware/index').middleware
var mailbox = require('../app/controllers/index').mailbox;

router.post('/order/beginOrder', (req, res) => {

});

router.get('/order/check-out', (req, res) => {
    if (req.session.token) {
        User.verify(req.session.token, (cb) => {
            var user = cb.user;
            if (cb.error) {
                req.session.destroy();
            }

            res.render('check-out', {
                data: {
                    user: user,
                    token: req.session.token
                }
            });
        });
    } else {
        res.render('check-out', {
            data: {

            }
        })
    }
});

module.exports = router