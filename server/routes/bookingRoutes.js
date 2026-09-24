const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Venue = require('../models/Venue');
const { protect, adminOnly } = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', protect, async (req, res) => {
  try {
    const {
      venueId,
      email,
      eventDate,
      eventType,
      timeSlot,
      guestCount,
      cateringPreference,
      contactDetails,
      specialRequests,
    } = req.body;

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    const bookingEmail = email || contactDetails?.email || req.user?.email;
    if (!bookingEmail) {
      return res.status(400).json({ message: 'Email is required for booking' });
    }

    // Calculate total price
    let platePrice = venue.pricePerPlateVeg;
    if (cateringPreference === 'Non-Veg') {
      platePrice = venue.pricePerPlateNonVeg;
    } else if (cateringPreference === 'Both') {
      platePrice = Math.round((venue.pricePerPlateVeg + venue.pricePerPlateNonVeg) / 2 + 100);
    }

    const totalAmount = (guestCount * platePrice) + (venue.hallRentalFee || 0);

    const booking = new Booking({
      user: req.user._id,
      email: bookingEmail,
      venue: venueId,
      eventDate,
      eventType,
      timeSlot,
      guestCount,
      cateringPreference,
      totalAmount,
      contactDetails: {
        name: contactDetails?.name || req.user?.name || 'Valued Guest',
        email: contactDetails?.email || bookingEmail,
        phone: contactDetails?.phone || req.user?.phone || '',
      },
      specialRequests: specialRequests || '',
      status: 'Pending',
    });

    const createdBooking = await booking.save();
    const populatedBooking = await Booking.findById(createdBooking._id).populate('venue', 'name city area address images pricePerPlateVeg pricePerPlateNonVeg hallRentalFee');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/bookings/my
// @desc    Get logged in user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('venue', 'name city area address images pricePerPlateVeg pricePerPlateNonVeg hallRentalFee contactPhone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings/all
// @desc    Get all bookings (Admin only)
router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('venue', 'name city area')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status (Admin / User cancel)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check ownership or admin status
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Users can only cancel their own pending booking
    if (req.user.role !== 'admin' && status !== 'Cancelled') {
      return res.status(403).json({ message: 'Customers can only cancel bookings' });
    }

    booking.status = status;
    const updatedBooking = await booking.save();

    const populated = await Booking.findById(updatedBooking._id)
      .populate('user', 'name email phone')
      .populate('venue', 'name city area address images');

    res.json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
