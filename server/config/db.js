const mongoose = require('mongoose');

let mongoMemoryServer = null;

const connectDB = async () => {
  // If already connected, reuse existing connection (crucial for serverless functions)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const connStr = process.env.MONGODB_URI;

  if (connStr) {
    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(connStr, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      return;
    } catch (err) {
      console.error(`MongoDB connection error: ${err.message}`);
      throw err;
    }
  }

  // Local / dev fallback: Try local MongoDB first, then in-memory DB if available
  try {
    const localUri = 'mongodb://127.0.0.1:27017/banquite';
    await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log('Local MongoDB Connected successfully');
  } catch (err) {
    console.warn(`Local MongoDB connection failed (${err.message}). Checking MongoMemoryServer fallback...`);
    try {
      // Dynamic require so production builds without MongoMemoryServer don't break
      const { MongoMemoryServer } = require('mongodb-memory-server');
      if (!mongoMemoryServer) {
        mongoMemoryServer = await MongoMemoryServer.create();
      }
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`MongoMemoryServer Connected successfully at: ${memoryUri}`);
    } catch (memErr) {
      console.error(`MongoMemoryServer fallback unavailable: ${memErr.message}`);
      if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
        throw new Error('Please set the MONGODB_URI environment variable on Vercel.');
      }
    }
  }
};

module.exports = connectDB;
