const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(cors());

// Middleware to ensure DB connection on serverless requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB middleware error:', err.message);
    next();
  }
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/venues', require('./routes/venueRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root and health endpoints
app.get('/api', (req, res) => {
  res.json({ message: 'Banquite MERN API Server Running Smoothly', status: 'healthy' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Banquite MERN API Server Running Smoothly', status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

// Only listen directly when running in standalone mode (not serverless on Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Banquite Backend Server running on port ${PORT}`);
  });
}

module.exports = app;
