var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/config');
models=require('./models');




app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./swagger');

models.sequelize.authenticate().then(()=>{
  console.log('connected to db');
}).catch((err)=>{
  console.log('not connected to db',err.message);
});
models.sequelize.sync({alter:true});


app.use('/shipping',require('./controller/shipping.Controller').router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
console.log('hello'),
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
