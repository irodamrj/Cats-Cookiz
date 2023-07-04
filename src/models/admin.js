const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Admin = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type:String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        default: 'admin'
      }
    });

module.exports = mongoose.model("Admin", Admin)