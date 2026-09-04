import React from 'react';
import { Award, Users, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold text-[#a07127] tracking-wider">Our Legacy & Mission</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mt-2">
            Celebrating Life's Most Precious Moments
          </h1>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Banquite is India's leading luxury banquet venue booking platform. We connect event hosts with grand ballrooms, royal heritage lawns, and chic convention halls to make every occasion extraordinary.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#a07127] flex items-center justify-center mx-auto mb-4 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal mb-2">100% Verified Venues</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every banquet hall listed on Banquite is physically audited for safety, hygiene, parking capacity, and catering excellence.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#a07127] flex items-center justify-center mx-auto mb-4 font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Transparent Pricing</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              No hidden fees or last-minute surprises. Our live price calculator provides instant estimations per plate and hall rentals.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#a07127] flex items-center justify-center mx-auto mb-4 font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Dedicated Event Concierge</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our expert event coordinators assist you from venue selection through stage decor setup and guest coordination.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
