var express = require('express');
var router = express.Router();

/* GET error listing. */
/* ERROR */
router.get('/403', (req, res) => {
    res.render('403', {
        data: {
            token: req.session.token,
            user: req.session.user
        }
    });
});

router.get('/404', (req, res) => {
    res.render('admin/404', {
        data: {
            token: req.session.token,
            user: req.session.user
        }
    });
});

router.get('/500', (req, res) => {
    res.render('500', {
        data: {
            token: req.session.token,
            user: req.session.user
        }
    });
});

router.get('/502', (req, res) => {
    res.render('502', {
        data: {
            token: req.session.token,
            user: req.session.user
        }
    });
});

router.get('/503', (req, res) => {
    res.render('503', {
        data: {
            token: req.session.token,
            user: req.session.user
        }
    });
});

router.get('/504', (req, res) => {
    res.render('504', {
        data: {
            token: req.session.token,
            user: req.session.user
        }
    });
});

router.get('/rate-limit', (req, res) => {
    res.render('rate-limit', {
        data: {
            token: req.session.token,
            user: req.session.user
        }
    });
});

router.get('/temporary-maintenance', (req, res) => {
    res.render('temporary-maintenance', {
        data: {
            token: req.session.token,
            user: req.session.user
        }
    });
});

module.exports = router;
