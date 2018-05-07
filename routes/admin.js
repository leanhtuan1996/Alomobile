var express = require('express');
var router = express.Router();
var _ = require('lodash');
var app = require('../app').app;

var Dashboard = require('../app/controllers/admin/index').dashboard;
var Product = require('../app/controllers/admin/index').product;
var Category = require('../app/controllers/admin/index').category;
var Brand = require('../app/controllers/admin/index').brand;
var User = require('../app/controllers/admin/index').user;
var Type = require('../app/controllers/admin/index').type;
var Role = require('../app/controllers/admin/index').role;
var Review = require('../app/controllers/admin/index').review;
var Order = require('../app/controllers/admin/index').order;
var Promotion = require('../app/controllers/admin/index').promotion;

var mail = require('../app/api/index').mail;

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

//#region USER ROUTERS
/* GET users listing. */
/* USER SIGN_IN */

//page admin
router.get('/admin', [auth.requireAuth, auth.requireRole], (req, res) => {
    Dashboard.dashboard((result) => {
        res.render('dashboard', {
            data: {
                title: "Alomobile Control Panel - Trang quản trị",
                countProducts: result.countProducts,
                countUsers: result.countUsers,
                countOrders: result.countOrders,
                countTraffic: result.countTraffic,
                satisfiedClient: result.satisfiedClient
            }
        });
    });
});

router.get('/admin/sign-in', (req, res) => {
    res.render('admin/sign-in', {
        data: {
            title: "Alomobile Control Panel > Trang đăng nhập"
        }
    });
});

router.post('/admin/sign-in', (req, res) => {
    User.signIn(req.body, (result) => {
        if (result.error) {
            res.json(result);
        } else {
            if (result.user) {
                var id = result.user._id

                var token = helper.encodeToken(id);
                //set token in session
                req.session.token = token;

                //push new token to user
                User.pushValidToken(token, id, (cb) => {
                    res.json({
                        error: cb.error,
                        user: result.user
                    });
                });
            }
        }
    });
});

router.put('/admin/sign-out', (req, res) => {
    if (req.session.token) {
        User.signOut(req.session.token, (cb) => {
            res.redirect('/admin/sign-in');
        });
    } else {
        res.redirect('/admin/sign-in');
    }
});

router.get('/admin/forgot-password', (req, res) => {
    res.render('admin/forgot-password', {
        data: {
            title: "Alomobile Control Panel > Quên mật khẩu"
        }
    });
});

router.get('/admin/users', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.getUsers((result) => {
        res.render("users", {
            data: {
                error: result.error,
                users: result.users,
                title: "Alomobile Control Panel > Trang quản lý người dùng"
            }
        });
    });
});

router.get('/admin/user/:id', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.getUser(req.params.id, (result) => {
        res.json(result);
    });
});

router.put('/admin/user', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.editUser(req.body.id, req.body.properties, (result) => {
        res.json(result);
    });
});

router.post('/admin/user', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.newUser(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/admin/user', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.deleteUser(req.body.id, (result) => {
        res.json(result);
    });
});

//#endregion USER ROUTERS

//#region PRODUCT ROUTERS

//page products
router.get('/admin/products', [auth.requireAuth, auth.requireRole], (req, res) => {
    res.render('product', {
        data: {
            title: "Alomobile Control Panel > Trang quản lý sản phẩm"
        }
    });
});

router.get('/admin/products/list', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getAllProducts(null, (result) => {
        res.json(result);
    });
});

router.get('/admin/products/list/from/:lastCreatedAt', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getAllProducts(req.params.lastCreatedAt, (result) => {
        res.json(result);
    });
});

router.get('/admin/products/list/to/:lastCreatedAt', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getPrevProducts(req.params.lastCreatedAt, (result) => {
        res.json(result);
    });
});

