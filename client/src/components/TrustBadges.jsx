import React from 'react';
import { ShieldCheck, IndianRupee, CalendarCheck, Headset } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Verified Venues',
      sub: 'Trusted & Safe',
    },
    {
      icon: IndianRupee,
      title: 'Best Prices',
      sub: 'No Hidden Charges',
    },
    {
      icon: CalendarCheck,
      title: 'Easy Booking',
      sub: 'Quick & Secure',
    },
    {
      icon: Headset,
      title: '24/7 Support',
      sub: "We're Here for You",
    },
  ];

  return (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-amber-200/50 pt-8">
      {badges.map((b, idx) => {
        const IconComponent = b.icon;
        return (
          <div key={idx} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-amber-100/70 border border-amber-300/60 flex items-center justify-center text-[#a07127] shrink-0 group-hover:scale-110 transition-transform">
              <IconComponent className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-charcoal leading-tight">
                {b.title}
              </h4>
              <p className="text-[11px] text-gray-500 font-medium">
                {b.sub}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
