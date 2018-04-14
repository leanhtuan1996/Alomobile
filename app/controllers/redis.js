'use strict'

var redis = require("redis"),
    client = redis.createClient()

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

/**
 * CACHE PRODUCTS - products
 * 1. /product/list 
 * 2. getProduct?id=${id}
 * 3. products-by-categories?idRootCategory=${matches[0]}&idCategory=${matches[0]}
 * 4. get-products-by-type?id=${id}
 * 5. get-hot-products
 * 6. get-special-products
 * 7. get-products-by-category/${id}
 * 8. get-products-by-category?idCategory=${idCategory}&idRootCategory=${idRootCategory}
 * 9. get-new-products
 * 10. count-products
 * 11. get-preview?id=${id}
 * 12. get-reviews?id=${id}
 */

/**
 * CACHE CATEGORIES - category
 * 1. get-categories
 * 2. category?id=${id}
 */

/**
 * CACHE TYPES - type
 * 1. get-types
 */

/**
 * CACHE REVIEWS - reviews
 * 1. get-reviews
 * 2. get-new-reviews
 */


function set(key, field, value) {
    if (!key || !value) { return callback({}) }

    var string = JSON.stringify(value);

    client.hset(key, field, string, redis.print);

    client.hset

    console.log('SET TO CACHE: ' + `${key}:${field}`);
}

function get(key, field, callback) {
    client.hget(key, field, (error, reply) => {
        console.log(`LOAD FROM CACHE: ${key}:${field}`);
        var data = reply;
        try {
            data = JSON.parse(data);
            return callback(data);
        } catch (error) {
            return callback({
                error: error
            });
        }
    });
}

client.hkeys('reviews', (error, reply) => {
    if (reply) {
        reply.forEach(e => {     
            console.log(e);   
        });
    }        
});

function del(key, fields = null) {
    if (!fields) {
        client.hkeys(key, (error, reply) => {
            if (reply) {
                reply.forEach(e => {            
                    client.hdel(key, e);    
                });
            }        
        });
    } else {
        client.hkeys(key, (error, reply) => {
            if (reply) {
                reply.forEach(e => {            
                    fields.forEach(f => {                    
                        if (e.startsWith(f)) {
                            client.hdel(key, e);
                        } 
                    });     
                });
            }        
        });
    }    
}

client.setItem = set
client.getItem = get
client.delItem = del

module.exports = client