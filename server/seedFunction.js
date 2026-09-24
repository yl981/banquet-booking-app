const User = require('./models/User');
const Venue = require('./models/Venue');
const Booking = require('./models/Booking');
const Review = require('./models/Review');

const sampleVenues = [
  {
    name: 'The Grand Imperial Pavilion',
    tagline: 'Luxury Ballroom & Royal Heritage Lawns',
    description: 'An architectural masterpiece featuring crystal chandeliers, 30-ft ceilings, marble flooring, and sprawling lush green lawns designed for dream grand weddings and high-profile corporate galas.',
    city: 'Mumbai',
    area: 'Bandra Kurla Complex',
    address: 'Plot C-14, G Block, BKC, Bandra East, Mumbai, Maharashtra 400051',
    categories: ['Weddings', 'Corporate Events', 'Engagements', 'Other Events'],
    minCapacity: 150,
    maxCapacity: 1200,
    pricePerPlateVeg: 1850,
    pricePerPlateNonVeg: 2250,
    hallRentalFee: 120000,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.9,
    numReviews: 48,
    amenities: ['Centralized AC', 'Valet Parking (300+ cars)', 'In-house Gourmet Catering', 'Bridal Suite with Jacuzzi', 'Pro Sound & Stage Lighting', 'Power Backup Generator', 'DJ & Dancefloor'],
    rules: ['Outside catering not allowed', 'Alcohol served until 1:00 AM', 'Firecrackers restricted'],
    isFeatured: true,
    featuredBadge: 'Most Popular Grand Ballroom',
    contactPhone: '+91 98200 11223',
  },
  {
    name: 'Rosewood Royale Banquet & Lawn',
    tagline: 'Elegance Redefined for Every Celebration',
    description: 'Exquisite multi-tiered banquet space with thematic floral setup capability, customized LED backdrops, and live interactive food stations catered by top master chefs.',
    city: 'Delhi',
    area: 'Vasant Kunj',
    address: 'Sector B, Pocket 2, Vasant Kunj, New Delhi 110070',
    categories: ['Weddings', 'Birthdays', 'Engagements', 'Corporate Events'],
    minCapacity: 100,
    maxCapacity: 800,
    pricePerPlateVeg: 1450,
    pricePerPlateNonVeg: 1750,
    hallRentalFee: 75000,
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.8,
    numReviews: 36,
    amenities: ['Full Air Conditioning', 'Ample Valet Parking', 'Dedicated Event Coordinator', 'Custom Floral Decor', 'High-Speed Wi-Fi', 'Green Rooms for Artists'],
    rules: ['Music allowed till 11:30 PM', 'Decor customization supported'],
    isFeatured: true,
    featuredBadge: 'Top Rated in Delhi NCR',
    contactPhone: '+91 98111 44556',
  },
  {
    name: 'Palace Gardens & Crystal Hall',
    tagline: 'Royal Destination Weddings & Gala Nights',
    description: 'Experience heritage royalty with modern luxury. Nestled near scenic surroundings, featuring traditional Rajasthani architectural arches merged with contemporary banquet comfort.',
    city: 'Udaipur',
    area: 'Fateh Sagar Lake',
    address: 'Palace Road, Near Fateh Sagar Lake, Udaipur, Rajasthan 313001',
    categories: ['Weddings', 'Engagements', 'Other Events'],
    minCapacity: 200,
    maxCapacity: 1500,
    pricePerPlateVeg: 2100,
    pricePerPlateNonVeg: 2600,
    hallRentalFee: 150000,
    images: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 5.0,
    numReviews: 52,
    amenities: ['Lake View Amphitheatre', 'Helipad Access', 'Luxury Guest Suites', 'Heritage Decor Setup', 'Live Folk & Orchestra Stage', 'Full Power Backup'],
    rules: ['Prior permits required for fireworks', 'Custom bar setup supported'],
    isFeatured: true,
    featuredBadge: 'Luxury Heritage Pick',
    contactPhone: '+91 97999 88776',
  },
  {
    name: 'The Crown Vista Celebration Centre',
    tagline: 'Modern Tech-Enabled Convention & Birthday Hub',
    description: 'State-of-the-art banquet hall with integrated 4K LED video walls, surround sound systems, modular seating arrangements, and bespoke cocktail lounge areas.',
    city: 'Bangalore',
    area: 'Indiranagar',
    address: '100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038',
    categories: ['Corporate Events', 'Birthdays', 'Engagements', 'Other Events'],
    minCapacity: 50,
    maxCapacity: 450,
    pricePerPlateVeg: 1100,
    pricePerPlateNonVeg: 1400,
    hallRentalFee: 40000,
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.7,
    numReviews: 29,
    amenities: ['4K LED Display Walls', 'Underground Parking', 'Cocktail Bar Lounge', 'High-Speed Wi-Fi', 'Audio-Visual Technicians', 'Centrally Air Conditioned'],
    rules: ['Confetti prohibited', 'Outside DJ allowed with prior notice'],
    isFeatured: false,
    featuredBadge: 'Best Tech Facilities',
    contactPhone: '+91 98450 67890',
  },
  {
    name: 'Sapphire Bay Banquets',
    tagline: 'Scenic Outdoor & Indoor Waterfront Celebrations',
    description: 'Breathtaking open-air lawn paired with an glass-walled air-conditioned banquet hall overlooking pristine water fountains. Ideal for engagement ceremonies, reception parties, and golden jubilees.',
    city: 'Jaipur',
    area: 'Tonk Road',
    address: 'Near Chokhi Dhani, Tonk Road, Jaipur, Rajasthan 302022',
    categories: ['Weddings', 'Birthdays', 'Engagements'],
    minCapacity: 100,
    maxCapacity: 900,
    pricePerPlateVeg: 1300,
    pricePerPlateNonVeg: 1600,
    hallRentalFee: 60000,
    images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.8,
    numReviews: 41,
    amenities: ['Open-air Lawn', 'Water Fountain Backdrop', 'Theme Lighting', 'Valet Parking', 'Dedicated Catering Kitchen', 'Chamber for Bride/Groom'],
    rules: ['Alcohol permits needed', 'Loud music cutoff at 11:00 PM'],
    isFeatured: true,
    featuredBadge: 'Top Scenic Venue',
    contactPhone: '+91 94140 12345',
  },
  {
    name: 'Orchid Elegance Convention Centre',
    tagline: 'Spacious & Sophisticated Venue for Large Scale Gatherings',
    description: 'Designed to accommodate large weddings and grand conferences without compromise. Features 3 distinct hall sections that can be merged into a massive 20,000 sq ft pillarless space.',
    city: 'Mumbai',
    area: 'Andheri West',
    address: 'Link Road, Opposite Infinity Mall, Andheri West, Mumbai, Maharashtra 400053',
    categories: ['Weddings', 'Corporate Events', 'Other Events'],
    minCapacity: 300,
    maxCapacity: 2000,
    pricePerPlateVeg: 1650,
    pricePerPlateNonVeg: 1950,
    hallRentalFee: 100000,
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.6,
    numReviews: 31,
    amenities: ['Pillarless Grand Hall', 'VIP Holding Room', 'Valet Parking (400 Cars)', 'Full Generator Backup', 'Stage Elevators', 'Multi-Cuisine Buffet Setup'],
    rules: ['Sound limits enforced after midnight'],
    isFeatured: false,
    featuredBadge: 'Largest Pillarless Hall',
    contactPhone: '+91 98205 99887',
  },
];

