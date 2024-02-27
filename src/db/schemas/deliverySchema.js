const { Schema } = require('mongoose');

const DeliverySchema = new Schema(
  {
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
  },

  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },

    deletedAt: {
      type: Date,
    },
  },
);

module.exports = DeliverySchema;
