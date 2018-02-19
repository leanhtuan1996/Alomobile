var express = require('express');
var router = express.Router();

/* GET users listing. */
/* USER SIGN_IN */
router.get('/', (req, res) => {
    res.render('dashboard', {
        data: {

        }
    });
});

router.get('/users', (req, res) => {

});

router.get('/products', (req, res) => {
    res.render('product', {
        data: {

        }
    });
});

router.get('/products/add', (req, res) => {
    res.render('add-product', {
        data: {

        }
    });
});

module.exports = router;
