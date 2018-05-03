var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;
var helper = require('../app/helpers/index').helper;
var auth = require('../app/middleware/index').authenticate
var mailbox = require('../app/controllers/index').mailbox;

/* GET users listing. */
/* USER SIGN_IN */
router.get('/sign-in', (req, res) => {
  if (req.session.token && req.session.user) {
    res.redirect('/')
    return
  }
  res.render('sign-in', {
    data: {
      token: req.session.token,
      user: req.session.user
    }
  });
});

router.post('/sign-in', (req, res) => {
  User.signIn(req.body, (result) => {
    if (result.error) {
      res.json({
        error: result.error
      });
      return
    }

    var user = result.user;

    if (!user) { res.json({ error: "User not found!" }); return; }

    var id = user._id

    var token = helper.encodeToken(id);

    //set token in session
    req.session.token = token;
    req.session.user = user;

    //push new token to user
    User.pushValidToken(token, id, (cb) => {
      res.json({
        error: cb.error,
        user: {
          id: id,
          email: user.name,
          fullName: user.fullName,
          phone: user.phone,
          sex: user.sex,
          orders: user.orders
        }
      });
    });
  });
}); /***/

/* USER SIGN_UP */
router.get('/sign-up', (req, res) => {
  if (req.session.token && req.session.user) {
    res.redirect('/');
    return
  }
  res.render('sign-up', {
    data: {}
  });
});

router.post('/sign-up', (req, res) => {
  User.signUp(req.body, (result) => {
    var user = result.user;
    if (user) {
      //set token in session
      req.session.token = helper.encodeToken(user._id);
      req.session.user = user;

      //send email to user     
      var parameters = {
        to: user.email,
        subject: "Chúc mừng bạn đã đăng kí tài khoản thành công trên Alomobile",
        fullName: user.fullName
      }

      mailbox.sendMailWithSignUp(parameters, (cb) => { });

      //push new token to user
      User.pushValidToken(req.session.token, user._id, (cb) => {
        res.json({
          error: cb.error,
          user: {
            id: user._id,
            email: user.name,
            fullName: user.fullName,
            phone: user.phone,
            sex: user.sex,
            orders: user.orders
          }
        });
      });
    } else {
      res.json(result);
    }
  });
}); /***/

router.get('/sign-out', (req, res) => {
  User.signOut(req.session.token, (r) => {
    if (!r.error) {
      req.session.destroy();
    }
    res.json(r);
  });
})

router.put('/sign-out', (req, res) => {
  User.signOut(req.session.token, (r) => {
    if (!r.error) {
      req.session.destroy();
    }
    res.redirect(req.headers.referer);
  });
})

router.get('/tai-khoan-cua-toi', (req, res) => {
  if (req.session.token && req.session.user) {
    User.verify(req.session.token, (cb) => {

      var user = cb.user;
      if (cb.error) {
        req.session.destroy();
      }

      if (!user) {
        res.redirect('/sign-in');
        return
      }

      req.session.token = req.session.token;
      req.session.user = user;

      res.render('my-account', {
        data: {
          token: req.session.token,
          user: user
        }
      });
    });
  } else {
    res.redirect('/sign-in');
  }
});

router.get('/password-recovery', (req, res) => {
  if (req.session.token && req.session.user) {
    res.redirect('/');
    return
  }
  res.render('password-recovery', { data: {} });
});

router.post('/password-recovery', (req, res) => {
  User.requireForgetPassword(req.body.email, (result) => {
    if (result.token && result.user) {
      mailbox.sendMailWithForgetPassword(result.user, result.token, (cb) => {
        res.json(cb);
      });
    } else {
      res.json(result);
    }
  });
});

router.put('/password-recovery', (req, res) => {
  User.recoveryPassword(req.body.email, req.body.token, req.body.password, (r) => {
    if (r.user) {
      User.signOutAllDevices(r.user._id, (c) => {
        res.json(c);
      });
    } else {
      res.json(r);
    }
  });
});

router.get('/password-recovery/:email/:token', (req, res) => {
  User.canRecoveryPassword(req.params.email, req.params.token, (cb) => {
    if (cb.error) {
      res.render('404', {
        data: {
          email: req.params.email,
          token: req.params.token,
          user: req.session.user
        }
      });
    } else {
      res.render('new-password-recovery', {
        data: {
          email: req.params.email,
          token: req.params.token,
          user: req.session.user
        }
      });
    }
  });
});

router.get('/gio-hang', (req, res) => {
  if (req.session.token && req.session.user) {
    User.verify(req.session.token, (cb) => {
      if (cb.error) {
        req.session.destroy();
      }
      var user = cb.user;

      if (!user) {
        res.render('cart', { data: {} });
        return
      }

      res.render('cart', {
        data: {
          token: req.session.token,
          user: {
            id: user._id,
            email: user.name,
            fullName: user.fullName,
            phone: user.phone,
            sex: user.sex,
            orders: user.orders
          }
        }
      });

    });
  } else {
    res.render('cart', { data: {} });
  }
});

router.get('/tai-khoan-cua-toi/thong-tin', (req, res) => {
  if (req.session.token && req.session.user) {
    User.verify(req.session.token, (cb) => {
      if (cb.error) {
        req.session.destroy();
        res.redirect('/sign-in');
        return
      }
      var user = cb.user;
      req.session.user = user;

      if (!user) {
        res.redirect('/sign-in');
        return
      }

      res.render('my-informations', {
        data: {
          token: req.session.token,
          user: req.session.user
        }
      });
    });
  } else {
    res.redirect('/sign-in');
  }
});

router.get('/tai-khoan-cua-toi/dia-chi', (req, res) => {
  if (req.session.token && req.session.user) {
    User.verify(req.session.token, (cb) => {
      if (cb.error) {
        req.session.destroy();
        res.redirect('/sign-in');
        return
      }
      var user = cb.user;
      req.session.user = user;

      if (!user) {
        res.redirect('/sign-in');
        return
      }

      res.render('my-addresses', {
        data: {
          token: req.session.token,
          user: req.session.user
        }
      });
    });
  } else {
    res.redirect('/sign-in');
  }
});

router.get('/tai-khoan-cua-toi/lich-su-mua-hang', (req, res) => {
  if (req.session.token && req.session.user) {
    User.verify(req.session.token, (cb) => {
      if (cb.error) {
        req.session.destroy();
        res.redirect('/sign-in');
        return
      }
      var user = cb.user;
      req.session.user = user;

      if (!user) {
        res.redirect('/sign-in');
        return
      }

      User.getMyOrders(user._id, (result) => {
        res.render('my-orders', {
          data: {
            token: req.session.token,
            orders: result.orders,
            user: user
          }
        });
      });
    });
  } else {
    res.redirect('/sign-in');
  }
});

router.get('/tai-khoan-cua-toi/nhan-xet', (req, res) => {
  if (req.session.token && req.session.user) {
    User.verify(req.session.token, (cb) => {
      if (cb.error) {
        req.session.destroy();
        res.redirect('/sign-in');
        return
      }
      var user = cb.user;
      req.session.user = user;

      if (!user) {
        res.redirect('/sign-in');
        return
      }

      User.getMyReviews(user._id, (result) => {
        res.render('my-comment', {
          data: {
            user: user,
            token: req.session.token,
            reviews: result.reviews
          }
        });
      })
    });
  } else {
    res.redirect('/sign-in');
  }
});

router.put('/update-informations', [auth.requireAuth], (req, res) => {
  User.editUser(req.user._id, req.body.user, (result) => {
    res.json(result);
  });
});



module.exports = router;
