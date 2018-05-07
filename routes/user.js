var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;
var helper = require('../app/helpers/index').helper;
var auth = require('../app/middleware/index').authenticate
var mailbox = require('../app/controllers/index').mailbox;

/* GET users listing. */
/* USER SIGN_IN */
router.get('/dang-nhap', (req, res) => {
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

/* USER SIGN_UP */
router.get('/dang-ky', (req, res) => {
  if (req.session.token && req.session.user) {
    res.redirect('/');
    return
  }
  res.render('sign-up', {
    data: {}
  });
});

router.get('/tai-khoan-cua-toi', [auth.requireAuth], (req, res) => {
  res.render('my-account', {
    data: {
      token: req.session.token,
      user: req.session.user
    }
  });
});

router.get('/quen-mat-khau', (req, res) => {
  if (req.query.email && req.query.token) {
    User.canRecoveryPassword(req.query.email, req.query.token, (cb) => {
      if (cb.error) {
        res.render('404', {
          data: {
            email: req.query.email,
            token: req.query.token,
            user: req.session.user
          }
        });
      } else {
        res.render('new-password-recovery', {
          data: {
            email: req.query.email,
            token: req.query.token,
            user: req.session.user
          }
        });
      }
    });
    return
  } else {
    if (req.session.token && req.session.user) {
      res.redirect('/');
      return
    }
    req.session.destroy();
    res.render('password-recovery', { data: {} });
  }
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

router.get('/tai-khoan-cua-toi/thong-tin', [auth.requireAuth], (req, res) => {
  res.render('my-informations', {
    data: {
      token: req.session.token,
      user: req.session.user
    }
  });
});

router.get('/tai-khoan-cua-toi/dia-chi', [auth.requireAuth], (req, res) => {
  res.render('my-addresses', {
    data: {
      token: req.session.token,
      user: req.session.user
    }
  });
});

router.get('/tai-khoan-cua-toi/lich-su-mua-hang', [auth.requireAuth], (req, res) => {
  User.getMyOrders(req.user._id, (result) => {
    res.render('my-orders', {
      data: {
        token: req.session.token,
        orders: result.orders,
        user: req.user
      }
    });
  });
});

router.get('/tai-khoan-cua-toi/nhan-xet', [auth.requireAuth], (req, res) => {
  User.getMyReviews(req.user._id, (result) => {
    res.render('my-comment', {
      data: {
        user: req.user,
        token: req.session.token,
        reviews: result.reviews
      }
    });
  })
});

module.exports = router;
