const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  street: {
    type: String,
    required: true,
  },
  buildingNumber: {
    type: String,
    required: true,
  },
  buildingName: {
    type: String,
  },
  flatNumber: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Address', addressSchema);
