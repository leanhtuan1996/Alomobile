'use strict';

var mongoose = require('mongoose');
var config = require('config');

// mongoose.connect(`mongodb://${config.get("mongoose.user")}:${config.get("mongoose.password")}@${config.get("mongoose.host")}:${config.get("mongoose.port")}/${config.get("mongoose.database")}`, { useMongoClient: true });

mongoose.connect(`mongodb://${config.get("mongoose.host")}:${config.get("mongoose.port")}/${config.get("mongoose.database")}`, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
});

module.exports = {
    mongoose: mongoose
};  