var express = require('express');
var router = express.Router();
const userRouter = require('./users');

/* GET home page. */
router.use('/', userRouter);

module.exports = router;
