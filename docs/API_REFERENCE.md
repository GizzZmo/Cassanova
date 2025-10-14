# API Reference

Complete reference for the Cassanova Casino Backend API.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register New User

Register a new user account.

**Endpoint**: `POST /api/auth/register`

**Authentication**: None required

**Request Body**:
```json
{
  "username": "string (required, 3-20 characters, alphanumeric)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 characters)",
  "firstName": "string (required)",
  "lastName": "string (required)",
  "dateOfBirth": "string (ISO date, required, must be 18+)",
  "address": {
    "street": "string (required)",
    "city": "string (required)",
    "state": "string (required)",
    "zipCode": "string (required)",
    "country": "string (required)"
  },
  "phoneNumber": "string (optional)"
}
```

**Response**: `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email.",
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string"
  }
}
```

**Error Responses**:
- `400 Bad Request` - Invalid input data
- `409 Conflict` - Email or username already exists

---

### User Login

Authenticate a user and receive a JWT token.

**Endpoint**: `POST /api/auth/login`

**Authentication**: None required

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "string (JWT token)",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "balance": "number",
      "bonusBalance": "number",
      "vipLevel": "string",
      "isVerified": "boolean"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request` - Missing credentials
- `401 Unauthorized` - Invalid credentials
- `403 Forbidden` - Account suspended or email not verified

---

### Verify Email

Verify user email address with token.

**Endpoint**: `GET /api/auth/verify/:token`

**Authentication**: None required

**URL Parameters**:
- `token` - Email verification token

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Error Responses**:
- `400 Bad Request` - Invalid or expired token

---

## Game Endpoints

### Get All Games

Retrieve a list of all games with optional filtering.

**Endpoint**: `GET /api/games`

**Authentication**: None required

**Query Parameters**:
- `category` - Filter by category (slots, table-games, live-casino, video-poker, specialty)
- `provider` - Filter by game provider
- `search` - Search by game title
- `featured` - boolean (true/false)
- `isJackpot` - boolean (true/false)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sort` - Sort field (popularity, name, releaseDate)
- `order` - Sort order (asc, desc)

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "games": [
      {
        "id": "string",
        "slug": "string",
        "title": "string",
        "provider": "string",
        "category": "string",
        "imageUrl": "string",
        "thumbnailUrl": "string",
        "rtp": "number (0-100)",
        "volatility": "string (low, medium, high)",
        "minBet": "number",
        "maxBet": "number",
        "hasDemo": "boolean",
        "isFeatured": "boolean",
        "isJackpot": "boolean",
        "jackpotAmount": "number (if applicable)",
        "releaseDate": "string (ISO date)",
        "popularity": "number",
        "description": "string"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

---

### Get Game by Slug

Retrieve detailed information about a specific game.

**Endpoint**: `GET /api/games/:slug`

**Authentication**: None required

**URL Parameters**:
- `slug` - Game slug (URL-friendly identifier)

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "string",
    "slug": "string",
    "title": "string",
    "provider": "string",
    "category": "string",
    "imageUrl": "string",
    "thumbnailUrl": "string",
    "rtp": "number",
    "volatility": "string",
    "minBet": "number",
    "maxBet": "number",
    "hasDemo": "boolean",
    "isFeatured": "boolean",
    "isJackpot": "boolean",
    "jackpotAmount": "number",
    "releaseDate": "string",
    "popularity": "number",
    "description": "string",
    "rules": "string",
    "features": ["string"],
    "paylines": "number",
    "reels": "number",
    "gameUrl": "string",
    "demoUrl": "string"
  }
}
```

**Error Responses**:
- `404 Not Found` - Game not found

---

### Get Jackpot Games

Retrieve all games with progressive jackpots.

**Endpoint**: `GET /api/games/jackpots`

**Authentication**: None required

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "jackpots": [
      {
        "id": "string",
        "slug": "string",
        "title": "string",
        "provider": "string",
        "jackpotAmount": "number",
        "thumbnailUrl": "string"
      }
    ]
  }
}
```

---

### Create Game (Admin)

Create a new game entry.

**Endpoint**: `POST /api/games`

**Authentication**: Required (Admin role)

