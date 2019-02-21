var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Require Routes
var indexRouter = require('./routes/index_inloggen');
var usersRouter = require('./routes/users');
var bierrekeningRouter = require('./routes/index_bierrekening');
var index_streepRouter = require('./routes/index_streep');
var index_streep_statestiekenRouter = require('./routes/index_streep_statestieken');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bierrekening', bierrekeningRouter);
app.use('/streep', index_streepRouter);
app.use('/streep/statestieken', index_streep_statestiekenRouter);

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
