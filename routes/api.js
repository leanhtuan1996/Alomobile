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
var Order = api.order;
var Review = api.review;

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
router.post('/api/v1/user/sign-in', (req, res) => {
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

router.post('/api/v1/user/sign-up', (req, res) => {
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

router.post('/api/v1/user/register-new-letters', (req, res) => {

});

router.get('/api/v1/user/all-users', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.get('/api/v1/user/get-user/:id', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.get('/api/v1/user/count-users', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.put('/api/v1/user/update-my-informations', [auth.requireAuth], (req, res) => {

});

router.put('/api/v1/user/update-informations', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.delete('/api/v1/user/delete-user', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.post('/api/v1/user/deactive-user', [auth.requireAuth, auth.requireRole], (req, res) => {

});

//** /APIS FOR USER */

//** APIS FOR PRODUCT */

router.get('/api/v1/product/get-products', (req, res) => {
    Product.getProducts(null, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/product/get-products/from/:last', (req, res) => {
    Product.getProducts(req.params.last, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/product/get-previous-products/:id', (req, res) => {
    Product.getPrevProducts(req.params.id, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/product/get-product/:id', (req, res) => {
    Product.getProductById(req.params.id, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/product/get-products-by-type/:id', (req, res) => {

    var id = req.params.id;
    if (!id) {
        res.json({
            error: "Id is required!"
        });
        return
    }

    res.redis.getItem('products', `get-products-by-type?id=${id}`, (result) => {
        if (result) {
            res.json({
                products: result
            })
        } else {
            Product.getProductsByType(id, 15, (result) => {
                if (result.products && result.products.length > 0) {
                    res.redis.setItem('products', `get-products-by-type?id=${id}`, result.products);
                }
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/product/get-hot-products', (req, res) => {    
    res.redis.getItem('products', 'get-hot-products', (result) => {
        if (result) {
            res.json({
                products: result
            })
        } else {
            Product.getHotProducts(15, (result) => {
                if (result.products && result.products.length > 0) {
                    res.redis.setItem('products', 'get-hot-products', result.products);
                }
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/product/get-special-products', (req, res) => {
    res.redis.getItem('products', 'get-special-products', (result) => {
        if (result) {
            res.json({
                products: result
            })
        } else {
            Product.getSpecialProducts(15, (result) => {
                if (result.products && result.products.length > 0) {
                    res.redis.setItem('products', 'get-special-products', result.products);
                }
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/product/get-products-by-category/:id', (req, res) => {
    var id = req.params.id;
    if (!id) {
        res.json({
            error: "Parameters missing!"
        });
        return;
    }

    res.redis.getItem('products', `get-products-by-category/${id}`, (data) => {
        if (data) {
            res.json({
                products: data
            });
        } else {
            Product.getProductsByCategory(req, 15, (result) => {
                if (result.products && result.products.length > 0) {
                    res.redis.setItem('products', `get-products-by-category/${id}`, result.products);
                }
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/product/get-products-by-category', (req, res) => {

    var idCategory = req.query.idCategory,
        idRootCategory = req.query.idRootCategory;

    if (!idCategory || !idRootCategory) { res.json({ products: [] }); return; }

    res.redis.getItem('products', `get-products-by-category?idCategory=${idCategory}&idRootCategory=${idRootCategory}`, (data) => {
        if (data) {
            res.json({
                products: data
            });
        } else {
            Product.getProductsByCategory(idCategory, idRootCategory, req.query.limit || 15, (result) => {
                if (result.products && result.products.length > 0) {
                    res.redis.setItem('products', `get-products-by-category?idCategory=${idCategory}&idRootCategory=${idRootCategory}`, result.products);
                }                
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/product/get-new-products', (req, res) => {
    res.redis.getItem('products', `get-new-products`, (data) => {
        if (data) {
            res.json({
                products: data
            });
        } else {
            Product.getNewProducts(15, (result) => {
                if (result.products && result.products.length > 0) {
                    res.redis.setItem('products', `get-new-products`, result.products);
                }
                
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/product/count-products', (req, res) => {
    res.redis.getItem('products', `count-products`, (data) => {
        if (data) {
            res.json({
                count: data
            });
        } else {
            Product.getCountProducts((result) => {
                if (result.count) {
                    res.redis.setItem('products', `count-products`, result.count);
                }
                
                res.json(result);
            });
        }
    });
});

router.post('/api/v1/product/new-product', [auth.requireAuth, auth.requireRole, upload.array('images', 6)], (req, res) => {
   
    
    Product.newProduct(req.body, (result) => {

        if (!result.error) {
            res.redis.delItem('products', ['get-new-products', '/product/list', 'products-by-categories', 'get-products-by-type']);
        }

        res.json(result);
    });
});

router.put('/api/v1/product/edit-product', [auth.requireAuth, auth.requireRole, upload.array('images')], (req, res) => {
    Product.editProduct(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('products');
        }

        res.json(result);
    });
});

router.delete('/api/v1/product/delete-product', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.deleteProduct(req.body.id, (result) => {
        
        //update cache
        if (!result.error) {
            res.redis.delItem('products');
        }

        res.json(result);
    });
});

router.get('/api/v1/product/search-product/:text', (req, res) => {
    Product.searchProducts(req.params.text, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/product/get-preview', (req, res) => {

    var id = req.query.id;
    if (!id) {
        res.json({
            error: "Id is required!"
        });
        return
    }

    res.redis.getItem('products', `get-preview?id=${id}`, (data) => {
        if (data) {
            res.json({
                products: data
            });
        } else {
            Product.getPreviewProduct(id, (result) => {
                if (result.products && result.products.length > 0) {
                    res.redis.setItem('products', `get-preview?id=${id}`, result.products);
                }
                
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/product/get-reviews', (req, res) => {

    var id = req.query.product;

    if (!id) {
        res.json({
            error: "Product not found"
        });
        return
    }

    res.redis.getItem('products', `get-reviews?id=${id}`, (data) => {
        if (data) {
            res.json({
                product: data
            });
        } else {
            Product.getReviews(id, 1, (result) => {
                if (result.product) {
                    res.redis.setItem('products', `get-reviews?id=${id}`, result.product);
                }
                
                res.json(result);
            });
        }
    });
});

//** /APIS FOR PRODUCT */


//** APIS FOR CATEGORY */
router.get('/api/v1/category/get-categories', (req, res) => {
    res.redis.getItem('category', `get-categories`, (data) => {
        if (data) {
            res.json({
                categories: data
            });
        } else {
            Category.getCategories((result) => {
                if (result.categories) {
                    res.redis.setItem('category', `get-categories`, result.categories);
                }                
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/category/:id', (req, res) => {

    var id = req.params.id;
    if (!id) {
        res.json({
            error: "Id is required!"
        });
        return
    }

    res.redis.getItem('category', `category?id=${id}`, (data) => {
        if (data) {
            res.json({
                category: data
            });
        } else {
            Category.getCategory(id, (result) => {
                if (result.category) {
                    res.redis.setItem('category', `category?id=${id}`, result.category);
                }                
                res.json(result);
            });
        }
    });
});

router.post('/api/v1/category/add-category', [auth.requireAuth, auth.requireRole, upload.single('image')], (req, res) => {
    Category.addCategory(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('category', ['get-categories']);
        }

        res.json(result);
    });
});

router.put('/api/v1/category/edit-category', [auth.requireAuth, auth.requireRole, upload.single('image')], (req, res) => {
    Category.editCategory(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('category');
        }

        res.json(result);
    });
});

router.delete('/api/v1/category/delete-category', [auth.requireAuth, auth.requireRole], (req, res) => {
    Category.deleteProduct(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('category');
        }

        res.json(result);
    });
});
//** /APIS FOR CATEGORY */

//** APIS FOR ORDER */
//** /APIS FOR ORDER */

//** APIS FOR TYPE */
router.get('/api/v1/type/get-types', (req, res) => {
    res.redis.getItem('type', `get-types`, (data) => {
        if (data) {
            res.json({
                types: data
            });
        } else {
            Type.getTypes((result) => {
                if (result.types) {
                    res.redis.setItem('type', `get-types`, result.types);
                }                
                res.json(result);
            });
        }
    });
});
//** /APIS FOR TYPE */

//** APIS FOR BRAND */
router.get('/api/v1/brand/get-brands', (req, res) => {
    Brand.getBrands((result) => {
        res.json(result);
    });
});

router.post('/api/v1/brand/new-brand', [auth.requireAuth, auth.requireRole, upload.single('image')], (req, res) => {
    Brand.newBrand(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('brand');
        }

        res.json(result);
    })
});

router.put('/api/v1/brand/edit-brand', [auth.requireAuth, auth.requireRole, upload.single('image')], (req, res) => {
    Brand.editBrand(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('brand');
        }

        res.json(result);
    });
});

router.delete('/api/v1/brand/delete-brand', [auth.requireAuth, auth.requireRole], (req, res) => {
    Brand.deleteBrand(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('brand');
        }

        res.json(result);
    });
});

//** /APIS FOR BRAND */

//**APIS FOR ORDER
router.get('/api/v1/order/checkAvailable', (req, res) => {
    Order.checkingAvailable(req.query.id, req.query.quantity, req.query.color, (cb) => {
        res.json(cb);
    });
});

router.get('/api/v1/order/detailCart', (req, res) => {
    Order.detailCart(req.query.products, (result) => {
        res.json(result);
    });
})

router.get('/api/v1/order/getNewerOrders', [auth.requireAuth, auth.requireRole], (req, res) => {
    Order.getNewOrders((result) => {
        res.json(result)
    })
});

//**/APIS FOR ORDER

//APIS FOR REVIEW
router.get('/api/v1/reviews', [auth.requireAuth, auth.requireRole], (req, res) => {
    res.redis.getItem('reviews', `get-reviews`, (data) => {
        if (data) {
            res.json({
                reviews: data
            });
        } else {
            Review.getReviews((result) => {
                if (result.reviews) {
                    res.redis.setItem('reviews', `get-reviews`, result.reviews);
                }                
                res.json(result);
            });
        }
    });
});

router.get('/api/v1/newerReviews', [auth.requireAuth, auth.requireRole], (req, res) => {

    res.redis.getItem('reviews', `get-new-reviews`, (data) => {
        if (data) {
            res.json({
                reviews: data
            });
        } else {
            Review.getNewReviews((result) => {
                if (result.reviews) {
                    res.redis.setItem('reviews', `get-new-reviews`, result.reviews);
                }                
                res.json(result);
            });
        }
    });
});

//**/APIS FOR REVIEW

module.exports = router;