**Request Body**:
```json
{
  "title": "string (required)",
  "slug": "string (required, unique)",
  "provider": "string (required)",
  "category": "string (required)",
  "imageUrl": "string (required)",
  "thumbnailUrl": "string (required)",
  "rtp": "number (required, 0-100)",
  "volatility": "string (required)",
  "minBet": "number (required)",
  "maxBet": "number (required)",
  "hasDemo": "boolean",
  "isFeatured": "boolean",
  "isJackpot": "boolean",
  "jackpotAmount": "number",
  "description": "string",
  "rules": "string",
  "features": ["string"],
  "paylines": "number",
  "reels": "number",
  "gameUrl": "string",
  "demoUrl": "string"
}
```

**Response**: `201 Created`

**Error Responses**:
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized (not admin)
- `400 Bad Request` - Invalid data
- `409 Conflict` - Slug already exists

---

## User Endpoints

### Get User Profile

Retrieve the authenticated user's profile.

**Endpoint**: `GET /api/users/profile`

**Authentication**: Required

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "string",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "dateOfBirth": "string",
    "phoneNumber": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "balance": "number",
    "bonusBalance": "number",
    "currency": "string",
    "vipLevel": "string",
    "vipPoints": "number",
    "isVerified": "boolean",
    "kycStatus": "string (pending, verified, rejected)",
    "favoriteGames": ["string"],
    "responsibleGaming": {
      "depositLimitDaily": "number",
      "depositLimitWeekly": "number",
      "depositLimitMonthly": "number",
      "lossLimitDaily": "number",
      "lossLimitWeekly": "number",
      "lossLimitMonthly": "number",
      "sessionTimeLimit": "number (minutes)",
      "selfExclusionUntil": "string (ISO date)"
    },
    "createdAt": "string",
    "lastLoginAt": "string"
  }
}
```

**Error Responses**:
- `401 Unauthorized` - Not authenticated

---

### Update User Profile

Update user profile information.

**Endpoint**: `PUT /api/users/profile`

**Authentication**: Required

**Request Body**:
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "phoneNumber": "string (optional)",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  }
}
```

**Response**: `200 OK`

**Error Responses**:
- `401 Unauthorized` - Not authenticated
- `400 Bad Request` - Invalid data

---

### Update Responsible Gaming Settings

Update responsible gaming limits.

**Endpoint**: `PUT /api/users/responsible-gaming`

**Authentication**: Required

**Request Body**:
```json
{
  "depositLimitDaily": "number (optional)",
  "depositLimitWeekly": "number (optional)",
  "depositLimitMonthly": "number (optional)",
  "lossLimitDaily": "number (optional)",
  "lossLimitWeekly": "number (optional)",
  "lossLimitMonthly": "number (optional)",
  "sessionTimeLimit": "number (optional, minutes)",
  "selfExclusionDays": "number (optional, 1-365)"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Responsible gaming settings updated",
  "data": {
    "responsibleGaming": {
      "depositLimitDaily": "number",
      "depositLimitWeekly": "number",
      "depositLimitMonthly": "number",
      "lossLimitDaily": "number",
      "lossLimitWeekly": "number",
      "lossLimitMonthly": "number",
      "sessionTimeLimit": "number",
      "selfExclusionUntil": "string"
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized` - Not authenticated
- `400 Bad Request` - Invalid limits

---

### Toggle Favorite Game

Add or remove a game from favorites.

**Endpoint**: `POST /api/users/favorites`

**Authentication**: Required

**Request Body**:
```json
{
  "gameId": "string (required)"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "message": "Game added to favorites" | "Game removed from favorites",
  "data": {
    "favoriteGames": ["string"]
  }
}
```

**Error Responses**:
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Game not found

---

## Promotion Endpoints

### Get All Promotions

Retrieve all active promotions.

**Endpoint**: `GET /api/promotions`

**Authentication**: Optional (affects eligibility display)

