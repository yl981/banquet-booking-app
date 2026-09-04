import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake, Heart, Users, MoreHorizontal } from 'lucide-react';

const EventCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'Weddings',
      title: 'Weddings',
      subtitle: 'A beautiful start to forever',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      iconSvg: (
        <svg className="w-5 h-5 text-[#a07127]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
        </svg>
      ),
    },
    {
      id: 'Birthdays',
      title: 'Birthdays',
      subtitle: 'Make every year extra special',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
      iconSvg: <Cake className="w-5 h-5 text-[#a07127]" />,
    },
    {
      id: 'Corporate Events',
      title: 'Corporate Events',
      subtitle: 'Professional spaces for big ideas',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      iconSvg: <Users className="w-5 h-5 text-[#a07127]" />,
    },
    {
      id: 'Engagements',
      title: 'Engagements',
      subtitle: 'Celebrate love in style',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
      iconSvg: <Heart className="w-5 h-5 text-[#a07127]" />,
    },
    {
      id: 'Other Events',
      title: 'Other Events',
      subtitle: 'Any occasion, any size',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80',
      iconSvg: <MoreHorizontal className="w-5 h-5 text-[#a07127]" />,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Events Made <span className="relative inline-block text-charcoal">
              Extraordinary
              <span className="absolute bottom-1 left-0 right-0 h-1 bg-[#a07127]/30 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base font-normal">
            Whatever the occasion, we have the perfect space for you.
          </p>
        </div>

        {/* Categories Grid (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/venues?category=${encodeURIComponent(cat.id)}`)}
              className="group cursor-pointer bg-white rounded-3xl p-3 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200 text-center flex flex-col items-center hover:-translate-y-1.5"
            >
              {/* Rounded Image Container */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-8">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlapping Gold Icon Badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-200 shadow-md flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  {cat.iconSvg}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="px-2 pb-3">
                <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-[#a07127] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventCategories;
