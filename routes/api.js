var express = require('express');
var router = express.Router();
var _ = require('lodash');

var api = require('../app/api/index');

var User = api.user;
var Product = api.product;
var Category = api.category;
var Brand = api.brand;
var User = api.user;
var Type = api.type;

var multer = require('multer');
var auth = require('../app/middleware/index').authenticate;
var helper = require('../app/helpers/index').helper;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img');
    },
    filename: (req, file, cb) => {
        var originalName = file.originalname.replace(/\.[^/.]+$/, "");
        var fileExtension = file.originalname.split('.').pop();

        if (!req.body.newNames) {
            req.body.newNames = [];
        }

        var newName = Date.now() + _.random(1, 1000) + "." + fileExtension;

        req.body.newNames.push(newName);

        cb(null, newName);
    }
});
var upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }
});

//** APIS FOR USER */
router.post('/user/sign-in', (req, res) => {
    User.signIn(req.body, (result) => {
        if (result.error) {
            res.json(result);
        } else {
            if (result.user) {
                var id = result.user._id

                var token = helper.encodeToken(id);
                //set token in session
                req.session.token = token

                res.json({
                    user: result.user,
                    token: token,
                });
            }
        }
    });
});

router.post('/user/sign-up', (req, res) => {
    User.signUp(req.body, (result) => {
        if (result.error) {
            res.json(result);
        } else {
            if (result.user) {
                var id = result.user._id

                var token = helper.encodeToken(id);
                //set token in session
                req.session.token = token

                res.json({
                    user: result.user,
                    token: token,
                });
            }
        }
    });
});

router.post('/user/register-new-letters', (req, res) => {

});

router.get('/user/all-users', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.get('/user/get-user/:id', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.get('/user/count-users', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.put('/user/update-my-informations', [auth.requireAuth], (req, res) => {

});

router.put('/user/update-informations', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.delete('/user/delete-user', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.post('/user/deactive-user', [auth.requireAuth, auth.requireRole], (req, res) => {

});

//** /APIS FOR USER */

//** APIS FOR PRODUCT */

router.get('/product/get-products', (req, res) => {
    Product.getProducts(null, (result) => {
        res.json(result);
    });
});

router.get('/product/get-products/from/:last', (req, res) => {
    Product.getProducts(req.params.last, (result) => {
        res.json(result);
    });
});

router.get('/product/get-previous-products/:id', (req, res) => {
    Product.getPrevProducts(req.params.id, (result) => {
        res.json(result);
    });
});

router.get('/product/get-product/:id', (req, res) => {
    Product.getProductById(req.params.id, (result) => {
        res.json(result);
    });
});

router.get('/product/get-products-by-type/:typeId', (req, res) => {
    Product.getProductsByType(req.params.typeId, 15, (result) => {
        res.json(result);
    });
});

router.get('/product/get-hot-products', (req, res) => {
    Product.getHotProducts(15, (result) => {
        res.json(result);
    });
});

router.get('/product/get-special-products', (req, res) => {
    Product.getSpecialProducts(15, (result) => {
        res.json(result);
    });
});

router.get('/product/get-products-by-category/:id', (req, res) => {
    Product.getProductsByCategory(req.params.id, 15, (result) => {
        res.json(result);
    });
});

router.get('/product/get-new-products', (req,res) => {
    Product.getNewProducts(15, (result) => {
        res.json(result);
    });
});

router.get('/product/count-products', (req, res) => {
    Product.getCountProducts((result) => {
        res.json(result);
    });
});

router.post('/product/new-product', [auth.requireAuth, auth.requireRole, upload.array('images', 6)], (req, res) => {
    Product.newProduct(req.body, (result) => {
        res.json(result);
    });
});

router.put('/product/edit-product', [auth.requireAuth, auth.requireRole, upload.array('images')], (req, res) => {
    Product.editProduct(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/product/delete-product', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.deleteProduct(req.body.id, (result) => {
        res.json(result);
    });
});

router.get('/product/search-product/:text', (req, res) => {
    Product.searchProducts(req.params.text, (result) => {
        res.json(result);
    });
});
//** /APIS FOR PRODUCT */


//** APIS FOR CATEGORY */
router.get('/category/get-categories', (req, res) => {
    Category.getCategories((result) => {
        res.json(result);
    });
});

router.post('/category/add-category', [auth.requireAuth, auth.requireRole, upload.single('image')], (req, res) => {
    Category.addCategory(req.body, (result) => {
        res.json(result);
    });
});

router.put('/category/edit-category', [auth.requireAuth, auth.requireRole, upload.single('image')], (req, res) => {
    Category.editCategory(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/category/delete-category', [auth.requireAuth, auth.requireRole], (req, res) => {
    Category.deleteProduct(req.body, (result) => {
        res.json(result);
    });
});
//** /APIS FOR CATEGORY */

//** APIS FOR ORDER */
//** /APIS FOR ORDER */

//** APIS FOR TYPE */
router.get('/type/get-types', (req, res) => {
    Type.getTypes((result) => {
        res.json(result);
    });
});
//** /APIS FOR TYPE */

//** APIS FOR BRAND */
router.get('/brand/get-brands', (req, res) => {
    Brand.getBrands((result) => {
        res.json(result);
    });
});

router.post('/brand/new-brand', [auth.requireAuth, auth.requireRole, upload.single('image')], (req, res) => {
    Brand.newBrand(req.body, (result) => {
        res.json(result);
    })
});

router.put('/brand/edit-brand', [auth.requireAuth, auth.requireRole, upload.single('image')], (req, res) => {
    Brand.editBrand(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/brand/delete-brand', [auth.requireAuth, auth.requireRole], (req, res) => {
    Brand.deleteBrand(req.body, (result) => {
        res.json(result);
    });
});

//** /APIS FOR BRAND */

module.exports = router;
