# Installation & Setup Guide

## Prerequisites

Make sure you have the following installed:
- Node.js 22+ and npm (required for Strapi compatibility)
- PostgreSQL 17+ (recommended for latest features)
- Git



## Quick Setup

### 1. Backend Setup (Main Focus)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb construction_machinery_db

# Update DATABASE_URL in backend/.env
# Example: DATABASE_URL="postgresql://username:password@localhost:5432/construction_machinery_db"

# Run database migrations
npm run db:migrate

# Seed with sample data
npm run seed
```

### 3. Start Development Server

```bash
# Start backend API server
npm run dev

# Server will run on http://localhost:5000
# Test endpoints:
# - http://localhost:5000/health
# - http://localhost:5000/api/products
# - http://localhost:5000/api/cart
```

### 4. Optional: Strapi Admin Panel

```bash
# Navigate to admin directory
cd admin

# Install and start Strapi
npm install
npm run develop

# Admin panel: http://localhost:1337/admin
```

## What's Implemented (Internship Demo)

### ✅ **Backend API Features**
- RESTful API with Express.js + TypeScript
- PostgreSQL database with Prisma ORM
- Product catalog with advanced filtering
- Shopping cart with session management
- Quote request system (RFQ)
- Input validation with Zod schemas
- Error handling and logging
- CORS and security middleware

### ✅ **Database Design**
- Normalized schema for products, categories, brands
- Cart and quote management tables
- Proper indexing and relationships
- Database migrations and seeding

### ✅ **API Endpoints**
- `GET /api/products` - Product listing with filters
- `GET /api/products/:slug` - Product details
- `GET /api/products/parts-finder` - Spare parts search
- `POST/GET/PUT/DELETE /api/cart` - Cart management
- `POST/GET /api/quote` - Quote requests

### 🔄 **Ready for Extension**
- Authentication system architecture
- Payment integration endpoints
- Order management system
- File upload capabilities

## Development Commands

### Backend (Express.js) - Main Focus

```bash
cd backend

# Development server with hot reload
npm run dev

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with sample data
npm run seed

# Build TypeScript
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Testing API Endpoints

```bash
# Test health endpoint
curl http://localhost:5000/health

# Get all products
curl http://localhost:5000/api/products

# Get products with filters
curl "http://localhost:5000/api/products?category=excavators&minPrice=50000"

# Search spare parts
curl "http://localhost:5000/api/products/parts-finder?make=caterpillar&model=320D"

# Get cart
curl http://localhost:5000/api/cart

# Add to cart
curl -X POST http://localhost:5000/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"productId":"product_id_here","quantity":1}'
```

## Project Structure

```
/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/            # Utilities and configurations
│   │   └── stores/         # Zustand state management
│   └── public/             # Static assets
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # External service integrations
│   │   └── config/         # Configuration files
│   └── dist/               # Compiled JavaScript (auto-generated)
└── docs/                   # Documentation
```

## Integration Setup

### Strapi CMS (Optional)
```bash
# Install Strapi locally
npx create-strapi-app@latest strapi-cms --quickstart

# Or use Strapi Cloud
# Sign up at https://strapi.io/cloud
```

### Development URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Strapi (if local): http://localhost:1337

## Next Steps

1. Configure all environment variables
2. Set up database schema and migrations
3. Implement authentication flow
4. Set up Shopify product sync
5. Create basic UI components
