const { Schema } = require('mongoose');

const OrderSchema = new Schema(
  {
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
  },

  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    deletedAt: {
      type: Date,
      required: true,
    },
  }
);

module.exports = OrderSchema;
