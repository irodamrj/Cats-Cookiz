const mongoose = require('mongoose');
const adress = require('./address');
const Cooker = require("./cooker")
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    itemId: [{
        type:  Schema.Types.ObjectId,
        ref: `Cooker`,
        required: true,
    }],
     total: {
      type: Number,
      required: true,
    }
  });

const customerSchema = new Schema({
  userRole: {
    type: String,
    default: "Customer"
  },
  name: {
    type: String
    ,required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
  },
  phone_No: {
    type: String
  },
  providerID: {
    type: String
  },
  profilePic: {
    type: String
  },
  address: [{ 
    type:  Schema.Types.ObjectId,
    ref: `Address`}],
  cartItems :[cartSchema]
});

module.exports = mongoose.model("Customer", customerSchema)