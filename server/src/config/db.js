const path = require('path');
const dns = require('dns');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Use reliable DNS resolvers for MongoDB Atlas SRV records on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // Ignore if not supported in environment
}

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/toys_ecom');
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] MongoDB connection error: ${error.message}`);
    console.log('[Database Warning] Continuing server execution. Ensure MongoDB server is running locally or MONGODB_URI is updated.');
  }
};

module.exports = connectDB;
