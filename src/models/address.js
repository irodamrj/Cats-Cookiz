const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  buildingNo: {
    type: Number,
    required: true,
  },
  buildingName: {
    type: String
  },
  flatNo: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema)
