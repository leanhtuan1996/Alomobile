var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;

/* GET users listing. */
/* USER SIGN_IN */
router.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res) => {
  User.signIn(req, res, req.body);
}); /***/

/* USER SIGN_UP */
router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res) => {
  User.signUp(req, res, req.body);
}); /***/

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
