# 🏰 Banquite — Luxury Banquet Booking Application (MERN Stack)

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.3-38B2AC.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://www.mongodb.com/)

**Banquite** is a full-stack, real-world **MERN** application designed for discovering, filtering, and booking luxury banquet halls for weddings, birthdays, corporate galas, and special celebrations across top Indian cities.

---

## ✨ Features & Highlights

### 🎨 1. Luxury Landing Page (Pixel-Perfect Design)
- **Lotus Brand Identity**: Lotus emblem with copper/gold accents (`#a07127`) and Playfair Display typography.
- **Hero Discovery Section**: Floating elevated search pill allowing location and date filtering.
- **Trust Badges Bar**: *Verified Venues*, *Best Prices (No Hidden Charges)*, *Easy Booking*, and *24/7 Support*.
- **"Events Made Extraordinary"**: 5 arched category cards for **Weddings**, **Birthdays**, **Corporate Events**, **Engagements**, and **Other Events** with overlapping gold icons.
- **Promotional Curved Banner**: *"Turn Your Special Moments Into Lasting Memories"* with cursive subtext and floral table aesthetics.

### 🔍 2. Advanced Search & Venue Catalogue
- Filter venues by **City/Region**, **Event Type**, **Guest Capacity**, and **Price Range**.
- Sorting options: *Recommended*, *Price: Low to High*, *Price: High to Low*, and *Top Rating*.

### 🧮 3. Dynamic Price Calculation Engine
- Interactive booking modal calculating live estimates: `(Guest Count × Catering Price/Plate) + Hall Rental Fee`.
- Catering choices: *Pure Veg*, *Non-Veg*, or *Combined Both*.

### 👤 4. Customer Booking History Dashboard
- View upcoming & past bookings.
- Real-time status badges (*Pending Approval*, *Confirmed*, *Cancelled*).
- Printable/viewable **Booking Receipt** modal with full invoice breakdown.

### 🛡️ 5. Admin & Executive Management Portal
- Analytics cards: Total Revenue, Active Venues, Pending Bookings, Registered Customers.
- **Approve / Reject** customer booking requests.
- **Add New Venue**: Form with image galleries, pricing, capacity, and amenities list.

---

## 🔑 Pre-seeded Demo Accounts

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Customer** | `user@banquite.com` | `user123` | Make bookings, view receipts, post reviews |
| **Admin** | `admin@banquite.com` | `admin123` | Approve/Reject bookings, add/delete venues, view revenue stats |

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local MongoDB or MongoDB Atlas URI)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yl981/banquet-booking-app.git
   cd banquet-booking-app
   ```

2. **Install Dependencies**:
   ```bash
   npm run install-all
   ```

3. **Seed Database** (Populates luxury venues, admin, & demo accounts):
   ```bash
   npm run seed
   ```

4. **Run Dev Servers** (Runs Express API on `:5000` & Vite React on `:3000` concurrently):
   ```bash
   npm run dev
   ```

5. **Open Browser**:
   - Frontend App: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## 🛠️ Project Structure

```
banquet-booking-app/
├── package.json               # Root dev scripts & concurrently runner
├── server/                    # Node.js + Express + Mongoose Backend
│   ├── config/db.js           # Database connection with fallback
│   ├── models/                # User, Venue, Booking, Review schemas
│   ├── routes/                # Auth, Venue, Booking, Review, Admin APIs
│   ├── middleware/auth.js     # JWT protection & Admin authorization
│   ├── seed.js                # Database seeder
│   └── index.js               # Server entry point
└── client/                    # React + Vite + Tailwind CSS Frontend
    ├── src/
    │   ├── components/        # Navbar, HeroSearch, EventCategories, PromoCard, VenueCard, BookingModal, AuthModal
    │   ├── pages/             # Home, Venues, VenueDetails, MyBookings, AdminDashboard, About, Contact
    │   ├── context/           # AuthContext global state
    │   └── services/          # Axios API client
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
