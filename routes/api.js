const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../app/middleware/index').authenticate;
const helper = require('../app/helpers/index').helper;
const api = require('../app/api/index');
const fs = require('fs');
const path = require('path');

const User = api.user;
const Product = api.product;
const Category = api.category;
const Brand = api.brand;
const Type = api.type;
const Order = api.order;
const Review = api.review;
const Analytic = api.analytic;
const SearchKeyword = api.searchKeyword;
const SearchProduct = api.searchProduct;
const Promotion = api.promotion;
const Role = api.role;
const Mail = api.mail;
const Settings = api.settings;


//#region APIS FOR USER
router.post('/api/v1/user/sign-in', (req, res) => {
    User.signIn(req.body.credential, (result) => {
        if (result.error) {
            res.json({
                error: result.error
            });
            return
        }

        var user = result.user;

        if (!user) { res.json({ error: "User not found!" }); return; }

        var id = user._id

        var token = helper.encodeToken(id);

        //set token in session
        req.session.token = token;
        req.session.user = user;

        //push new token to user
        User.pushValidToken(token, id, (cb) => {
            res.json({
                error: cb.error,
                user: {
                    id: id,
                    email: user.name,
                    fullName: user.fullName,
                    phone: user.phone,
                    sex: user.sex,
                    orders: user.orders
                }
            });
        });
    });
});

router.post('/api/v1/user/sign-up', (req, res) => {
    User.signUp(req.body.credential, (result) => {
        var user = result.user;
        if (user) {
            //set token in session
            req.session.token = helper.encodeToken(user._id);
            req.session.user = user;

            //send email to user     
            var parameters = {
                to: user.email,
                subject: "Chúc mừng bạn đã đăng kí tài khoản thành công trên Alomobile",
                fullName: user.fullName
            }

            Mail.sendMailWithSignUp(parameters, (cb) => { });

            //push new token to user
            User.pushValidToken(req.session.token, user._id, (cb) => {
                res.json({
                    error: cb.error,
                    user: {
                        id: user._id,
                        email: user.name,
                        fullName: user.fullName,
                        phone: user.phone,
                        sex: user.sex,
                        orders: user.orders
                    }
                });
            });
        } else {
            res.json(result);
        }
    });
});

router.post('/api/v1/user/sign-out', (req, res) => {
    User.signOut(req.session.token, (result) => {
        req.session.destroy();
        res.json(result);
    });
});

router.post('/api/v1/user/register-new-letters', (req, res) => {
    User.registerNewLetters(req.body.email, (result) => {
        res.json(result);
    })
});

router.post('/api/v1/user/password-recovery', (req, res) => {
    User.requireForgetPassword(req.body.email, (result) => {
        if (result.token && result.user) {
            Mail.sendMailWithForgetPassword(result.user, result.token, (cb) => {
                res.json(cb);
            });
        } else {
            res.json(result);
        }
    });
});

router.put('/api/v1/user/password-recovery', (req, res) => {
    User.recoveryPassword(req.body.email, req.body.token, req.body.password, (r) => {
        if (r.user) {
            User.signOutAllDevices(r.user._id, (c) => {
                res.json(c);
            });
        } else {
            res.json(r);
        }
    });
});

router.put('/api/v1/user/update-informations', [auth.requireAuth], (req, res) => {
    User.editUser(req.user._id, req.body.user, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/user', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.getUser(req.query.id, (result) => {
        res.json(result);
    });
});

router.put('/api/v1/user', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.editUser(req.body.id, req.body.properties, (result) => {
        res.json(result);
    });
});

router.post('/api/v1/user', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.newUser(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/api/v1/user', [auth.requireAuth, auth.requireRole], (req, res) => {
    User.deleteUser(req.body.id, (result) => {
        res.json(result);
    });
});

//#endregion APIS FOR USER

//#region APIS FOR PRODUCT

router.get('/api/v1/product/get-products', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getProducts(null, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/product/get-product', (req, res) => {
    Product.getProductById(req.query.id, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/product', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.getProductById(req.query.id, (result) => {
        res.json(result)
    })
})

