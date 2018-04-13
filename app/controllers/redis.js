'use strict'

var redis = require("redis"),
    client = redis.createClient()

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//     console.log(replies.length + " replies:");
//     replies.forEach(function (reply, i) {
//         console.log("    " + i + ": " + reply);
//     });
//     client.quit();
// });

function set(key, value) {
    if (!key || !value) { return callback({}) }   
    
    var string = JSON.stringify(value);      

    client.set(key, string, redis.print)

    console.log('SET TO CACHE: '+ key);
}

function get(key, callback) {
    client.get(key, (error, reply) => {
        console.log(`LOAD FROM CACHE: ${key}`);
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

client.setItem = set
client.getItem = get

module.exports = client