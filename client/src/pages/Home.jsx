import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSearch from '../components/HeroSearch';
import EventCategories from '../components/EventCategories';
import PromoCard from '../components/PromoCard';
import VenueCard from '../components/VenueCard';
import BookingModal from '../components/BookingModal';
import API from '../services/api';
import { ArrowRight, Sparkles, Star, CheckCircle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [featuredVenues, setFeaturedVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenueForBooking, setSelectedVenueForBooking] = useState(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await API.get('/venues?featured=true');
        setFeaturedVenues(res.data);
      } catch (err) {
        console.error('Failed to fetch featured venues:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleBookingSuccess = (booking) => {
    setBookingSuccessMsg(`Your booking request for "${booking.venue?.name || 'Venue'}" has been submitted successfully! Check "My Bookings" for status updates.`);
    setTimeout(() => setBookingSuccessMsg(''), 8000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      
      {/* Success Notification Banner */}
      {bookingSuccessMsg && (
        <div className="fixed top-24 right-6 z-50 max-w-md bg-emerald-900 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500 flex items-start gap-3 animate-in slide-in-from-top-4">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-sm">Booking Request Sent!</h4>
            <p className="text-xs text-emerald-200 mt-0.5">{bookingSuccessMsg}</p>
          </div>
          <button onClick={() => setBookingSuccessMsg('')} className="text-emerald-400 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Hero Section with Floating Search */}
      <HeroSearch />

      {/* Events Made Extraordinary (5 Category Cards) */}
      <EventCategories />

      {/* Featured Venues Showcase */}
      <section className="py-16 bg-gradient-to-b from-white to-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-[#a07127] tracking-wider">
                <Sparkles className="w-4 h-4" /> Handpicked Luxury Venues
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-1">
                Featured Banquet Halls
              </h2>
            </div>

            <button
              onClick={() => navigate('/venues')}
              className="group flex items-center gap-2 text-sm font-bold text-[#a07127] hover:text-[#8c5d1e] transition-colors"
            >
              <span>Explore All Venues</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-3xl bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : featuredVenues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVenues.slice(0, 3).map((venue) => (
                <VenueCard
                  key={venue._id}
                  venue={venue}
                  onBookNow={(v) => setSelectedVenueForBooking(v)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 p-8">
              <p className="text-gray-500 text-sm">No featured venues available at the moment.</p>
            </div>
          )}

        </div>
      </section>

      {/* Promotional Curved Banner */}
      <PromoCard />

      {/* Customer Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold text-[#a07127] tracking-wider">Customer Stories</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-1">
              Loved by Hosts & Guests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Kavita & Rohan Mehta',
                event: 'Wedding Reception • Mumbai',
                quote: 'Booking our venue through Banquite was seamless! The Grand Imperial Pavilion was breathtaking and the price estimator was 100% accurate.',
                rating: 5,
              },
              {
                name: 'Siddharth Roy',
                event: 'Annual Corporate Gala • Bangalore',
                quote: 'The tech facilities at Crown Vista were top class. Banquite customer support answered all our inquiries instantly.',
                rating: 5,
              },
              {
                name: 'Ananya Deshmukh',
                event: '25th Anniversary • Udaipur',
                quote: 'Palace Gardens made our parents silver jubilee magical. Highly recommend Banquite for booking heritage venues!',
                rating: 5,
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-amber-50/50 rounded-3xl p-6 border border-amber-200/60 shadow-sm relative">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-amber-200/40">
                  <h4 className="font-serif font-bold text-charcoal text-base">{t.name}</h4>
                  <p className="text-xs text-amber-800 font-medium">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedVenueForBooking && (
        <BookingModal
          venue={selectedVenueForBooking}
          isOpen={!!selectedVenueForBooking}
          onClose={() => setSelectedVenueForBooking(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

    </div>
  );
};

export default Home;
