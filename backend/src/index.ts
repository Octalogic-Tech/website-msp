import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { prisma } from './config/database';
import { errorHandler } from './middleware/errorHandler';

// Routes
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import quoteRoutes from './routes/quote';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Session store
const PgSession = connectPgSimple(session);

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
})); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Session middleware
app.use(session({
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true, // Changed to true to ensure session is created
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'lax', // Added for better CORS handling
  },
  name: 'msp.sid', // Custom session name
}));

// Serve static files (for uploads)
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Construction Machinery API',
    version: '1.0.0'
  });
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/quote', quoteRoutes);

// Parts finder route (alternative path)
app.use('/api/parts-finder', productRoutes);

// Root API endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Construction Machinery E-commerce API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      cart: '/api/cart',
      quote: '/api/quote',
      partsFinder: '/api/parts-finder',
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist.`
  });
});

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
async function startServer() {
  try {
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
      console.log(`📍 Products: http://localhost:${PORT}/api/products`);
      console.log(`📍 Cart: http://localhost:${PORT}/api/cart`);
      console.log(`📍 Quote: http://localhost:${PORT}/api/quote`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
