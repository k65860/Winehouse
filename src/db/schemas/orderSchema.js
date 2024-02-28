const { Schema } = require('mongoose');
// const shortId = require('./types/short-id');

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  orderList: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  orderDate: {
    type: Date,
    default: Date.now,
  },

  orderPrice: {
    type: Number,
    required: true,
  },

  orderCount: {
    type: Number,
    required: true,
  },

  deliveryId: {
    type: Schema.Types.ObjectId,
    ref: 'Delivery',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

module.exports = OrderSchema;
