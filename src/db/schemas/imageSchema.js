const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

const CategorySchema = new Schema({
  shortId,
  product_id: {
    type: shortId,
    required: true,
    ref: 'Product',
  },
  image_url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  deletedAt: {
    type: Date,
    required: true,
  },
});

module.exports = CategorySchema;
