import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Plus, CheckCircle, XCircle, Building2, Calendar, IndianRupee, Users, MapPin, Trash2, Edit } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'venues' | 'add-venue'
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Venue Form state
  const [newVenue, setNewVenue] = useState({
    name: '',
    tagline: '',
    description: '',
    city: '',
    area: '',
    address: '',
    categories: ['Weddings'],
    minCapacity: 100,
    maxCapacity: 600,
    pricePerPlateVeg: 1200,
    pricePerPlateNonVeg: 1500,
    hallRentalFee: 50000,
    images: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    amenities: 'Centralized AC, Valet Parking, Gourmet Catering, Stage Lighting, Power Backup',
    isFeatured: true,
  });
  const [formMsg, setFormMsg] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes, venuesRes] = await Promise.all([
          API.get('/admin/stats'),
          API.get('/bookings/all'),
          API.get('/venues'),
        ]);
        setStats(statsRes.data);
        setBookings(bookingsRes.data);
        setVenues(venuesRes.data);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate]);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      const res = await API.put(`/bookings/${bookingId}/status`, { status });
      setBookings(bookings.map((b) => (b._id === bookingId ? res.data : b)));
      // Refresh stats
      const statsRes = await API.get('/admin/stats');
      setStats(statsRes.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteVenue = async (venueId) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) return;
    try {
      await API.delete(`/venues/${venueId}`);
      setVenues(venues.filter((v) => v._id !== venueId));
    } catch (err) {
      alert('Failed to delete venue');
    }
  };

  const handleCreateVenue = async (e) => {
    e.preventDefault();
    setFormMsg('');
    try {
      const payload = {
        ...newVenue,
        minCapacity: Number(newVenue.minCapacity),
        maxCapacity: Number(newVenue.maxCapacity),
        pricePerPlateVeg: Number(newVenue.pricePerPlateVeg),
        pricePerPlateNonVeg: Number(newVenue.pricePerPlateNonVeg),
        hallRentalFee: Number(newVenue.hallRentalFee),
        images: newVenue.images.split(',').map((s) => s.trim()),
        amenities: newVenue.amenities.split(',').map((s) => s.trim()),
      };

      const res = await API.post('/venues', payload);
      setVenues([res.data, ...venues]);
      setFormMsg('Venue created successfully!');
      setActiveTab('venues');
      setTimeout(() => setFormMsg(''), 4000);
    } catch (err) {
      setFormMsg(err.response?.data?.message || 'Failed to create venue');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#a07127]" />
              <span className="text-xs uppercase font-bold text-[#a07127] tracking-wider">Executive Management Portal</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-charcoal mt-1">Admin Dashboard</h1>
          </div>

          <button
            onClick={() => setActiveTab('add-venue')}
            className="bg-[#a07127] hover:bg-[#8c5d1e] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Venue</span>
          </button>
        </div>

        {/* Stats Cards Row */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <IndianRupee className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Confirmed Revenue</span>
                <span className="font-serif text-2xl font-bold text-charcoal">₹{stats.totalRevenue?.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#a07127] flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Total Bookings</span>
                <span className="font-serif text-2xl font-bold text-charcoal">{stats.totalBookings}</span>
                <span className="text-[11px] text-amber-800 font-medium block">({stats.pendingBookings} pending)</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Listed Venues</span>
                <span className="font-serif text-2xl font-bold text-charcoal">{stats.totalVenues}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Registered Customers</span>
                <span className="font-serif text-2xl font-bold text-charcoal">{stats.totalUsers}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-gray-200 mb-8 gap-4">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
              activeTab === 'bookings' ? 'border-[#a07127] text-[#a07127]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manage Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('venues')}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
              activeTab === 'venues' ? 'border-[#a07127] text-[#a07127]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manage Venues ({venues.length})
          </button>
          <button
            onClick={() => setActiveTab('add-venue')}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
              activeTab === 'add-venue' ? 'border-[#a07127] text-[#a07127]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            + Create New Venue
          </button>
        </div>

        {/* Tab 1: Manage Bookings */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 overflow-x-auto">
            <h3 className="font-serif text-xl font-bold text-charcoal mb-4">All Customer Bookings</h3>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Venue</th>
                  <th className="py-3 px-4 font-bold">Customer</th>
                  <th className="py-3 px-4 font-bold">Event Date</th>
                  <th className="py-3 px-4 font-bold">Guests & Type</th>
                  <th className="py-3 px-4 font-bold">Amount</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-4 px-4 font-bold text-charcoal">{b.venue?.name || 'N/A'}</td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-charcoal">{b.contactDetails?.name}</p>
                      <p className="text-[10px] text-gray-500">{b.contactDetails?.phone}</p>
                    </td>
                    <td className="py-4 px-4 font-medium">
                      {new Date(b.eventDate).toLocaleDateString()}
                      <span className="block text-[10px] text-gray-400">{b.timeSlot}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span>{b.guestCount} Guests</span>
                      <span className="block text-[10px] text-gray-500">{b.eventType} ({b.cateringPreference})</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-[#a07127]">₹{b.totalAmount?.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        b.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {b.status === 'Pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'Confirmed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg font-bold text-[11px]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'Cancelled')}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg font-bold text-[11px]"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Manage Venues */}
        {activeTab === 'venues' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((v) => (
              <div key={v._id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <img
                    src={v.images?.[0]}
                    alt={v.name}
                    className="w-full h-44 rounded-2xl object-cover mb-4"
                  />
                  <h4 className="font-serif text-lg font-bold text-charcoal">{v.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{v.area}, {v.city}</p>
                  <p className="text-xs font-semibold text-[#a07127] mt-2">₹{v.pricePerPlateVeg}/veg plate • Max {v.maxCapacity} Guests</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400">ID: #{v._id.slice(-6)}</span>
                  <button
                    onClick={() => handleDeleteVenue(v._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Create New Venue Form */}
        {activeTab === 'add-venue' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-6">List a New Banquet Hall</h3>

            {formMsg && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                {formMsg}
              </div>
            )}

            <form onSubmit={handleCreateVenue} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Venue Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Crown Ballroom"
                    value={newVenue.name}
                    onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. Luxury Hall for Grand Celebrations"
                    value={newVenue.tagline}
                    onChange={(e) => setNewVenue({ ...newVenue, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={newVenue.city}
                    onChange={(e) => setNewVenue({ ...newVenue, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Area / Locality *</label>
                  <input
                    type="text"
                    required
                    placeholder="Bandra West"
                    value={newVenue.area}
                    onChange={(e) => setNewVenue({ ...newVenue, area: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Plot 45, Main Road"
                    value={newVenue.address}
                    onChange={(e) => setNewVenue({ ...newVenue, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Describe venue highlights, ceiling heights, catering options..."
                  value={newVenue.description}
                  onChange={(e) => setNewVenue({ ...newVenue, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Min Capacity</label>
                  <input
                    type="number"
                    value={newVenue.minCapacity}
                    onChange={(e) => setNewVenue({ ...newVenue, minCapacity: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={newVenue.maxCapacity}
                    onChange={(e) => setNewVenue({ ...newVenue, maxCapacity: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Veg Price/Plate</label>
                  <input
                    type="number"
                    value={newVenue.pricePerPlateVeg}
                    onChange={(e) => setNewVenue({ ...newVenue, pricePerPlateVeg: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Non-Veg Price/Plate</label>
                  <input
                    type="number"
                    value={newVenue.pricePerPlateNonVeg}
                    onChange={(e) => setNewVenue({ ...newVenue, pricePerPlateNonVeg: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URLs (comma separated)</label>
                <input
                  type="text"
                  placeholder="https://image1.jpg, https://image2.jpg"
                  value={newVenue.images}
                  onChange={(e) => setNewVenue({ ...newVenue, images: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Amenities (comma separated)</label>
                <input
                  type="text"
                  placeholder="AC, Parking, DJ, Catering"
                  value={newVenue.amenities}
                  onChange={(e) => setNewVenue({ ...newVenue, amenities: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a07127]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a07127] hover:bg-[#8c5d1e] text-white py-3 rounded-full font-bold text-sm shadow-md transition-all mt-4"
              >
                Publish Venue to Platform
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
