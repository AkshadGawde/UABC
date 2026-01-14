# UABC CMS - Complete Startup Guide

## Quick Start (Development)

### 1. Start Backend Server
```bash
cd server
npm install  # if not already done
node server.js
```
**Expected Output:**
```
🔍 Environment check:
- NODE_ENV: development
- PORT: 5000
- MongoDB URI exists: true
- JWT Secret exists: true
✅ Connected to MongoDB Atlas
📊 Database: your-database-name
🚀 Server running on port 5000
📊 Environment: development
```

### 2. Start Frontend (in a new terminal)
```bash
cd /Users/akshadgawde/Desktop/Developer/UABC
npm install  # if not already done
npm run dev
```
**Expected Output:**
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3. Seed Admin User (if needed)
```bash
cd server
node seed.js
```
**This creates:**
- Username: `admin`
- Password: `admin123`
- Role: admin

---

## Admin Panel Access

### Login to Admin Dashboard
1. Navigate to: http://localhost:5173/admin
2. Use credentials:
   - Username: `admin`
   - Password: `admin123`
3. You'll be redirected to: http://localhost:5173/admin/dashboard

### Upload PDF Insights
1. Click **"Upload PDF"** button in dashboard
2. Drag & drop or select a PDF file
3. Optionally add:
   - Featured image (URL or upload)
   - Publish date
4. Click **"Upload PDF"** button
5. PDF will be:
   - Parsed automatically
   - Title/excerpt extracted
   - Saved to MongoDB
   - Auto-published
   - Visible on `/insights` page

### View Uploaded Insights
- Public page: http://localhost:5173/insights
- PDF insights will have a "View PDF" button
- Clicking opens the PDF in a new tab

---

## Troubleshooting

### Backend Not Connecting
**Error:** "Connection fails and backend may be offline"

**Solution:**
1. Check backend is running on port 5000:
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK","message":"UABC CMS Backend is running"}`

2. Check MongoDB connection in backend terminal
3. Verify `.env` files are correctly configured

### PDF Upload Fails
**Check Console Logs (F12):**
- Frontend logs start with: `Starting PDF upload...`
- Backend logs start with: `📄 PDF Upload Request Started`

**Common Issues:**
1. **No auth token:** Log out and log in again
2. **CORS error:** Backend CORS settings correct
3. **File too large:** Max 10MB for PDFs
4. **Invalid PDF:** Ensure file is a valid PDF

### Insights Not Loading
1. Check browser console (F12)
2. Look for API errors
3. Verify backend is running
4. Test API directly: http://localhost:5000/api/insights

---

## API Endpoints

### Public Endpoints
- `GET /api/insights` - Get published insights
- `GET /api/pdf-insights/:id/pdf` - Download PDF
- `GET /api/health` - Health check

### Protected Endpoints (require auth)
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (admin only)
- `POST /api/pdf-insights/upload` - Upload PDF
- `GET /api/insights/admin` - Get all insights (admin)
- `PUT /api/insights/:id` - Update insight
- `DELETE /api/insights/:id` - Delete insight

---

## Environment Configuration

### Backend (.env in server/)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

### Frontend (.env in root)
```env
VITE_API_URL=https://uabc.onrender.com/api
VITE_API_URL_DEV=http://localhost:5000/api
```

**Note:** Frontend automatically uses `VITE_API_URL_DEV` in development mode and `VITE_API_URL` in production.

---

## Architecture Overview

### Frontend (React + TypeScript + Vite)
- **Pages:**
  - `/` - Home page
  - `/insights` - Public insights listing (shows PDFs and articles)
  - `/admin` - Admin login
  - `/admin/dashboard` - Admin dashboard with PDF upload

- **Services:**
  - `authService.ts` - Authentication (login, logout, token management)
  - `insightsService.ts` - Insights CRUD operations

### Backend (Express.js + MongoDB)
- **Routes:**
  - `/api/auth` - Authentication routes
  - `/api/insights` - Regular insights CRUD
  - `/api/pdf-insights` - PDF upload and retrieval

- **Models:**
  - `User` - User accounts (admin, editor, viewer)
  - `Insight` - Insights/articles/PDFs

---

## Testing PDF Upload Flow

1. **Start both servers** (backend + frontend)
2. **Login to admin:** http://localhost:5173/admin
3. **Open browser console** (F12)
4. **Click "Upload PDF"**
5. **Select a test PDF** (any PDF < 10MB)
6. **Watch console logs:**
   - Frontend: Should show upload progress
   - Backend terminal: Should show PDF parsing
7. **Check success message**
8. **Go to** http://localhost:5173/insights
9. **Find your uploaded PDF**
10. **Click "View PDF"** - should open in new tab

---

## Production Deployment

### Frontend (Vercel)
- Set environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
- Deploy from GitHub or CLI

### Backend (Render)
- Set environment variables in Render dashboard
- Update CORS in `server/server.js` with your Vercel domain
- Deploy from GitHub

---

## Support

For issues:
1. Check browser console (F12)
2. Check backend terminal logs
3. Verify environment variables
4. Test API endpoints directly with curl
5. Ensure MongoDB is accessible
