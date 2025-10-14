# Deployment Guide

This guide covers deploying the Cassanova Casino platform to production environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Database Setup](#database-setup)
- [Security Checklist](#security-checklist)
- [Monitoring & Logging](#monitoring--logging)
- [Scaling Strategies](#scaling-strategies)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Services

- **Hosting Platform**: Vercel/Netlify (Frontend), AWS/DigitalOcean (Backend)
- **Database**: MongoDB Atlas or self-hosted MongoDB cluster
- **Domain**: Custom domain with SSL certificate
- **Email Service**: SendGrid, AWS SES, or similar
- **CDN**: CloudFlare or AWS CloudFront (optional but recommended)
- **Monitoring**: Datadog, New Relic, or similar

### Required Tools

- Node.js 20+
- Git
- PM2 (for backend process management)
- Nginx (for reverse proxy)

---

## Environment Configuration

### Frontend Environment Variables

Create `.env.production` in the frontend directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_WS_URL=wss://api.yourdomain.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_LIVE_GAMES=true
NEXT_PUBLIC_ENABLE_CRYPTO_PAYMENTS=false

# Environment
NEXT_PUBLIC_ENV=production
```

### Backend Environment Variables

Create `.env.production` in the backend directory:

```bash
# Server Configuration
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cassanova?retryWrites=true&w=majority
MONGODB_URI_REPLICA=mongodb+srv://replica.mongodb.net/cassanova

# Authentication
JWT_SECRET=your-super-secure-random-secret-key-min-256-bits
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
ALLOWED_ORIGINS=yourdomain.com,www.yourdomain.com

# Email Service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Cassanova Casino

# Payment Gateways (when integrated)
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
PAYPAL_CLIENT_ID=xxxxxxxxxxxxx
PAYPAL_CLIENT_SECRET=xxxxxxxxxxxxx

# File Storage
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
AWS_S3_BUCKET=cassanova-documents
AWS_REGION=us-east-1

# Redis (for caching and sessions)
REDIS_URL=redis://username:password@redis-server:6379
REDIS_TTL=3600

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/production.log

# Monitoring
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxxxxxxxxx
DATADOG_API_KEY=xxxxxxxxxxxxx

# Security
BCRYPT_SALT_ROUNDS=12
SESSION_SECRET=your-session-secret
CSRF_SECRET=your-csrf-secret

# Feature Flags
ENABLE_EMAIL_VERIFICATION=true
ENABLE_KYC_VERIFICATION=true
ENABLE_TWO_FACTOR_AUTH=true
MAINTENANCE_MODE=false
```

### Security Notes

- **NEVER** commit `.env` files to version control
- Use environment-specific configurations
- Rotate secrets regularly
- Use strong, randomly generated secrets (minimum 256 bits)
- Store secrets in secure vaults (AWS Secrets Manager, HashiCorp Vault)

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

Vercel is optimized for Next.js applications.

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Configure Project

Create `vercel.json` in the frontend directory:

```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.yourdomain.com"
  }
}
```

#### 3. Deploy

```bash
cd frontend
vercel --prod
```

#### 4. Custom Domain

```bash
vercel domains add yourdomain.com
vercel domains add www.yourdomain.com
```

#### 5. Environment Variables

Set via Vercel Dashboard or CLI:

```bash
vercel env add NEXT_PUBLIC_API_URL production
```

### Option 2: Netlify

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. Configure Project

Create `netlify.toml` in the frontend directory:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_PUBLIC_API_URL = "https://api.yourdomain.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### 3. Deploy

```bash
cd frontend
netlify deploy --prod
```

### Option 3: Self-Hosted with PM2

#### 1. Build the Application

```bash
cd frontend
npm install
npm run build
```

#### 2. Create PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'cassanova-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/cassanova/frontend',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

#### 3. Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. Configure Nginx

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

---

## Backend Deployment

### Option 1: DigitalOcean App Platform

#### 1. Create App Spec

Create `.do/app.yaml`:

```yaml
name: cassanova-backend
services:
- name: api
  github:
    repo: GizzZmo/Cassanova
    branch: main
    deploy_on_push: true
  source_dir: /backend
  build_command: npm run build
  run_command: npm start
  environment_slug: node-js
  instance_count: 2
  instance_size_slug: professional-xs
  http_port: 5000
  routes:
  - path: /api
  envs:
  - key: NODE_ENV
    value: production
  - key: PORT
    value: "5000"
  - key: MONGODB_URI
    value: ${MONGODB_URI}
    type: SECRET
  - key: JWT_SECRET
    value: ${JWT_SECRET}
    type: SECRET

databases:
- name: cassanova-db
  engine: MONGODB
  version: "6"
```

#### 2. Deploy

```bash
doctl apps create --spec .do/app.yaml
```

### Option 2: AWS EC2

#### 1. Launch EC2 Instance

- AMI: Ubuntu Server 22.04 LTS
- Instance Type: t3.medium or higher
- Security Groups: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 5000 (API)

#### 2. Connect and Setup

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

#### 3. Deploy Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/GizzZmo/Cassanova.git
cd Cassanova/backend

# Install dependencies
sudo npm install --production

# Setup environment
sudo cp .env.example .env
sudo nano .env  # Edit with production values

# Build TypeScript
sudo npm run build

# Create PM2 configuration
sudo nano ecosystem.config.js
```

PM2 Configuration (`ecosystem.config.js`):

```javascript
module.exports = {
  apps: [{
    name: 'cassanova-api',
    script: 'dist/server.js',
    cwd: '/var/www/Cassanova/backend',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/pm2/cassanova-error.log',
    out_file: '/var/log/pm2/cassanova-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

#### 4. Start Application

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 5. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/cassanova-api
```

```nginx
upstream backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    # Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logging
    access_log /var/log/nginx/cassanova-api-access.log;
    error_log /var/log/nginx/cassanova-api-error.log;

    # API routes
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check
    location /health {
        proxy_pass http://backend;
        access_log off;
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
}
```

#### 6. Enable Site and Restart Nginx

```bash
sudo ln -s /etc/nginx/sites-available/cassanova-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 7. Setup SSL Certificate

```bash
sudo certbot --nginx -d api.yourdomain.com
```

---

## Database Setup

### MongoDB Atlas (Recommended)

#### 1. Create Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Choose region closest to your backend servers
4. Select tier (M10 or higher for production)

#### 2. Configure Security

```bash
# Network Access
- Add IP addresses of your backend servers
- Or use 0.0.0.0/0 (less secure, use with authentication)

# Database Access
- Create a database user with strong password
- Grant readWrite role for cassanova database
```

#### 3. Get Connection String

```
mongodb+srv://username:password@cluster.mongodb.net/cassanova?retryWrites=true&w=majority
```

#### 4. Setup Replica Set (for high availability)

Atlas provides replica sets by default with M10+ tiers.

#### 5. Enable Backups

- Enable continuous backups in Atlas dashboard
- Set backup retention policy (7-30 days)
- Configure backup schedule

### Self-Hosted MongoDB

#### 1. Install MongoDB

```bash
# Ubuntu
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 2. Secure MongoDB

```bash
# Connect to MongoDB
mongosh

# Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "secure-password",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})

# Create application user
use cassanova
db.createUser({
  user: "cassanova_app",
  pwd: "secure-app-password",
  roles: [{ role: "readWrite", db: "cassanova" }]
})
```

#### 3. Enable Authentication

Edit `/etc/mongod.conf`:

```yaml
security:
  authorization: enabled

net:
  bindIp: 127.0.0.1,your-server-ip
  port: 27017
```

Restart MongoDB:

```bash
sudo systemctl restart mongod
```

---

## Security Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Strong, unique secrets generated
- [ ] Database authentication enabled
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Secure headers configured
- [ ] SSL/TLS certificates installed
- [ ] Password hashing uses bcrypt (12+ rounds)
- [ ] JWT tokens have reasonable expiry
- [ ] Sensitive data encrypted at rest
- [ ] API keys stored securely
- [ ] File upload restrictions in place
- [ ] Dependencies updated and audited

### Post-Deployment

- [ ] SSL certificate auto-renewal configured
- [ ] Firewall configured (UFW/iptables)
- [ ] DDoS protection enabled
- [ ] Monitoring and alerting configured
- [ ] Regular security audits scheduled
- [ ] Backup and recovery tested
- [ ] Incident response plan documented
- [ ] Security headers validated
- [ ] Penetration testing completed

### Security Commands

```bash
# Update dependencies
npm audit
npm audit fix

# Check for vulnerabilities
npx snyk test

# Check SSL configuration
ssllabs.com/ssltest

# Scan for common vulnerabilities
npm install -g retire
retire

# Check security headers
securityheaders.com
```

---

## Monitoring & Logging

### Application Monitoring

#### PM2 Monitoring

```bash
# View logs
pm2 logs

# Monitor processes
pm2 monit

# View process list
pm2 list

# Restart application
pm2 restart cassanova-api
```

#### Log Files

```bash
# Application logs
tail -f /var/log/pm2/cassanova-out.log
tail -f /var/log/pm2/cassanova-error.log

# Nginx logs
tail -f /var/log/nginx/cassanova-api-access.log
tail -f /var/log/nginx/cassanova-api-error.log

# System logs
tail -f /var/log/syslog
```

### External Monitoring Services

#### Datadog Setup

```javascript
// Add to backend/src/server.ts
import tracer from 'dd-trace';
tracer.init({
  service: 'cassanova-api',
  env: process.env.NODE_ENV,
  logInjection: true
});
```

#### Sentry Setup

```javascript
// Add to backend/src/server.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Health Checks

Create health check endpoint:

```typescript
// backend/src/routes/health.ts
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});
```

---

## Scaling Strategies

### Horizontal Scaling

```
        Load Balancer
             │
      ┌──────┼──────┐
      │      │      │
   Server1 Server2 Server3
      │      │      │
      └──────┴──────┘
           │
      MongoDB Cluster
