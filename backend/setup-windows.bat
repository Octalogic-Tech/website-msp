@echo off
REM Construction Machinery Backend Setup Script for Windows
REM This script automates the backend setup process

echo ======================================
echo Construction Machinery Backend Setup
echo ======================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo WARNING: Not running as administrator
    echo Some steps might fail without admin rights
    echo.
)

REM Check Node.js installation
echo [1/8] Checking Node.js...
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js 22.x LTS first
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js found
)

REM Check PostgreSQL installation
echo [2/8] Checking PostgreSQL...
psql --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ PostgreSQL not found! Please install PostgreSQL 17.x first
    echo Download from: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
) else (
    echo ✅ PostgreSQL found
)

REM Check if we're in the backend directory
echo [3/8] Checking directory...
if not exist "package.json" (
    echo ❌ package.json not found!
    echo Please run this script from the backend directory
    pause
    exit /b 1
) else (
    echo ✅ In backend directory
)

REM Install dependencies
echo [4/8] Installing dependencies...
echo This may take 2-3 minutes...
npm install
if %errorLevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
) else (
    echo ✅ Dependencies installed
)

REM Check .env file
echo [5/8] Checking environment configuration...
if not exist ".env" (
    echo ⚠️  .env file not found!
    echo Please create .env file with your PostgreSQL password
    echo See BACKEND_SETUP_WINDOWS.md for details
    pause
)

REM Generate Prisma client
echo [6/8] Generating Prisma client...
npm run db:generate
if %errorLevel% neq 0 (
    echo ❌ Failed to generate Prisma client
    echo Check your DATABASE_URL in .env file
    pause
    exit /b 1
) else (
    echo ✅ Prisma client generated
)

REM Run migrations
echo [7/8] Running database migrations...
npm run db:migrate
if %errorLevel% neq 0 (
    echo ❌ Failed to run migrations
    echo Check your PostgreSQL connection and DATABASE_URL
    pause
    exit /b 1
) else (
    echo ✅ Database migrations completed
)

REM Seed database
echo [8/8] Seeding database with sample data...
npm run seed
if %errorLevel% neq 0 (
    echo ⚠️  Failed to seed database
    echo Database setup completed but no sample data
) else (
    echo ✅ Database seeded with sample data
)

echo.
echo ======================================
echo ✅ SETUP COMPLETED SUCCESSFULLY!
echo ======================================
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Open: http://localhost:5000/health
echo 3. Test: http://localhost:5000/api/products
echo.
echo See BACKEND_SETUP_WINDOWS.md for detailed instructions
echo.
pause
