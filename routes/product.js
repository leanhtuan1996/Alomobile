var express = require('express');
var router = express.Router();

var Product = require('../app/controllers/index').product;

router.get('/product/list', (req, res) => {
    Product.getProducts((response) => {
        res.json(response);
    });
});

router.get('/product/listNew', (req, res) => {
    Product.getNewProducts((response) => {
        res.json(response);
    });
});

router.get("/product/listSpecial", (req, res) => {
    Product.getSpecialProducts((response) => {
        res.json(response);
    });
});

router.get(`/product/listHot`, (req, res) => {
    Product.getHotProducts((response) => {
        res.json(response);
    });
});

router.get('/product/type/:type', (req, res) => {
    Product.getProductsByType(req.params.type, (response) => {
        res.json(response);
    });
});

module.exports = router;