const mongoose = require('mongoose');
const OrderlistSchema = require('../schemas/orderlistSchema');

module.exports = mongoose.model('Orderlist', OrderlistSchema);
