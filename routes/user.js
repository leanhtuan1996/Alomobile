var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;
var helper = require('../app/helpers/index').helper;
var middleware = require('../app/middleware/index').middleware
var mailbox = require('../app/controllers/index').mailbox;

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
      var newUser = result.user;

      var token = helper.encodeToken(newUser._id);
      //set token in session
      req.session.token = token

      //send email to user     
      var parameters = {
        to: newUser.email,
        subject: "Chúc mừng bạn đã đăng kí tài khoản thành công trên Alomobile",
        fullName: newUser.fullName
      }

      mailbox.sendMailWithSignUp(parameters, (cb) => {});

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
  res.redirect(req.headers.referer);
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

  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      var data = {};

      if (cb.error) {
        req.session.destroy();
      }

      if (!cb.user) {
        res.render('password-recovery', {
          data: {

          }
        });
        return
      }
      res.render('password-recovery', {
        data: {
          user: cb.user
        }
      });

    });
  } else {
    res.render('password-recovery', {
      data: {

      }
    });
  }
});

router.get('/cart', (req, res) => {

  if (req.session.token) {
    User.verify(req.session.token, (cb) => {
      var data = {};

      if (cb.error) {
        req.session.destroy();
      }

      if (!cb.user) {
        res.render('cart', {
          data: {

          }
        });
        return
      }
      res.render('cart', {
        data: {
          user: cb.user
        }
      });

    });
  } else {
    res.render('cart', {
      data: {

      }
    });
  }
});

module.exports = router;
