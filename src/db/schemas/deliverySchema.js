const { Schema } = require('mongoose');

const DeliverySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  order_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  delivery_status: {
    type: Number,
    required: true,
    default: 1,
  },
  delivery_date: {
    type: Date,
  },
  delivery_wish: {
    type: String,
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

module.exports = DeliverySchema;
