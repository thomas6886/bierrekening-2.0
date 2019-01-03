var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


//Require Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var strepenRouter = require('./routes/strepen');
var michaelRouter = require('./routes/test_michael');
var buttonRouter = require('./routes/test_button');
var gameRouter = require('./routes/test_30seconds');


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
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/strepen', strepenRouter);
app.use('/michael', michaelRouter);
app.use('/button', buttonRouter);
app.use('/30seconds', gameRouter);


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
