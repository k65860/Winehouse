const { Schema } = require('mongoose');
// const shortId = require('./types/short-id');

const ProductSchema = new Schema({
  // shortId,
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  product_country: {
    type: String,
    required: true,
  },
  product_grape: {
    type: String,
    required: true,
  },
  product_madeyear: {
    type: Number,
    required: true,
  },
  product_sweetrate: {
    type: Number,
    required: true,
  },
  product_sourrate: {
    type: Number,
    required: true,
  },
  product_bodyrate: {
    type: Number,
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

module.exports = ProductSchema;
