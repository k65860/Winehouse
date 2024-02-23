const mongoose = require('mongoose');
const ProductSchema = require('../schemas/categorySchema');

module.exports = mongoose.model('Product', ProductSchema);
