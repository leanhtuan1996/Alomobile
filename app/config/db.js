var mongoose = require('mongoose');

mongoose.connect('mongodb://35.201.241.250:27017/eventify', { useMongoClient: true });
module.exports = mongoose;  
