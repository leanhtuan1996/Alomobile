var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;
var helper = require('../app/helpers/index').helper;
var middleware = require('../app/middleware/index').middleware

/* GET users listing. */
/* USER SIGN_IN */
router.get('/sign-in', (req, res) => {
  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      var data = {};

      if (cb.error) {
        req.session.destroy();
      }

      if (!cb.user) {
        res.render('sign-in', {
          data: {

          }
        });
        return
      }
      res.render('index', {
        data: {
          user: cb.user
        }
      });

    });
  } else {
    res.render('sign-in', {
      data: {

      }
    });
  }
});

router.post('/sign-in', (req, res) => {
  User.signIn(req.body, (result) => {
    if (result.error) {
      res.send({
        error: result.error
      });
    } else {

      var id = result.user._id

      var token = helper.encodeToken(id);
      //set token in session
      req.session.token = token

      res.send({
        user: result.user,
        token: token,
      });
    }
  });
}); /***/

/* USER SIGN_UP */
router.get('/sign-up', (req, res) => {
  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      if (cb.error) {
        req.session.destroy();
        res.render('sign-up', {
          data: {

          }
        });
      } else {
        if (!cb.user) {
          res.render('sign-up', {
            data: {

            }
          });
          return
        }
        res.render('index', {
          data: {
            user: cb.user
          }
        })
      }
    });
  } else {
    res.render('sign-up', {
      data: {

      }
    });
  }
});

router.post('/sign-up', (req, res) => {
  User.signUp(req.body, (result) => {
    if (result.user) {
      var id = result.user._id

      var token = helper.encodeToken(id);
      //set token in session
      req.session.token = token

      res.send({
        user: result.user,
        token: token,
      });
    } else {
      res.send(result);
    }
  });
}); /***/

router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.get('/my-account', (req, res) => {
  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      var data = {};

      if (cb.error) {
        req.session.destroy();
      }

      if (!cb.user) {
        res.render('sign-in', {
          data: {

          }
        });
        return
      }
      res.render('my-account', {
        data: {
          user: cb.user
        }
      });

    });
  } else {
    res.render('sign-in', {
      data: {

      }
    })
  }
});

router.get('/password-recovery', (req, res) => {
  res.render('password-recovery', {
    data: {
      currentUser: req.session.currentUser
    }
  });
});

router.get('/cart', (req, res) => {
  res.render('cart', {
    data: {
      currentUser: req.session.currentUser
    }
  });
});

module.exports = router;
