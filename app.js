var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

var index = require('./routes/index');
var user = require('./routes/user');
var error = require('./routes/error');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', ['app/views/', 'app/views/errors/', 'app/views/checkout/', 'app/views/menu/', 'app/views/customers/', 'app/views/products']);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', '/img/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//use static
app.use("/static", express.static(__dirname + "/public"));
app.use('/', index);
app.use('/', user);
app.use('/', error);

// set ssl
var ssl = {
 key: fs.readFileSync("privkey.pem"),
 cert: fs.readFileSync("fullchain.pem"),
 ca: fs.readFileSync("chain.pem")
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
// redirect http to https
 function ensureSecure(req, res, next) {
   console.log(req);
   if (req.secure) {
     return next();
   };
   res.redirect('https://' + req.hostname + req.url);
 };

app.all('*', ensureSecure);

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

//module.exports = { app: app, serverHttp: serverHttp, io: io };
