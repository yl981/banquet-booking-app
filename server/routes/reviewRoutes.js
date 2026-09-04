const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Venue = require('../models/Venue');
const { protect } = require('../middleware/auth');

// @route   GET /api/reviews/venue/:venueId
// @desc    Get reviews for a venue
router.get('/venue/:venueId', async (req, res) => {
  try {
    const reviews = await Review.find({ venue: req.params.venueId })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/reviews
// @desc    Create a review for a venue
router.post('/', protect, async (req, res) => {
  try {
    const { venueId, rating, comment, eventType } = req.body;

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    const review = new Review({
      venue: venueId,
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment,
      eventType: eventType || 'Wedding',
    });

    await review.save();

    // Recalculate venue average rating
    const allReviews = await Review.find({ venue: venueId });
    const avgRating = (
      allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length
    ).toFixed(1);

    venue.rating = parseFloat(avgRating);
    venue.numReviews = allReviews.length;
    await venue.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
