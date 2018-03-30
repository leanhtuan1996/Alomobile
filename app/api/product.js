'use strict';

var session = require('express-session');
var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var User = require('../models/index').user;
var Product = require('../models/index').product;
var Brand = require('../models/index').brand;
var Category = require('../models/index').category;

var getProducts = (prevProduct, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product.find({
            created_at: {
                $lt: prevProduct == null ? Date.now() : (prevProduct == null ? Date.now() : prevProduct)
            }
        })
            .populate('brand')
            .limit(15)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getPrevProducts = (nextProduct, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product.find({
            created_at: {
                $gt: nextProduct == null ? Date.now() : (nextProduct == null ? Date.now() : nextProduct)
            }
        })
            .populate('brand')
            .limit(15)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getProductById = (id, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', 'Id product is required!');
        } else {
            workflow.emit('get-product');
        }
    });

    workflow.on('response', (response) => {
        return result(response)
    });

    workflow.on('get-product', () => {
        Product
            .findById(id)
            .populate({
                path: "brand"
            })
            .populate({
                path: "type"
            })
            .populate({
                path: "category.idRootCategory"
            })
            .exec((err, product) => {
                workflow.emit('response', {
                    error: err,
                    product: product
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getSpecialProducts = (limit, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product
            .find({})
            .limit(limit || 10)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getProductsByType = (idType, limit, result) => {

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!idType) {
            workflow.emit('response', {
                error: "Type of product is required!"
            });
            return
        }

        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product
            .find({
                type: idType
            })
            .limit(limit || 15)
            .sort('-created_at')
            .select('name alias images quantity prices')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products || []
                });
            });

    });

    workflow.emit('validate-parameters');
}

var getProductsByCategory = (idCategory, idRootCategory, limit, result) => {

    console.log(idCategory);
    console.log(idRootCategory);
    console.log(limit);

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!idCategory) {
            workflow.emit('response', {
                error: "Category is required!"
            });
            return
        }

        if (!idRootCategory) {
            workflow.emit('response', {
                error: "Root category is required!"
            });
            return
        }

        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {

        if (idRootCategory == idCategory) {
            Product
                .find({
                    "category.idRootCategory": idRootCategory
                })
                .limit(parseInt(limit))
                .exec((err, products) => {
                    workflow.emit('response', {
                        error: err,
                        products: products
                    });
                });
        } else {
            Product
                .find({
                    "category.idCategory": idCategory,
                    "category.idRootCategory": idRootCategory
                })
                .limit(limit)
                .exec((err, products) => {
                    workflow.emit('response', {
                        error: err,
                        products: products
                    });
                });
        }
    });

    workflow.emit('validate-parameters');
}

