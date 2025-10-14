# System Architecture

This document describes the high-level architecture of the Cassanova Casino platform.

## Table of Contents
- [Overview](#overview)
- [Architecture Diagram](#architecture-diagram)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Database Design](#database-design)
- [Security Architecture](#security-architecture)
- [Deployment Architecture](#deployment-architecture)
- [Scalability Considerations](#scalability-considerations)

---

## Overview

Cassanova Casino follows a modern **three-tier architecture**:

1. **Presentation Layer**: Next.js 15 frontend with React 19
2. **Application Layer**: Node.js/Express REST API
3. **Data Layer**: MongoDB database

The architecture is designed to be:
- **Scalable**: Can handle growing user base and traffic
- **Maintainable**: Clear separation of concerns
- **Secure**: Multiple layers of security
- **Performant**: Optimized for fast response times

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Desktop    │  │    Tablet    │  │    Mobile    │          │
│  │   Browser    │  │   Browser    │  │   Browser    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Next.js 15 Application                        │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐     │  │
│  │  │  App Router │  │  Components  │  │   Layouts   │     │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘     │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐     │  │
│  │  │     SSR     │  │     CSR      │  │   Assets    │     │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            │ HTTP/REST                           │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION TIER                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                Express.js API Server                       │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │  Routes  │→ │Controllers│→ │ Services │→ │  Models  │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │   Auth   │  │   CORS   │  │Validation│  │  Logging │ │  │
│  │  │Middleware│  │Middleware│  │Middleware│  │Middleware│ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │ MongoDB Protocol
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA TIER                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   MongoDB Database                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │  Users   │  │  Games   │  │Promotions│  │Transaction│ │  │
│  │  │Collection│  │Collection│  │Collection│  │Collection │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │              Indexes & Constraints                    │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Technology Stack
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5

### Directory Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   └── (future routes)/     # Future page routes
│
├── components/              # React components
│   ├── layout/             # Layout components
│   │   ├── Header.tsx      # Site header
│   │   └── Footer.tsx      # Site footer
│   │
│   └── home/               # Homepage components
│       ├── HeroBanner.tsx
│       ├── GameLobby.tsx
│       ├── JackpotTicker.tsx
│       ├── Promotions.tsx
│       └── WhyChooseUs.tsx
│
├── public/                 # Static assets
│   └── images/            # Image files
│
├── lib/                   # Utility functions
│   ├── api.ts            # API client
│   └── utils.ts          # Helper functions
│
└── types/                # TypeScript types
    └── index.ts          # Type definitions
```

### Component Architecture

```
┌────────────────────────────────────────┐
│          Root Layout                    │
│  ┌──────────────────────────────────┐  │
│  │         Header                    │  │
│  │  ┌────────┐  ┌────────┐         │  │
│  │  │  Logo  │  │  Nav   │         │  │
│  │  └────────┘  └────────┘         │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │         Page Content              │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │    Hero Banner             │  │  │
│  │  └────────────────────────────┘  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │    Game Lobby              │  │  │
│  │  └────────────────────────────┘  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │    Jackpot Ticker          │  │  │
│  │  └────────────────────────────┘  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │    Promotions              │  │  │
│  │  └────────────────────────────┘  │  │
│  │  ┌────────────────────────────┐  │  │
│  │  │    Why Choose Us           │  │  │
│  │  └────────────────────────────┘  │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │         Footer                    │  │
│  │  ┌────────┐  ┌────────┐         │  │
│  │  │ Links  │  │ Legal  │         │  │
│  │  └────────┘  └────────┘         │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Rendering Strategy
- **SSR (Server-Side Rendering)**: Initial page loads for SEO
- **CSR (Client-Side Rendering)**: Interactive components
- **Static Generation**: For static content where possible

---

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js 20+
- **Framework**: Express 5
- **Database ODM**: Mongoose
- **Authentication**: JWT
- **Language**: TypeScript 5

### Directory Structure

```
backend/
├── src/
│   ├── server.ts              # Express app entry point
│   │
│   ├── models/               # Mongoose models
│   │   ├── User.ts          # User model
│   │   ├── Game.ts          # Game model
│   │   ├── Promotion.ts     # Promotion model
│   │   └── Transaction.ts   # Transaction model
│   │
│   ├── routes/              # Route definitions
│   │   ├── auth.ts         # Authentication routes
│   │   ├── games.ts        # Game routes
│   │   ├── users.ts        # User routes
│   │   ├── promotions.ts   # Promotion routes
│   │   └── transactions.ts # Transaction routes
│   │
│   ├── controllers/         # Business logic
│   │   ├── authController.ts
│   │   ├── gameController.ts
│   │   ├── userController.ts
│   │   ├── promotionController.ts
│   │   └── transactionController.ts
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts         # JWT authentication
│   │   ├── validation.ts   # Input validation
│   │   ├── errorHandler.ts # Error handling
│   │   └── rateLimit.ts    # Rate limiting
│   │
│   ├── services/            # Business services
│   │   ├── authService.ts
│   │   ├── emailService.ts
│   │   ├── paymentService.ts
│   │   └── gameService.ts
│   │
│   └── utils/              # Utility functions
│       ├── database.ts     # DB connection
│       ├── logger.ts       # Logging utility
│       └── validators.ts   # Validation helpers
│
├── .env.example            # Environment template
└── tsconfig.json          # TypeScript config
```

### Request Flow

```
Client Request
      │
      ▼
┌─────────────┐
│   Routes    │  Register endpoint
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Middleware  │  Authentication, Validation, CORS
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Controllers │  Handle request, business logic
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Services   │  Complex business operations
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Models    │  Database operations
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  Database   │  MongoDB
└─────┬───────┘
      │
      ▼
  Response
```

### Middleware Chain

```
Request → CORS → Rate Limit → Body Parser → Auth → Validation → Controller
```

---

## Database Design

### Entity Relationship Diagram

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ _id: ObjectId       │
│ username: String    │
│ email: String       │
│ password: String    │
│ balance: Number     │
│ bonusBalance: Number│
│ vipLevel: String    │
│ favoriteGames: []   │───┐
│ responsibleGaming:{}│   │
└─────────────────────┘   │
         │                │
         │ 1:N            │ N:M
         │                │
         ▼                ▼
┌─────────────────────┐ ┌─────────────────────┐
│   Transaction       │ │       Game          │
├─────────────────────┤ ├─────────────────────┤
│ _id: ObjectId       │ │ _id: ObjectId       │
│ userId: ObjectId    │ │ slug: String        │
│ type: String        │ │ title: String       │
│ amount: Number      │ │ provider: String    │
│ status: String      │ │ category: String    │
│ method: String      │ │ rtp: Number         │
│ balanceBefore: Num  │ │ volatility: String  │
│ balanceAfter: Number│ │ isJackpot: Boolean  │
│ createdAt: Date     │ │ jackpotAmount: Num  │
└─────────────────────┘ └─────────────────────┘

┌─────────────────────┐
│     Promotion       │
├─────────────────────┤
│ _id: ObjectId       │
│ slug: String        │
│ title: String       │
│ type: String        │
│ bonusAmount: Number │
│ bonusPercentage: Num│
│ minDeposit: Number  │
│ maxBonus: Number    │
│ wagerRequirement: N │
│ validFrom: Date     │
│ validTo: Date       │
│ vipLevelRequired: S │
└─────────────────────┘
```

### Database Indexes

#### Users Collection
- `email` - Unique index
- `username` - Unique index
- `createdAt` - For sorting
- `vipLevel` - For filtering

#### Games Collection
- `slug` - Unique index
- `category` - For filtering
- `provider` - For filtering
- `isJackpot` - For jackpot queries
- `popularity` - For sorting

#### Transactions Collection
- `userId` - For user queries
- `type` - For filtering
- `status` - For filtering
- `createdAt` - For sorting
- Compound: `(userId, createdAt)` - For user history

#### Promotions Collection
- `slug` - Unique index
- `isActive` - For filtering
- `validFrom, validTo` - For date range queries

---

## Security Architecture

### Authentication Flow

```
1. User Login
   ↓
2. Validate Credentials
   ↓
3. Generate JWT Token (24h expiry)
   ↓
4. Return Token to Client
   ↓
5. Client Stores Token
   ↓
6. Include Token in Subsequent Requests
   ↓
7. Server Validates Token
   ↓
8. Process Request
```

### Security Layers

```
┌─────────────────────────────────────────┐
│  Layer 1: Transport Security (HTTPS)    │
├─────────────────────────────────────────┤
│  Layer 2: CORS Protection               │
├─────────────────────────────────────────┤
│  Layer 3: Rate Limiting                 │
├─────────────────────────────────────────┤
│  Layer 4: JWT Authentication            │
├─────────────────────────────────────────┤
│  Layer 5: Input Validation              │
├─────────────────────────────────────────┤
│  Layer 6: SQL Injection Prevention      │
├─────────────────────────────────────────┤
│  Layer 7: XSS Protection                │
├─────────────────────────────────────────┤
│  Layer 8: Password Hashing (bcrypt)     │
└─────────────────────────────────────────┘
```

### Data Protection

- **Passwords**: Hashed with bcryptjs (salt rounds: 10)
- **JWT Tokens**: Signed with HS256 algorithm
- **Sensitive Data**: Encrypted at rest
- **API Keys**: Stored in environment variables
- **Session Management**: Token-based, no server-side sessions

---

## Deployment Architecture

### Development Environment

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Frontend    │    │   Backend    │    │   MongoDB    │
│  localhost   │───▶│  localhost   │───▶│  localhost   │
│   :3000      │    │    :5000     │    │   :27017     │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Production Environment

```
                    ┌──────────────┐
                    │     CDN      │
                    │   (Static)   │
                    └──────┬───────┘
                           │
┌──────────────┐    ┌──────┴───────┐    ┌──────────────┐
│   Frontend   │    │ Load Balancer│    │   Backend    │
│   (Vercel)   │───▶│   (Nginx)    │───▶│   Cluster    │
│              │    │              │    │   (PM2)      │
└──────────────┘    └──────────────┘    └──────┬───────┘
                                               │
                                        ┌──────┴───────┐
                                        │   MongoDB    │
                                        │    Atlas     │
                                        │  (Replica)   │
                                        └──────────────┘
```

### Recommended Infrastructure

**Frontend**:
- Vercel or Netlify for Next.js hosting
- CloudFlare CDN for static assets
- Auto-scaling based on traffic

**Backend**:
- AWS EC2 or DigitalOcean Droplets
- PM2 for process management
- Nginx as reverse proxy
- Multiple instances for load balancing

**Database**:
- MongoDB Atlas (managed service)
- Replica set for high availability
- Automated backups
- Read replicas for scaling

**Additional Services**:
- Redis for caching and sessions
- S3 for file storage (KYC documents)
- SendGrid or AWS SES for emails
- CloudWatch or Datadog for monitoring

---

## Scalability Considerations

### Horizontal Scaling

```
                  ┌───────────────┐
                  │ Load Balancer │
                  └───────┬───────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
    ┌─────▼─────┐   ┌────▼──────┐  ┌────▼──────┐
    │ Backend 1 │   │ Backend 2 │  │ Backend N │
    └─────┬─────┘   └────┬──────┘  └────┬──────┘
          │              │              │
          └──────────────┼──────────────┘
                         │
                  ┌──────▼──────┐
                  │  Database   │
                  │  Replica    │
                  └─────────────┘
```

### Caching Strategy

```
Request → Cache (Redis) → Backend → Database
              ↓
          (Hit) Return Cached Data
              ↓
          (Miss) Query Database → Cache Result → Return
```

### Performance Optimizations

1. **Database**:
   - Proper indexing
   - Query optimization
   - Connection pooling
   - Read replicas for read-heavy operations

2. **Application**:
   - Response caching
   - API rate limiting
   - Background job processing
   - Efficient data pagination

3. **Frontend**:
   - Code splitting
   - Image optimization
   - Static generation where possible
   - CDN for assets

4. **Network**:
   - Gzip compression
   - HTTP/2
   - Keep-alive connections
   - Reduced payload sizes

### Monitoring & Observability

```
┌─────────────────────────────────────────┐
│           Application Metrics           │
│  • Request rate                         │
│  • Response time                        │
│  • Error rate                           │
│  • Active users                         │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│          Infrastructure Metrics         │
│  • CPU usage                            │
│  • Memory usage                         │
│  • Disk I/O                             │
│  • Network throughput                   │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│          Business Metrics               │
│  • User registrations                   │
│  • Active players                       │
│  • Deposits/Withdrawals                 │
│  • GGR (Gross Gaming Revenue)           │
└─────────────────────────────────────────┘
```

---

## Future Architecture Enhancements

### Microservices Migration

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Auth       │  │    Game      │  │  Payment     │
│  Service     │  │   Service    │  │  Service     │
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                  ┌───────▼────────┐
                  │  API Gateway   │
                  └────────────────┘
```

### Real-time Features

- WebSocket server for live updates
- Pub/Sub pattern for notifications
- Real-time jackpot tracking
- Live game sessions

### Advanced Caching

- Redis for session storage
- Edge caching with CloudFlare
- Application-level caching
- Database query result caching

This architecture provides a solid foundation that can scale with the platform's growth while maintaining security, performance, and maintainability.