```

### Vertical Scaling

Upgrade server resources:
- Increase CPU cores
- Add more RAM
- Upgrade to SSD storage

### Database Scaling

1. **Read Replicas**: For read-heavy workloads
2. **Sharding**: For large datasets
3. **Indexing**: Optimize queries
4. **Connection Pooling**: Reuse connections

### Caching Strategy

```javascript
// Redis caching
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Cache middleware
async function cacheMiddleware(req, res, next) {
  const key = `cache:${req.originalUrl}`;
  const cached = await redis.get(key);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  res.sendResponse = res.json;
  res.json = (body) => {
    redis.setex(key, 3600, JSON.stringify(body));
    res.sendResponse(body);
  };
  
  next();
}
```

---

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install Backend Dependencies
        run: cd backend && npm install
      
      - name: Run Tests
        run: cd backend && npm test
      
      - name: Lint
        run: cd backend && npm run lint

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/Cassanova
            git pull origin main
            cd backend
            npm install --production
            npm run build
            pm2 restart cassanova-api

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

---

## Troubleshooting

### Common Issues

#### Application Won't Start

```bash
# Check logs
pm2 logs cassanova-api

# Check Node version
node --version

# Check environment variables
pm2 env 0

# Restart with logs
pm2 restart cassanova-api --watch
```

#### Database Connection Issues

```bash
# Test MongoDB connection
mongosh "mongodb+srv://your-connection-string"

