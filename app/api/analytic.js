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
        .select('products created_at')
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
                    revenue: 0
                },
                "2": {
                    orders: 0,
                    revenue: 0
                },
                "3": {
                    orders: 0,
                    revenue: 0
                },
                "4": {
                    orders: 0,
                    revenue: 0
                },
                "5": {
                    orders: 0,
                    revenue: 0
                },
                "6": {
                    orders: 0,
                    revenue: 0
                },
                "7": {
                    orders: 0,
                    revenue: 0
                },
                "8": {
                    orders: 0,
                    revenue: 0
                },
                "9": {
                    orders: 0,
                    revenue: 0
                },
                "10": {
                    orders: 0,
                    revenue: 0
                },
                "11": {
                    orders: 0,
                    revenue: 0
                },
                "12": {
                    orders: 0,
                    revenue: 0
                }
            };

            var totalRevenue = 0;
            var totalOrders = 0;

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
                order.products.forEach(product => {
                    revenue += product.price * product.quantity;
                });

                totalRevenue += revenue;

                switch (orderDate) {
                    case 1:                       
                        data["1"].orders++;
                        data["1"].revenue+= revenue;
                        break;
                    case 2:
                        data["2"].orders++;
                        data["2"].revenue+= revenue;
                        break;
                    case 3:
                        data["3"].orders++;
                        data["3"].revenue+= revenue;
                        break;
                    case 4:
                        data["4"].orders++;
                        data["4"].revenue+= revenue;
                        break;
                    case 5:
                        data["5"].orders++;
                        data["5"].revenue+= revenue;
                        break;
                    case 6:
                        data["6"].orders++;
                        data["6"].revenue+= revenue;
                        break;
                    case 7:
                        data["7"].orders++;
                        data["7"].revenue+= revenue;
                        break;
                    case 8:
                        data["8"].orders++;
                        data["8"].revenue+= revenue;
                        break;
                    case 9:
                        data["9"].orders++;
                        data["9"].revenue+= revenue;
                        break;
                    case 10:
                        data["10"].orders++;
                        data["10"].revenue+= revenue;
                        break;
                    case 11:
                        data["11"].orders++;
                        data["11"].revenue+= revenue;
                        break;
                    case 12:
                        data["12"].orders++;
                        data["12"].revenue+= revenue;
                        break;                
                }
            });

            workflow.emit('response', {
                error: err,
                data: {
                    year: newYear,
                    totalOrders: totalOrders,
                    totalRevenue: totalRevenue,
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

module.exports = {
    satisfiedClient: satisfiedClient,
    revenue: revenue
}