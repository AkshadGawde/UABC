#!/bin/bash
# UABC CMS - System Test Script

echo "🧪 UABC CMS System Test"
echo "======================="
echo ""

# Test Backend Health
echo "1️⃣  Testing Backend Health..."
HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/health)
if echo "$HEALTH_RESPONSE" | grep -q "OK"; then
    echo "✅ Backend is running"
    echo "$HEALTH_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo "❌ Backend is NOT running"
    echo "   Start it with: cd server && node server.js"
    exit 1
fi
echo ""

# Test Insights API
echo "2️⃣  Testing Insights API..."
INSIGHTS_RESPONSE=$(curl -s http://localhost:5000/api/insights)
if echo "$INSIGHTS_RESPONSE" | grep -q "success"; then
    echo "✅ Insights API is working"
    TOTAL=$(echo "$INSIGHTS_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('data', {}).get('pagination', {}).get('total', 0))" 2>/dev/null)
    echo "   Total insights in database: $TOTAL"
else
    echo "❌ Insights API failed"
fi
echo ""

# Test PDF Insights Route
echo "3️⃣  Testing PDF Insights Route..."
PDF_ROUTE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/pdf-insights/test/pdf)
if [ "$PDF_ROUTE_RESPONSE" = "404" ]; then
    echo "✅ PDF route is mounted (404 expected for test ID)"
elif [ "$PDF_ROUTE_RESPONSE" = "500" ] || [ "$PDF_ROUTE_RESPONSE" = "400" ]; then
    echo "✅ PDF route is mounted (error expected for test ID)"
else
    echo "⚠️  PDF route status: $PDF_ROUTE_RESPONSE"
fi
echo ""

# Test Frontend
echo "4️⃣  Testing Frontend..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173)
if [ "$FRONTEND_RESPONSE" = "200" ]; then
    echo "✅ Frontend is running on http://localhost:5173"
else
    echo "❌ Frontend is NOT running"
    echo "   Start it with: npm run dev"
fi
echo ""

# Test Admin Login Page
echo "5️⃣  Testing Admin Login Page..."
ADMIN_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/admin)
if [ "$ADMIN_RESPONSE" = "200" ]; then
    echo "✅ Admin login page accessible"
else
    echo "⚠️  Admin page status: $ADMIN_RESPONSE"
fi
echo ""

# Summary
echo "📋 Summary"
echo "=========="
echo "Backend API: http://localhost:5000/api"
echo "Frontend: http://localhost:5173"
echo "Admin Panel: http://localhost:5173/admin"
echo ""
echo "Default Admin Credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "Next Steps:"
echo "1. Login to http://localhost:5173/admin"
echo "2. Click 'Upload PDF' button"
echo "3. Upload a test PDF"
echo "4. Check http://localhost:5173/insights"
echo ""
