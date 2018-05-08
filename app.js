var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
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
var order = require('./routes/order');

var cron = require('./app/controllers/admin/index').cron;
var redis = require('./app/controllers/index').redis;

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

//helmet secure express application
app.use(helmet())

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
    url: `mongodb://${config.get("mongoose.user")}:${config.get("mongoose.password")}@${config.get("mongoose.host")}:${config.get("mongoose.port")}/${config.get("mongoose.database")}`,
    collection: "sessions"
  }),
  expires: 365 * 24 * 60 * 60 //15 days
}));

//cron job
cron.removeUncompleteOrder();

//io
var serverHttp = require('http').Server(app);
var io = app.io = require('./routes/io');

//app.use((req, res, next) => {
//  ensureSec(req, res, next);
//});

//middleware socket.io
app.use((req, res, next) => {
  res.io = io;
  res.redis = redis;
  next();
});

function ensureSec(req, res, next) {
  if (req.headers.host == 'localhost:3000') {
    next();
    return
  }

  if (req.headers["x-forwarded-proto"] === "https") {
    return next();
  }
  res.redirect("https://" + req.headers.host + ``	``.url);
}

//use static
app.use('/static', express.static(path.join(__dirname, 'public'), {
  //maxage: '24h'
}));

app.use('/', index);
app.use('/', error);
app.use('/', user);
app.use('/', order);
app.use('/', api);
app.use('/', admin);
app.use('/', product);

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

/*
// error handler
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
          token: req.session.token,
          user: req.session.user,
          error: err.message,
          ref: err.ref
        }
      });
      break;
    case 500:
      res.render(`${err.href || '500'}`, {
        data: {
          token: req.session.token,
          user: req.session.user,
          error: err.message,
          ref: err.ref
        }
      });
      break;
    case 502:
      res.render(`${err.href || '502'}`, {
        data: {
          token: req.session.token,
          user: req.session.user,
          error: err.message,
          ref: err.ref
        }
      });
      break;
    case 503:
      res.render(`${err.href || '503'}`, {
        data: {
          token: req.session.token,
          user: req.session.user,
          error: err.message,
          ref: err.ref
        }
      });
      break;
    case 504:
      res.render(`${err.href || '504'}`, {
        data: {
          token: req.session.token || null,
          user: req.session.user || null,
          error: err.message,
          ref: err.ref
        }
      });
      break;

    default:
      res.render(`${err.href || '404'}`, {
        data: {
          token: req.session.token || null,
          user: req.session.user || null,
          error: err.message,
          ref: err.ref
        }
      });
      break;
  }
});

*/


//module.exports = { app: app, serverHttps: serverHttps, serverHttp: serverHttp, io: io };

module.exports = { app: app, serverHttp: serverHttp, io: io };
