const mongoose = require('mongoose');
const Order = require('./order');
const Address = require('./address');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const cookerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: `Address`,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  averageRating: {
    type: Number,
    required: true,
    default: 0,
  },
  aboutCooker: {
    type: String,
    required: true,
  },
  openingHour: {
    type: String,
    required: true,
  },
  closingHour: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved'],
    default: 'Pending',
    required: true,
  },
  paymentType: [
    {
      type: String,
      enum: ['card', 'cash'],
    },
  ],
});

module.exports = mongoose.model('Cooker', cookerSchema);
