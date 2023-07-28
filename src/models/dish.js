const mongoose = require('mongoose');
const Cooker = require('./cooker');
const Schema = mongoose.Schema;
const DishSchema = new Schema(
  {
    cookerId: {
      type: Schema.Types.ObjectId,
      ref: `Cooker`,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Dish', DishSchema);
