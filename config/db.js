
'use strict';

var mongoose = require('mongoose');
var config = require('config');

var url = `mongodb://${config.get("mongoose.host")}:${config.get("mongoose.port")}/${config.get("mongoose.database")}`

if (config.get('mongoose.user') && config.get('mongoose.password')) {
    url = `mongodb://${config.get("mongoose.user")}:${config.get("mongoose.password")}@${config.get("mongoose.host")}:${config.get("mongoose.port")}/${config.get("mongoose.database")}`
}

 mongoose.connect(url, { 
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
});


module.exports = {
    mongoose: mongoose
};  