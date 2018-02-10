var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.set('views', ['app/views/', 'app/views/errors/', 'app/views/checkout/', 'app/views/menu/', 'app/views/customers/']);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//use static
app.use("/static", express.static(__dirname + "/public"));
app.use('/', index);
app.use('/users', users);

// set ssl
const ssl = {
  key: fs.readFileSync("./files/privkey.pem"),
  cert: fs.readFileSync("./files/fullchain.pem"),
  ca: fs.readFileSync("./files/chain.pem")
};

var serverHttps = require('https').Server(ssl, app);
var serverHttp = require('http').Server(app);
var io = app.io = require('./routes/io')

//middleware socket.io
app.use((req, res, next) => {
  res.io = io;
  next();
})

//redirect http to https
app.use((req, res, next) => {
  if (req.secure) {
    return next();
  };
  res.redirect('https://' + req.hostname + req.url);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

module.exports = { app: app, serverHttps: serverHttps, serverHttp: serverHttp, io: io };