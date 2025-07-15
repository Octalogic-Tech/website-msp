# Construction Machinery Backend Setup Script for Windows (PowerShell)
# This script automates the backend setup process

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Construction Machinery Backend Setup" -ForegroundColor Cyan  
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Administrator)) {
    Write-Host "WARNING: Not running as administrator" -ForegroundColor Yellow
    Write-Host "Some steps might fail without admin rights" -ForegroundColor Yellow
    Write-Host ""
}

# Check Node.js installation
Write-Host "[1/8] Checking Node.js..." -ForegroundColor Blue
try {
    $nodeVersion = node --version 2>$null
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js 22.x LTS first" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check PostgreSQL installation  
Write-Host "[2/8] Checking PostgreSQL..." -ForegroundColor Blue
try {
    $pgVersion = psql --version 2>$null
    Write-Host "✅ PostgreSQL found: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ PostgreSQL not found! Please install PostgreSQL 17.x first" -ForegroundColor Red
    Write-Host "Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if we're in the backend directory
Write-Host "[3/8] Checking directory..." -ForegroundColor Blue
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the backend directory" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
} else {
    Write-Host "✅ In backend directory" -ForegroundColor Green
}

# Install dependencies
Write-Host "[4/8] Installing dependencies..." -ForegroundColor Blue
Write-Host "This may take 2-3 minutes..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check .env file
Write-Host "[5/8] Checking environment configuration..." -ForegroundColor Blue
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "Please create .env file with your PostgreSQL password" -ForegroundColor Yellow
    Write-Host "See BACKEND_SETUP_WINDOWS.md for details" -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
}

# Generate Prisma client
Write-Host "[6/8] Generating Prisma client..." -ForegroundColor Blue
try {
    npm run db:generate
    Write-Host "✅ Prisma client generated" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
    Write-Host "Check your DATABASE_URL in .env file" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Run migrations
Write-Host "[7/8] Running database migrations..." -ForegroundColor Blue
try {
    npm run db:migrate
    Write-Host "✅ Database migrations completed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to run migrations" -ForegroundColor Red
    Write-Host "Check your PostgreSQL connection and DATABASE_URL" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Seed database
Write-Host "[8/8] Seeding database with sample data..." -ForegroundColor Blue
try {
    npm run seed
    Write-Host "✅ Database seeded with sample data" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Failed to seed database" -ForegroundColor Yellow
    Write-Host "Database setup completed but no sample data" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "✅ SETUP COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: npm run dev" -ForegroundColor White
Write-Host "2. Open: http://localhost:5000/health" -ForegroundColor White  
Write-Host "3. Test: http://localhost:5000/api/products" -ForegroundColor White
Write-Host ""
Write-Host "See BACKEND_SETUP_WINDOWS.md for detailed instructions" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"
