const { Schema } = require('mongoose');
// const shortId = require('./types/short-id');

const ProductSchema = new Schema({
  // shortId: {
  //   type: String,
  //   required: false,
  // },
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
    default: null,
  },
  deletedAt: {
    type: Date,
    default:null,
  },
});

// 값이 수정될때 updatedAt 변경
ProductSchema.pre('updateOne', function(next) {
  this.updateOne({}, { $set: { updatedAt: new Date() } });
  next();
});

// 상품이 삭제될때 deletedAt 변경
ProductSchema.pre('deleteOne', function(next) {
  this.updateOne({}, { $set: { deletedAt: new Date() } });
  next();
});

module.exports = ProductSchema;
