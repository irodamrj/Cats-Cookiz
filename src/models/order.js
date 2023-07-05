const mongoose = require('mongoose');
const Customer = require('./customer');
const Cooker = require('./cooker');
const Address = require('./address');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  //  meals: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Cooker"
  //   },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: `Customer`,
    required: true,
  },
  status: {
    type: String,
    enum: ['Received', 'Cancelled', 'Delayed', 'Completed'],
    default: 'Received',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  deliveryAddress: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
  },
  cooker: {
    type: Schema.Types.ObjectId,
    ref: 'Cooker',
    required: true,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  total_Amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
