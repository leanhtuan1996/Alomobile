'use strict';

var event = require('events');
var SearchKeyword = require('../models/index').searchKeyword;

var insert = (keyword, cb = null) => {
    var workflow = new event.EventEmitter();

    workflow.on('validate-parameters', () => {
        if (!keyword) {
            workflow.emit('response', {
                error: "Keyword is required!"
            });
            return
        }

        workflow.emit('insert');
    });

    workflow.on('response', (response) => {
        return cb(response)
    });

    workflow.on('insert', () => {
        var obj = new SearchKeyword({
            keyword: keyword
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
        SearchKeyword.aggregate([
            {
                "$group": {
                    "_id": {
                        "keyword": "$keyword"
                    },
                    "keywordCount": { "$sum": 1 }
                }
            },
            {
                "$group": {
                    "_id": "$_id.keyword",
                    "count": { "$sum": "$keywordCount" }
                }
            },
            { "$sort": { "count": -1 } },
            { "$limit": 10 }
        ], (err, keywords) => {
            workflow.emit('response', {
                error: err,
                keywords: keywords
            });
        });
    });

    workflow.emit('validate-parameters');
}

module.exports = {
    insert: insert,
    gets: gets
}