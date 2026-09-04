import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PromoCard = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-gradient-to-r from-[#f7f1e5] via-[#f3e8d2] to-[#eee2c7] border border-amber-200/60 overflow-hidden shadow-lg p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 z-10">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1b18] leading-[1.2]">
                Turn Your Special Moments <br className="hidden sm:inline" />
                Into Lasting Memories
              </h2>
              
              <p className="mt-4 text-gray-700 text-base sm:text-lg font-normal max-w-lg">
                Explore top-rated banquet halls near you and book in just a few clicks.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button
                  onClick={() => navigate('/venues')}
                  className="bg-[#a07127] hover:bg-[#8c5d1e] text-white px-8 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg shadow-amber-900/15 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <span>Browse Venues</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="font-script text-2xl text-[#8c5d1e] font-bold tracking-wide">
                  More Than Venues, <br className="sm:hidden" />
                  We Create Experiences ♡
                </p>
              </div>
            </div>

            {/* Right Curved Image */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background curve effect */}
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl lg:rounded-l-[120px] overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1000&q=80"
                    alt="Candlelight Floral Table Setup"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />

                  {/* Table sign overlay badge matching reference image */}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 px-4 rounded-xl border border-amber-200 shadow-md text-center max-w-[130px]">
                    <p className="font-script text-xs text-charcoal font-bold leading-snug">
                      Good Food Great Company ♡
                    </p>
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

export default PromoCard;
