import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import VenueCard from '../components/VenueCard';
import BookingModal from '../components/BookingModal';
import { Search, Filter, SlidersHorizontal, MapPin, RefreshCw } from 'lucide-react';

const Venues = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [guests, setGuests] = useState(searchParams.get('guests') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recommended');

  const [selectedVenueForBooking, setSelectedVenueForBooking] = useState(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (city) params.set('city', city);
      if (category && category !== 'All') params.set('category', category);
      if (guests) params.set('guests', guests);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (search) params.set('search', search);
      if (sort) params.set('sort', sort);

      const res = await API.get(`/venues?${params.toString()}`);
      setVenues(res.data);
    } catch (err) {
      console.error('Failed to fetch venues:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [category, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchVenues();
  };

  const clearFilters = () => {
    setCity('');
    setCategory('All');
    setGuests('');
    setMaxPrice('');
    setSearch('');
    setSort('recommended');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Browse Banquet Venues
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Discover and book verified luxury banquet halls for your special occasions.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-gray-100 mb-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Search Keywords</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Venue name, area..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#a07127]"
                />
              </div>
            </div>

            {/* City Input */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">City / Region</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Mumbai, Delhi, etc."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#a07127]"
                />
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Event Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#a07127]"
              >
                <option value="All">All Occasions</option>
                <option value="Weddings">Weddings</option>
                <option value="Birthdays">Birthdays</option>
                <option value="Corporate Events">Corporate Events</option>
                <option value="Engagements">Engagements</option>
                <option value="Other Events">Other Events</option>
              </select>
            </div>

            {/* Guest Count */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Expected Guests</label>
              <input
                type="number"
                placeholder="E.g. 250"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#a07127]"
              />
            </div>

            {/* Submit & Reset Buttons */}
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#a07127] hover:bg-[#8c5d1e] text-white py-2 rounded-xl text-xs font-bold shadow-md transition-all h-[38px] flex items-center justify-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Apply Filters</span>
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors h-[38px]"
                title="Reset Filters"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Results Info & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <p className="text-xs font-semibold text-gray-600">
            Showing <span className="text-charcoal font-bold">{venues.length}</span> venue(s) found
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-charcoal focus:outline-none focus:border-[#a07127]"
            >
              <option value="recommended">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Venue Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : venues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <VenueCard
                key={venue._id}
                venue={venue}
                onBookNow={(v) => setSelectedVenueForBooking(v)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#a07127] flex items-center justify-center mx-auto mb-3">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">No Venues Found</h3>
            <p className="text-gray-500 text-xs mt-1">
              Try adjusting your filter criteria or searching in a different city.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 inline-block bg-[#a07127] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md hover:bg-[#8c5d1e] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>

      {/* Booking Modal */}
      {selectedVenueForBooking && (
        <BookingModal
          venue={selectedVenueForBooking}
          isOpen={!!selectedVenueForBooking}
          onClose={() => setSelectedVenueForBooking(null)}
          onSuccess={(b) => {
            alert(`Booking request for ${b.venue?.name} sent successfully!`);
          }}
        />
      )}
    </div>
  );
};

export default Venues;
