const { Schema } = require('mongoose');

const OrderSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    order_price: {
      type: Number,
      required: true,
      default: 0,
    },
    order_count: {
      type: Number,
      required: true,
      default: 0,
    },
    delivery_id: {
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
