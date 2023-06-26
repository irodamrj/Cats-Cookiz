const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@capstone.rhcdace.mongodb.net/`;

let uri = DB_URI;

module.exports = {
  DB_URI,
  connect: () => {
    return mongoose.connect(uri).catch((err) => console.log(err));
  },
  closeDatabase: async (drop = false) => {
    if (!DB_HOST) return;
    drop && (await mongoose.connection.dropDatabase());
    await mongoose.disconnect();
    await mongoose.connection.close();
  },

  clearDatabase: async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  },
};
