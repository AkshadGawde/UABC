# 🚀 UABC Development Startup Guide

## Prerequisites
- Node.js installed
- MongoDB Atlas connection configured
- Environment variables set up

## 📋 Step-by-Step Startup Process

### 1️⃣ Start Backend Server (Terminal 1)

```bash
# Navigate to server directory
cd server

# Install dependencies (first time only)
npm install

# Seed admin user (first time only)
node seed.js

# Start the backend server
npm run dev
```

**Expected Output:**
```
✅ Connected to MongoDB Atlas
📊 Database: test
🚀 Server running on port 5000
📊 Environment: development
```

**Backend URL:** http://localhost:5000
**Health Check:** http://localhost:5000/api/health

---

### 2️⃣ Start Frontend Server (Terminal 2)

```bash
# Navigate to root directory (if in server/)
cd ..

# Install dependencies (first time only)
npm install

# Start the frontend development server
npm run dev
```

**Expected Output:**
```
VITE v6.x.x ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

**Frontend URL:** http://localhost:3000

---

## 🔐 Admin Login Credentials

After running `node seed.js`, use these credentials:

- **URL:** http://localhost:3000/admin
- **Username:** `admin`
- **Password:** `admin123`
- **Email:** admin@uabc.com

---

## 🔧 Troubleshooting

### Issue: "Connection fails and backend may be offline"

**Solution:**
1. Verify backend is running on port 5000
2. Check terminal 1 for error messages
3. Verify MongoDB connection in server/.env
4. Test backend: http://localhost:5000/api/health

### Issue: "Cannot connect to backend server"

**Solution:**
1. Make sure both terminals are running
2. Backend should start BEFORE frontend
3. Check CORS configuration in server/server.js
4. Verify .env has correct MongoDB URI

### Issue: "Invalid username or password"

**Solution:**
1. Run seed script: `cd server && node seed.js`
2. Use exact credentials: admin / admin123
3. Check backend logs for authentication errors

### Issue: Frontend shows production API URL

**Solution:**
- The app now auto-detects dev mode
- In dev: uses http://localhost:5000/api
- In production: uses https://uabc.onrender.com/api

---

## 📁 Environment Files

### Root `.env` (Frontend)
```env
VITE_API_URL=https://uabc.onrender.com/api
VITE_API_URL_DEV=http://localhost:5000/api
```

### `server/.env` (Backend)
```env
MONGODB_URI="your-mongodb-connection-string"
JWT_SECRET="uabc_cms_super_strong_jwt_secret_2026_9f4c1b5e2d"
```

---

## ✅ Quick Verification Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Health check responds at http://localhost:5000/api/health
- [ ] Frontend running on http://localhost:3000
- [ ] Console shows: "🔧 Auth Service Config: { mode: 'development', apiUrl: 'http://localhost:5000/api' }"
- [ ] Admin login page loads at http://localhost:3000/admin
- [ ] Can login with admin/admin123
- [ ] Dashboard accessible after login

---

## 🎯 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/insights` - Get published insights

### Admin Endpoints (require authentication)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin
- `GET /api/auth/me` - Get current user
- `GET /api/insights/admin` - Get all insights (admin)
- `POST /api/insights` - Create insight
- `PUT /api/insights/:id` - Update insight
- `DELETE /api/insights/:id` - Delete insight

---

## 🔍 Debug Mode

Open browser console (F12) to see detailed logs:
- 🔧 Config logs (API URLs, mode)
- 🔐 Authentication attempts
- 📡 API requests/responses
- ✅/❌ Success/error indicators

---

## 💡 Tips

1. **Always start backend first** - Frontend depends on backend API
2. **Check console logs** - Both terminal and browser console show helpful debug info
3. **Verify MongoDB connection** - Backend won't work without valid MongoDB URI
4. **Use health endpoint** - Quick way to verify backend is responding
5. **Clear browser cache** - If login issues persist, clear localStorage
