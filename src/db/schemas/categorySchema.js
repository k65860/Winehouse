const { Schema } = require('mongoose');
// const shortId = require('./types/short-id');

const CategorySchema = new Schema({
  category_name: {
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
