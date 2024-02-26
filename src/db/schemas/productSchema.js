const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

const ProductSchema = new Schema({
  shortId,
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  productCountry: {
    type: String,
    required: true,
  },
  productGrape: {
    type: String,
    required: true,
  },
  productMadeyear: {
    type: Number,
    required: true,
  },
  productSweetrate: {
    type: Number,
    required: true,
  },
  productSourrate: {
    type: Number,
    required: true,
  },
  productBodyrate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  deletedAt: {
    type: Date,
    default:null,
  },
});

module.exports = ProductSchema;
