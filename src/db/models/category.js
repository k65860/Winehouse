const mongoose = require('mongoose');
const CategorySchema = require('../schemas/categorySchema');

module.exports = mongoose.model('Category', CategorySchema);
