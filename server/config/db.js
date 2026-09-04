const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/banquite';
    console.log(`Connecting to MongoDB at: ${connStr}`);
    
    // Set connection timeout short so fallback to in-memory DB is fast if local MongoDB daemon is not running
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`Primary MongoDB connection failed (${err.message}). Launching MongoMemoryServer in-memory fallback...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`MongoMemoryServer Connected successfully at: ${memoryUri}`);
    } catch (memErr) {
      console.error(`Failed to start MongoMemoryServer: ${memErr.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
