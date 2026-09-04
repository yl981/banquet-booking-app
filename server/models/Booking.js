const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['Weddings', 'Birthdays', 'Corporate Events', 'Engagements', 'Other Events'],
  },
  timeSlot: {
    type: String,
    enum: ['Morning (9 AM - 3 PM)', 'Evening (5 PM - 11 PM)', 'Full Day (9 AM - 11 PM)'],
    default: 'Evening (5 PM - 11 PM)',
  },
  guestCount: {
    type: Number,
    required: true,
  },
  cateringPreference: {
    type: String,
    enum: ['Veg', 'Non-Veg', 'Both'],
    default: 'Veg',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
  contactDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  specialRequests: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
