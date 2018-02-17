var express = require('express');
var router = express.Router();

var Homepage = require('../app/controllers/index').homepage;

/* GET home page. */
router.get('/', (req, res) => {
  Homepage.index(req, res);
});

router.get('/delivery', (req, res) => {
  res.render('menu/delivery', {
    data: {
      currentUser: req.session.currentUser
    }
  });
});

router.get('/about-us', (req, res) => {
  res.render('menu/about-us', {
    data: {
      currentUser: req.session.currentUser
    }
  });
});

router.get('/legal-notice', (req, res) => {
  res.render('menu/legal-notice', {
    data: {
      currentUser: req.session.currentUser
    }
  });
});

router.get('/terms-and-conditions-of-use', (req, res) => {
  res.render('menu/terms-and-conditions-of-use', {
    data: {
      currentUser: req.session.currentUser
    }
  });
});

module.exports = router;
