const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/venues
// @desc    Get all venues with optional filters (city, category, guestCount, priceRange, search)
router.get('/', async (req, res) => {
  try {
    const { city, category, guests, maxPrice, search, featured, sort } = req.query;

    let query = {};

    if (city && city.trim() !== '') {
      query.city = { $regex: city.trim(), $options: 'i' };
    }

    if (category && category !== 'All') {
      query.categories = { $in: [category] };
    }

    if (guests) {
      const guestNum = parseInt(guests, 10);
      if (!isNaN(guestNum)) {
        query.minCapacity = { $lte: guestNum };
        query.maxCapacity = { $gte: guestNum };
      }
    }

    if (maxPrice) {
      const priceNum = parseInt(maxPrice, 10);
      if (!isNaN(priceNum)) {
        query.pricePerPlateVeg = { $lte: priceNum };
      }
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { city: searchRegex },
        { area: searchRegex },
        { description: searchRegex },
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { pricePerPlateVeg: 1 };
    if (sort === 'price_desc') sortOptions = { pricePerPlateVeg: -1 };
    if (sort === 'rating') sortOptions = { rating: -1 };

    const venues = await Venue.find(query).sort(sortOptions);
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/venues/:id
// @desc    Get single venue details
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/venues
// @desc    Create new venue (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const venue = new Venue(req.body);
    const createdVenue = await venue.save();
    res.status(201).json(createdVenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/venues/:id
// @desc    Update venue (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    Object.assign(venue, req.body);
    const updatedVenue = await venue.save();
    res.json(updatedVenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/venues/:id
// @desc    Delete venue (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    await venue.deleteOne();
    res.json({ message: 'Venue removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
