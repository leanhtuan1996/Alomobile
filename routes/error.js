var express = require('express');
var router = express.Router();

/* GET error listing. */
/* ERROR */
router.get('/403', (req, res) => {
    res.render('403');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/500', (req, res) => {
    res.render('500');
});

router.get('/502', (req, res) => {
    res.render('502');
});

router.get('/503', (req, res) => {
    res.render('503');
});

router.get('/504', (req, res) => {
    res.render('504');
});

router.get('/504', (req, res) => {
    res.render('504');
});

router.get('/rate-limit', (req, res) => {
    res.render('rate-limit');
});

router.get('/temporary-maintenance', (req, res) => {
    res.render('temporary-maintenance');
});

module.exports = router;
