# Cassanova Casino - Quick Start Guide

## Prerequisites
- Node.js 20+ installed
- MongoDB running (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/GizzZmo/Cassanova.git
cd Cassanova
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your settings
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/cassanova
# JWT_SECRET=your-secure-secret-key
# NODE_ENV=development

# Build TypeScript
npm run build

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## Testing the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the Cassanova homepage with:
   - Header with navigation
   - Hero banner with welcome bonus
   - Game lobby preview with tabs
   - Live jackpot ticker
   - Promotions section
   - Why Choose Us section
   - Footer with links

## API Testing

You can test the backend API using curl or Postman:

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "player1",
    "email": "player1@example.com",
    "password": "SecurePassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "player1@example.com",
    "password": "SecurePassword123"
  }'
```

### Get Games
```bash
curl http://localhost:5000/api/games
```

### Get Promotions
```bash
curl http://localhost:5000/api/promotions
```

## Project Structure

```
Cassanova/
├── frontend/          # Next.js frontend
│   ├── app/          # Pages and layouts
│   └── components/   # React components
├── backend/          # Express backend
│   └── src/         # TypeScript source
│       ├── models/      # Database models
│       ├── routes/      # API routes
│       ├── controllers/ # Route handlers
│       └── middleware/  # Auth middleware
└── README.md         # Original blueprint
```

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **TypeScript**: Both projects use TypeScript for type safety
3. **Database**: Make sure MongoDB is running before starting the backend
4. **Environment Variables**: Never commit `.env` files with real credentials

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongosh` or check MongoDB service
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Frontend won't build
- Clear the `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Connection Issues
- Ensure backend is running on port 5000
- Check CORS settings if making requests from different origins

## Next Steps

1. Review the `PROJECT_DOCUMENTATION.md` for detailed information
2. Explore the API endpoints in `backend/src/routes/`
3. Customize the frontend components in `frontend/components/`
4. Add your own games, promotions, and content

## Support

For issues or questions, please open an issue on GitHub.

---

**Note**: This is a demonstration project. For production use, implement proper security measures, payment integrations, and gaming licenses.
