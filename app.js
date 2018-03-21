var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var config = require("config");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var mongoose = require('mongoose');
var auth = require('./app/middleware').authenticate;

var index = require('./routes/index');
var user = require('./routes/user');
var error = require('./routes/error');
var admin = require('./routes/admin');
var product = require('./routes/product');
var api = require('./routes/api');
var crawl = require('./routes/crawl');
var g3g4 = require('./routes/g3g4');

var nodemailer = require('nodemailer');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', ['app/views/', 'app/views/errors/', 'app/views/checkout/', 'app/views/menu/', 'app/views/users/', 'app/views/products/', 'app/views/admin/']);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', '/img/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//session
app.set('trust proxy', 1) //trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  },
  store: new MongoStore({
    host: config.get("mongoose.host"),
    port: config.get("mongoose.port"),
    db: config.get("mongoose.database"),
    url: `mongodb://${config.get("mongoose.host")}:${config.get("mongoose.port")}/${config.get("mongoose.database")}`
  }),
  expires: 15 * 24 * 60 * 60 //15 days
}));

//use static
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', index);
app.use('/', user);
app.use('/', error);
app.use('/', product);
app.use('/', admin);

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
  //res.io = io;
  next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  if (req.url && typeof req.url == 'string' && req.url.startsWith('/admin/')) {    
      err.href = 'admin/404';      
  } else {
    err.status = 404;
  }

  err.ref = req.headers.referer;
  next(err);
});

// // error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);

  switch (err.status) {
    case 403:
      
      res.render(`${err.href || '403'}`, {
        data: {
          user: req.user,
          error: err.message,
          ref: err.ref 
        }
      });
      break;
    case 500:
      res.render(`${err.href || '500'}`, {
        data: {
          user: req.user,
          error: err.message,
          ref: err.ref           
        }
      });
      break;
    case 502:
      res.render(`${err.href || '502'}`, {
        data: {
          user: req.user,
          error: err.message,
          ref: err.ref 
        }
      });
      break;
    case 503:
      res.render(`${err.href || '503'}`, {
        data: {
          user: req.user,
          error: err.message,
          ref: err.ref 
        }
      });
      break;
    case 504:
      res.render(`${err.href || '504'}`, {
        data: {
          user: req.user,
          error: err.message,
          ref: err.ref 
        }
      });
      break;

    default:
      res.render(`${err.href || '404'}`, {
        data: {
          user: req.user,
          error: err.message,
          ref: err.ref 
        }
      });
      break;
  }
});


module.exports = { app: app, serverHttps: serverHttps, serverHttp: serverHttp, io: io };

//module.exports = { app: app, serverHttp: serverHttp, io: io };