router.get('/admin/products/listSpecial', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.get('/admin/products/listNew', [auth.requireAuth, auth.requireRole], (req, res) => {

});

//page add new product
router.get('/admin/product/add', [auth.requireAuth, auth.requireRole], (req, res) => {

    /** GET CATEGORIES */
    Category.getCategories((r) => {
        Brand.getBrands((r1) => {
            Type.getTypes((r2) => {
                res.render('add-product', {
                    data: {
                        title: "Alomobile Control Panel > Thêm sản phẩm mới",
                        user: req.user,
                        categories: r.categories || [],
                        brands: r1.brands || [],
                        types: r2.types || []
                    }
                });
            });
        });
    });
});

router.post('/admin/product', [auth.requireAuth, auth.requireRole, upload.array('images', 6)], (req, res) => {
    Product.newProduct(req.body, (result) => {

        if (!result.error) {
            res.redis.delItem('products', ['get-new-products', '/product/list', 'products-by-categories', 'get-products-by-type']);
        }

        res.json(result);
    });
});

router.put('/admin/product', [auth.requireAuth, auth.requireRole, upload.array('images', 6)], (req, res) => {
    Product.editProduct(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('products');
        }

        res.json(result);
    });
});

router.delete('/admin/product', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.deleteProduct(req.body.id, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('products');
        }

        res.json(result);
    });
});

router.get('/admin/products/getCount', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getCountProducts((response) => {
        res.json(response);
    });
});

router.get('/admin/products/search/text=:text', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.searchProduct(req.params.text, (response) => {
        res.json(response);
    });
});

router.get('/admin/product/:id', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getProduct(req.params.id, (response) => {
        if (response.error) {
            res.render('admin/404', {
                data: {
                    text: `Sản phẩm không tìm thấy hoặc có lỗi không xác định. Nhấn vào <a href="${req.originalUrl}">đây</a> để thử lại.`
                }
            });
            return
        }

        res.render('admin/detail-product', {
            data: {
                title: "Alomobile Control Panel > Xem chi tiết sản phẩm",
                error: response.error,
                product: response.product
            }
        });
    });
});

router.get('/admin/product/edit/:id', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getProduct(req.params.id, (r1) => {

        if (r1.error) {
            res.render('admin/404', {
                data: {
                    text: `Sản phẩm không tìm thấy hoặc có lỗi không xác định. Nhấn vào <a href="${req.originalUrl}">đây</a> để thử lại.`
                }
            });
            return
        }

        Type.getTypes((r2) => {
            Category.getCategories((r3) => {
                Brand.getBrands((r4) => {
                    res.render('edit-product', {
                        data: {
                            title: "Chỉnh sửa sản phẩm ",
                            user: req.user,
                            categories: r3.categories || [],
                            brands: r4.brands || [],
                            types: r2.types || [],
                            product: r1.product
                        }
                    })
                });
            });
        });
    });
});

//#endregion PRODUCT ROUTERS

//#region CATEGORY ROUTERS
//page category
router.get('/admin/categories', [auth.requireAuth, auth.requireRole], (req, res) => {
    Category.getCategories((result) => {
        res.render('category', {
            data: {
                title: "Alomobile Control Panel > Trang Quản lý danh mục",
                currentUser: req.session.currentUser,
                categories: result.categories || []
            }
        })
    });
});

router.post('/admin/category', [auth.requireAuth, auth.requireRole], upload.single('icon'), (req, res) => {
    Category.addCategory(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('category', ['get-categories'])
        }

        res.json({
            error: result.error,
            success: true,
        });
    });
});

router.delete('/admin/category', [auth.requireAuth, auth.requireRole], (req, res) => {
    Category.delCategory(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('category', ['get-categories', `category?id=${req.body.id}`])
        }

        res.json({
            error: result.error
        });
    });
});

router.put('/admin/category', [auth.requireAuth, auth.requireRole], upload.single('new_icon'), (req, res) => {
    Category.editCategory(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('category', ['get-categories', `category?id=${req.body.current_root_category}`])
        }

        res.json(result);
    })
});
//#endregion CATEGORY ROUTERS

//#region BRAND ROUTERS
router.get('/admin/brands', [auth.requireAuth, auth.requireRole], (req, res) => {
    Brand.getBrands((result) => {
        res.render('brand', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý thương hiệu",
                currentUser: req.session.currentUser,
                brands: result.brands || []
            }
        })
    });
});

