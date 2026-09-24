import React, { useState } from 'react';
import { X, Calendar, Users, Clock, Utensils, CheckCircle2, AlertCircle } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingModal = ({ venue, isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Weddings');
  const [timeSlot, setTimeSlot] = useState('Evening (5 PM - 11 PM)');
  const [guestCount, setGuestCount] = useState(venue?.minCapacity || 100);
  const [cateringPreference, setCateringPreference] = useState('Veg');
  const [specialRequests, setSpecialRequests] = useState('');
  const [contactName, setContactName] = useState(user?.name || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState(user?.phone || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !venue) return null;

  // Calculate live total price estimate
  let perPlate = venue.pricePerPlateVeg;
  if (cateringPreference === 'Non-Veg') perPlate = venue.pricePerPlateNonVeg;
  if (cateringPreference === 'Both') perPlate = Math.round((venue.pricePerPlateVeg + venue.pricePerPlateNonVeg) / 2 + 100);

  const cateringTotal = (guestCount || 0) * perPlate;
  const hallRental = venue.hallRentalFee || 0;
  const grandTotal = cateringTotal + hallRental;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please log in or sign up to complete your booking.');
      return;
    }

    if (!eventDate) {
      setError('Please select an event date.');
      return;
    }

    if (guestCount < venue.minCapacity || guestCount > venue.maxCapacity) {
      setError(`Guest count must be between ${venue.minCapacity} and ${venue.maxCapacity} for this venue.`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post('/bookings', {
        venueId: venue._id,
        email: contactEmail,
        eventDate,
        eventType,
        timeSlot,
        guestCount: Number(guestCount),
        cateringPreference,
        contactDetails: {
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
        },
        specialRequests,
      });

      setSubmitting(false);
      if (onSuccess) onSuccess(res.data);
      onClose();
    } catch (err) {
      setSubmitting(false);
      setError(err.response?.data?.message || 'Failed to process booking request.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-100 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs uppercase font-bold text-[#a07127] tracking-wider">Book Venue</span>
            <h3 className="font-serif text-2xl font-bold text-charcoal">{venue.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Date & Event Type Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Event Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#a07127]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Event Type *
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#a07127]"
              >
                <option value="Weddings">Weddings</option>
                <option value="Birthdays">Birthdays</option>
                <option value="Corporate Events">Corporate Events</option>
                <option value="Engagements">Engagements</option>
                <option value="Other Events">Other Events</option>
              </select>
            </div>
          </div>

          {/* Time Slot & Guest Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Time Slot *
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#a07127]"
              >
                <option value="Morning (9 AM - 3 PM)">Morning (9 AM - 3 PM)</option>
                <option value="Evening (5 PM - 11 PM)">Evening (5 PM - 11 PM)</option>
                <option value="Full Day (9 AM - 11 PM)">Full Day (9 AM - 11 PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Estimated Guests (Min: {venue.minCapacity}, Max: {venue.maxCapacity}) *
              </label>
              <input
                type="number"
                required
                min={venue.minCapacity}
                max={venue.maxCapacity}
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#a07127]"
              />
            </div>
          </div>

          {/* Catering Preference */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Food & Catering Preference
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Veg', 'Non-Veg', 'Both'].map((pref) => (
                <button
                  type="button"
                  key={pref}
                  onClick={() => setCateringPreference(pref)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    cateringPreference === pref
                      ? 'bg-amber-50 border-[#a07127] text-[#a07127]'
                      : 'border-gray-200 text-gray-600 hover:border-amber-200'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">Contact Person</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#a07127]"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#a07127]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#a07127]"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Special Setup Requests / Notes
            </label>
            <textarea
              rows="2"
              placeholder="E.g., stage decor theme, DJ preference, dietary requirements..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#a07127]"
            ></textarea>
          </div>

          {/* Live Price Estimation Box */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Catering Cost ({guestCount || 0} guests × ₹{perPlate}/plate):</span>
              <span className="font-semibold">₹{cateringTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>Hall Rental & Maintenance Fee:</span>
              <span className="font-semibold">₹{hallRental.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-charcoal">
              <span className="font-serif font-bold text-sm">Estimated Total:</span>
              <span className="font-serif font-bold text-xl text-[#a07127]">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#a07127] hover:bg-[#8c5d1e] text-white py-3.5 rounded-full font-bold text-sm shadow-lg shadow-amber-900/15 hover:shadow-xl transition-all disabled:opacity-50"
            >
              {submitting ? 'Submitting Booking Request...' : 'Confirm & Request Booking'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default BookingModal;
