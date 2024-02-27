const { Schema } = require('mongoose');
// const shortId = require('./types/short-id');

const CategorySchema = new Schema({
  // shortId,
  category_name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
  },
});

module.exports = CategorySchema;
