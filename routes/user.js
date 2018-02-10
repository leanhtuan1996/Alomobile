var express = require('express');
var router = express.Router();

/* GET users listing. */
/* USER */
router.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.get('/my-account', (req, res) => {
  res.render('my-account');
});

router.get('/password-recovery', (req, res) => {
  res.render('password-recovery');
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

module.exports = router;
