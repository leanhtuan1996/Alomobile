'use strict';

var session = require('express-session');
var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var User = require('../models/index').user;
var Product = require('../models/index').product;
var Review = require('../models/index').review;
var Order = require('../models/index').order;

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
        Product.findById(id).select('name brand alias images details').exec((err, product) => {
            workflow.emit('response', {
                error: err,
                product: product
            });
        });
    });

    workflow.emit('validate-parameters');
}

var reviewProduct = (user, review, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!user) {
            workflow.emit('response', {
                error: "Vui lòng đăng nhập để sử dụng chức năng này!"
            });
            return
        }

        if (!review) {
            workflow.emit('response', {
                error: "Vui lòng nhập nhận xét!"
            });
            return
        } else {
            if (!review.product) {
                workflow.emit('response', {
                    error: "Sản phẩm vừa nhận xét không được tìm thấy!"
                });
                return
            }

            if (!review.star) {
                workflow.emit('response', {
                    error: "Vui lòng đánh giá chất lượng sản phẩm!"
                });
                return
            }

            if (!review.title) {
                workflow.emit('response', {
                    error: "Vui lòng nhập tiêu đề đánh giá!"
                });
                return
            }

            if (!review.content) {
                workflow.emit('response', {
                    error: "Vui lòng nhập nội dung đánh giá!"
                });
                return
            }
        }

        workflow.emit('review');

    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('review', () => {
        Product.findById(review.product, (err, product) => {
            if (err || !product) {
                workflow.emit('response', {
                    error: "Sản phẩm không tìm thấy, vui lòng tải lại trang và thử lại."
                });
                return
            }

            var newReview = new Review({
                byUser: user._id,
                product: review.product,
                star: review.star,
                title: review.title,
                content: review.content
            });

            newReview.save((err) => {
                workflow.emit('response', {
                    error: err,
                    review: newReview
                });
            });          
        });
    });

    workflow.emit('validate-parameters');
}

var getReviews = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('get', () => {
        Review.find({}).populate({
            path: 'product',
            model: 'Product',
            select: 'name'
        }).populate({
            path: 'byUser',
            model: 'User',
            select: 'fullName'
        }).exec((err, reviews) => {
            workflow.emit('response', {
                error: err,
                reviews: reviews
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getRequestReviews = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get');
    });


    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('get', () => {
        Review.find({ status: 0 }).populate({
            path: 'product',
            model: 'Product',
            select: 'name'
        }).populate({
            path: 'byUser',
            model: 'User',
            select: 'fullName'
        }).exec((err, reviews) => {
            workflow.emit('response', {
                error: err,
                reviews: reviews
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getDismissReviews = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get');
    });


    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('get', () => {
        Review.find({ status: 2 }).populate({
            path: 'product',
            model: 'Product',
            select: 'name'
        }).populate({
            path: 'byUser',
            model: 'User',
            select: 'fullName'
        }).exec((err, reviews) => {
            workflow.emit('response', {
                error: err,
                reviews: reviews
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getReviewsWithProduct = (product, status = true, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!product) {
            workflow.emit('response', {
                error: "Sản phẩm không được tìm thấy!"
            });
            return
        }

        workflow.emit('get-reviews');
    });

    workflow.on('get-reviews', () => {
        Review.find({
            product: product,
            status: 1
        }).populate({
            path: 'byUser',
            model: 'User',
            select: 'fullName email'
        }).lean().exec((err, reviews) => {
            if (reviews && reviews.length > 0) {
                reviews.forEach((review, index) => {
                    isBoughtProduct(product, byUser._id, (isBought) => {
                        console.log(isBought);
                        review.isBought = isBought;
                        workflow.emit('populate-bought', reviews.length, review);
                    });
                })
            } else {
                workflow.emit('response', {
                    error: err
                })
            }
        })
    });

    var reviews = [];

    workflow.on('populate-bought', (maxLength, review) => {
        reviews.push(review)
        if (reviews.length == maxLength) {
            workflow.emit('response', {
                reviews: reviews
            });
        }
    })

    workflow.on('response', (response) => {
        return cb(response)
    })
    workflow.emit('validate-parameters');
}

var updateReview = (id, parameters, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Mã nhận xét không tìm thấy"
            });
            return
        }

        if (!parameters) {
            workflow.emit('response', {
                error: "Không có tham số cần chỉnh sửa"
            });
            return
        }

        workflow.emit('update');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('update', () => {
        Review.findById(id, (err, review) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!review) {
                workflow.emit('response', {
                    error: "Không tìm thấy nhận xét này"
                });
                return
            }

            if (parameters.star) {
                try {
                    review.star = Number.parseInt(parameters.star);
                } catch (error) {
                    workflow.emit('response', {
                        error: error
                    });
                }
            }

            if (parameters.title) {
                review.title = parameters.title;
            }

            if (parameters.content) {
                review.content = parameters.content;
            }

            if (parameters.status) {
                review.status = parameters.status
            }

            review.save((err) => {
                workflow.emit('response', {
                    error: err
                });
            });
        });
    });

    workflow.emit('validate-parameters');
};

var deleteReview = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Mã nhận xét không tìm thấy"
            });
            return
        }

        workflow.emit('delete');
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('delete', () => {
        Review.findByIdAndRemove(id, (err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var getNewReviews = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get');
    });


    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.on('get', () => {
        Review.find({})
            .limit(5)
            .sort('-created_at')
            .populate({
                path: 'product',
                model: 'Product',
                select: 'name'
            }).populate({
                path: 'byUser',
                model: 'User',
                select: 'fullName'
            }).exec((err, reviews) => {
                workflow.emit('response', {
                    error: err,
                    reviews: reviews
                });
            });
    });

    workflow.emit('validate-parameters');
}

var getMyReviews = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id of user is required!"
            });
            return
        }

        workflow.emit('get')
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('get', () => {
        Review.find({
            byUser: id
        }).populate({
            path: 'product',
            model: 'Product',
            select: 'alias name details'
        }).exec((err, reviews) => {
            workflow.emit('response', {
                error: err,
                reviews: reviews
            })
        })
    })

    workflow.emit('validate-parameters');
}

var isBoughtProduct = (idProduct, idUser,  cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!idProduct || !idUser) {
            workflow.emit('response', false);
            return
        }

        workflow.emit('isBought');
    });

    workflow.on('response', (isBought) => {
        return cb(isBought)
    });

    workflow.on('isBought', () => {
        Order.find({
            byUser: idUser,
            "products.id": idProduct
        }).exec((err, orders) => {    
            if (orders && orders.length > 0) {
                workflow.emit('response', true)
            } else {
                workflow.emit('response', false)
            }
        })
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    getRequestReviews: getRequestReviews,
    updateReview: updateReview,
    deleteReview: deleteReview,
    getDismissReviews: getDismissReviews,
    getReviews: getReviews,
    getNewReviews: getNewReviews,
    getMyReviews: getMyReviews,
    isBoughtProduct: isBoughtProduct,
    reviewProduct: reviewProduct
}