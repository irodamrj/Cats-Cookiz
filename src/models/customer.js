const mongoose = require('mongoose');
const adress = require('./address');
const Dish = require('./dish');
const Schema = mongoose.Schema;

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
  },
  phoneNumber: {
    type: String,
  },
  providerID: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: `Address`,
    },
  ],
  cartItems: [cartSchema],
});

cartSchema.pre('save', function () {
  let sum = 0;
  this.itemId.forEach((element) => {
    sum += element.price;
  });
  this.total = sum;
});

module.exports = mongoose.model('Customer', customerSchema);
