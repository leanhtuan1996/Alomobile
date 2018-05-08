var express = require('express');
var router = express.Router();
var url = require('url');

var SearchProduct = require('../app/api/index').searchProduct;
var Product = require('../app/api/index').product;

router.get('^\/[a-zA-Z0-9]{1,}-[a-zA-z0-9-+]{1,}$', (req, res, next) => {
    var URL = url.parse(req.url);
    var des = URL.pathname;
    
    var keyword;

    if (URL.query) {
        if (URL.query.startsWith('keyword')) {
            keyword = URL.query.split('=')[1];
        }
    }    

    if (des) {
        var t = des.split('-');

        if (!t) {
            next();
            return
        }

        var id = t[t.length - 1];

        if (!id) {
            next();
            return
        }

        res.redis.getItem('products', `getProduct?id=${id}`, (data) => {
            if (data) {

                if (keyword) {
                    SearchProduct.insert(keyword, id, data.name, (result) => { })
                }

                res.render('detail-product', {
                    data: {
                        token: req.session.token,
                        user: req.session.user,
                        title: data.name,
                        product: data
                    }
                });
            } else {
                Product.getProductById(id, (result) => {
                    if (result.error) {
                        next();
                        return
                    }

                    var product = result.product;
                    if (!product) {
                        next();
                        return
                    }
                    res.redis.setItem('products', `getProduct?id=${id}`, product);

                    if (keyword) {
                        SearchProduct.insert(keyword, id, product.name, (result) => { })
                    }

                    res.render('detail-product', {
                        data: {
                            token: req.session.token,
                            user: req.session.user,
                            title: product.name,
                            product: product
                        }
                    });
                });
            }
        });
    } else {
        next();
        return
    }
});

router.get('\/danh-muc\/[a-zA-Z-0-9\/]{1,}', (req, res, next) => {
    var url = req.url;
    if (url) {
        var t = url.split('/');
        if (t) {
            var a = t[t.length - 1].split('-');
            if (a) {
                var matches = [];
                a.forEach(element => {
                    var ma = element.match(/^[a-z0-9]{24}$/g);
                    if (ma) {
                        matches.push(ma[0]);
                    }
                });

                if (matches.length == 0) {
                    next();
                    return
                } else {
                    if (matches.length == 1) {
                        res.redis.getItem('products', `products-by-categories?idRootCategory=${matches[0]}&idCategory=${matches[0]}`, (data) => {
                            if (data) {
                                res.render('products-by-categories', {
                                    data: {
                                        token: req.session.token,
                                        user: req.session.user,
                                        products: data || [],
                                        idRootCategory: matches[0],
                                        idCategory: matches[0]
                                    }
                                });
                            } else {
                                Product.getProductsByCategory(matches[0], matches[0], 12, (r) => {
                                    if (r.products && r.products.length > 0) {
                                        res.redis.setItem('products', `products-by-categories?idRootCategory=${matches[0]}&idCategory=${matches[0]}`, r.products);
                                    }

                                    res.render('products-by-categories', {
                                        data: {
                                            token: req.session.token,
                                            user: req.session.user,
                                            products: r.products || [],
                                            idRootCategory: matches[0],
                                            idCategory: matches[0]
                                        }
                                    });
                                });
                            }
                        });
                    } else if (matches.length == 2) {

                        res.redis.getItem('products', `products-by-categories?idRootCategory=${matches[0]}&idCategory=${matches[1]}`, (data) => {
                            if (data) {
                                res.render('products-by-categories', {
                                    data: {
                                        token: req.session.token,
                                        user: req.session.user,
                                        products: data || [],
                                        idRootCategory: matches[0],
                                        idCategory: matches[1]
                                    }
                                });
                            } else {
                                Product.getProductsByCategory(matches[1], matches[0], 12, (r) => {

                                    if (r.products && r.products.length > 0) {
                                        res.redis.setItem('products', `products-by-categories?idRootCategory=${matches[0]}&idCategory=${matches[1]}`, r.products);
                                    }

                                    res.render('products-by-categories', {
                                        data: {
                                            token: req.session.token,
                                            user: req.session.user,
                                            products: r.products || [],
                                            idRootCategory: matches[0],
                                            idCategory: matches[1]
                                        }
                                    });
                                });
                            }
                        });                        
                    } else {
                        next();
                    }
                }
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

module.exports = router;