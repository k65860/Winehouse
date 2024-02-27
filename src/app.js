const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorMiddleware = require('./middlewares/errorMiddleware');
const dotenv = require('dotenv').config();

const port = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL;

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
// const viewsRouter = require('./routes/views');

const app = express();

// mongodb connect
mongoose.connect(
  mongodbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'db',
  },
) .then(() => console.log('connected'))
  .catch(() => console.log('failed'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/product', productsRouter);
app.use('/admin', adminRouter);
// app.use('/', viewsRouter);

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
