var express = require('express');
var router = express.Router();

var Homepage = require('../app/controllers/index').homepage;
var User = require('../app/controllers/index').user;

var auth = require('../app/middleware/index').authenticate;

/* GET home page. */
router.get('/', (req, res) => {

  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      if (cb.error) {
        req.session.destroy();
      }

      Homepage.index(req, res, (result) => {
        res.render('index', {
          data: {
            error: result.error,
            user: cb.user,
            categories: result.categories,
            hotProducts: result.hotProducts,
            newProducts: result.newProducts,
            specialProducts: result.specialProducts
          }
        });
      });
    });
  } else {
    Homepage.index(req, res, (result) => {
      res.render('index', {
        data: {
          error: result.error,
          categories: result.categories,
          hotProducts: result.hotProducts,
          newProducts: result.newProducts,
          specialProducts: result.specialProducts
        }
      });
    });
  }
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
