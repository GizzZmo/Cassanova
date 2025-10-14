# Security Policy

## Reporting a Vulnerability

We take the security of Cassanova Casino seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security vulnerabilities by emailing: **security@yourdomain.com**

Include the following information:
- Type of vulnerability
- Full description of the vulnerability
- Steps to reproduce the vulnerability
- Potential impact
- Suggested fix (if any)

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Updates**: Every 5 business days
- **Resolution Timeline**: Varies by severity
  - Critical: 1-3 days
  - High: 3-7 days
  - Medium: 7-14 days
  - Low: 14-30 days

### Responsible Disclosure

We request that you:
- Give us reasonable time to fix the vulnerability before public disclosure
- Don't exploit the vulnerability beyond what's necessary to demonstrate it
- Don't access, modify, or delete data belonging to others
- Don't perform actions that could harm the availability of our services

### Recognition

We maintain a Security Hall of Fame for researchers who responsibly disclose vulnerabilities:
- Your name will be listed (with your permission)
- Serious vulnerabilities may be eligible for rewards
- We will acknowledge your contribution in our security advisories

---

## Security Measures

### Authentication & Authorization

#### Password Security
- **Hashing**: bcryptjs with 12 salt rounds (production)
- **Requirements**: 
  - Minimum 8 characters
  - Must include uppercase, lowercase, number
  - Password strength meter on registration
- **Storage**: Never stored in plain text
- **Reset**: Time-limited tokens (1 hour expiry)

```typescript
// Password hashing implementation
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.NODE_ENV === 'production' ? 12 : 10;

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
```

#### JWT Tokens
- **Algorithm**: HS256
- **Expiry**: 24 hours (access token), 7 days (refresh token)
- **Secret**: Minimum 256 bits, randomly generated
- **Storage**: httpOnly cookies (recommended) or localStorage (with XSS protection)

```typescript
// JWT implementation
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h',
    issuer: 'cassanova-casino',
    audience: 'cassanova-api'
  });
}

function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
}
```

#### Session Management
- **Token Refresh**: Automatic refresh before expiry
- **Logout**: Server-side token invalidation
- **Concurrent Sessions**: Tracked per user
- **Session Timeout**: Auto-logout after 30 minutes of inactivity

### Input Validation

#### Request Validation
```typescript
// Express validator example
import { body, validationResult } from 'express-validator';

const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body('username')
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/),
];

async function handleRegister(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process registration
}
```

#### Data Sanitization
- **XSS Prevention**: All user input sanitized
- **SQL Injection**: Using Mongoose (parameterized queries)
- **NoSQL Injection**: Input validation and sanitization
- **Path Traversal**: File path validation

```typescript
// XSS prevention
import DOMPurify from 'isomorphic-dompurify';

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
}
```

### API Security

#### Rate Limiting

```typescript
// Rate limiting implementation
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests, please slow down',
});

// Apply to routes
app.use('/api/auth/login', authLimiter);
app.use('/api/', generalLimiter);
```

#### CORS Configuration

```typescript
// CORS setup
import cors from 'cors';

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));
```

#### Security Headers

```typescript
// Helmet for security headers
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true,
}));
```

### Database Security

#### Connection Security
```typescript
// Secure MongoDB connection
import mongoose from 'mongoose';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: true,
  authSource: 'admin',
  retryWrites: true,
  w: 'majority',
};

mongoose.connect(process.env.MONGODB_URI!, mongooseOptions);
```

#### Query Security
```typescript
// Prevent NoSQL injection
import mongoSanitize from 'express-mongo-sanitize';

app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`Sanitized key: ${key}`);
  },
}));

// Safe query example
async function findUserByEmail(email: string) {
  // This is safe - Mongoose handles parameterization
  return await User.findOne({ email: email });
}

// Unsafe query - DON'T DO THIS
// const query = { $where: userInput }; // VULNERABLE!
```

#### Data Encryption
```typescript
// Encrypt sensitive fields
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const IV_LENGTH = 16;

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string): string {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift()!, 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
```

### File Upload Security

```typescript
// Secure file upload
import multer from 'multer';
import path from 'path';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

// Use in route
app.post('/api/kyc/upload', authenticate, upload.single('document'), handleKYCUpload);
```

### Environment Security

#### Environment Variables
```bash
# .env.example - NEVER commit actual .env
NODE_ENV=production
PORT=5000

# Use strong, randomly generated secrets
JWT_SECRET=CHANGE_THIS_TO_RANDOM_256_BIT_SECRET
ENCRYPTION_KEY=CHANGE_THIS_TO_RANDOM_256_BIT_KEY

# Database - use connection string with authentication
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Ensure .gitignore includes
# .env
# .env.local
# .env.*.local
```

#### Secret Management
```typescript
// Use environment variables, not hardcoded secrets
const config = {
  jwtSecret: process.env.JWT_SECRET,
  dbUri: process.env.MONGODB_URI,
  apiKey: process.env.API_KEY,
};

// Validate required secrets at startup
function validateEnvironment() {
  const required = ['JWT_SECRET', 'MONGODB_URI', 'ENCRYPTION_KEY'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

validateEnvironment();
```

### Logging & Monitoring

#### Security Logging
```typescript
// Security event logging
import winston from 'winston';

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'security' },
  transports: [
    new winston.transports.File({ filename: 'logs/security.log' })
  ]
});

// Log security events
function logSecurityEvent(event: string, details: any) {
  securityLogger.info(event, {
    timestamp: new Date().toISOString(),
    ...details
  });
}

// Usage
logSecurityEvent('login_attempt', {
  userId: user.id,
  ipAddress: req.ip,
  success: true
});

logSecurityEvent('failed_login', {
  email: req.body.email,
  ipAddress: req.ip,
  reason: 'invalid_password'
});
```

