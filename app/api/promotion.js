'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../helpers/index').helper;
var Promotion = require('../models/index').promotion;

var add = (promotion, cb) => {
    console.log(promotion);
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!promotion) {
            workflow.emit('response', {
                error: "Parameters is required!"
            });
            return
        }

        if (!promotion.description) {
            workflow.emit('response', {
                error: "Description of promotion is required!"
            });
            return
        }

        if (!promotion.code) {
            workflow.emit('response', {
                error: "Promo code is required!"
            });
            return
        }

        if (!promotion.discount) {
            workflow.emit('response', {
                error: "Discount of promotion is required!"
            });
            return
        } else {
            try {
                promotion.discount = Number.parseInt(promotion.discount);
            } catch (error) {
                workflow.emit('response', {
                    error: "Please enter a number of discount"
                });
                return
            }
        }

        if (promotion.limit) {
            try {
                promotion.limit = Number.parseInt(promotion.limit);
            } catch (error) {
                workflow.emit('response', {
                    error: "Please enter a number of limit"
                });
                return
            }
        } 

        if (promotion.totalMinOrder) {
            try {
                promotion.totalMinOrder = Number.parseInt(promotion.totalMinOrder);
            } catch (error) {
                workflow.emit('response', {
                    error: "Please enter a number of minimize price of bill"
                });
                return
            }
        } else {
            workflow.emit('response', {
                error: "Minimize price of order is required!"
            });
            return
        }

        if (promotion.maxDiscount) {
            try {
                promotion.maxDiscount = Number.parseInt(promotion.maxDiscount);
            } catch (error) {
                workflow.emit('response', {
                    error: "Please enter a number of maximun discount"
                });
                return
            }
        } else {
            workflow.emit('response', {
                error: "Maximun discount is required!"
            });
            return
        }

        if (promotion.start_at) {
            try {
                promotion.start_at = Number.parseInt(promotion.start_at)
            } catch (error) {
                workflow.emit('response', {
                    error: "Please enter a number of starting time promotion"
                })
            }
        }

        if (promotion.finish_at) {
            try {
                promotion.finish_at = Number.parseInt(promotion.finish_at)
            } catch (error) {
                workflow.emit('response', {
                    error: "Please enter a number of ending time promotion"
                })
            }
        }

        if (!promotion.type) {
            workflow.emit('response', {
                error: "Type of promotion is required!"
            });
            return
        }

        workflow.emit('new');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('new', () => {
        var newPromotion = new Promotion({
            description: promotion.description,
            code: promotion.code,
            discount: promotion.discount,
            type: promotion.type,
            totalMinOrder: promotion.totalMinOrder,
            maxDiscount: promotion.maxDiscount
        });

        if (promotion.limit) {
            newPromotion.limit = promotion.limit
        }

        if (promotion.start_at) {
            newPromotion.start_at = promotion.start_at
        }

        if (promotion.finish_at) {
            newPromotion.finish_at = promotion.finish_at
        }

        newPromotion.save((err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var edit = (parameters, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!parameters) {
            workflow.emit('response', {
                error: "Parameters is required!"
            });
            return
        }

        if (!parameters.id) {
            workflow.emit('response', {
                error: "Id of promotion is required!"
            });
            return
        }

        workflow.emit('edit');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('edit', () => {
        Promotion.findById(parameters.id, (err, promotion) => {
            if (err || !promotion) {
                workflow.emit('response', {
                    error: "Promotion not found"
                });
                return
            }

            if (parameters.description) {
                promotion.description = parameters.description
            }

            if (parameters.code) {
                promotion.code = parameters.code
            }

            if (parameters.type) {
                promotion.type = parameters.type
            }

            if (parameters.limit && Number.isInteger(parameters.limit)) {
                promotion.limit = parameters.limit
            }

            if (parameters.status && typeof parameters.status == 'boolean') {
                promotion.status = parameters.status
            }

            if (parameters.start_at && Number.isInteger(parameters.start_at)) {
                promotion.start_at = parameters.start_at
            }

            if (parameters.finish_at && Number.isInteger(parameters.finish_at)) {
                promotion.finish_at = parameters.finish_at
            }

            if (parameters.discount && Number.isInteger(parameters.discount)) {
                promotion.discount = parameters.discount
            }

            promotion.save((err) => {
                workflow.emit('response', {
                    error: err
                });
            });
        });
    });

    workflow.emit('validate-parameters');
}

var del = (id, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "Id of promotion is required!"
            })
            return
        }

        workflow.emit('delete');
    })

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('delete', () => {
        Promotion.findByIdAndRemove(id, (err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters')
}

var check = (promo_code, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!promo_code) {
            workflow.emit('response', {
                error: "Id of promotion is required!"
            });
            return
        }

        workflow.emit('use');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('use', () => {
        Promotion.findOne({
            code: promo_code
        }).exec((err, promotion) => {
            if (promotion) {
                if (promotion.status == false) {
                    workflow.emit('response', {
                        error: "Promo code was expired!"
                    });
                    return
                }

                if (promotion.limit && promotion.used) {
                    if (promotion.used == promotion.limit) {
                        workflow.emit('response', {
                            error: 'Promo code was expired!'
                        });
                        return
                    }
                }

                if (promotion.start_at && promotion.start_at > Date.now()) {
                    workflow.emit('response', {
                        error: "Promo code chưa tới thời gian sử dụng"
                    })
                    return
                }

                if (promotion.finish_at && promotion.finish_at < Date.now()) {
                    workflow.emit('response', {
                        error: 'Promo code was expired!'
                    });
                    return
                }

                workflow.emit('response', {
                    promotion: promotion
                })

            } else {
                workflow.emit('response', {
                    error: "Promo code is invalid"
                });
            }
        })
    });

    workflow.emit('validate-parameters');
}

var get = (id, cb) => {
    var workflow = new event.EventEmitter();
    workflow.on('validate-parameters', () => {
        if (!id) {
            workflow.emit('response', {
                error: "ID of promotion is required!"
            });
            return
        }

        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response)
    })

    workflow.on('get', () => {
        Promotion.findById(id, (err, promotion) => {
            workflow.emit('response', {
                error: err,
                promotion: promotion
            });
        });
    });

    workflow.emit('validate-parameters')
}

var gets = (cb) => {
    var workflow = new event.EventEmitter();
    workflow.on('validate-parameters', () => {
        workflow.emit('gets');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('gets', () => {
        Promotion.find({}, (err, promotions) => {
            workflow.emit('response', {
                error: err,
                promotions: promotions
            });
        });
    });

    workflow.emit('validate-parameters')
}

var use = (code, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!code) {
            workflow.emit('response', {
                error: "Id of promotion is required!"
            });
            return
        }

        workflow.emit('use');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('use', () => {
        Promotion.findOne({
            code: code
        }).exec((err, promotion) => {
            if (promotion) {
                if (promotion.status == false) {
                    workflow.emit('response', {
                        error: "Promo code was expired!"
                    });
                    return
                }

                if (promotion.limit && promotion.used) {
                    if (promotion.used == promotion.limit) {
                        workflow.emit('response', {
                            error: 'Promo code was expired!'
                        });
                        return
                    }
                }

                if (promotion.start_at && promotion.start_at > Date.now()) {
                    workflow.emit('response', {
                        error: "Promo code chưa tới thời gian sử dụng"
                    })
                    return
                }

                if (promotion.finish_at && promotion.finish_at < Date.now()) {
                    workflow.emit('response', {
                        error: 'Promo code was expired!'
                    });
                    return
                }

                if (!promotion.used) {
                    promotion.used = 1
                } else {
                    promotion.used += 1
                }

                promotion.save((err) => {
                    workflow.emit('response', {
                        error: err
                    });
                });

            } else {
                workflow.emit('response', {
                    error: "Promo code is invalid"
                });
            }
        })
    });

    workflow.emit('validate-parameters');
}


module.exports = {
    new: add,
    edit: edit,
    delete: del,
    check: check,
    gets: gets,
    get: get,
    use: use
}