'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var Order = require('../models/index').order;
var Review = require('../models/index').review;

var satisfiedClient = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('satisfied');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('satisfied', () => {
        Review.find({}, (err, reviews) => {
            if (err) {
                workflow.emit('response', {
                    error: err
                });
                return
            }

            if (!reviews || reviews.length == 0) {
                workflow.emit('response', {
                    reviews: []
                });
                return
            }

            var satisfied = 0;
            var unsatisfied = 0;
            var totalReview = 0;

            reviews.forEach(review => {
                if (review.status != 0) {
                    if (review.star <= 2) {
                        unsatisfied += 1;
                    } else if (review.star >= 4) {
                        satisfied += 1;
                    }
                    totalReview += 1;
                }
            });

            var satisfiedOfClient = (satisfied / (satisfied + unsatisfied)) * 100;

            workflow.emit('response', {
                satisfied: satisfied,
                unsatisfied: unsatisfied,
                totalReview: totalReview,
                satisfiedOfClient: satisfiedOfClient
            });
        });
    });

    workflow.emit('validate-parameters');
}

var revenue = (year = Date.now(), cb) => {
    var newYear;
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {

        try {
            newYear = new Date(year).getFullYear();
        } catch (error) {
            workflow.emit('response', {
                error: error
            });
            return
        }

        workflow.emit('revenue', newYear);
    });

    workflow.on('revenue', (newYear) => {
        var minMonth = new Date(`01/01/${newYear}`).getTime();
        var maxMonth = new Date(`12/31/${newYear}`).getTime();

        Order.find({
            status: 6,
            created_at: {
                $gte: minMonth,
                $lte: maxMonth
            }
        })
            .select('products created_at promoCode')
            .exec((err, orders) => {

                if (err) {
                    workflow.emit('response', {
                        error: err
                    });
                    return
                }

                var data = {
                    "1": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "2": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "3": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "4": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "5": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "6": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "7": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "8": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "9": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "10": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "11": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    },
                    "12": {
                        orders: 0,
                        revenue: 0,
                        profit: 0
                    }
                };

                var totalRevenue = 0;
                var totalOrders = 0;
                var totalProfits = 0;

                if (!orders || orders.length == 0) {
                    workflow.emit('response', {
                        error: err,
                        data: {
                            year: newYear,
                            totalOrders: totalOrders,
                            totalRevenue: totalRevenue,
                            analytics: data
                        }
                    });
                    return
                }

                orders.forEach(order => {
                    var orderDate = new Date(order.created_at).getMonth() + 1;                   

                    totalOrders += 1;

                    var revenue = 0;
                    var profit = 0;
                    var discount = 0;

                    if (order.promoCode) {
                        discount = order.promoCode.discount || 0;
                    }

                    order.products.forEach(product => {
                        
                        if (product.basePrice) {
                            profit += (product.price - product.basePrice) * product.quantity;
                        }

                        revenue += product.price * product.quantity;
                    });

                    profit = profit - discount;

                    totalProfits += profit;
                    totalRevenue += revenue;

                    switch (orderDate) {
                        case 1:
                            data["1"].orders++;
                            data["1"].revenue += revenue;
                            data["1"].profit += profit;
                            break;
                        case 2:
                            data["2"].orders++;
                            data["2"].revenue += revenue;
                            data["2"].profit += profit;
                            break;
                        case 3:
                            data["3"].orders++;
                            data["3"].revenue += revenue;
                            data["3"].profit += profit;
                            break;
                        case 4:
                            data["4"].orders++;
                            data["4"].revenue += revenue;
                            data["4"].profit += profit;
                            break;
                        case 5:
                            data["5"].orders++;
                            data["5"].revenue += revenue;
                            data["5"].profit += profit;
                            break;
                        case 6:
                            data["6"].orders++;
                            data["6"].revenue += revenue;
                            data["6"].profit += profit;
                            break;
                        case 7:
                            data["7"].orders++;
                            data["7"].revenue += revenue;
                            data["7"].profit += profit;
                            break;
                        case 8:
                            data["8"].orders++;
                            data["8"].revenue += revenue;
                            data["8"].profit += profit;
                            break;
                        case 9:
                            data["9"].orders++;
                            data["9"].revenue += revenue;
                            data["9"].profit += profit;
                            break;
                        case 10:
                            data["10"].orders++;
                            data["10"].revenue += revenue;
                            data["10"].profit += profit;
                            break;
                        case 11:
                            data["11"].orders++;
                            data["11"].revenue += revenue;
                            data["11"].profit += profit;
                            break;
                        case 12:
                            data["12"].orders++;
                            data["12"].revenue += revenue;
                            data["12"].profit += profit;
                            break;
                    }
                });

                workflow.emit('response', {
                    error: err,
                    data: {
                        year: newYear,
                        totalOrders: totalOrders,
                        totalRevenue: totalRevenue,
                        totalProfits: totalProfits,
                        analytics: data
                    }
                });
            });
    });

    workflow.on('response', (response) => {
        return cb(response);
    });

    workflow.emit('validate-parameters');
}

var sellestProducts = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('sellest-products');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('sellest-products', () => {

        Order.aggregate([
            {
                $unwind: "$products"
            },
            {
                $group: {
                    "_id": {
                        "product": "$products"
                    },
                    "countProduct": { "$sum": 1 }
                }
            },
            {
                $group: {
                    "_id": "$_id.product.id",
                    "count": {
                        "$sum": "$countProduct"
                    }
                }
            },
            {
                $sort: {
                    "count": -1
                }
            },
            {
                $limit: 5
            }
        ], (err, products) => {
            if (products.length > 0) {
                Order.populate(products, {
                    path: "_id",
                    model: "Product",
                    select: "name alias"
                }, (err, result) => {
                    workflow.emit('response', {
                        error: err,
                        products: result
                    });
                });
            }
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    satisfiedClient: satisfiedClient,
    revenue: revenue,
    sellestProducts: sellestProducts
}