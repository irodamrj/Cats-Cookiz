const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const dotenv = require('dotenv');
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@capstone.rhcdace.mongodb.net/`;

//for test
// const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@capstone.rhcdace.mongodb.net/testing`;

let uri = DB_URI;

module.exports = {
  DB_URI,
  connect: () => {
    return mongoose.connect(uri).catch((err) => console.log(err));
  },
  closeDatabase: async () => {
    if (!DB_HOST) return;
    await mongoose.connection.close();
  },

  clearDatabase: async () => {
    const keepIDs = {
      cookers: ['64caa707777867d29fd25bc6'],
      addresses: ['64caa707777867d29fd25bc4', '64caa73c777867d29fd25bd7',],
      customers: ['64caa734777867d29fd25bd2'],
      orders: ['64caa74d777867d29fd25beb'],
      dishes: ['64caa71b777867d29fd25bce'],
      admins:['64cf778e62bdd3fc41feea15']
    };
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      if (keepIDs.hasOwnProperty(key)) {
        // Check if key exists in keepIDs object
        await collections[key].deleteMany({
          _id: { $not: { $in: keepIDs[key].map((id) => new ObjectId(id)) } },
        });
      } else {
        await collections[key].deleteMany();
      }
    }
  },
};
