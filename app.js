var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var lokisvc = require('./routes/lokisvc');
var demo = require('./routes/demo');

var loki = require("lokijs");


var app = express();

var db = new loki('service.db', { 
  autoload: true,
  autoloadCallback: loadHandler,
  autosave: 'true',
  autosaveInterval: 4000
});

function loadHandler() {
  var coll = db.getCollection('users');

  if (coll === null) {
    coll = db.addCollection('users');
    coll.insert({name:'odin', age: 50});
    coll.insert({name:'thor', age: 30});
    coll.insert({name:'loki', age: 25});
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make global loki 'db' object available to router
app.use(function(req, res, next) {
  req.db = db;
  next();
});
app.use('/', index);
app.use('/lokisvc', lokisvc);
app.use('/demo', demo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
