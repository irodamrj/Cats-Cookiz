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
  closeDatabase: async (drop = false) => {
    if (!DB_HOST) return;
    await mongoose.connection.close();
  },

  clearDatabase: async () => {
    const keepIDs = {
      cookers: ['64bc5d6de3d1f3423fd7952f'],
      addresses: ['64bc5d6ce3d1f3423fd7952d', '64bc5e3f96f2c61b22b3bc74'],
      customers: ['64bc5e2796f2c61b22b3bc6f'],
      orders: ['64bc5ea696f2c61b22b3bc8a'],
      dishes: ['64bc5e0196f2c61b22b3bc6a'],
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
