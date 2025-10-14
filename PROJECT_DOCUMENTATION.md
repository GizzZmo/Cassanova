# Cassanova Casino - Project Documentation

## Overview
Cassanova is a modern, full-stack online casino website built with the following technologies:

### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Features**: 
  - Responsive design for all devices
  - Modern UI with animations
  - Server-side rendering (SSR)
  - Client-side interactivity

### Backend
- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Language**: TypeScript

## Project Structure

```
Cassanova/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js 15 app directory
│   │   ├── layout.tsx       # Root layout with Header & Footer
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   └── home/            # Homepage components
│   └── package.json
│
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── server.ts        # Express server setup
│   │   ├── models/          # Mongoose models
│   │   │   ├── User.ts
│   │   │   ├── Game.ts
│   │   │   ├── Promotion.ts
│   │   │   └── Transaction.ts
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   └── middleware/      # Auth middleware
│   ├── tsconfig.json
│   └── package.json
│
└── README.md                # Original blueprint
```

## Features Implemented

### Homepage (Following Blueprint)
✅ **Header**
- Casino logo
- Main navigation (Games, Live Casino, Promotions, VIP)
- Log In and Sign Up buttons
- Responsive mobile menu

✅ **Hero Banner**
- Dynamic gradient background with animations
- Welcome bonus announcement (200% up to $500 + 100 Free Spins)
- Prominent "Join Now" CTA button
- Feature badges (Instant Deposits, 1000+ Games, Secure, VIP Rewards)

✅ **Game Lobby Preview**
- Tabs for Popular, New Games, and Jackpots
- Game grid with hover effects
- Game thumbnails with Play Now buttons
- "View All Games" CTA

✅ **Jackpot Ticker**
- Live updating jackpot amounts
- Full-width banner with gradient background
- Multiple jackpot games displayed

✅ **Promotions Section**
- Cards for key promotions (Weekly Cashback, Friday Free Spins, Reload Bonus)
- Icon-based visual design
- "Learn More" links for each promotion

✅ **Why Choose Us Section**
- 4 key benefits with icons
- Fast Payouts
- 24/7 Support
- Fully Licensed
- Huge Game Selection

✅ **Footer**
- Multi-column layout
- Quick Links, Help & Support, Legal sections
- Payment method logos
- Licensing information
- Responsible gaming notice

### Backend API

✅ **User Management**
- Registration with email verification
- Login with JWT authentication
- User profile management
- Responsible gaming settings
- Favorite games management

✅ **Game Management**
- Game catalog with categories
- Search and filter functionality
- Game details and metadata
- Jackpot games tracking

✅ **Promotions**
- Promotion listing with filters
- Active/inactive status
- VIP level eligibility
- Terms and conditions

✅ **Transactions**
- Deposit processing
- Withdrawal requests with KYC checks
- Transaction history
- Balance management

### Database Models

1. **User Model**
   - Authentication details
   - Profile information
   - Balance and bonus balance
   - KYC status
   - VIP level
   - Responsible gaming settings
   - Favorite games

2. **Game Model**
   - Game information
   - Provider details
   - Categories and features
   - RTP and volatility
   - Jackpot information

3. **Promotion Model**
   - Promotion details
   - Bonus terms
   - Validity dates
   - Eligibility criteria

4. **Transaction Model**
   - Transaction type (deposit, withdrawal, bet, win)
   - Amount and status
   - Payment method
   - Balance tracking

## Getting Started

### Prerequisites
- Node.js 20+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cassanova
   JWT_SECRET=your-secure-secret-key
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend API will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify/:token` - Verify email

### Games
- `GET /api/games` - Get all games (with filters)
- `GET /api/games/jackpots` - Get jackpot games
- `GET /api/games/:slug` - Get game by slug
- `POST /api/games` - Create game (admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/responsible-gaming` - Update responsible gaming settings
- `POST /api/users/favorites` - Toggle favorite game

### Promotions
- `GET /api/promotions` - Get all promotions
- `GET /api/promotions/:slug` - Get promotion by slug
- `POST /api/promotions` - Create promotion (admin)

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions/deposit` - Create deposit
- `POST /api/transactions/withdrawal` - Create withdrawal

## Core Principles (From Blueprint)

✅ **User-Centric Design**
- Intuitive navigation
- Responsive design for all devices
- Modern, visually appealing interface

✅ **Security & Trust**
- JWT authentication
- Password hashing with bcryptjs
- Secure transaction handling
- KYC verification for withdrawals

✅ **Responsible Gaming**
- Deposit limits (daily, weekly, monthly)
- Loss limits
- Session time limits
- Self-exclusion options

✅ **Performance**
- Next.js optimizations
- Efficient API design
- Database indexing with MongoDB

## Future Enhancements

### Short Term
- [ ] Add user authentication pages (login, register)
- [ ] Create game detail pages
- [ ] Implement user dashboard
- [ ] Add deposit/withdrawal pages
- [ ] Create promotions detail pages

### Medium Term
- [ ] Integrate real payment providers
- [ ] Add email verification system
- [ ] Implement KYC document upload
- [ ] Add live chat support
- [ ] Create admin dashboard

### Long Term
- [ ] Integrate real game providers
- [ ] Add live dealer games
- [ ] Implement real-time notifications
- [ ] Add progressive jackpot tracking
- [ ] Multi-language support
- [ ] Mobile app development

## License
This is a demo project for educational purposes.

## Contributing
This project follows the blueprint outlined in README.md. All features are implemented according to the specifications.
