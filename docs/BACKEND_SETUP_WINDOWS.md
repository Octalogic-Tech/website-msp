# 🔧 Construction Machinery E-commerce Backend Setup Guide for Windows

This guide will walk you through setting up the backend API on Windows with PostgreSQL database.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [PostgreSQL Installation](#postgresql-installation)
3. [Node.js Setup](#nodejs-setup)
4. [Project Setup](#project-setup)
5. [Database Configuration](#database-configuration)
6. [Running the Backend](#running-the-backend)
7. [Testing the API](#testing-the-api)
8. [Troubleshooting](#troubleshooting)

---

## 🔄 Prerequisites

### System Requirements
- **OS**: Windows 10/11 (64-bit)
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free space
- **Internet**: Required for downloading packages

### Required Software
- Node.js 18+ or 22.x (LTS version)
- PostgreSQL 15+ or 17.x
- Git for Windows
- VS Code (recommended)

---

## 🐘 PostgreSQL Installation

### Step 1: Download PostgreSQL
1. Visit [PostgreSQL Official Download Page](https://www.postgresql.org/download/windows/)
2. Click **"Download the installer"**
3. Choose **PostgreSQL 17.x** for Windows x86-64
4. Download the `.exe` installer

### Step 2: Install PostgreSQL
1. **Run the installer** as Administrator
2. **Installation Directory**: Keep default `C:\Program Files\PostgreSQL\17`
3. **Components to Install**:
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4
   - ✅ Stack Builder
   - ✅ Command Line Tools
4. **Data Directory**: Keep default `C:\Program Files\PostgreSQL\17\data`
5. **Password**: Set a **strong password** for the `postgres` user
   - ⚠️ **IMPORTANT**: Remember this password! You'll need it later
   - Example: `MySecurePassword123!`
6. **Port**: Keep default `5432`
7. **Locale**: Keep default
8. **Complete the installation**

### Step 3: Verify PostgreSQL Installation
1. Open **Command Prompt** as Administrator
2. Add PostgreSQL to PATH (if not already added):
   ```cmd
   set PATH=%PATH%;C:\Program Files\PostgreSQL\17\bin
   ```
3. Test connection:
   ```cmd
   psql -U postgres -h localhost
   ```
4. Enter your password when prompted
5. You should see: `postgres=#`
6. Exit with: `\q`

### Step 4: Create Project Database
1. Open **Command Prompt** or **PowerShell**
2. Create the database:
   ```cmd
   psql -U postgres -h localhost -c "CREATE DATABASE construction_machinery_db;"
   ```
3. Verify database creation:
   ```cmd
   psql -U postgres -h localhost -c "\l"
   ```

---

## 🟢 Node.js Setup

### Step 1: Install Node.js
1. Visit [Node.js Official Website](https://nodejs.org/)
2. Download **Node.js 22.x LTS** for Windows
3. Run the installer with default settings
4. ✅ Check "Add to PATH" option

### Step 2: Verify Node.js Installation
1. Open **Command Prompt** or **PowerShell**
2. Check versions:
   ```cmd
   node --version
   npm --version
   ```
3. Expected output:
   ```
   v22.17.0 (or similar)
   10.9.2 (or similar)
   ```

---

## 📁 Project Setup

### Step 1: Clone the Repository
```cmd
git clone https://github.com/Octalogic-Tech/website-msp.git
cd website-msp
```

### Step 2: Navigate to Backend
```cmd
cd backend
```

### Step 3: Install Dependencies
```cmd
npm install
```

**Expected output**: Dependencies installation progress (2-3 minutes)

---

## 🗄️ Database Configuration

### Step 1: Create Environment File
1. In the `backend` folder, find `.env.example` (if exists) or create `.env`
2. Create/Edit `.env` file with these contents:

```properties
# Environment variables for Construction Machinery E-commerce Backend

# Database Configuration (PostgreSQL)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/construction_machinery_db?schema=public"

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# JWT Configuration (if needed later)
JWT_SECRET=your-jwt-secret-key-change-this-in-production
```

### Step 2: Update Database Password
**⚠️ CRITICAL**: Replace `YOUR_PASSWORD` with your actual PostgreSQL password

Example:
```properties
DATABASE_URL="postgresql://postgres:MySecurePassword123!@localhost:5432/construction_machinery_db?schema=public"
```

### Step 3: Generate Prisma Client
```cmd
npm run db:generate
```

### Step 4: Run Database Migrations
```cmd
npm run db:migrate
```

**When prompted for migration name, type**: `init`

### Step 5: Seed Sample Data
```cmd
npm run seed
```

**Expected output**:
```
🌱 Starting database seed...
✅ Categories created
✅ Brands created  
✅ Products created
📊 Database seeded with:
   - 3 categories
   - 2 brands
   - 10 products
```

---

## 🚀 Running the Backend

### Step 1: Start Development Server
```cmd
npm run dev
```

### Step 2: Verify Server Started
**Expected output**:
```
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/health
📍 API endpoint: http://localhost:5000/api
📍 Products: http://localhost:5000/api/products
📍 Cart: http://localhost:5000/api/cart
📍 Quote: http://localhost:5000/api/quote
```

### Step 3: Keep Terminal Open
- ⚠️ **DO NOT CLOSE** this terminal window
- The server must remain running for the API to work
- Press `Ctrl+C` to stop the server when needed

---

## 🧪 Testing the API

### Method 1: Using Web Browser
Open your browser and visit these URLs:

1. **Health Check**: http://localhost:5000/health
   ```json
   {"status":"OK","timestamp":"2025-07-15T12:00:00.000Z","service":"Construction Machinery API","version":"1.0.0"}
   ```

2. **API Info**: http://localhost:5000/api
   ```json
   {"message":"Construction Machinery E-commerce API","version":"1.0.0","endpoints":{...}}
   ```

3. **Products List**: http://localhost:5000/api/products
   ```json
   {"success":true,"data":[...],"pagination":{...}}
   ```

### Method 2: Using PowerShell (Advanced)
```powershell
# Test health endpoint
Invoke-RestMethod -Uri "http://localhost:5000/health"

# Test products endpoint
Invoke-RestMethod -Uri "http://localhost:5000/api/products?limit=2"

# Test cart endpoint
Invoke-RestMethod -Uri "http://localhost:5000/api/cart"
```

### Method 3: Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new request:
   - **Method**: GET
   - **URL**: `http://localhost:5000/api/products`
   - **Send** the request
3. You should see product data in JSON format

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### ❌ PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions**:
1. **Check PostgreSQL Service**:
   - Open **Services** (services.msc)
   - Find **postgresql-x64-17**
   - Ensure it's **Running**
   - If not, right-click → **Start**

2. **Check PostgreSQL Installation**:
   ```cmd
   psql -U postgres -h localhost
   ```

3. **Verify Database Exists**:
   ```cmd
   psql -U postgres -h localhost -c "\l" | findstr construction_machinery_db
   ```

#### ❌ Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions**:
1. **Find process using port 5000**:
   ```cmd
   netstat -ano | findstr :5000
   ```
2. **Kill the process**:
   ```cmd
   taskkill /PID <PID_NUMBER> /F
   ```
3. **Or change port in .env**:
   ```properties
   PORT=5001
   ```

#### ❌ NPM Install Fails
```
npm ERR! network
```

**Solutions**:
1. **Clear npm cache**:
   ```cmd
   npm cache clean --force
   ```
2. **Delete node_modules and reinstall**:
   ```cmd
   rmdir /s node_modules
   del package-lock.json
   npm install
   ```
3. **Use different registry**:
   ```cmd
   npm install --registry https://registry.npmjs.org/
   ```

#### ❌ Database Migration Fails
```
Error: P1001: Can't reach database server
```

**Solutions**:
1. **Verify DATABASE_URL** in `.env` file
2. **Check PostgreSQL is running**
3. **Test manual connection**:
   ```cmd
   psql "postgresql://postgres:YOUR_PASSWORD@localhost:5432/construction_machinery_db"
   ```

#### ❌ Prisma Generate Fails
```
Error: Generator "client" failed
```

**Solutions**:
1. **Clear Prisma cache**:
   ```cmd
   npx prisma generate --force
   ```
2. **Reinstall Prisma**:
   ```cmd
   npm uninstall @prisma/client prisma
   npm install @prisma/client prisma
   ```

### Environment Issues

#### Windows Defender / Antivirus
- Add `backend` folder to **exclusions**
- Allow **Node.js** through firewall

#### Path Issues
If commands not found, add to PATH:
1. **PostgreSQL**: `C:\Program Files\PostgreSQL\17\bin`
2. **Node.js**: Usually added automatically

---

## 📝 Quick Reference Commands

### Daily Development Commands
```cmd
# Start backend server
npm run dev

# Stop server (in terminal)
Ctrl + C

# Reset database (if needed)
npm run db:reset

# View database in browser
npx prisma studio
```

### Database Management
```cmd
# Generate Prisma client
npm run db:generate

# Create new migration
npm run db:migrate

# Reset and reseed database
npm run db:reset
npm run seed

# View database GUI
npx prisma studio
```

### Project Structure
```
backend/
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts            # Sample data
├── src/
│   ├── controllers/       # API request handlers
│   ├── services/          # Business logic
│   ├── routes/           # API routes
│   ├── middleware/       # Request processing
│   └── index.ts          # Main server file
├── .env                  # Environment variables
└── package.json          # Dependencies
```

---

## 🎯 Next Steps

After successful setup:

1. **Frontend Setup**: Set up the Next.js frontend
2. **Strapi Admin**: Configure Strapi CMS for content management
3. **API Documentation**: Explore all available endpoints
4. **Database GUI**: Use `npx prisma studio` to view data

---

## 📞 Support

If you encounter issues:

1. **Check this troubleshooting section**
2. **Verify all prerequisites are installed**
3. **Ensure PostgreSQL service is running**
4. **Check `.env` file configuration**
5. **Look for error messages in terminal**

**Common Success Indicators**:
- ✅ Server starts on port 5000
- ✅ Health endpoint returns OK status
- ✅ Products endpoint returns data
- ✅ No error messages in terminal

---

## 🔐 Security Notes

**For Production Deployment**:
- Change all default passwords
- Use environment-specific `.env` files
- Enable SSL for PostgreSQL
- Set up proper firewall rules
- Use strong session secrets

**Never commit**:
- `.env` files with real passwords
- Database credentials
- Secret keys

---

*Last updated: July 15, 2025*
*Version: 1.0*