router.get('/api/v1/product/get-products-by-type', (req, res) => {

    var id = req.query.id;
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

router.get('/api/v1/product/get-products-by-category', (req, res) => {

    if (req.query.category && req.query.from && req.query.action) {
        Product.getProductsByCategoryWithPagination(req.query.category, req.query.from, 12, req.query.action, (result) => {
            res.json(result);
        });
        return
    } else if (req.query.idCategory && req.query.idRootCategory) {
        res.redis.getItem('products', `get-products-by-category?idCategory=${req.query.idCategory}&idRootCategory=${req.query.idRootCategory}`, (data) => {
            if (data) {
                res.json({
                    products: data
                });
            } else {
                Product.getProductsByCategory(req.query.idCategory, req.query.idRootCategory, req.query.limit || 15, (result) => {
                    if (result.products && result.products.length > 0) {
                        res.redis.setItem('products', `get-products-by-category?idCategory=${req.query.idCategory}&idRootCategory=${req.query.idRootCategory}`, result.products);
                    }
                    res.json(result);
                });
            }
        });
        return
    }
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

router.get('/api/v1/product/count-products', [auth.requireAuth, auth.requireRole], (req, res) => {
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

router.get('/api/v1/product/search-product', (req, res) => {
    Product.searchProducts(req.query.text, (result) => {

        if (result.products && result.products.length != 0) {
            SearchKeyword.insert(req.params.text, (result) => { });
        }

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

router.post('/api/v1/product', [auth.requireAuth, auth.requireRole, helper.upload(true, true).array('images', 6)], (req, res) => {
    Product.newProduct(req.body, (result) => {

        if (!result.error) {
            res.redis.delItem('products', ['get-new-products', '/product/list', 'products-by-categories', 'get-products-by-type']);
        }

        res.json(result);
    });
});

router.post('/api/v1/product/duplicate', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.duplicate(req.body.id, (result) => {
        res.json(result)
    })
});

router.put('/api/v1/product', [auth.requireAuth, auth.requireRole, helper.upload(true, true).array('images', 6)], (req, res) => {
    Product.editProduct(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('products');
        }

        res.json(result);
    });
});

router.put('/api/v1/product/update-quantity', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.editQuantity(req.body.id, req.body.color, req.body.quantity, (result) => {

        if (!result.error) {
            res.redis.delItem('products', ['get-new-products', '/product/list', 'products-by-categories', 'get-products-by-type', `getProduct?id=${req.body.id}`]);
        }

    })
});

router.put('/api/v1/product/update-status', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.editStatus(req.body.id, req.body.status, (result) => {

        if (!result.error) {
            res.redis.delItem('products', ['get-new-products', '/product/list', 'products-by-categories', 'get-products-by-type', `getProduct?id=${req.body.id}`]);
        }

        res.json(result)
    })
});

router.delete('/api/v1/product', [auth.requireAuth, auth.requireRole], (req, res) => {
    Product.deleteProduct(req.body.id, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('products');
        }

        res.json(result);
    });
});

//#endregion APIS FOR PRODUCT

//#region APIS FOR CATEGORY
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

router.get('/api/v1/category', (req, res) => {
    res.redis.getItem('category', `category?id=${req.query.id}`, (data) => {
        if (data) {
            res.json({
                category: data
            });
        } else {
            Category.getCategory(req.query.id, (result) => {
                if (result.category) {
                    res.redis.setItem('category', `category?id=${req.query.id}`, result.category);
                }
                res.json(result);
            });
        }
    });
});

router.post('/api/v1/category', [auth.requireAuth, auth.requireRole], helper.upload(true, true).single('icon'), (req, res) => {
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

router.delete('/api/v1/category', [auth.requireAuth, auth.requireRole], (req, res) => {
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

router.put('/api/v1/category', [auth.requireAuth, auth.requireRole], helper.upload(true, true).single('new_icon'), (req, res) => {
    Category.editCategory(req.body, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('category', ['get-categories', `category?id=${req.body.current_root_category}`])
        }

        res.json(result);
    })
});

//#endregion APIS FOR CATEGORY

//#region APIS FOR TYPE
router.get('/api/v1/type/get-types', [auth.requireAuth, auth.requireRole], (req, res) => {
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
//#endregion APIS FOR TYPE

//#region APIS FOR BRAND
router.get('/api/v1/brand/get-brands', [auth.requireAuth, auth.requireRole], (req, res) => {
    Brand.getBrands((result) => {
        res.json(result);
    });
});

router.post('/api/v1/brand', [auth.requireAuth, auth.requireRole], helper.upload(true, true).single('image'), (req, res) => {
    Brand.newBrand(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});

router.put('/api/v1/brand', [auth.requireAuth, auth.requireRole], helper.upload(true, true).single('image'), (req, res) => {
    Brand.editBrand(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});

router.delete('/api/v1/brand', [auth.requireAuth, auth.requireRole], (req, res) => {
    Brand.deleteBrand(req.body, (result) => {
        res.json({
            error: result.error
        });
    });
});

//#endregion APIS FOR BRAND

//#region APIS FOR ORDER
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

router.put('/api/v1/order/update-status', [auth.requireAuth, auth.requireRole], (req, res) => {
    Order.updateStatus(req.body.id, req.body.status, (result) => {

        if (result.order) {
            res.redis.delItem('order', [`get-order?id=${result.order.alias}&email=${req.user.email}`]);
        }

        res.json(result)
    });
});

router.get('/api/v1/order/get-my-orders', [auth.requireAuth], (req, res) => {
    Order.getMyOrdersWithExcept(req.query.idOrder, req.user._id, (result) => {
        res.json({
            error: result.error,
            orders: result.orders,
            user: req.user
        })
    })
});

router.post('/api/v1/order/check-out', (req, res) => {

    if (req.session.order) {
        if (Order.compareCurrentOrder(req.session.order._id, req.session.order.products, req.body.parameters.products)) {
            res.json({
                order: req.session.order
            });
            return
        }
        delete req.session.order;
    }

    if (!req.body.parameters) {
        res.json({
            error: 'No parameters'
        });
        return
    }
    var parameters = {
        products: req.body.parameters.products
    };

    if (req.body.parameters.promoCode) {
        parameters.promoCode = req.body.parameters.promoCode;
        parameters.discount = req.body.parameters.discount;
    }

    if (req.session.token && req.session.user) {
        User.verify(req.session.token, (cb) => {
            if (cb.error || !cb.user) {
                req.session.destroy();
            } else {
                parameters.byUser = cb.user
            }

            Order.initOrder(parameters, (response) => {
                if (response.order) {
                    req.session.order = response.order;
                }
                res.json(response);
            });
        });
    } else {
        Order.initOrder(parameters, (response) => {
            if (response.order) {
                req.session.order = response.order;
            }
            res.json(response);
        });
    }
});

router.put('/api/v1/order/check-out', (req, res) => {
    if (!req.session.order) {
        res.json({
            error: 'Your order not found'
        });
        return
    }

    Order.updateOrder(req.session.order, req.body, (result) => {
        if (result.order) {
            req.session.order = result.order;

            if (result.order.status == 1) {
                res.io.emit('new-order', [result.order]);
                Mail.sendMailWithConfirmOrder(result.order);
                delete req.session.order;
            }
        }
        res.json(result)
    });
});

router.post('/api/v1/order/request-payment', (req, res) => {

    if (!req.session.order || !req.session.token) {
        res.json({
            error: "Đơn hàng không hợp lệ hoặc đã bị lỗi."
        });
        return
    }

    var id = req.session.order._id;
    if (!id) {
        res.json({
            error: "Đơn hàng không hợp lệ hoặc đã bị lỗi."
        });
    }

    if (!req.body.method) {
        workflow.emit('response', {
            error: "Không tìm thấy phương thức thanh toán vui lòng chọn loại phương thức khác!"
        });
        return
    }

    Order.requestPayment(id, req.body.method, (result) => {
        res.json(result);
    });
});

router.post('/api/v1/order/confirm-checkout', (req, res) => {
});

router.post('/api/v1/order/tracking-order', (req, res) => {
    var id = req.body.id,
        email = req.body.email;
    if (!id) {
        res.json({
            error: "Mã đơn hàng bị thiếu"
        });
        return
    }

    if (!email) {
        res.json({
            error: "Email bị thiếu"
        });
        return
    }

    res.redis.getItem('order', `get-order?id=${id}&email=${email}`, (data) => {
        if (data) {
            res.json({
                order: data,
                token: req.session.token,
                user: req.session.user,
            });
        } else {
            Order.checkOrder(id, email, (result) => {
                if (result.order) {
                    res.redis.setItem('order', `get-order?id=${id}&email=${email}`, result.order);
                }
                res.json({
                    token: req.session.token,
                    user: req.session.user,
                    error: result.error,
                    order: result.order
                });
            });
        }
    })
});

router.put('/api/v1/order/cancel-order', [auth.requireAuth], (req, res) => {
    Order.cancelOrder(req.body.idOrder, req.user._id, (result) => {
        //success
        if (result.order) {
            res.redis.delItem('order', [`get-order?id=${result.order.alias}&email=${req.user.email}`])
        }

        res.json(result)
    });
});

router.put('/api/v1/order', [auth.requireAuth, auth.requireRole], (req, res) => {
    Order.updateOrder({ _id: req.body.id }, req.body.parameters, (result) => {

        if (result.order) {
            if (result.order.status == 2) {
                Mail.sendMailWithSuccessOrder(result.order);
            }
            res.redis.delItem('order', [`get-order?id=${result.order.alias}&email=${req.user.email}`])
        }

        res.json(result)
    })
})

//#endregion APIS FOR ORDER

//#region APIS FOR REVIEW
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
    Review.getNewReviews((result) => {
        res.json(result);
    });
});

router.post('/api/v1/review', [auth.requireAuth], (req, res) => {
    Review.reviewProduct(req.user, req.body.review, (result) => {
        res.json(result)
    });
});

router.put('/api/v1/review', [auth.requireAuth, auth.requireRole], (req, res) => {
    Review.updateReview(req.body.id, req.body.parameters, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('review');
            res.redis.delItem('products', [`get-reviews?id=${req.body.id}`])
        }

        res.json(result)
    });
});

router.delete('/api/v1/review', [auth.requireAuth, auth.requireRole], (req, res) => {
    Review.deleteReview(req.body.id, (result) => {

        //update cache
        if (!result.error) {
            res.redis.delItem('review');
            res.redis.delItem('products', [`get-reviews?id=${req.body.id}`])
        }

        res.json(result);
    });
});

//#endregion APIS FOR REVIEW

//#region APIS FOR ANALYTICS
router.get('/api/v1/get-satisfied-client', [auth.requireAuth, auth.requireRole], (req, res) => {
    Analytic.satisfiedClient((result) => {
        res.json(result);
    });
});

router.get('/api/v1/get-revenue', [auth.requireAuth, auth.requireRole], (req, res) => {
    Analytic.revenue(req.query.year, (result) => {
        res.json(result);
    });
});

router.get('/api/v1/get-top-keyword', [auth.requireAuth, auth.requireRole], (req, res) => {
    SearchKeyword.gets((result) => {
        res.json(result)
    });
});

router.get('/api/v1/get-top-search-product', [auth.requireAuth, auth.requireRole], (req, res) => {
    SearchProduct.gets((result) => {
        res.json(result)
    })
});

router.get('/api/v1/get-best-sold-products', [auth.requireAuth, auth.requireRole], (req, res) => {
    Analytic.sellestProducts((result) => {
        res.json(result);
    });
});

//#endregion APIS FOR ANALYTICS

//#region APIS FOR PROMOTION

router.get('/api/v1/get-promotions', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.gets((result) => {
        res.json(result)
    });
});

router.get('/api/v1/get-promotion', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.get(req.query.id, (result) => {
        res.json(result)
    })
})

router.post('/api/v1/promotion', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.new(req.body, (result) => {
        res.json(result)
    })
})

router.put('/api/v1/promotion', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.edit(req.body, (result) => {
        res.json(result)
    });
});

router.delete('/api/v1/promotion', [auth.requireAuth, auth.requireRole], (req, res) => {
    Promotion.delete(req.body.id, (result) => {
        res.json(result)
    })
})

router.post('/api/v1/check-promo-code', (req, res) => {
    Promotion.check(req.body.promo_code, (result) => {
        res.json(result)
    })
});


//#endregion APIS FOR PROMOTION

//#region APIS FOR ROLE
router.get('/api/v1/role/get-roles', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.getRoles((result) => {
        res.json(result);
    });
});

