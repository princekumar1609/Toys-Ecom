const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/toynest');
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] MongoDB connection error: ${error.message}`);
    console.log('[Database Warning] Continuing server execution. Ensure MongoDB server is running locally or MONGODB_URI is updated.');
  }
};

module.exports = connectDB;
