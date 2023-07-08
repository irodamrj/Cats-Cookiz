const mongoose = require('mongoose');
const adress = require('./address');
const Dish = require('./dish');
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
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: `Address`,
    },
  ],
  cartItems: cartSchema,
});

cartSchema.pre('save', function () {
  let sum = 0;
  this.itemId.forEach((element) => {
    sum += element.price;
  });
  this.total = sum;
});

customerSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

customerSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Customer', customerSchema);
