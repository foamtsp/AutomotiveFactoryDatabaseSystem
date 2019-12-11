var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var supplierRouter = require('./routes/supplier');
var customerRouter = require('./routes/customer');
var mainpartRouter = require('./routes/mainpart');
var subpartRouter = require('./routes/subpart');
var custorderRouter = require('./routes/custorder');
var suporderRouter = require('./routes/suporder');
var carRouter = require('./routes/car');

var app = express();

app.use(session({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: true
 })
)

app.get('/session', (request, response) => {
  let sess = request.session
  console.log(sess)
  response.status(200).send('email = ' + sess.loggedin + '  ' + '_id = ' + sess.username)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var mysql = require("mysql");
//Database connection
app.use(function(req, res, next){
  res.locals.connection = mysql.createConnection({
    host :'localhost',
    user: 'root',
    password:'123456',
    database: "automotive",
    dateStrings: 'date'
  });
  res.locals.connection.connect();
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/suppliers', supplierRouter);
app.use('/customers', customerRouter);
app.use('/mainparts', mainpartRouter);
app.use('/subparts', subpartRouter);
app.use('/custorders', custorderRouter);
app.use('/suporders', suporderRouter);
app.use('/cars', carRouter);


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

var http = require('http')
module.exports = app;
var server = http.createServer(app);
server.listen(4007);
