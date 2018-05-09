const express = require('express');
const router = express.Router();
const _ = require('lodash');

const User = require('../app/api/index').user;
const Product = require('../app/api/index').product;
const Category = require('../app/api/index').category;
const Brand = require('../app/api/index').brand;
const Review = require('../app/api/index').review;
const Role = require('../app/api/index').role;
const Order = require('../app/api/index').order;
const Type = require('../app/api/index').type;
const Promotion = require('../app/api/index').promotion;
const Analytic = require('../app/api/index').analytic;

var Session = require('../app/models/index').session;

var auth = require('../app/middleware/index').authenticate;

//#region USER ROUTERS

router.get('/admin', [auth.requireAuth, auth.requireRole], (req, res) => {
    //get count
    Product.getCountProducts((r1) => {
        User.getCountUsers((r2) => {
            Order.getCountOrders((r3) => {
                Session.count({}, (err, c) => {
                    Analytic.satisfiedClient((r4) => {
                        res.render('dashboard', {
                            data: {
                                title: "Alomobile Control Panel - Trang quản trị",
                                countProducts: r1.count,
                                countUsers: r2.count,
                                countOrders: r3.count,
                                countTraffic: c.count || 0,
                                satisfiedClient: r4
                            }
                        });
                    })
                });
            });
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

//#endregion USER ROUTERS

//#region PRODUCT ROUTERS

router.get('/admin/products', [auth.requireAuth, auth.requireRole], (req, res) => {
    res.render('product', {
        data: {
            title: "Alomobile Control Panel > Trang quản lý sản phẩm"
        }
    });
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

router.get('/admin/product', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getProductById(req.query.id, (response) => {
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

router.get('/admin/product/edit', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getProductById(req.query.id, (r1) => {

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
});
//#endregion CHAT ROUTERS

//#region ROLE ROUTERS

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

//#endregion ROLE ROUTERS

//#region REVIEW ROUTERS
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

//#endregion REVIEW ROUTERS

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
    Order.getPendingOrders((result) => {
        res.render('admin/waiting-orders.ejs', {
            data: {
                title: "Alomobile Control Panel > Trang quản lý đơn hàng",
                error: result.error,
                orders: result.orders
            }
        });
    })
});

router.get('/admin/invoice', [auth.requireAuth, auth.requireRole], (req, res) => {
    Order.getDetailOrder(req.query.id, (result) => {
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

//#endregion PROMOTION ROUTERS


router.get('/admin/database', [auth.requireAuth], (req, res) => {
    res.render('admin/database', {
        data: {
            title: "Alomobile Control Panel - Trang quản lý CSDL",
        }
    })
})

module.exports = router;
