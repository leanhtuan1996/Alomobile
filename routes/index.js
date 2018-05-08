var express = require('express');
var router = express.Router();

var Category = require('../app/api/index').category;

/* GET home page. */
router.get('/', (req, res) => {
  res.redis.getItem('category', `get-categories`, (data) => {
    if (data) {
      res.render('index', {
        data: {
          categories: data,
          token: req.session.token,
          user: req.session.user
        }
      })
    } else {
      Category.getCategories((result) => {
        if (result.categories) {
          res.redis.setItem('category', `get-categories`, result.categories);
        }
        res.render('index', {
          data: {
            categories: result.categories,
            token: req.session.token,
            user: req.session.user
          }
        })
      });
    }
  });
});

router.get('/chinh-sach-giao-hang', (req, res) => {
  res.render('menu/delivery', {
    data: {
      token: req.session.token,
      user: req.session.user
    }
  });
});

router.get('/ve-chung-toi', (req, res) => {
  res.render('menu/about-us', {
    data: {
      token: req.session.token,
      user: req.session.user
    }
  });
});

router.get('/chinh-sach-bao-hanh', (req, res) => {
  res.render('menu/legal-notice', {
    data: {
      token: req.session.token,
      user: req.session.user
    }
  });
});

router.get('/cac-dieu-khoan-va-su-dung', (req, res) => {
  res.render('menu/terms-and-conditions-of-use', {
    data: {
      token: req.session.token,
      user: req.session.user
    }
  });
});


module.exports = router;
