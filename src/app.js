/*==============================
core packages
==============================*/
const express = require('express');

/*==============================
security and application logging packages
==============================*/
const cors = require('cors');
const morgan = require('morgan');
const { httpLogStream } = require('./utils/logger');

/*==============================
include middlewares, custom middlewares, Routes and Database connection
==============================*/
const apiRouter = require('./routes');
const DBConnect = require('./config/db');
const HandleNotFound = require('./middlewares/HandleNotFoundMiddleware');
const HandleApiError = require('./middlewares/ApiErrorMiddleware');

/*==============================
server application configurations
==============================*/
DBConnect;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());

/*==============================
routes, not found and custom api error handler
==============================*/
app.use('/api/v1', apiRouter);
app.use(HandleNotFound); // endpoint not found response
app.use(HandleApiError); // Custom API Error handler

module.exports = app;
