<div align="center">

# 🎰 Cassanova Casino

### Modern Full-Stack Online Casino Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[![CI](https://github.com/GizzZmo/Cassanova/actions/workflows/ci.yml/badge.svg)](https://github.com/GizzZmo/Cassanova/actions/workflows/ci.yml)
[![Backend Build](https://img.shields.io/github/actions/workflow/status/GizzZmo/Cassanova/ci.yml?branch=main&label=Backend&logo=node.js)](https://github.com/GizzZmo/Cassanova/actions/workflows/ci.yml)
[![Frontend Build](https://img.shields.io/github/actions/workflow/status/GizzZmo/Cassanova/ci.yml?branch=main&label=Frontend&logo=next.js)](https://github.com/GizzZmo/Cassanova/actions/workflows/ci.yml)

[Features](#-key-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About

**Cassanova Casino** is a cutting-edge, full-stack online casino platform designed as a demonstration of modern web development practices. Built with the latest technologies including Next.js 15, React 19, and MongoDB, this project showcases a complete casino website implementation with a professional UI/UX, robust backend API, and comprehensive feature set.

> **⚠️ Important Note**: This is a demonstration project for educational purposes. For production deployment, ensure proper gaming licenses, payment integrations, and regulatory compliance.

## ✨ Key Features

### 🎮 Frontend Experience
- **Modern UI/UX**: Beautiful, responsive design built with Tailwind CSS
- **Dynamic Game Lobby**: Browse, filter, and search through game collections
- **Game Detail Pages**: Complete game information with RTP, volatility, and demo options
- **Live Jackpot Ticker**: Real-time progressive jackpot displays
- **Promotional System**: Eye-catching promotion cards with detailed promotion pages
- **User Dashboard**: Complete account overview with balance, VIP status, and transaction history
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile

### 🔐 Authentication & Security
- **Complete Auth System**: Login and registration pages with validation
- **JWT Authentication**: Secure user authentication and session management
- **Protected Routes**: Automatic redirects for unauthorized access
- **Password Security**: bcryptjs password hashing
- **Session Persistence**: Secure token storage with automatic renewal
- **KYC Verification**: Required checks for withdrawals

### 💰 Financial Management
- **Multi-Payment Deposit**: Support for cards, crypto, bank transfers, and e-wallets
- **Secure Withdrawals**: KYC-verified withdrawals with balance validation
- **Transaction History**: Complete audit trail of all transactions
- **Balance Tracking**: Real-time balance updates
- **Deposit Limits**: Configurable limits per payment method
- **Quick Actions**: Fast deposit/withdrawal from dashboard

### 🎯 Casino Features
- **User Management**: Registration, profiles, and account settings
- **Game Catalog**: Comprehensive game database with metadata and categories
- **Promotions Engine**: Flexible promotion and bonus system with eligibility rules
- **VIP System**: Multi-tier loyalty program (Bronze, Silver, Gold, Platinum)
- **Responsible Gaming**: Deposit limits, loss limits, and self-exclusion options
- **Favorites**: Personal game collections (backend ready)

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Features**: Server-Side Rendering (SSR), Hot Reloading

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express 5
- **Database**: MongoDB 8 with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcryptjs, CORS
- **Language**: TypeScript 5

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/GizzZmo/Cassanova.git
cd Cassanova
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

For detailed setup instructions, see [QUICKSTART.md](QUICKSTART.md).

## 📸 Demo

### Homepage
The homepage features a modern hero banner with welcome bonuses, game lobby preview, live jackpot ticker, and promotional cards.

### Authentication Pages
Complete login and registration system with form validation, secure password handling, and terms acceptance.

### User Dashboard
Fully functional dashboard with account overview, balance display, VIP level tracking, recent transactions, and quick action buttons for deposits/withdrawals.

### Game Pages
- **Game Lobby**: Browse through categorized game collections with tabs for Popular, New Games, and Jackpots
- **Game Details**: Individual game pages with full information, statistics (RTP, volatility), features, and demo/play options

### Financial Pages
- **Deposit**: Secure deposit page with multiple payment methods (card, crypto, bank transfer, e-wallet) and quick amount selection
- **Withdraw**: Withdrawal page with KYC verification, balance validation, and multiple withdrawal options

### Promotion Pages
- **Promotions Listing**: Browse all available promotions and bonuses
- **Promotion Details**: Individual promotion pages with complete terms, eligibility requirements, and claim buttons

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in minutes
- **[Project Documentation](PROJECT_DOCUMENTATION.md)** - Comprehensive technical documentation
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Details of recently implemented features
- **[API Reference](docs/API_REFERENCE.md)** - Complete API endpoint documentation
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture and design patterns
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Security Policy](docs/SECURITY.md)** - Security best practices and vulnerability reporting

## 🏗️ Project Structure

```
Cassanova/
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js 15 app directory
│   │   ├── layout.tsx    # Root layout with AuthProvider
│   │   ├── page.tsx      # Homepage
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   ├── dashboard/    # User dashboard (protected)
│   │   ├── deposit/      # Deposit page (protected)
│   │   ├── withdraw/     # Withdrawal page (protected)
│   │   ├── games/        # Game pages
│   │   │   └── [slug]/   # Dynamic game detail pages
│   │   ├── promotions/   # Promotion pages
│   │   │   └── [slug]/   # Dynamic promotion detail pages
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── layout/       # Header, Footer
│   │   └── home/         # Homepage sections
│   ├── lib/              # Utility libraries
│   │   ├── api.ts        # API client
│   │   └── auth-context.tsx  # Authentication context
│   ├── types/            # TypeScript type definitions
│   └── public/           # Static assets
│
├── backend/              # Express backend API
│   └── src/
│       ├── server.ts     # Express server
│       ├── models/       # Mongoose models
│       ├── routes/       # API routes
│       ├── controllers/  # Request handlers
│       └── middleware/   # Authentication middleware
│
└── docs/                 # Documentation
    ├── API_REFERENCE.md
    ├── ARCHITECTURE.md
    ├── DEPLOYMENT.md
    ├── SECURITY.md
    └── CONTRIBUTING.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify/:token` - Email verification

### Games
- `GET /api/games` - List all games (with filters)
- `GET /api/games/jackpots` - Get jackpot games
- `GET /api/games/:slug` - Get game details

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/responsible-gaming` - Update gaming limits
- `POST /api/users/favorites` - Toggle favorite game

### Promotions
- `GET /api/promotions` - List all promotions
- `GET /api/promotions/:slug` - Get promotion details

### Transactions
- `GET /api/transactions` - Get transaction history
- `POST /api/transactions/deposit` - Create deposit
- `POST /api/transactions/withdrawal` - Create withdrawal

For complete API documentation, see [API_REFERENCE.md](docs/API_REFERENCE.md).

## 🌐 Frontend Routes

### Public Routes
- `/` - Homepage with game lobby and promotions
- `/login` - User login page
- `/register` - User registration page
- `/games/[slug]` - Game detail pages (dynamic)
- `/promotions/[slug]` - Promotion detail pages (dynamic)

### Protected Routes (Require Authentication)
- `/dashboard` - User dashboard with account overview and transactions
- `/deposit` - Deposit funds with multiple payment methods
- `/withdraw` - Withdraw funds with KYC verification

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🔒 Security

Security is a top priority. We implement:
- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Input validation and sanitization
- ✅ Secure transaction handling
- ✅ KYC verification for withdrawals

For security concerns, please see our [Security Policy](docs/SECURITY.md).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

### ✅ Completed Features

#### Phase 1: Core Pages (Completed)
- [x] User authentication pages (login, register)
- [x] Game detail pages with full information
- [x] User dashboard implementation
- [x] Deposit/withdrawal pages with multiple payment methods
- [x] Promotion detail pages

#### Phase 2: User Experience (Completed)
- [x] Authentication context and session management
- [x] Protected routes with automatic redirects
- [x] Form validation and error handling
- [x] Responsive design for all pages
- [x] Transaction history display
- [x] KYC verification checks

### 🚀 Upcoming Features

#### Short Term
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] KYC document upload interface
- [ ] Two-factor authentication
- [ ] Transaction filtering and search
- [ ] Favorite games management UI

#### Medium Term
- [ ] Real payment provider integration
- [ ] Live chat support system
- [ ] Admin dashboard for management
- [ ] Advanced game filtering and search
- [ ] Real-time balance updates via WebSocket
- [ ] Push notifications for promotions

#### Long Term
- [ ] Real game provider integration
- [ ] Live dealer games
- [ ] Progressive jackpot tracking system
- [ ] Multi-language support (i18n)
- [ ] Mobile app development (iOS/Android)
- [ ] Social features and tournaments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Educational & Demonstration Purposes Only**: This software is provided as-is for learning and demonstration. Production use requires proper gaming licenses, compliance with gambling regulations, and integration with licensed payment and gaming providers.

## 👥 Authors

- **GizzZmo** - *Initial work* - [GizzZmo](https://github.com/GizzZmo)

## 🙏 Acknowledgments

- Built with Next.js, React, and modern web technologies
- Inspired by industry-leading online casino platforms
- UI/UX design following best practices in gaming industry

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/GizzZmo/Cassanova/issues)
- **Documentation**: [Project Docs](PROJECT_DOCUMENTATION.md)
- **Email**: For private inquiries

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [GizzZmo](https://github.com/GizzZmo)

</div>
