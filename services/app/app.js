const dotenv=require("dotenv");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

//enpoint : http://localhost:3000/api/v1/workouts/patata//

dotenv.config()

var authRouterV1=require('./routes/v1/Auth');
var surveyRouterV1=require('./routes/v1/SurveyRoutes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', authRouterV1);
app.use('/api/v1/survey', surveyRouterV1);
app.use((err, req, res, next) => {
  res.send('error occurred')
})


const port = 3445;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



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

});

module.exports = app;
