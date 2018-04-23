'use strict';

var event = require('events');
var SearchProduct = require('../models/index').searchProduct;

var insert = (keyword, id, name, cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {

        if (!keyword) {
            workflow.emit('response', {
                error: "Keyword is required!"
            });
            return
        }

        if (!id) {
            workflow.emit('response', {
                error: "Id is required!"
            });
            return
        }

        if (!name) {
            workflow.emit('response', {
                error: "Name is required!"
            });
            return
        }

        workflow.emit('insert');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('insert', () => {
        var obj = new SearchProduct({
            keyword: keyword,
            name: name,
            product: id
        });

        obj.save((err) => {
            workflow.emit('response', {
                error: err
            });
        });
    });

    workflow.emit('validate-parameters');
}

var gets = (cb) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        workflow.emit('get');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('get', () => {
        SearchProduct.aggregate([
            {
                "$group": {
                    "_id": {
                        "name": "$name",
                        "product": "$product"
                    },
                    "keywordCount": { "$sum": 1 }
                }
            },
            {
                "$group": {
                    "_id": {
                        "id": "$_id.product",
                        "name": "$_id.name"
                    },
                    "count": { "$sum": "$keywordCount" }
                }
            },
            { "$sort": { "count": -1 } },
            { "$limit": 10 }
        ], (err, products) => {
            workflow.emit('response', {
                error: err,
                products: products
            })
        })
    });

    workflow.emit('validate-parameters')
}

module.exports = {
    insert: insert,
    gets: gets
}