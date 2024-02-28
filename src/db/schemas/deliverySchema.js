const { Schema } = require('mongoose');

const DeliverySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  orderId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  deliveryStatus: {
    type: Number,
    required: true,
  },

  deliveryDate: {
    type: Date,
  },

  deliveryWish: {
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
