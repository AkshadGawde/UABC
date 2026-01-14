#!/bin/bash

# 🧪 UABC Full Stack Test Script
# Tests both localhost and production endpoints

echo "🧪 Testing UABC Application"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test local backend
echo "1️⃣  Testing Local Backend..."
LOCAL_HEALTH=$(curl -s http://localhost:5000/api/health)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Local backend is running${NC}"
    echo "   $LOCAL_HEALTH"
else
    echo -e "${RED}❌ Local backend is not responding${NC}"
fi
echo ""

# Test local insights endpoint
echo "2️⃣  Testing Local Insights API..."
LOCAL_INSIGHTS=$(curl -s http://localhost:5000/api/insights)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Local insights endpoint working${NC}"
    INSIGHTS_COUNT=$(echo $LOCAL_INSIGHTS | grep -o '"total":[0-9]*' | cut -d: -f2)
    echo "   Total insights: $INSIGHTS_COUNT"
else
    echo -e "${RED}❌ Local insights endpoint failed${NC}"
fi
echo ""

# Test production backend
echo "3️⃣  Testing Production Backend (Render)..."
PROD_HEALTH=$(curl -s -m 30 https://uabc.onrender.com/api/health)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Production backend is running${NC}"
    echo "   $PROD_HEALTH"
else
    echo -e "${RED}❌ Production backend is not responding${NC}"
    echo -e "${YELLOW}   Note: Render free tier may have cold start (30s delay)${NC}"
fi
echo ""

# Test production insights
echo "4️⃣  Testing Production Insights API..."
PROD_INSIGHTS=$(curl -s -m 30 https://uabc.onrender.com/api/insights)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Production insights endpoint working${NC}"
    PROD_INSIGHTS_COUNT=$(echo $PROD_INSIGHTS | grep -o '"total":[0-9]*' | cut -d: -f2)
    echo "   Total insights: $PROD_INSIGHTS_COUNT"
else
    echo -e "${RED}❌ Production insights endpoint failed${NC}"
fi
echo ""

# Check MongoDB connection
echo "5️⃣  Checking Database Configuration..."
if grep -q "mongodb+srv://.*mongodb.net/uabc" server/.env; then
    echo -e "${GREEN}✅ Database name 'uabc' configured correctly${NC}"
else
    echo -e "${RED}❌ Database name missing in MongoDB URI${NC}"
fi
echo ""

# Check environment variables
echo "6️⃣  Checking Environment Variables..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ Frontend .env exists${NC}"
    if grep -q "VITE_API_URL" .env; then
        echo -e "${GREEN}   - VITE_API_URL configured${NC}"
    fi
    if grep -q "VITE_API_URL_DEV" .env; then
        echo -e "${GREEN}   - VITE_API_URL_DEV configured${NC}"
    fi
else
    echo -e "${RED}❌ Frontend .env missing${NC}"
fi

if [ -f "server/.env" ]; then
    echo -e "${GREEN}✅ Backend .env exists${NC}"
    if grep -q "MONGODB_URI" server/.env; then
        echo -e "${GREEN}   - MONGODB_URI configured${NC}"
    fi
    if grep -q "JWT_SECRET" server/.env; then
        echo -e "${GREEN}   - JWT_SECRET configured${NC}"
    fi
else
    echo -e "${RED}❌ Backend .env missing${NC}"
fi
echo ""

# Summary
echo "======================================"
echo "📋 Summary"
echo "======================================"
echo "Local Backend:  http://localhost:5000"
echo "Local Frontend: http://localhost:3000"
echo "Prod Backend:   https://uabc.onrender.com/api"
echo "Prod Frontend:  https://[your-vercel-url].vercel.app"
echo ""
echo "Next Steps:"
echo "1. If local works but production doesn't:"
echo "   - Set environment variables on Render/Vercel"
echo "   - Check CORS configuration includes your Vercel URL"
echo "   - Check Render logs for errors"
echo ""
echo "2. To deploy updates:"
echo "   git add . && git commit -m 'Update' && git push"
echo ""