async function seedSampleData(force = false) {
  try {
    if (force) {
      console.log('Force reseed requested: clearing collections...');
      await User.deleteMany();
      await Venue.deleteMany();
      await Booking.deleteMany();
      await Review.deleteMany();
    }

    let adminUser = await User.findOne({ email: 'admin@banquite.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Banquite Executive Admin',
        email: 'admin@banquite.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 99887 76655',
      });
    }

    let demoCustomer = await User.findOne({ email: 'user@banquite.com' });
    if (!demoCustomer) {
      demoCustomer = await User.create({
        name: 'Aarav Sharma',
        email: 'user@banquite.com',
        password: 'user123',
        role: 'customer',
        phone: '+91 98765 43210',
      });
    }

    const venueCount = await Venue.countDocuments();
    let createdVenues = [];
    if (venueCount === 0) {
      createdVenues = await Venue.insertMany(sampleVenues);
      console.log(`Auto-seeded ${createdVenues.length} luxury banquet venues.`);

      await Review.create([
        {
          venue: createdVenues[0]._id,
          user: demoCustomer._id,
          userName: 'Aarav Sharma',
          rating: 5,
          comment: "Hosted our sister's wedding reception at The Grand Imperial Pavilion. The lighting, decor, and live catering were absolute perfection! Every guest was thoroughly impressed.",
          eventType: 'Weddings',
        },
        {
          venue: createdVenues[1]._id,
          user: demoCustomer._id,
          userName: 'Priya Verma',
          rating: 5,
          comment: 'Unbelievable experience! The team took care of all floral arrangements and food taste was outstanding.',
          eventType: 'Engagements',
        },
        {
          venue: createdVenues[2]._id,
          user: demoCustomer._id,
          userName: 'Vikramaditya Singh',
          rating: 5,
          comment: 'True royal experience by Lake Fateh Sagar. The hospitality and setting was unmatched!',
          eventType: 'Weddings',
        },
      ]);

      await Booking.create({
  user: demoCustomer._id,

  // New field added
  email: 'user@banquite.com',

  venue: createdVenues[0]._id,
  eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  eventType: 'Weddings',
  timeSlot: 'Evening (5 PM - 11 PM)',
  guestCount: 300,
  cateringPreference: 'Veg',
  totalAmount: 300 * 1850 + 120000,
  status: 'Confirmed',

  contactDetails: {
    name: 'Aarav Sharma',
    email: 'user@banquite.com',
    phone: '+91 98765 43210',
  },

  specialRequests: 'Need grand flower entryway and golden tablecloths.',
});
    }

    return {
      venuesSeeded: createdVenues.length || venueCount,
      adminEmail: 'admin@banquite.com',
      userEmail: 'user@banquite.com',
    };
  } catch (error) {
    console.error('Seed helper error:', error);
    throw error;
  }
}

module.exports = { seedSampleData, sampleVenues };
