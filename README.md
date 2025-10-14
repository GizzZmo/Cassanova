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
- **Live Jackpot Ticker**: Real-time progressive jackpot displays
- **Promotional System**: Eye-catching promotion cards and welcome bonuses
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile

### 🔐 Backend & Security
- **JWT Authentication**: Secure user authentication and session management
- **Password Security**: bcryptjs password hashing
- **RESTful API**: Well-structured Express.js backend
- **MongoDB Integration**: Efficient data management with Mongoose ODM
- **Transaction Management**: Complete deposit/withdrawal system

### 🎯 Casino Features
- **User Management**: Registration, profiles, and KYC verification
- **Game Catalog**: Comprehensive game database with metadata
- **Promotions Engine**: Flexible promotion and bonus system
- **Transaction History**: Complete audit trail of all transactions
- **Responsible Gaming**: Deposit limits, loss limits, and self-exclusion options
- **VIP System**: Multi-tier loyalty program
- **Favorites**: Personal game collections

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

### Game Lobby
Browse through categorized game collections with tabs for Popular, New Games, and Jackpots.

### User Dashboard
Complete account management with profile settings, transaction history, and responsible gaming controls.

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in minutes
- **[Project Documentation](PROJECT_DOCUMENTATION.md)** - Comprehensive technical documentation
- **[API Reference](docs/API_REFERENCE.md)** - Complete API endpoint documentation
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture and design patterns
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Security Policy](docs/SECURITY.md)** - Security best practices and vulnerability reporting

## 🏗️ Project Structure

```
Cassanova/
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js 15 app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── layout/       # Header, Footer
│   │   └── home/         # Homepage sections
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

### Short Term
- [ ] User authentication pages (login, register)
- [ ] Game detail pages
- [ ] User dashboard implementation
- [ ] Deposit/withdrawal pages
- [ ] Promotion detail pages

### Medium Term
- [ ] Real payment provider integration
- [ ] Email verification system
- [ ] KYC document upload
- [ ] Live chat support
- [ ] Admin dashboard

### Long Term
- [ ] Real game provider integration
- [ ] Live dealer games
- [ ] Real-time notifications
- [ ] Progressive jackpot tracking
- [ ] Multi-language support
- [ ] Mobile app development

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