# Check network access in MongoDB Atlas
# Verify IP whitelist

# Check backend logs
tail -f /var/log/pm2/cassanova-error.log
```

#### High Memory Usage

```bash
# Check memory usage
pm2 list
free -h

# Restart with memory limit
pm2 restart cassanova-api --max-memory-restart 1G
```

#### Slow API Response

```bash
# Check database indexes
mongosh
use cassanova
db.games.getIndexes()

# Enable slow query logging
db.setProfilingLevel(1, 100)

# Check slow queries
db.system.profile.find().sort({ millis: -1 }).limit(10)
```

### Performance Optimization

```bash
# Enable Nginx caching
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m;

# Enable gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

---

## Post-Deployment Checklist

- [ ] Application accessible via domain
- [ ] SSL certificate valid and auto-renewing
- [ ] Database connection working
- [ ] API endpoints responding correctly
- [ ] Frontend loading correctly
- [ ] Authentication working
- [ ] File uploads working (if applicable)
- [ ] Email sending working
- [ ] Payment integration working (if applicable)
- [ ] Monitoring and logging configured
- [ ] Backups running automatically
- [ ] Security headers present
- [ ] Performance acceptable
- [ ] Error tracking working
- [ ] Documentation updated

---

## Support

For deployment issues:
- Check the logs first
- Review this documentation
- Open an issue on GitHub
- Contact the maintainers

**Remember**: Always test in a staging environment before deploying to production!