router.get('/api/v1/role/get-routers', [auth.requireAuth, auth.requireRole], (req, res) => {
    helper.getAllRouter(req.app._router.stack, (cb) => {
        res.json(cb);
    });
});

router.get('/api/v1/role', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.getRole(req.query.id, (result) => {
        res.json(result);
    });
});

router.post('/api/v1/role', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.newRole(req.body, (result) => {
        res.json(result);
    });
});

router.put('/api/v1/role', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.editRole(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/api/v1/role', [auth.requireAuth, auth.requireRole], (req, res) => {
    Role.deleteRole(req.body, (result) => {
        res.json(result);
    });
});


//#endregion APIS FOR ROLE

//#region APIS FOR DATABASE
router.post('/api/v1/database/back-up', [auth.requireAuth, auth.requireRole], (req, res) => {
    Settings.backupDatabase((result) => {
        res.json(result);
    });
});

router.get('/api/v1/database/back-up', [auth.requireAuth, auth.requireRole], (req, res) => {
    Settings.downloadBackup(req.query.path, req.query.fileName, (result) => {
        if (result.error) {
            res.json({
                error: result.error
            });
        } else {
            res.download(result.path, result.fileName);
        }
    });
});

router.get('/api/v1/database/get-list-backups', [auth.requireAuth, auth.requireRole], (req, res) => {
    Settings.getListBackupDatabases((result) => {
        res.json(result)
    })
});

router.delete('/api/v1/database', [auth.requireAuth, auth.requireRole], (req, res) => {
    Settings.removeBackUpFile(req.body.path, req.body.fileName, (result) => {
        res.json(result)
    });
});

router.post('/api/v1/database/restore', [auth.requireAuth, helper.upload(false, false, path.join(__dirname, '..', 'uploads', 'backups')).single('file')], (req, res) => {
    Settings.restoreDatabase(req.body.filePath, req.body.fileName, (result) => {
        res.json(result)
    });
});

//#endregion APIS FOR DATABASE

module.exports = router;