router.post('/admin/brand', [auth.requireAuth, auth.requireRole], upload.single('image'), (req, res) => {
    Brand.newBrand(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});

router.put('/admin/brand', [auth.requireAuth, auth.requireRole], upload.single('image'), (req, res) => {
    Brand.editBrand(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});

router.delete('/admin/brand', [auth.requireAuth, auth.requireRole], (req, res) => {
    Brand.deleteBrand(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});
//#endregion BRAND ROUTERS

//#region ERRORS ROUTERS
router.get('/admin/404', (req, res) => {
    res.render('admin/404');
});

router.get('/admin/403', (req, res) => {
    res.render('admin/403');
});
//#endregion ERRORS ROUTERS

//#region INBOX ROUTERS

router.get('/admin/inbox', (req, res) => {
    // res.render('admin/inbox/inbox');
    res.redirect('http://webmail.alomobile.tech');
});

//#endregion INBOX ROUTERS

//#region CHAT ROUTERS
router.get('/admin/chat', (req, res) => {
    //res.render('admin/chat/chat');
    res.redirect('https://dashboard.tawk.to');
})

router.get('/admin/get-all-route', [auth.requireAuth, auth.requireRole], (req, res) => {
    if (req.app) {

        getAllRouter(req.app._router.stack, (result) => {
            if (result.routers && result.routers.length > 0) {
                var oriRouters = result.routers;
                var newRouters = [];
                for (let i = 0; i < oriRouters.length; i++) {
                    const router = oriRouters[i];
                    //method
                    var methods = []
                    methods.push(router.method);

                    //path
                    var path = router.path;

                    //element
                    var temp = {
                        methods: methods,
                        path: path
                    }


                    if (newRouters.length == 0) {
                        newRouters.push(temp)
                    } else {
                        //find this path in newRouters
                        var index = _.findIndex(newRouters, (e) => {
                            return e.path == path;
                        });

                        if (index >= 0) {
                            newRouters[index].methods.push(router.method);
                        } else {
                            newRouters.push(temp)
                        }
                    }
                }

                res.json(newRouters);
            } else {
                res.json([]);
            }
        });
    } else {
        res.json({})
    }
});
//#endregion CHAT ROUTERS

//#region ROLE ROUTERS
var getAllRouter = (stack, cb) => {
    var route, routes = [];
    stack.forEach((middleware) => {
        if (middleware.route) { // routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === 'router') { // router middleware 
            middleware.handle.stack.forEach((handler) => {
                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    var response = [];

    for (let i = 0; i < routes.length; i++) {
        const element = routes[i];
        var methods = "";
        for (var method in element.methods) {
            methods += method;
        }
        //just get all router of admin
        if (element.path.startsWith('/admin') || element.path.startsWith('/api')) {
            response.push({
                method: methods,
                path: element.path
            });
        }

        if (i == routes.length - 1) {
            if (response && response.length > 0) {
                var oriRouters = response;
                var newRouters = [];
                for (let i = 0; i < oriRouters.length; i++) {
                    const router = oriRouters[i];

                    //method

                    var method = router.method;
                    //path
                    var path = router.path;

                    var methods = []
                    methods.push(router.method);

                    //element
                    var temp = {
                        methods: methods,
                        path: path
                    }

                    if (newRouters.length == 0) {
                        newRouters.push(temp)
                    } else {
                        //find this path in newRouters
                        var index = _.findIndex(newRouters, (e) => {
                            return e.path == path;
                        });

                        if (index >= 0) {
                            newRouters[index].methods.push(router.method);
                        } else {
                            newRouters.push(temp)
                        }
                    }
                }

                return cb(newRouters);
            } else {
                return cb([]);
            }
        }
    }
}

router.get('/admin/roles', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.getRoles((result) => {
        res.render('admin/role', {
            data: {
                title: "Alomobile Control Panel > Trang phân quyền người dùng",
                error: result.error,
                roles: result.roles
            }
        });
    });
});

router.get('/admin/get-roles', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.getRoles((result) => {
        res.json(result);
    });
})

router.get('/admin/role/get-routers', [auth.requireAuth, auth.requireRole], (req, res) => {
    getAllRouter(req.app._router.stack, (cb) => {
        res.json(cb);
    });
});

router.get('/admin/role/:id', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.getRole(req.params.id, (result) => {
        res.json(result);
    });
});

router.post('/admin/role', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.newRole(req.body, (result) => {
        res.json(result);
    });
});

router.put('/admin/role', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.editRole(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/admin/role', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.deleteRole(req.body, (result) => {
        res.json(result);
    });
});

//#endregion ROLE ROUTERS

//#region COMMENT ROUTERS
router.get('/admin/reviews', [auth.requireAuth, auth.requireRole], (req, res) => {
    Review.getReviews((result) => {
        res.render('admin/review', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý nhận xét",
                error: result.error,
                reviews: result.reviews
            }
        });
    });
});

