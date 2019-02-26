var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


//Require Routes
var indexRouter_steven = require('./routes/index_inloggen');
var bierrekeningRouter = require('./routes/index_bierrekening');
var index_streepRouter = require('./routes/index_streep');
var index_streep_statestiekenRouter = require('./routes/index_streep_statestieken');
//Require Routes -- EDIT THIS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var strepenRouter = require('./routes/strepen');
var ladingRouter = require('./routes/ladingen');
var apiRouter = require('./routes/api');


//REST API


//Express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


//Setup Routes
app.use('/steven', indexRouter_steven);
app.use('/bierrekening', bierrekeningRouter);
app.use('/streep', index_streepRouter);
app.use('/streep/statestieken', index_streep_statestiekenRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/strepen', strepenRouter);
app.use('/ladingen', ladingRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
