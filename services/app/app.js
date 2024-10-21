const dotenv=require("dotenv");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const { swaggerUi, swaggerSpec } = require('./swaggerConfig/swagger');

dotenv.config()

var authRouterV1=require('./routes/v1/Auth');
var surveyRouterV1=require('./routes/v1/SurveyRoutes');
var questionRouterV1=require('./routes/v1/QuestionRoutes');
var productRouterV1=require('./routes/v1/ProductRoutes');
var subproductRouterV1=require('./routes/v1/SubproductRoutes');
var containerRouterV1=require('./routes/v1/ContainerRoutes');
var rolRouterV1=require('./routes/v1/RolRoutes');
var moduleRouterV1=require('./routes/v1/ModuleRoutes');
var operationRouterV1=require('./routes/v1/OperationRoutes');

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
app.use('/api/v1/question', questionRouterV1)
app.use('/api/v1/product', productRouterV1)
app.use('/api/v1/subproduct',subproductRouterV1)
app.use('/api/v1/container',containerRouterV1)
app.use('/api/v1/module',moduleRouterV1)
app.use('/api/v1/operation',operationRouterV1)
app.use('/api/v1/rol',rolRouterV1)
app.use('/docs', swaggerUi.serve,swaggerUi.setup(swaggerSpec));

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
