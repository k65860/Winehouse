const mongoose = require('mongoose');
const OrderSchema = require('../schemas/orderSchema');

module.exports = mongoose.model('Order', OrderSchema);
