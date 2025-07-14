# Installation & Setup Guide

## Prerequisites

Make sure you have the following installed:
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

## Quick Setup

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies  
cd backend
npm install
cd ..
```

### 2. Environment Configuration

#### Frontend Environment
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your configuration
```

#### Backend Environment
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb construction_machinery_db

# Update DATABASE_URL in backend/.env
```

### 4. Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication and Firestore
3. Generate service account credentials
4. Update Firebase config in both frontend and backend .env files

### 5. Shopify Setup

1. Create a Shopify Partner account
2. Create a development store
3. Generate Storefront Access Token
4. Update Shopify config in .env files

### 6. Stripe Setup

1. Create a Stripe account
2. Get API keys from dashboard
3. Update Stripe config in .env files

## Development Commands

### Frontend (Next.js)
```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Backend (Express.js)
```bash
cd backend

# Development server with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Lint code
npm run lint
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
