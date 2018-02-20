var express = require('express');
var router = express.Router();

var Category = require('../app/controllers/index').category;

/* GET users listing. */
/* USER SIGN_IN */
router.get('/', (req, res) => {
    res.render('dashboard', {
        data: {
            title: "Trang quản trị - Alomobile"
        }
    });
});

router.get('/users', (req, res) => {

});

router.get('/products', (req, res) => {
    res.render('product', {
        data: {
            title: "Trang quản lý sản phẩm"
        }
    });
});

router.get('/products/add', (req, res) => {

    /** GET CATEGORIES */
    Category.getCategories((result) => {
        var categories = result.categories || [];

        res.render('add-product', {
            data: {
                title: "Thêm sản phẩm mới",
                currentUser: req.session.currentUser,
                categories: categories
            }
        });
    });    
});

module.exports = router;
