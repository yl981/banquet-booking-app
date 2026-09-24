const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const { seedSampleData } = require('./seedFunction');

const run = async () => {
  try {
    await connectDB();
    console.log('Connected to DB for seeding...');
    const result = await seedSampleData(true);
    console.log('Seeding finished successfully:', result);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

run();
