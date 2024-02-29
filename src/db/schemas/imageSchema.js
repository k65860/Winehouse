const { Schema } = require('mongoose');

const ImageSchema = new Schema({
  product_id: {
    type: shortId,
    required: true,
    ref: 'Product',
  },
  image_url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

module.exports = ImageSchema;
