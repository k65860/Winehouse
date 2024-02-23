const mongoose = require('mongoose');
const OrderlistSchema = require('../schemas/orderlistSchema');

exports.User = mongoose.model('Orderlist', OrderlistSchema);