#### Anomaly Detection
```typescript
// Detect suspicious activity
async function detectAnomalies(userId: string) {
  // Check for rapid login attempts
  const recentLogins = await LoginAttempt.find({
    userId,
    timestamp: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
  });
  
  if (recentLogins.length > 5) {
    await lockAccount(userId);
    await notifySecurityTeam(userId, 'rapid_login_attempts');
  }
  
  // Check for unusual transaction amounts
  const recentTransactions = await Transaction.find({
    userId,
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
  });
  
  const totalAmount = recentTransactions.reduce((sum, t) => sum + t.amount, 0);
  const userAverage = await getUserAverageTransaction(userId);
  
  if (totalAmount > userAverage * 10) {
    await flagForReview(userId, 'unusual_transaction_pattern');
  }
}
```

---

## Security Best Practices

### For Developers

1. **Never commit secrets** to version control
2. **Always validate user input** on both client and server
3. **Use parameterized queries** to prevent SQL/NoSQL injection
4. **Sanitize output** to prevent XSS attacks
5. **Keep dependencies updated** (`npm audit` regularly)
6. **Use HTTPS** in production
7. **Implement proper error handling** (don't leak sensitive info)
8. **Use security linters** (ESLint security plugins)
9. **Follow principle of least privilege**
10. **Conduct security code reviews**

### For Administrators

1. **Keep systems updated** (OS, Node.js, MongoDB)
2. **Use strong passwords** (minimum 16 characters, random)
3. **Enable 2FA** on all critical accounts
4. **Regular security audits**
5. **Monitor logs** for suspicious activity
6. **Regular backups** (test restoration)
7. **Implement DDoS protection**
8. **Use Web Application Firewall (WAF)**
9. **Configure firewall rules** properly
10. **Have incident response plan**

### For Users

1. **Use strong, unique passwords**
2. **Enable two-factor authentication**
3. **Be cautious of phishing attempts**
4. **Don't share account credentials**
5. **Use secure networks** (avoid public WiFi for transactions)
6. **Keep devices updated**
7. **Report suspicious activity**
8. **Review transaction history regularly**
9. **Set responsible gaming limits**
10. **Log out after sessions**

---

## Compliance & Regulations

### GDPR Compliance

- **Data Collection**: Clear consent mechanisms
- **Data Access**: Users can request their data
- **Data Deletion**: Right to be forgotten
- **Data Portability**: Export user data
- **Breach Notification**: Within 72 hours

```typescript
// GDPR data export
async function exportUserData(userId: string) {
  const user = await User.findById(userId).select('-password');
  const transactions = await Transaction.find({ userId });
  const gameHistory = await GameSession.find({ userId });
  
  return {
    personalData: user,
    transactions,
    gameHistory,
    exportDate: new Date().toISOString()
  };
}

// GDPR data deletion
async function deleteUserData(userId: string) {
  // Anonymize rather than delete for legal/audit purposes
  await User.findByIdAndUpdate(userId, {
    email: `deleted-${userId}@deleted.com`,
    firstName: 'Deleted',
    lastName: 'User',
    isDeleted: true,
    deletedAt: new Date()
  });
  
  // Log the deletion
  await DataDeletionLog.create({
    userId,
    deletedAt: new Date(),
    requestedBy: userId
  });
}
```

### Gambling Regulations

- **Age Verification**: Mandatory 18+ verification
- **KYC Requirements**: Identity verification for withdrawals
- **Responsible Gaming**: Self-exclusion, limits
- **AML Compliance**: Transaction monitoring
- **Licensing**: Display license information prominently

---

## Security Checklist

### Pre-Production

- [ ] All secrets in environment variables
- [ ] Strong password requirements enforced
- [ ] JWT tokens properly configured
- [ ] Rate limiting implemented
- [ ] CORS configured correctly
- [ ] Input validation on all endpoints
- [ ] XSS protection enabled
- [ ] SQL/NoSQL injection prevention
- [ ] CSRF protection enabled
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Database authentication enabled
- [ ] File upload restrictions
- [ ] Error messages don't leak sensitive info
- [ ] Dependencies audited (`npm audit`)
- [ ] Security testing completed

### Post-Production

- [ ] Monitoring and alerting configured
- [ ] Log aggregation setup
- [ ] Intrusion detection system
- [ ] Regular security scans scheduled
- [ ] Backup and recovery tested
- [ ] Incident response plan documented
- [ ] Security training for team
- [ ] Regular penetration testing
- [ ] Compliance audits
- [ ] Bug bounty program (optional)

---

## Incident Response

### Response Plan

1. **Identification**
   - Detect and confirm security incident
   - Document initial findings

2. **Containment**
   - Isolate affected systems
   - Prevent further damage
   - Preserve evidence

3. **Eradication**
   - Remove threat
   - Patch vulnerabilities
   - Update security measures

4. **Recovery**
   - Restore systems
   - Verify integrity
   - Monitor for recurrence

5. **Lessons Learned**
   - Post-incident analysis
   - Update procedures
   - Implement improvements

### Contact Information

**Security Team**: security@yourdomain.com  
**Emergency**: +1-XXX-XXX-XXXX (24/7)

---

## Security Updates

We regularly update this security policy. Last updated: 2025-01-01

For the latest security advisories and updates:
- **GitHub Security Advisories**: [Repository Security Tab]
- **Security Blog**: [Coming Soon]
- **Email Notifications**: security-announce@yourdomain.com

---

## Acknowledgments

We thank the following security researchers for responsibly disclosing vulnerabilities:

*Hall of Fame list will be maintained here*

---

## Questions?

For security-related questions:
- **General**: security@yourdomain.com
- **Urgent**: emergency-security@yourdomain.com

**Remember**: Security is everyone's responsibility!
