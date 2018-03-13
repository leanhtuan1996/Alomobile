var express = require('express');
var router = express.Router();

/* GET error listing. */
/* ERROR */
router.get('/403', (req, res) => {
    res.render('403', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

router.get('/404', (req, res) => {
    res.render('admin/404', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

router.get('/500', (req, res) => {
    res.render('500', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

router.get('/502', (req, res) => {
    res.render('502', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

router.get('/503', (req, res) => {
    res.render('503', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

router.get('/504', (req, res) => {
    res.render('504', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

router.get('/504', (req, res) => {
    res.render('504', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

router.get('/rate-limit', (req, res) => {
    res.render('rate-limit', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

router.get('/temporary-maintenance', (req, res) => {
    res.render('temporary-maintenance', {
        data: {
            currentUser: req.session.currentUser
        }
    });
});

module.exports = router;
