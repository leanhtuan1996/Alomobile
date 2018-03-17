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
router.get('/admin', [auth.requireAuth, auth.requireRole], (req, res) => {
    Dashboard.dashboard((result) => {
        res.render('dashboard', {
            data: {
                title: "Alomobile Control Panel - Trang quản trị",
                countProducts: result.countProducts,
                countUsers: result.countUsers
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
                req.session.token = token

                res.json({
                    user: result.user,
                    token: token,
                });
            }
        }
    });
});

router.get('/admin/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/admin');
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
        res.json({
            error: result.error,
            user: result.user,
            title: "Alomobile Control Panel > Trang quản lý người dùng"
        });
    });
});

//#endregion USER ROUTERS

//#region PRODUCT ROUTERS

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

router.post('/admin/product/add', [auth.requireAuth, auth.requireRole, upload.array('images', 6)], (req, res) => {
    Product.newProduct(req.body, (result) => {
        res.json(result);
    });
});

router.put('/admin/product/edit', [auth.requireAuth, auth.requireRole, upload.array('images', 6)], (req, res) => {
    Product.editProduct(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/admin/product/delete', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.deleteProduct(req.body.id, (result) => {
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

router.get('/admin/product/:idProduct', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getProduct(req.params.idProduct, (response) => {
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

router.put('/admin/product/edit/:idProduct', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getProduct(req.params.idProduct, (r1) => {

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

router.post('/admin/category/add', [auth.requireAuth, auth.requireRole], upload.single('icon'), (req, res) => {
    Category.addCategory(req.body, (result) => {
        res.json({
            error: result.error,
            success: true,
        });
    });
});

router.delete('/admin/category/delete', [auth.requireAuth, auth.requireRole], (req, res) => {
    Category.delCategory(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});

router.put('/admin/category/edit', [auth.requireAuth, auth.requireRole], upload.single('new_icon'), (req, res) => {
    Category.editCategory(req.body, (result) => {
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

router.post('/admin/brand/add', [auth.requireAuth, auth.requireRole], upload.single('image'), (req, res) => {
    Brand.newBrand(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});

router.put('/admin/brand/edit', [auth.requireAuth, auth.requireRole], upload.single('image'), (req, res) => {
    Brand.editBrand(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});

router.delete('/admin/brand/delete', [auth.requireAuth, auth.requireRole], (req, res) => {
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
    res.render('admin/chat/chat');
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

        response.push({
            method: methods,
            path: element.path
        });

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
                             
                            //var matchMethod = _.findIndex(e.methods, (temp) => {
                                //return temp == method;
                            //});
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

router.post('/admin/role/new', [auth.requireAuth, auth.requireRole], (req, res) => {  
    Role.newRole(req.body, (result) => {
        res.json(result);
    });
});

router.put('/admin/role/edit', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.editRole(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/admin/role/delete', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.deleteRole(req.body, (result) => {
        res.json(result);
    });
});

//#endregion ROLE ROUTERS

module.exports = router;
