/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const port = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL;

const errorMiddleware = require('./middlewares/errorMiddleware');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const viewsRouter = require('./routes/views');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');

const app = express();

// mongodb connect
mongoose.connect(
  mongodbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'db',
  },
);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to mongodb');
});
db.on('error', (err) => {
  console.log(err);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', viewsRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
