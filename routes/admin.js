var express = require('express');
var router = express.Router();

var Category = require('../app/controllers/index').category;
var Dashboard = require('../app/controllers/admin/index').dashboard;
var Product = require('../app/controllers/admin/index').product;

/* GET users listing. */
/* USER SIGN_IN */
router.get('/', (req, res) => {

    Dashboard.dashboard((result) => {
        res.render('dashboard', {
            data: {
                title: "Trang quản trị - Alomobile"
            }
        });
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

router.post('products/add', (req, res) => {
    console.log(req.body);
    Product.newProduct(req.body, (result) => {
        res.send(result);
    });
});

module.exports = router;
