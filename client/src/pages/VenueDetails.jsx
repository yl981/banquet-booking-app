import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../context/AuthContext';
import { MapPin, Users, Star, Check, Phone, ShieldCheck, Calendar, ArrowLeft, MessageSquare } from 'lucide-react';

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [venue, setVenue] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const [venueRes, reviewsRes] = await Promise.all([
          API.get(`/venues/${id}`),
          API.get(`/reviews/venue/${id}`),
        ]);
        setVenue(venueRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error('Failed to load venue details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenueDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to post a review');
      return;
    }
    setSubmittingReview(true);
    try {
      const res = await API.post('/reviews', {
        venueId: id,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviews([res.data, ...reviews]);
      setReviewComment('');
      setReviewSuccess('Review published successfully!');
      setTimeout(() => setReviewSuccess(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-16 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-[#a07127] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-charcoal">Venue Not Found</h2>
        <button
          onClick={() => navigate('/venues')}
          className="mt-4 bg-[#a07127] text-white px-5 py-2 rounded-full text-xs font-bold"
        >
          Back to Venues
        </button>
      </div>
    );
  }

  const images = venue.images && venue.images.length > 0 ? venue.images : ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'];

  return (
    <div className="min-h-screen bg-[#faf8f5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#a07127] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a07127] bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                {venue.city}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-charcoal bg-white px-2.5 py-0.5 rounded-full border border-gray-200 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{venue.rating}</span>
                <span className="text-gray-400">({reviews.length} reviews)</span>
              </div>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">{venue.name}</h1>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#a07127]" />
              <span>{venue.address}</span>
            </p>
          </div>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="bg-[#a07127] hover:bg-[#8c5d1e] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-amber-900/15 transition-all hover:scale-105"
          >
            Book This Venue
          </button>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          <div className="lg:col-span-8 h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-md relative border border-gray-100">
            <img
              src={images[activeImageIdx]}
              alt={venue.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative h-24 lg:h-36 rounded-2xl overflow-hidden border-2 transition-all shrink-0 w-36 lg:w-full ${
                  activeImageIdx === idx ? 'border-[#a07127] ring-2 ring-amber-300' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Main Details Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl font-bold text-charcoal mb-3">About The Venue</h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {venue.description}
              </p>

              {/* Guest Capacity Badge */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3 bg-amber-50 px-4 py-2.5 rounded-2xl border border-amber-200/60">
                  <Users className="w-5 h-5 text-[#a07127]" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Guest Capacity</span>
                    <span className="text-sm font-bold text-charcoal">{venue.minCapacity} - {venue.maxCapacity} Guests</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-amber-50 px-4 py-2.5 rounded-2xl border border-amber-200/60">
                  <ShieldCheck className="w-5 h-5 text-[#a07127]" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Verification Status</span>
                    <span className="text-sm font-bold text-charcoal">100% Banquite Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl font-bold text-charcoal mb-4">Venue Amenities & Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {venue.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Policies */}
            {venue.rules && venue.rules.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="font-serif text-xl font-bold text-charcoal mb-4">Rules & Guidelines</h3>
                <ul className="space-y-2">
                  {venue.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a07127] mt-1.5 shrink-0"></span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-charcoal">Guest Reviews</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{reviews.length} total reviews for this hall</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 text-charcoal font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{venue.rating} / 5.0</span>
                </div>
              </div>

              {/* Write Review Form */}
              {user && (
                <form onSubmit={handleReviewSubmit} className="mb-8 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60">
                  <h4 className="text-xs font-bold text-charcoal mb-2 uppercase tracking-wider">Leave a Review</h4>
                  {reviewSuccess && <p className="text-xs text-emerald-600 mb-2 font-semibold">{reviewSuccess}</p>}
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-600 font-medium">Your Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows="3"
                    required
                    placeholder="Share your event experience at this venue..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#a07127] bg-white mb-3"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="bg-[#a07127] hover:bg-[#8c5d1e] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md transition-all"
                  >
                    {submittingReview ? 'Posting...' : 'Post Review'}
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev._id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold text-xs text-charcoal">{rev.userName}</h5>
                      <div className="flex items-center text-amber-400 text-xs font-bold">
                        ★ {rev.rating}.0
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">{rev.comment}</p>
                    <span className="text-[10px] text-gray-400 block mt-2">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sticky Booking Pricing Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 sticky top-28 space-y-6">
              
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Pricing Overview</span>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                    <span className="text-xs text-gray-600 font-medium">Veg Catering</span>
                    <span className="font-bold text-sm text-[#a07127]">₹{venue.pricePerPlateVeg?.toLocaleString()} <span className="text-[10px] text-gray-500 font-normal">/plate</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                    <span className="text-xs text-gray-600 font-medium">Non-Veg Catering</span>
                    <span className="font-bold text-sm text-[#a07127]">₹{venue.pricePerPlateNonVeg?.toLocaleString()} <span className="text-[10px] text-gray-500 font-normal">/plate</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                    <span className="text-xs text-gray-600 font-medium">Hall Rental Fee</span>
                    <span className="font-bold text-sm text-charcoal">₹{venue.hallRentalFee?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Phone className="w-4 h-4 text-[#a07127]" />
                  <span>Direct Venue Manager: <strong>{venue.contactPhone}</strong></span>
                </div>
              </div>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full bg-[#a07127] hover:bg-[#8c5d1e] text-white py-3.5 rounded-full font-bold text-sm shadow-lg shadow-amber-900/15 hover:shadow-xl transition-all"
              >
                Request Booking Now
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          venue={venue}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          onSuccess={(b) => {
            alert(`Booking request for ${b.venue?.name} sent successfully!`);
            navigate('/my-bookings');
          }}
        />
      )}

    </div>
  );
};

export default VenueDetails;
