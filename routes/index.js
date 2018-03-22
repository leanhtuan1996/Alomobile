var express = require('express');
var router = express.Router();

var Homepage = require('../app/controllers/index').homepage;
var User = require('../app/controllers/index').user;

var auth = require('../app/middleware/index').authenticate;

/* GET home page. */
router.get('/', (req, res) => {
  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      Homepage.index(req, res, (result) => {
        if (cb.user) {
          res.render('index', {
            data: {
              error: result.error,
              user: cb.user,
              categories: result.categories,
              hotProducts: result.hotProducts,
              newProducts: result.newProducts,
              specialProducts: result.specialProducts,
              token: req.session.token
            }
          });
        } else {
          req.session.destroy();
          res.render('index', {
            data: {
              error: result.error,
              categories: result.categories,
              hotProducts: result.hotProducts,
              newProducts: result.newProducts,
              specialProducts: result.specialProducts
            }
          });
        }
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
  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      var data = {};

      if (cb.error) {
        req.session.destroy();
      }

      if (!cb.user) {
        res.render('menu/delivery', {
          data: {

          }
        });
        return
      }
      res.render('menu/delivery', {
        data: {
          user: cb.user
        }
      });

    });
  } else {
    res.render('menu/delivery', {
      data: {

      }
    });
  }
});

router.get('/about-us', (req, res) => {
  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      var data = {};

      if (cb.error) {
        req.session.destroy();
      }

      if (!cb.user) {
        res.render('menu/about-us', {
          data: {

          }
        });
        return
      }
      res.render('menu/about-us', {
        data: {
          user: cb.user
        }
      });

    });
  } else {
    res.render('menu/about-us', {
      data: {

      }
    });
  }
});

router.get('/legal-notice', (req, res) => {
  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      var data = {};

      if (cb.error) {
        req.session.destroy();
      }

      if (!cb.user) {
        res.render('menu/legal-notice', {
          data: {

          }
        });
        return
      }
      res.render('menu/legal-notice', {
        data: {
          user: cb.user
        }
      });

    });
  } else {
    res.render('menu/legal-notice', {
      data: {

      }
    });
  }

});

router.get('/terms-and-conditions-of-use', (req, res) => {
  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      var data = {};

      if (cb.error) {
        req.session.destroy();
      }

      if (!cb.user) {
        res.render('menu/terms-and-conditions-of-use', {
          data: {

          }
        });
        return
      }
      res.render('menu/terms-and-conditions-of-use', {
        data: {
          user: cb.user
        }
      });

    });
  } else {
    res.render('menu/terms-and-conditions-of-use', {
      data: {

      }
    });
  }
});

/////
router.get('/zalo-pro', (req, res) => {
    res.render('zaloPro');
});

module.exports = router;
