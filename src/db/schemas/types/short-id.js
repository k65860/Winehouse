/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');

const shortId = {
  type: String,
  default: () => nanoid(),
  require: true,
  index: true,
};

module.exports = shortId;
