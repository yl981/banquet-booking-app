import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search } from 'lucide-react';
import TrustBadges from './TrustBadges';

const HeroSearch = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (city) queryParams.set('city', city);
    if (date) queryParams.set('date', date);
    navigate(`/venues?${queryParams.toString()}`);
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#faf8f5] via-amber-50/30 to-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 z-10">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold tracking-wider uppercase mb-4 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-[#a07127] animate-pulse"></span>
                Premium Banquet Discovery
              </span>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1b18] leading-[1.15]">
                Find the Perfect <br />
                <span className="text-[#a07127]">Banquet</span> for Every <br />
                Celebration
              </h1>

              <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
                Weddings, Birthdays, Corporate Events and more — Book stunning venues, hassle-free.
              </p>

              {/* Elevated Floating Search Card */}
              <form
                onSubmit={handleSearch}
                className="mt-8 bg-white rounded-2xl lg:rounded-full p-2.5 sm:p-3 shadow-2xl shadow-amber-900/10 border border-amber-100 flex flex-col lg:flex-row items-center gap-3"
              >
                {/* City Input */}
                <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b lg:border-b-0 lg:border-r border-gray-100">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                  <div className="w-full">
                    <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter City or Area"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-sm font-medium text-charcoal bg-transparent focus:outline-none placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Date Selector */}
                <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b lg:border-b-0 border-gray-100">
                  <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                  <div className="w-full">
                    <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-sm font-medium text-charcoal bg-transparent focus:outline-none text-gray-600"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full lg:w-auto bg-[#a07127] hover:bg-[#8c5d1e] text-white px-8 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 hover:shadow-xl transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </form>

              {/* Trust Badges Bar */}
              <TrustBadges />
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-200 to-amber-100 opacity-60 blur-xl"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury Banquet Hall Setup"
                  className="w-full h-[450px] lg:h-[540px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Neon sign accent overlay box matching image */}
                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-right max-w-[180px]">
                  <p className="font-script text-amber-200 text-xl leading-tight font-bold drop-shadow">
                    Good People Great Celebrations ♡
                  </p>
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-amber-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-primary font-bold text-sm">
                    ★ 4.9
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal">Top Banquet Hall</p>
                    <p className="text-[11px] text-gray-500">100+ Verified Bookings</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
