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

/* GET users listing. */
/* USER SIGN_IN */
router.get('/', [auth.requireAuth, auth.requireRole], (req, res) => {

    Dashboard.dashboard((result) => {
        res.render('dashboard', {
            data: {
                title: "Trang quản trị - Alomobile",
                countProducts: result.countProducts,
                countUsers: result.countUsers
            }
        });
    });
});

router.get('/sign-in', (req, res) => {
    res.render('admin/sign-in', {
        data: {
            title: "Trang đăng nhập - Alomobile Manager"
        }
    });
});

router.post('/sign-in', (req, res) => {
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

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/admin');
});

router.get('/forgot-password', (req, res) => {
    res.render('admin/forgot-password', {
        data: {
            title: "Quên mật khẩu- Alomobile Manager"
        }
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



/** PRODUCT ROUTERS */

router.get('/products', [auth.requireAuth, auth.requireRole], (req, res) => {
    res.render('product', {
        data: {
            title: "Trang quản lý sản phẩm - Alomobile"
        }
    });
});

router.get('/products/list', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getAllProducts(null, (result) => {
        res.json(result);
    });
});

router.get('/products/list/from/:lastCreatedAt', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getAllProducts(req.params.lastCreatedAt, (result) => {
        res.json(result);
    });
});

router.get('/products/list/to/:lastCreatedAt', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getPrevProducts(req.params.lastCreatedAt, (result) => {
        res.json(result);
    });
});

router.get('/products/listSpecial', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.get('/products/listNew', [auth.requireAuth, auth.requireRole], (req, res) => {

});

router.get('/products/add', [auth.requireAuth, auth.requireRole], (req, res) => {

    /** GET CATEGORIES */
    Category.getCategories((r) => {
        Brand.getBrands((r1) => {
            Type.getTypes((r2) => {
                res.render('add-product', {
                    data: {
                        title: "Thêm sản phẩm mới - Alomobile",
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

router.post('/products/add', [auth.requireAuth, auth.requireRole, upload.array('images', 6)], (req, res) => {
    Product.newProduct(req.body, (result) => {
        res.send(result);
    });
});

router.put('/product/edit', [auth.requireAuth, auth.requireRole, upload.array('images', 6)], (req, res) => {
    Product.editProduct(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/product/delete', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.deleteProduct(req.body.id, (result) => {
        res.json(result);
    });
});

router.get('/products/getCount', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getCountProducts((response) => {
        res.json(response);
    });
});

router.get('/product/search/text=:text', [auth.requireAuth, auth.requireRole], (req, res) => {

    Product.searchProduct(req.params.text, (response) => {
        console.log(response);
        res.json(response);
    });
});

router.get('/product/:idProduct', [auth.requireAuth, auth.requireRole], (req, res) => {

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
                title: "Xem chi tiết sản phẩm",
                error: response.error,
                product: response.product
            }
        });
    });
});

router.get('/product/edit/:idProduct', [auth.requireAuth, auth.requireRole], (req, res) => {
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


/** ERRORS ROUTERS */
router.get('/404', (req, res) => {
    res.render('admin/404');
});

router.get('/403', (req, res) => {
    res.render('admin/403');
});

/** INBOX ROUTERS */

router.get('/inbox', (req, res) => {
   // res.render('admin/inbox/inbox');
   res.redirect('http://webmail.alomobile.tech');
});

/** CHAT ROUTERS */
router.get('/chat', (req, res) => {
    res.render('admin/chat/chat');
})

router.get('/get-all-route', [auth.requireAuth, auth.requireRole], (req, res) => {
    if (req.app) {
        var route, routes = [];
        req.app._router.stack.forEach(function(middleware){
            if(middleware.route){ // routes registered directly on the app
                routes.push(middleware.route);
            } else if(middleware.name === 'router'){ // router middleware 
                middleware.handle.stack.forEach(function(handler){
                    route = handler.route;
                    route && routes.push(route);
                });
            }
        });
        
        var response = [];

        for (let i = 0; i < routes.length; i++) {
            const element = routes[i];
            var methods = "";
            for(var method in element.methods){
                methods += method + ", ";
            }

            response.push({
                method: methods,
                path: element.path
            });

            if (i == routes.length - 1) {
                res.json(response);
            }
        }

    } else {
        res.json({})
    }
});


function print (path, layer) {
    console.log(i);
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      console.log(i++ + '%s /%s',
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join('/'))     
    }
  }
  
  function split (thing) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }


module.exports = router;
