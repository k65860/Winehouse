const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

const OrderlistSchema = new Schema({
  shortId,
  order_num: {
    type: Number,
    required: true,
  },
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
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

module.exports = OrderlistSchema;
