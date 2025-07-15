# Construction Machinery E-Commerce API

## 🚀 Quick Start

1. **Setup Environment**
```bash
# Copy environment file
cp .env.example .env

# Update DATABASE_URL in .env with your PostgreSQL connection string
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Database**
```bash
# Run migrations
npm run db:migrate

# Seed with sample data
npm run seed
```

4. **Start Development Server**
```bash
npm run dev
```

## 📋 API Endpoints

### Products

#### Get Products (with search and filters)
```http
GET /api/products?search=excavator&category=excavators&brand=caterpillar&minPrice=100000&maxPrice=500000&page=1&limit=10&sortBy=newest
```

**Query Parameters:**
- `search` (optional): Search term for product name/description
- `category` (optional): Category slug
- `brand` (optional): Brand slug  
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort by `newest`, `price_asc`, `price_desc`, `name`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "CAT 320 Hydraulic Excavator",
      "slug": "cat-320-hydraulic-excavator",
      "description": "...",
      "price": "285000.00",
      "stockQty": 5,
      "images": ["..."],
      "specs": {...},
      "category": {...},
      "brand": {...}
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### Get Product by Slug
```http
GET /api/products/cat-320-hydraulic-excavator
```

#### Find Spare Parts
```http
GET /api/parts-finder?make=Caterpillar&model=320
```

### Cart Management

#### Get Cart
```http
GET /api/cart
```

#### Add to Cart
```http
POST /api/cart/items
Content-Type: application/json

{
  "productId": "clxxxxx",
  "quantity": 2,
  "itemType": "BUY_NOW"
}
```

**Item Types:**
- `BUY_NOW`: Add to purchase cart
- `REQUEST_QUOTE`: Add to quote request

#### Update Cart Item
```http
PUT /api/cart/items/:itemId
Content-Type: application/json

{
  "quantity": 3,
  "itemType": "REQUEST_QUOTE"
}
```

#### Remove from Cart
```http
DELETE /api/cart/items/:itemId
```

#### Clear Cart
```http
DELETE /api/cart
```

### Quote Requests

#### Create Quote Request
```http
POST /api/quote
Content-Type: application/json

{
  "email": "customer@company.com",
  "customerName": "John Doe",
  "companyName": "Construction Co",
  "phoneNumber": "+1234567890",
  "message": "Need bulk pricing for these items",
  "items": [
    {
      "productId": "clxxxxx",
      "quantity": 2
    }
  ]
}
```

#### Get Quote Requests
```http
GET /api/quote?email=customer@company.com
```

#### Get Specific Quote
```http
GET /api/quote/:quoteId
```

#### Update Quote Status (Admin)
```http
PUT /api/quote/:quoteId/status
Content-Type: application/json

{
  "status": "APPROVED"
}
```

**Quote Statuses:**
- `PENDING`: Initial status
- `APPROVED`: Quote approved by admin
- `REJECTED`: Quote rejected
- `EXPIRED`: Quote has expired

## 🗄️ Database Schema

### Tables
- `categories`: Product categories (Excavators, Loaders, Spare Parts)
- `brands`: Machinery brands (Caterpillar, Komatsu, etc.)
- `products`: Product catalog with JSON specs
- `carts`: Session-based shopping carts
- `cart_items`: Items in shopping carts
- `quote_requests`: Customer quote requests
- `quote_items`: Items in quote requests

### Key Features
- **Session-based carts**: No login required for basic cart functionality
- **Mixed cart types**: Items can be marked for purchase or quote
- **JSON specifications**: Flexible product specs storage
- **Full-text search**: Search across product names and descriptions
- **Advanced filtering**: Filter by category, brand, price range
- **Parts compatibility**: Find spare parts by machine make/model

## 🧪 Sample Data

The seed script creates:
- 3 categories (Excavators, Loaders, Spare Parts)
- 2 brands (Caterpillar, Komatsu)
- 10 realistic products with detailed specifications

## 🔧 Development Commands

```bash
# Development
npm run dev

# Database
npm run db:migrate    # Run migrations
npm run db:generate   # Generate Prisma client
npm run db:reset      # Reset database
npm run seed          # Seed sample data

# Production
npm run build
npm start

# Code Quality
npm run lint
npm run lint:fix
```

## 📁 File Structure

```
src/
├── config/
│   └── database.ts          # Prisma client setup
├── controllers/
│   ├── productController.ts # Product endpoints
│   ├── cartController.ts    # Cart management
│   └── quoteController.ts   # Quote requests
├── middleware/
│   ├── errorHandler.ts      # Global error handling
│   └── validateRequest.ts   # Zod validation
├── models/
│   └── validation.ts        # Zod schemas
├── routes/
│   ├── products.ts          # Product routes
│   ├── cart.ts             # Cart routes
│   └── quote.ts            # Quote routes
├── services/
│   ├── productService.ts    # Product business logic
│   ├── cartService.ts       # Cart business logic
│   └── quoteService.ts      # Quote business logic
└── index.ts                 # Express app setup
```
