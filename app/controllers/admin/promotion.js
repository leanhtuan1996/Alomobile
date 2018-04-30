'use strict';

var event = require('events');
var mongoose = require('mongoose');
var _ = require('lodash');

var helper = require('../../helpers/index').helper;
var Promotion = require('../../models/index').promotion;

var promotionApi = require('../../api/index').promotion;


var add = (promotion, cb) => {
   promotionApi.new(promotion, (result) => {
       return cb(result)
   })
}

var edit = (promotion, cb) => {
    promotionApi.edit(promotion, (result) => {
        return cb(result)
    })
}

var del = (id, cb) => {
    promotionApi.delete(id, (result) => {
        return cb(result)
    })
}

var check = (cb) => {
    promotionApi.check((result) => {
        return cb(result)
    })
}

var get = (id, cb) => {
    promotionApi.get(id, (result) => {
        return cb(result)
    })
}

var gets = (cb) => {
    promotionApi.gets((result) => {
        return cb(result)
    })
}

module.exports = {
    new: add,
    edit: edit,
    delete: del,
    check: check,
    gets: gets,
    get: get
}