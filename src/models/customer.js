const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const cartSchema = new Schema({
  itemId: [
    {
      type: Schema.Types.ObjectId,
      ref: `Dish`,
      required: true,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
    minlength: 6,
  },
  phoneNumber: {
    type: String,
  },
  providerId: {
    type: String,
  },
  profilePicture: {
    type: String,
  },

  cart: {
    type: cartSchema,
    default: {
      itemId: [],
      total: 0,
    },
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: `Address`,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