router.get('/admin/reviews/approval', [auth.requireAuth, auth.requireRole], (req, res) => {
    Review.getRequestReviews((result) => {
        res.render('admin/waiting-reviews', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý nhận xét",
                error: result.error,
                reviews: result.reviews
            }
        })
    })
});

router.get('/admin/reviews/dismiss', [auth.requireAuth, auth.requireRole], (req, res) => {
    Review.getDismissReviews((result) => {
        res.render('admin/dismissed-reviews', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý nhận xét",
                error: result.error,
                reviews: result.reviews
            }
        })
    })
});

router.put('/admin/review', [auth.requireAuth, auth.requireRole], (req, res) => {
    Review.updateReview(req.body.id, req.body.parameters, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('review');
            res.redis.delItem('products', [`get-reviews?id=${req.body.id}`])
        }

        res.json(result)
    });
});

router.delete('/admin/review', [auth.requireAuth, auth.requireRole], (req, res) => {
    Review.deleteReview(req.body.id, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('review');
            res.redis.delItem('products', [`get-reviews?id=${req.body.id}`])
        }

        res.json(result);
    });
});

//#endregion COMMENT ROUTERS

//#region ORDER ROUTERS

router.get('/admin/orders', [auth.requireAuth, auth.requireRole], (req, res) => {
    Order.getOrders((result) => {
        res.render('admin/orders', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý đơn hàng",
                error: result.error,
                orders: result.orders
            }
        });
    });
});

router.get('/admin/orders/approval', [auth.requireAuth, auth.requireRole], (req, res) => {
    Order.getRequestOrders((result) => {
        res.render('admin/waiting-orders.ejs', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý đơn hàng",
                error: result.error,
                orders: result.orders
            }
        });
    })
});

router.get('/admin/invoice/:id', [auth.requireAuth, auth.requireRole], (req, res) => {
    Order.getOrder(req.params.id, (result) => {
        if (!result.order) {
            res.render('admin/404', {
                data: {}
            });
            return
        }
        res.render('admin/invoice', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý đơn hàng",
                error: result.error,
                order: result.order
            }
        });
    });
});

router.put('/admin/order', [auth.requireAuth, auth.requireRole], (req, res) => {
    Order.updateOrder(req.body.id, req.body.parameters, (result) => {

        if (result.order) {
            res.redis.delItem('order', [`get-order?id=${result.order.alias}&email=${req.user.email}`])
        }

        res.json(result)
    })
})

//#endregion ORDER ROUTERS

//#region PROMOTION ROUTERS

router.get('/admin/promotions', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.gets((result) => {
        res.render('admin/promotions', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý khuyến mãi",
                error: result.error,
                promotions: result.promotions
            }
        });
    });
});

router.post('/admin/promotion', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.new(req.body, (result) => {
        res.json(result)
    });
});

router.put('/admin/promotion', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.edit(req.body, (result) => {
        res.json(result)
    });
});

router.delete('/admin/promotion', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.delete(req.body.id, (result) => {
        res.json(result)
    });
});

router.get('/admin/promotion', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.get(req.query.id, (result) => {
        res.json(result)
    });
});

router.get('/admin/get-promotions', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.gets((result) => {
        res.json(result)
    })
});




//#endregion PROMOTION ROUTERS

module.exports = router;
