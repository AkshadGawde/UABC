#!/bin/bash
# Quick Development Startup Script
# Run this to start both backend and frontend in development mode

echo "🚀 UABC Development Environment Setup"
echo "======================================"
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install it first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Ask user to verify backend is running
echo "📋 Checklist:"
echo "1. Make sure MongoDB is accessible"
echo "2. Backend should be running on http://localhost:5000"
echo ""

# Option to start backend
read -p "Is backend already running? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Starting backend server..."
    echo "Run this in another terminal:"
    echo ""
    echo "  cd server"
    echo "  npm install  (first time only)"
    echo "  node server.js"
    echo ""
    echo "Waiting 5 seconds before starting frontend..."
    sleep 5
fi

echo ""
echo "🎯 Configuration:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  API:      http://localhost:5000/api"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo ""
echo "🔥 Starting frontend development server..."
echo "Press Ctrl+C to stop"
echo ""

npm run dev

