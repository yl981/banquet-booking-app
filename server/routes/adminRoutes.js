const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Venue = require('../models/Venue');
const Booking = require('../models/Booking');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics for admin
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalVenues = await Venue.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });

    // Calculate total revenue from confirmed bookings
    const confirmedList = await Booking.find({ status: 'Confirmed' });
    const totalRevenue = confirmedList.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('venue', 'name city')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalVenues,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalRevenue,
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
