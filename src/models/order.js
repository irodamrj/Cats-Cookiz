const mongoose = require('mongoose');
const Customer = require('./customer');
const Address = require('./address');
const Dish = require('./dish');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    dishes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dish',
      },
    ],
    customerId: {
      type: Schema.Types.ObjectId,
      ref: `Customer`,
      required: true,
    },
    //I added cookerID
    cookerId: {
      type: Schema.Types.ObjectId,
      ref: `Cooker`,
      // required: true,
    },
    status: {
      type: String,
      enum: ['Cancelled', 'Completed', 'Delivered'],
      default: 'Completed',
      required: true,
    },
    deliveryAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    expectedDeliveryTime: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      default: 0,
      // required: true,
    },
    isAddressNew: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
