var express = require('express');
var router = express.Router();

var Product = require('../app/controllers/index').product;

router.get('/product/list', (req, res) => {
    Product.getProducts((response) => {
        res.json(response);
    });
});

router.get('/product/listNew/', (req, res) => {
    Product.getNewProducts(10, (response) => {
        res.json(response);
    });
});

router.get('/product/listNew/limit=:limit', (req, res) => {
    Product.getNewProducts(req.params.limit, (response) => {
        res.json(response);
    });
});

router.get("/product/listSpecial", (req, res) => {
    Product.getSpecialProducts(10, (response) => {
        res.json(response);
    });
});

router.get("/product/listSpecial/limit=:limit", (req, res) => {
    Product.getSpecialProducts(parseInt(req.params.limit), (response) => {
        res.json(response);
    });
});

router.get("/product/listHot", (req, res) => {
    Product.getHotProducts(20, (response) => {
        res.json(response);
    });
});

router.get("/product/listHot/limit=:limit", (req, res) => {
    Product.getHotProducts(parseInt(req.params.limit), (response) => {
        res.json(response);
    });
});

router.get('/product/type/:type', (req, res) => {
    Product.getProductsByType(req.params.type, 10, (response) => {
        res.json(response);
    });
});

router.get('/product/type/:type/limit=:limit', (req, res) => {
    Product.getProductsByType(req.params.type, parseInt(req.params.limit), (response) => {
        res.json(response);
    });
});

router.get('/product/getCount', (req, res) => {
    Product.getCountProducts((response) => {
        res.json(response);
    });
});

router.get('/product/search/text=:text', (req, res) => {

});

module.exports = router;