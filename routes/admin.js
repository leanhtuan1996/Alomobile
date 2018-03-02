var express = require('express');
var router = express.Router();

var Dashboard = require('../app/controllers/admin/index').dashboard;
var Product = require('../app/controllers/admin/index').product;
var Category = require('../app/controllers/admin/index').category;
var Brand = require('../app/controllers/admin/index').brand;
var User = require('../app/controllers/admin/index').user;

var multer = require('multer');
var auth = require('../app/middleware/index').authenticate;

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
router.get('/', [auth.requireAuth, auth.requireRole], (req, res) => {

    Dashboard.dashboard((result) => {
        res.render('dashboard', {
            data: {
                title: "Trang quản trị - Alomobile"
            }
        });
    });
});

router.get('/users', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.getUsers((result) => {
        res.send({
            error: result.error,
            user: result.user
        });
    });
});

router.get('/products', [auth.requireAuth, auth.requireRole], (req, res) => {
    res.render('product', {
        data: {
            title: "Trang quản lý sản phẩm - Alomobile"
        }
    });
});

router.get('/products/add', [auth.requireAuth, auth.requireRole], (req, res) => {

    /** GET CATEGORIES */
    Category.getCategories((result) => {
        var categories = result.categories || [];

        res.render('add-product', {
            data: {
                title: "Thêm sản phẩm mới - Alomobile",
                currentUser: req.session.currentUser,
                categories: categories
            }
        });
    });
});

router.post('/products/add', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.newProduct(req.body, (result) => {
        res.send(result);
    });
});

/** CATEGORY ROUTERS */

router.get('/categories', [auth.requireAuth, auth.requireRole], (req, res) => {
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

router.post('/categories/add', [auth.requireAuth, auth.requireRole], upload.single('icon'), (req, res) => {
    Category.addCategory(req.body, (result) => {
        res.send({
            error: result.error,
            success: true,
        });
    });
});

router.post('/categories/delete', [auth.requireAuth, auth.requireRole], (req, res) => {
    Category.delCategory(req.body, (result) => {
        res.send({
            error: result.error
        });
    });
});

router.post('/categories/edit', [auth.requireAuth, auth.requireRole], upload.single('new_icon'), (req, res) => {
    Category.editCategory(req.body, (result) => {
        res.send(result);
    })
});
/** /CATEGORY ROUTERS */

//===========

/** BRAND ROUTERS */
router.get('/brands', [auth.requireAuth, auth.requireRole], (req, res) => {
    Brand.getBrands((result) => {
        res.render('brand', {
            data: {
                title: "Quản lý thương hiệu - Alomobile",
                currentUser: req.session.currentUser,
                brands: result.brands || []
            }
        })
    });
});

router.post('/brands/add', [auth.requireAuth, auth.requireRole], upload.single('image'), (req, res) => {
    Brand.newBrand(req.body, (result) => {
        res.send({
            error: result.error
        });
    });
});

router.post('/brands/edit', [auth.requireAuth, auth.requireRole], upload.single('image'), (req, res) => {
    Brand.editBrand(req.body, (result) => {
        res.send({
            error: result.error
        });
    });
});

router.post('/brands/delete', [auth.requireAuth, auth.requireRole], (req, res) => {
    Brand.deleteBrand(req.body, (result) => {
        res.send({
            error: result.error
        });
    });
});
/** /BRAND ROUTERS */

module.exports = router;