**Query Parameters**:
- `type` - Filter by type (welcome, reload, free-spins, cashback, tournament)
- `active` - boolean (default: true)
- `page` - Page number
- `limit` - Items per page

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "promotions": [
      {
        "id": "string",
        "slug": "string",
        "title": "string",
        "description": "string",
        "type": "string",
        "imageUrl": "string",
        "bonusAmount": "number",
        "bonusPercentage": "number",
        "minDeposit": "number",
        "maxBonus": "number",
        "wagerRequirement": "number",
        "validFrom": "string (ISO date)",
        "validTo": "string (ISO date)",
        "isActive": "boolean",
        "vipLevelRequired": "string",
        "isEligible": "boolean (if authenticated)",
        "termsAndConditions": "string"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

---

### Get Promotion by Slug

Retrieve detailed information about a specific promotion.

**Endpoint**: `GET /api/promotions/:slug`

**Authentication**: Optional

**URL Parameters**:
- `slug` - Promotion slug

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "string",
    "slug": "string",
    "title": "string",
    "description": "string",
    "type": "string",
    "imageUrl": "string",
    "bonusAmount": "number",
    "bonusPercentage": "number",
    "minDeposit": "number",
    "maxBonus": "number",
    "wagerRequirement": "number",
    "validFrom": "string",
    "validTo": "string",
    "isActive": "boolean",
    "vipLevelRequired": "string",
    "eligibleGames": ["string"],
    "bonusCode": "string",
    "termsAndConditions": "string",
    "isEligible": "boolean"
  }
}
```

**Error Responses**:
- `404 Not Found` - Promotion not found

---

## Transaction Endpoints

### Get Transaction History

Retrieve user's transaction history.

**Endpoint**: `GET /api/transactions`

**Authentication**: Required

**Query Parameters**:
- `type` - Filter by type (deposit, withdrawal, bet, win, bonus)
- `status` - Filter by status (pending, completed, failed, cancelled)
- `startDate` - Start date (ISO format)
- `endDate` - End date (ISO format)
- `page` - Page number
- `limit` - Items per page

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "string",
        "type": "string",
        "amount": "number",
        "currency": "string",
        "status": "string",
        "method": "string",
        "description": "string",
        "balanceBefore": "number",
        "balanceAfter": "number",
        "createdAt": "string",
        "completedAt": "string"
      }
    ],
    "summary": {
      "totalDeposits": "number",
      "totalWithdrawals": "number",
      "totalBets": "number",
      "totalWins": "number"
    },
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized` - Not authenticated

---

### Create Deposit

Create a deposit transaction.

**Endpoint**: `POST /api/transactions/deposit`

**Authentication**: Required

**Request Body**:
```json
{
  "amount": "number (required, must be >= minDeposit)",
  "method": "string (required: credit-card, bank-transfer, e-wallet, crypto)",
  "paymentDetails": {
    "cardNumber": "string (for credit card)",
    "expiryDate": "string (for credit card)",
    "cvv": "string (for credit card)",
    "walletAddress": "string (for crypto)",
    "accountNumber": "string (for bank transfer)"
  },
  "bonusCode": "string (optional)"
}
```

**Response**: `201 Created`
```json
{
  "success": true,
  "message": "Deposit initiated successfully",
  "data": {
    "transactionId": "string",
    "amount": "number",
    "method": "string",
    "status": "string",
    "paymentUrl": "string (if external payment required)",
    "bonusApplied": {
      "promotionId": "string",
      "bonusAmount": "number"
    }
  }
}
```

**Error Responses**:
- `401 Unauthorized` - Not authenticated
- `400 Bad Request` - Invalid amount or method
- `403 Forbidden` - Deposit limit exceeded

---

### Create Withdrawal

Create a withdrawal request.

**Endpoint**: `POST /api/transactions/withdrawal`

**Authentication**: Required

**Request Body**:
```json
{
  "amount": "number (required)",
  "method": "string (required)",
  "withdrawalDetails": {
    "accountNumber": "string",
    "bankName": "string",
    "walletAddress": "string"
  }
}
```

**Response**: `201 Created`
```json
{
  "success": true,
  "message": "Withdrawal request submitted",
  "data": {
    "transactionId": "string",
    "amount": "number",
    "method": "string",
    "status": "pending",
    "estimatedProcessingTime": "string",
    "kycRequired": "boolean"
  }
}
```

**Error Responses**:
- `401 Unauthorized` - Not authenticated
- `400 Bad Request` - Invalid amount or insufficient balance
- `403 Forbidden` - KYC verification required or withdrawal limit exceeded

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "string (error code)",
    "message": "string (human-readable message)",
    "details": "object (optional additional details)"
  }
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute
- **Admin endpoints**: 1000 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

## Pagination

Paginated endpoints include pagination metadata:

```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## WebSocket Events (Future)

Real-time updates will be available via WebSocket:

- `jackpot:update` - Jackpot amount updates
- `balance:update` - User balance changes
- `notification:new` - New notifications
- `game:result` - Game result for active sessions
