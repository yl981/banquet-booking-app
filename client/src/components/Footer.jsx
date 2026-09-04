import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-950 border border-amber-600 flex items-center justify-center text-amber-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 14.5 7 14.5 10.5C14.5 12.5 13.5 14 12 15C10.5 14 9.5 12.5 9.5 10.5C9.5 7 12 2 12 2Z" />
                  <path d="M12 15C14.5 15 18 13.5 19.5 11C19.5 11 18.5 16 15 17.5C13.5 18 12 17.5 12 15Z" opacity="0.85"/>
                  <path d="M12 15C9.5 15 6 13.5 4.5 11C4.5 11 5.5 16 9 17.5C10.5 18 12 17.5 12 15Z" opacity="0.85"/>
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Banquite
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              India's premier luxury banquet hall booking portal. Celebrate weddings, birthdays, corporate events, and receptions in handpicked verified venues.
            </p>

            <div className="mt-6 flex items-center gap-4 text-gray-400">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#a07127] hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#a07127] hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#a07127] hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/venues" className="hover:text-amber-400 transition-colors">Browse Venues</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact & Support</Link></li>
              <li><Link to="/my-bookings" className="hover:text-amber-400 transition-colors">Customer Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Popular Cities */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Top Cities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/venues?city=Mumbai" className="hover:text-amber-400 transition-colors">Mumbai</Link></li>
              <li><Link to="/venues?city=Delhi" className="hover:text-amber-400 transition-colors">Delhi NCR</Link></li>
              <li><Link to="/venues?city=Bangalore" className="hover:text-amber-400 transition-colors">Bangalore</Link></li>
              <li><Link to="/venues?city=Udaipur" className="hover:text-amber-400 transition-colors">Udaipur</Link></li>
              <li><Link to="/venues?city=Jaipur" className="hover:text-amber-400 transition-colors">Jaipur</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Support & Help</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 1800-BANQUITE (24/7)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>support@banquite.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Banquite Tower, BKC, Mumbai 400051</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Banquite Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for unforgettable celebrations.
          </p>
        </div>

      </div>
    </footer>
  );
};

// Simple social icon wrappers
const Instagram = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const Facebook = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

export default Footer;
