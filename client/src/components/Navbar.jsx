import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, CalendarCheck, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              {/* Lotus Icon */}
              <svg className="w-6 h-6 text-[#a07127]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C12 2 14.5 7 14.5 10.5C14.5 12.5 13.5 14 12 15C10.5 14 9.5 12.5 9.5 10.5C9.5 7 12 2 12 2Z" />
                <path d="M12 15C14.5 15 18 13.5 19.5 11C19.5 11 18.5 16 15 17.5C13.5 18 12 17.5 12 15Z" opacity="0.85"/>
                <path d="M12 15C9.5 15 6 13.5 4.5 11C4.5 11 5.5 16 9 17.5C10.5 18 12 17.5 12 15Z" opacity="0.85"/>
                <path d="M12 17.5C15.5 17.5 21 16.5 22 13C22 13 20.5 19 16 20.5C14 21 12 20 12 17.5Z" opacity="0.7"/>
                <path d="M12 17.5C8.5 17.5 3 16.5 2 13C2 13 3.5 19 8 20.5C10 21 12 20 12 17.5Z" opacity="0.7"/>
              </svg>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal block leading-none">
                Banquite
              </span>
              <span className="text-[10px] tracking-wider uppercase font-medium text-amber-800/80 block mt-1">
                Celebrate Every Moment
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-charcoal/80 text-sm">
            <Link
              to="/"
              className={`hover:text-primary transition-colors relative py-1 ${
                isActive('/') ? 'text-primary font-semibold' : ''
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
            <Link
              to="/venues"
              className={`hover:text-primary transition-colors relative py-1 ${
                isActive('/venues') ? 'text-primary font-semibold' : ''
              }`}
            >
              Venues
              {isActive('/venues') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
            <Link
              to="/about"
              className={`hover:text-primary transition-colors relative py-1 ${
                isActive('/about') ? 'text-primary font-semibold' : ''
              }`}
            >
              About
              {isActive('/about') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
            <Link
              to="/contact"
              className={`hover:text-primary transition-colors relative py-1 ${
                isActive('/contact') ? 'text-primary font-semibold' : ''
              }`}
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/venues')}
              className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:text-primary hover:border-amber-300 transition-all bg-gray-50/50"
              title="Search Venues"
            >
              <Search className="w-4 h-4" />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-amber-200 bg-amber-50/50 hover:bg-amber-100/50 transition-colors text-charcoal font-medium text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-sm text-charcoal">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-primary transition-colors"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      My Bookings
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-primary transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Admin Portal
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left border-t border-gray-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openAuth('login')}
                  className="text-sm font-semibold text-charcoal hover:text-primary px-3 py-2 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="bg-[#a07127] hover:bg-[#8c5d1e] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-amber-900/10 hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;
