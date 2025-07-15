# Construction Machinery E-Commerce Platform

A modern, high-converting shopping website for construction machinery and spare parts with a clean, rugged yet professional UI/UX that balances e-commerce functionality with B2B trust.

## 🎯 **Current Focus: Backend Development**

This repository showcases a robust Node.js/Express backend API built with TypeScript, PostgreSQL, and Prisma ORM.

## 🚀 Features

### ✅ **Implemented**
- **RESTful API** with Express.js and TypeScript
- **PostgreSQL Database** with Prisma ORM
- **Product Catalog** with advanced filtering and search
- **Shopping Cart** with session-based persistence
- **Quote Request System** (RFQ) for B2B customers
- **Spare Parts Finder** - Find compatible parts by machine make/model
- **Input Validation** with Zod schemas
- **Error Handling** and structured logging
- **Security Middleware** (CORS, Helmet)
- **Database Seeding** with sample construction machinery data

### 🔧 **Tech Stack**
- **Runtime**: Node.js 22+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL 17+ with Prisma ORM
- **Validation**: Zod schemas
- **Security**: Helmet, CORS
- **Development**: Nodemon, ESLint, Prettier

## 📋 Quick Start

**Note**: This repository contains the full project structure, but current development focuses on the backend API.

### Prerequisites
- Node.js 22+ and npm
- PostgreSQL 17+ 
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd Ecom

# Install backend dependencies
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Set up database
createdb construction_machinery_db
npm run db:migrate
npm run seed

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Database operations
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run seed         # Seed sample data

# Code quality
npm run lint         # ESLint
```

## 🌐 API Endpoints

### Health Check
```bash
GET /health
```

### Products
```bash
# Get all products with optional filters
GET /api/products?category=excavators&minPrice=50000&maxPrice=200000

# Get single product by slug
GET /api/products/:slug

# Find spare parts by machine make/model
GET /api/products/parts-finder?make=caterpillar&model=320D
```

### Shopping Cart
```bash
# Get current cart
GET /api/cart

# Add item to cart
POST /api/cart/items
{
  "productId": "product_id",
  "quantity": 2
}

# Update cart item
PUT /api/cart/items/:id
{
  "quantity": 3
}

# Remove item from cart
DELETE /api/cart/items/:id

# Clear entire cart
DELETE /api/cart
```

### Quote Requests (RFQ)
```bash
# Create quote request
POST /api/quote
{
  "customerInfo": {
    "name": "John Doe",
    "email": "john@company.com",
    "phone": "+1234567890",
    "company": "Construction Co"
  },
  "items": [
    {
      "productId": "product_id",
      "quantity": 1
    }
  ],
  "notes": "Urgent requirement"
}

# Get quote requests (admin)
GET /api/quote

# Get specific quote request
GET /api/quote/:id
```

## �️ Database Schema

### Core Tables
- **Products** - Construction machinery and spare parts
- **Categories** - Product categorization (Excavators, Loaders, etc.)
- **Brands** - Manufacturer information (Caterpillar, Komatsu, etc.)
- **Cart Items** - Session-based shopping cart
- **Quote Requests** - B2B quote management

### Sample Data
The database is seeded with:
- 10 construction machinery products
- Categories: Excavators, Loaders, Spare Parts
- Brands: Caterpillar, Komatsu, JCB, Hitachi
- Realistic product specifications and pricing

## 🔧 Project Structure

```
backend/
├── src/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Zod validation schemas
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   └── index.ts         # App entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── migrations/      # Database migrations
│   └── seed.ts          # Sample data
├── docs/                # Documentation
└── dist/                # Compiled JavaScript (generated)
```

## 🧪 Testing the API

### Using cURL
```bash
# Test health endpoint
curl http://localhost:5000/health

# Get products with filters
curl "http://localhost:5000/api/products?category=excavators&limit=5"

# Search spare parts
curl "http://localhost:5000/api/products/parts-finder?make=caterpillar"

# Add to cart
curl -X POST http://localhost:5000/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"productId":"cmd44gytd000not9a7j88h5kl","quantity":1}'
```

### Using Browser
- Health: http://localhost:5000/health
- Products: http://localhost:5000/api/products
- Spare Parts: http://localhost:5000/api/products/parts-finder?make=caterpillar

## 📚 Additional Documentation

- [Windows Setup Guide](./docs/BACKEND_SETUP_WINDOWS.md) - Detailed Windows installation
- [Backend Structure](./backend/README.md) - Detailed backend documentation

## � Deployment Ready

The backend includes:
- ✅ Production build configuration
- ✅ Environment variable management
- ✅ Database migrations
- ✅ Error handling and logging
- ✅ Security middleware
- ✅ Input validation
- ✅ Session management

## 🔮 Future Enhancements

- User authentication (JWT/Firebase)
- Payment integration (Stripe)
- File upload for product images
- Advanced search (Elasticsearch)
- Email notifications
- Order management system
- Admin dashboard API

## 📄 License

Private - All rights reserved

---

