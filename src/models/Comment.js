const Cooker = require('./cooker');
const Customer = require('./customer');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: `Customer`,
      required: true,
    },
    cookerId: {
      type: Schema.Types.ObjectId,
      ref: `Cooker`,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      max: 5,
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
