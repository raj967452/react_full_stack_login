const createError = require('http-errors');
const express = require('express');
const path =  require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require( 'mongoose');
const bodyParser = require ('body-parser');
const passport = require('passport');

// const indexRouter = require( './routes/index');
const usersRouter = require( './routes/api/users');

const app = express();

app.use(express.json({ type: ['application/json', 'text/plain']}));

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(logger('dev'));

console.log("db connecting here");
// DB Config
const db = require(__dirname + "/config/keys");

// Connect to MongoDB
mongoose.connect(db.mongoURI, db.mongoConfig)
.then(() => console.log('MongoDB successfully connected'))
.catch(err => {console.log(JSON.stringify(err))});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// routes
app.use('/api/users', usersRouter);

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
