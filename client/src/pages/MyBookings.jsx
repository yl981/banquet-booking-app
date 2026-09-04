import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CalendarCheck, MapPin, Clock, Users, Receipt, AlertCircle, XCircle } from 'lucide-react';

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchMyBookings = async () => {
      try {
        const res = await API.get('/bookings/my');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, [user, navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking request?')) return;
    try {
      const res = await API.put(`/bookings/${bookingId}/status`, { status: 'Cancelled' });
      setBookings(bookings.map((b) => (b._id === bookingId ? res.data : b)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">✓ Confirmed</span>;
      case 'Cancelled':
        return <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full border border-red-300">✕ Cancelled</span>;
      default:
        return <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">⏳ Pending Approval</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-16 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-[#a07127] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">My Booking History</h1>
            <p className="text-gray-600 text-sm mt-1">Manage your event reservations and booking status</p>
          </div>
          <button
            onClick={() => navigate('/venues')}
            className="bg-[#a07127] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#8c5d1e] transition-colors"
          >
            Book Another Venue
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col md:flex-row justify-between gap-6 hover:shadow-lg transition-shadow"
              >
                {/* Left Venue & Date Info */}
                <div className="flex gap-4">
                  <img
                    src={booking.venue?.images?.[0] || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80'}
                    alt={booking.venue?.name}
                    className="w-28 h-28 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      {getStatusBadge(booking.status)}
                      <span className="text-[11px] text-gray-400 font-medium">Ref ID: #{booking._id.slice(-6)}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-charcoal">{booking.venue?.name || 'Venue Name'}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#a07127]" />
                      <span>{booking.venue?.area}, {booking.venue?.city}</span>
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-700 font-medium">
                      <span className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg">
                        <CalendarCheck className="w-3.5 h-3.5 text-[#a07127]" />
                        {new Date(booking.eventDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-[#a07127]" />
                        {booking.timeSlot}
                      </span>
                      <span className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg">
                        <Users className="w-3.5 h-3.5 text-[#a07127]" />
                        {booking.guestCount} Guests
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Total & Actions */}
                <div className="flex flex-row md:flex-col justify-between items-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total Amount</span>
                    <p className="font-serif text-2xl font-bold text-[#a07127]">₹{booking.totalAmount?.toLocaleString()}</p>
                    <span className="text-[11px] text-gray-500 block mt-0.5">Catering: {booking.cateringPreference}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => setSelectedReceipt(booking)}
                      className="px-4 py-2 rounded-full border border-amber-300 bg-amber-50 hover:bg-amber-100 text-charcoal font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Receipt className="w-3.5 h-3.5 text-[#a07127]" />
                      <span>View Receipt</span>
                    </button>

                    {booking.status === 'Pending' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="px-3 py-2 rounded-full text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#a07127] flex items-center justify-center mx-auto mb-3">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">No Bookings Found</h3>
            <p className="text-gray-500 text-xs mt-1">You haven't made any banquet hall reservations yet.</p>
            <button
              onClick={() => navigate('/venues')}
              className="mt-4 bg-[#a07127] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#8c5d1e] transition-colors"
            >
              Explore Banquet Venues
            </button>
          </div>
        )}

      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-serif text-xl font-bold text-charcoal">Booking Receipt</h3>
              <button onClick={() => setSelectedReceipt(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Booking Reference:</span>
                <span className="font-mono text-charcoal font-bold">#{selectedReceipt._id}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Venue Name:</span>
                <span className="text-charcoal font-bold">{selectedReceipt.venue?.name}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Event Date:</span>
                <span className="text-charcoal font-bold">{new Date(selectedReceipt.eventDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Guest Count:</span>
                <span className="text-charcoal font-bold">{selectedReceipt.guestCount} Guests</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Time Slot:</span>
                <span className="text-charcoal font-bold">{selectedReceipt.timeSlot}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Contact Name:</span>
                <span className="text-charcoal font-bold">{selectedReceipt.contactDetails?.name}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Contact Phone:</span>
                <span className="text-charcoal font-bold">{selectedReceipt.contactDetails?.phone}</span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-sm font-bold">
                <span>Total Amount Paid / Due:</span>
                <span className="text-[#a07127]">₹{selectedReceipt.totalAmount?.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="mt-6 w-full bg-[#a07127] text-white py-2.5 rounded-full font-bold text-xs"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookings;
