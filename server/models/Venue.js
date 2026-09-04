const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Venue name is required'],
    trim: true,
  },
  tagline: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    index: true,
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  categories: [{
    type: String,
    enum: ['Weddings', 'Birthdays', 'Corporate Events', 'Engagements', 'Other Events'],
  }],
  minCapacity: {
    type: Number,
    required: true,
    default: 50,
  },
  maxCapacity: {
    type: Number,
    required: true,
    default: 500,
  },
  pricePerPlateVeg: {
    type: Number,
    required: true,
    default: 1200,
  },
  pricePerPlateNonVeg: {
    type: Number,
    required: true,
    default: 1500,
  },
  hallRentalFee: {
    type: Number,
    default: 50000,
  },
  images: [{
    type: String,
  }],
  rating: {
    type: Number,
    default: 4.8,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  amenities: [{
    type: String,
  }],
  rules: [{
    type: String,
  }],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  featuredBadge: {
    type: String,
    default: '',
  },
  contactPhone: {
    type: String,
    default: '+91 98765 43210',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Venue', venueSchema);
