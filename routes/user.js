var express = require('express');
var router = express.Router();

var User = require('../app/controllers/index').user;
var helper = require('../app/helpers/index').helper;

/* GET users listing. */
/* USER SIGN_IN */
router.get('/sign-in', (req, res) => {

  if (req.session.currentUser) {
    res.render('index', {
      data: {
        currentUser: req.session.currentUser
      }
    })
  } else {
    res.render('sign-in', {
      data: {

      }
    });
  }
});

router.post('/sign-in', (req, res) => {
  if (req.session.currentUser) {
    res.redirect('/');
  } else {
    User.signIn(req, res, req.body, (result) => {
      console.log('received');

      res.send(result)
    });
  }

}); /***/

/* USER SIGN_UP */
router.get('/sign-up', (req, res) => {
  res.render('sign-up', {
    data: {

    }
  });
});

router.post('/sign-up', (req, res) => {
  User.signUp(req, res, req.body);
}); /***/

router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.get('/my-account', (req, res) => {
  if (req.session.currentUser) {
    res.render('my-account', {
      data: {
        currentUser: req.session.currentUser
      }
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
