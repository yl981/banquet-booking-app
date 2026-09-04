import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Star, ArrowUpRight } from 'lucide-react';

const VenueCard = ({ venue, onBookNow }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group hover:-translate-y-1">
      
      {/* Cover Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={venue.images && venue.images.length > 0 ? venue.images[0] : 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'}
          alt={venue.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Featured Badge */}
        {venue.isFeatured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            {venue.featuredBadge || 'Featured'}
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-charcoal flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{venue.rating || 4.8}</span>
          <span className="text-gray-400 text-[10px]">({venue.numReviews || 12})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Tag */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-800 mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#a07127]" />
            <span>{venue.area}, {venue.city}</span>
          </div>

          {/* Name */}
          <h3
            onClick={() => navigate(`/venues/${venue._id}`)}
            className="font-serif text-xl font-bold text-charcoal hover:text-[#a07127] cursor-pointer transition-colors line-clamp-1"
          >
            {venue.name}
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {venue.tagline || venue.description}
          </p>

          {/* Capacity Tag */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 bg-amber-50/60 px-3 py-1.5 rounded-lg w-fit border border-amber-100">
            <Users className="w-4 h-4 text-[#a07127]" />
            <span>Capacity: <strong className="text-charcoal">{venue.minCapacity} - {venue.maxCapacity} Guests</strong></span>
          </div>

          {/* Category Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {venue.categories?.slice(0, 3).map((cat, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Price Per Plate</span>
            <div className="text-sm font-bold text-charcoal">
              <span className="text-base text-[#a07127]">₹{venue.pricePerPlateVeg?.toLocaleString()}</span>
              <span className="text-xs font-normal text-gray-500"> / veg</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/venues/${venue._id}`)}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-primary transition-colors"
              title="View Details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onBookNow(venue)}
              className="bg-[#a07127] hover:bg-[#8c5d1e] text-white px-4 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              Book Now
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default VenueCard;
