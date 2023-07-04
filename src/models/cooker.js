const mongoose = require('mongoose');
const Order = require("./order")
const Address = require(`./address`)
const Schema = mongoose.Schema;
const CookerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: [{
    type: Schema.Types.ObjectId,
    ref: `Address`,
    required: true
  }],
  phoneNo: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  ranking: {
    type: Number
  },
  aboutCooker: {
    type: String,
    required: true,
  },
  openingHour: {
    type: Date,
    required: true,
  },
  closingHour: {
    type: Date,
    required: true,
  },
  userRole: {
    type: String,
  },
  accStatus: {
    enum: ["Pending ","Approved"],
    default: "Pending",
    required : true
  },
  orders:[{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
 }], 
 
  
});

module.exports = mongoose.model("Cooker", CookerSchema);