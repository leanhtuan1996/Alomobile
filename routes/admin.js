var express = require('express');
var router = express.Router();

var Dashboard = require('../app/controllers/admin/index').dashboard;
var Product = require('../app/controllers/admin/index').product;
var Category = require('../app/controllers/admin/index').category;

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img');
    },
    filename: (req, file, cb) => {
        var originalName = file.originalname.replace(/\.[^/.]+$/, "");
        var fileExtension = file.originalname.split('.').pop();

        console.log(file.originalname);

        var newName = Date.now() + "." + fileExtension;

        req.body.newName = newName;

        cb(null, newName);
    }
});
var upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
});

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

router.post('/products/add', (req, res) => {
    Product.newProduct(req.body, (result) => {
        res.send(result);
    });
});

router.get('/categories', (req, res) => {
    Category.getCategories((result) => {
        res.render('category', {
            data: {
                title: "Quản lý danh mục - Alomobile",
                currentUser: req.session.currentUser,
                categories: result.categories || []
            }
        })
    });
});

router.post('/categories/add', upload.single('icon'), (req, res) => {
    Category.addCategory(req.body, (result) => {
        res.send({
            error: result.error,
            success: true,
        });
    });
});

router.post('/categories/delete', (req, res) => {    
    Category.delCategory(req.body, (result) => {
        res.send({
            error: result.error
        });
    });
});

router.post('/categories/edit', upload.single('new_icon'), (req, res) => {
    Category.editCategory(req.body, (result) => {
        res.send(result);
    })
});

module.exports = router;
