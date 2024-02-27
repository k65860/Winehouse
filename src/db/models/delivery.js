const mongoose = require('mongoose');
const DeliverySchema = require('../schemas/deliverySchema');

module.exports = mongoose.model('Delivery', DeliverySchema);
