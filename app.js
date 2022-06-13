const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const methodOverride = require('method-override')
const session = require('express-session')
const userLogged = require('./middlewares/userLogged')
const cookies = require('cookie-parser')
const apiProducts = require('./routes/api/products')
const apiUsers = require('./routes/api/users')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))
app.use(session({
  secret: 'secret word!',
  resave: false,
  saveUninitialized: true,
}))
app.use(cookies())

app.use(userLogged)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/products', apiProducts);
app.use('/api/users', apiUsers)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('not-found');

});



app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor funcionando');
});