var getNewProducts = (limit, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product
            .find({})
            .limit(parseInt(limit) || 10)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getHotProducts = (limit, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-products', () => {
        Product
            .find({})
            .limit(limit || 10)
            .sort('-created_at')
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
}

var newProduct = (product, result) => {
    var workflow = new event.EventEmitter();

    var name = product.name;
    var alias = product.alias;
    var colors = product.colors;
    var brand = product.brand;
    var prices = product.prices;
    var specifications = product.specifications;
    var images = product.newNames;
    var type = product.type;
    var descriptions = product.descriptions;
    var metaTitle = product.metaTitle;
    var metaKeyword = product.metaKeyword;
    var category = JSON.parse(product.category);

    workflow.on('validate-parameters', () => {
        if (!name) {
            workflow.emit('response', {
                error: "Please enter name of product"
            });
            return
        }
        if (!alias) {
            workflow.emit('response', {
                error: "Please enter alias of product"
            });
            return
        }
        if (!prices) {
            workflow.emit('response', {
                error: "Please enter price of product"
            });
            return
        } else {
            prices = prices.map(price => {
                return JSON.parse(price);
            });
        }

        if (!images) {
            workflow.emit('response', {
                error: "Please provide images of product"
            });
            return
        }
        if (!type) {
            workflow.emit('response', {
                error: "Please choose type of product"
            });
            return
        }
        if (!brand) {
            workflow.emit('response', {
                error: "Please choose brand of product"
            });
            return
        }
        if (!descriptions) {
            workflow.emit('response', {
                error: "Please enter descriptions of product"
            });
            return
        }
        if (!colors || colors.length == 0) {
            workflow.emit('response', {
                error: "Please choose colors of product"
            });
            return
        } else {
            colors = colors.map((e, i) => {
                return JSON.parse(e);
            })
        }

        if (!(category.idRootCategory && category.idCategory)) {
            workflow.emit('response', {
                error: "Please choose category of product"
            });
            return
        }

        workflow.emit('new-product');

    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('new-product', () => {
        var newProduct = new Product();

        newProduct.name = name;
        newProduct.alias = alias;
        newProduct.colors = colors;
        newProduct.brand = brand;
        newProduct.category = category;
        newProduct.type = type;
        newProduct.descriptions = descriptions;
        newProduct.metaTitle = metaTitle;
        newProduct.metaKeyword = metaKeyword;
        newProduct.prices = prices;

        if (specifications) {
            newProduct.specifications = JSON.parse(specifications);
        }

        newProduct.images = [];
        _.forEach(images, (image) => {
            var object = {}
            object._id = mongoose.Types.ObjectId();
            object.url = '/static/img/' + image;
            object.alt = name;

            newProduct.images.push(object);
        });

        newProduct.save((err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getCountProducts = (result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get-count-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('get-count-products', () => {
        Product.count({}, (err, count) => {
            workflow.emit('response', {
                error: err,
                count: count
            });
        });
    });

    workflow.emit('validate-parameters');
}

var editProduct = (product, result) => {

    var workflow = new event.EventEmitter();

    var id = product.id;
    var name = product.name;
    var alias = product.alias;
    var colors = product.colors;
    var brand = product.brand;
    var prices = product.prices;
    var specifications = product.specifications;
    var newImages = product.newNames;
    var oldImages = product.originalImages;
    var type = product.type;
    var descriptions = product.descriptions;
    var metaTitle = product.metaTitle;
    var metaKeyword = product.metaKeyword;
    var category = JSON.parse(product.category);

    workflow.on('validate-parameters', () => {
        if (!name) {
            workflow.emit('response', {
                error: "Please enter name of product"
            });
            return
        }
        if (!alias) {
            workflow.emit('response', {
                error: "Please enter alias of product"
            });
            return
        }
        if (!prices) {
            workflow.emit('response', {
                error: "Please enter price of product"
            });
            return
        } else {
            prices = prices.map(price => {
                return JSON.parse(price);
            });
        }

        if (!newImages && !oldImages) {
            workflow.emit('response', {
                error: "Please provide images of product"
            });
            return
        } else {
            if (newImages && oldImages) {
                if (newImages.length + oldImages.length < 2) {
                    workflow.emit('response', {
                        error: "Please provide at least 2 images of product "
                    });
                    return
                }
            } else if (newImages && !oldImages) {
                if (newImages.length < 2) {
                    workflow.emit('response', {
                        error: "Please provide at least 2 images of product "
                    });
                    return
                }
            } else {
                if (oldImages.length < 2) {
                    workflow.emit('response', {
                        error: "Please provide at least 2 images of product "
                    });
                    return
                }
            }
        }

        if (!type) {
            workflow.emit('response', {
                error: "Please choose type of product"
            });
            return
        }
        if (!brand) {
            workflow.emit('response', {
                error: "Please choose brand of product"
            });
            return
        }
        if (!descriptions) {
            workflow.emit('response', {
                error: "Please enter descriptions of product"
            });
            return
        }

        if (!colors || colors.length == 0) {
            workflow.emit('response', {
                error: "Please choose colors of product"
            });
            return
        } else {
            colors = colors.map((e, i) => {
                return JSON.parse(e);
            })
        }

        if (!(category.idRootCategory && category.idCategory)) {
            workflow.emit('response', {
                error: "Please choose category of product"
            });
            return
        }

        workflow.emit('processing-images');

    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('processing-images', () => {
        //processing for images
        var tempImages = [];
        var productImages = [];

        if (newImages) {
            newImages.forEach(element => {
                tempImages.push(element)
            });
        }

        if (oldImages) {
            oldImages.forEach(element => {
                tempImages.push(element);
            });
        }

        _.forEach(tempImages, (image) => {
            var object = {}
            object._id = mongoose.Types.ObjectId();
            object.url = '/static/img/' + image;
            object.alt = name;

            productImages.push(object);
        });

        workflow.emit('new-product', productImages);
    });

    workflow.on('new-product', (imagesEdited) => {

        if (specifications) {
            specifications = JSON.parse(specifications);
        }

        Product.findById(id, (err, product) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!product) {
                workflow.emit('response', {
                    error: "Product not found"
                });
                return
            }

            product.name = name;
            product.alias = alias;
            product.colors = colors;
            product.brand = brand;
            product.metaKeyword = metaKeyword;
            product.metaTitle = metaTitle;
            product.category = category;
            product.type = type;
            product.descriptions = descriptions;
            product.images = imagesEdited;
            product.prices = prices;

            if (specifications) {
                product.specifications = specifications
            }

            product.save((err) => {
                workflow.emit('response', {
                    error: err
                });
            });
        });

    });

    workflow.emit('validate-parameters');
}

var deleteProduct = (id, result) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id || id == 'undefined') {
            workflow.emit('response', {
                error: "Id of Product is required!"
            });
            return
        }

        workflow.emit('delete-product');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('delete-product', () => {
        Product.findByIdAndRemove(id, (err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var searchProducts = (text, result) => {
    //name, price, brand, status, category, type

    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!text || text.length == 0) {
            workflow.emit('response', {
                error: "Please choose field to searching for products"
            });
            return
        }

        workflow.emit('search-products');
    });

    workflow.on('response', (response) => {
        return result(response);
    });

    workflow.on('search-products', () => {
        Product.find({
            $text: {
                $search: `/${text}/gi`,
                $caseSensitive: false
            }
        })
            .populate({
                path: "brand"
            })
            .populate({
                path: "type"
            }).populate({
                path: "category.idRootCategory"
            })
            .limit(15)
            .exec((err, products) => {
                workflow.emit('response', {
                    error: err,
                    products: products
                });
            });
    });

    workflow.emit('validate-parameters');
};

var getPreviewProduct = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id is required!"
            });
            return
        }

        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('get', () => {
        Product.findById(id).select('name alias colors images quantity prices').exec((err, product) => {
            workflow.emit('response', {
                error: err,
                product: product
            });
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getProducts: getProducts,
    getProductById: getProductById,
    getProductsByType: getProductsByType,
    getHotProducts: getHotProducts,
    getSpecialProducts: getSpecialProducts,
    getProductsByCategory: getProductsByCategory,
    getNewProducts: getNewProducts,
    newProduct: newProduct,
    getCountProducts: getCountProducts,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    getPrevProducts: getPrevProducts,
    searchProducts: searchProducts,
    getPreviewProduct: getPreviewProduct
}