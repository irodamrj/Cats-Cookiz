const mongoose = require('mongoose');
const Order = require('./order');
const Address = require(`./address`);
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const cookerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: `Address`,
      required: true,
    },
  ],
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
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

cookerSchema.pre('save', function () {
  let sumOfRatings = 0;
  this.comments.forEach((item) => {
    sumOfRatings += item.rating;
  });
  const averageRank = sumOfRatings / this.comments.length;
  this.averageRating = averageRank;
});

cookerSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

cookerSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Cooker', cookerSchema);
