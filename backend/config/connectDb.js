const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection established...');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
};

module.exports = connectDB;
