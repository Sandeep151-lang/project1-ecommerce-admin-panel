var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');




// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/createProduct');
var admin = require('./routes/admin')
var payment = require('./routes/payments');


var app = express();
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));



// view engine setup
app.use('/uploads', express.static('uploads'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', productRouter);
app.use('/', admin);
app.use('/', payment);



if (process.env.Mode_Env = "production") {
  app.use(express.static("client/build"));
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next()
})
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
