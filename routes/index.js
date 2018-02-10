var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {});
});

router.get('/delivery', (req, res) => {
  res.render('menu/delivery');
});

router.get('/about-us', (req, res) => {
  res.render('menu/about-us');
});

router.get('/legal-notice', (req, res) => {
  res.render('menu/legal-notice');
});

router.get('/terms-and-conditions-of-use', (req, res) => {
  res.render('menu/terms-and-conditions-of-use');
});

module.exports = router;
