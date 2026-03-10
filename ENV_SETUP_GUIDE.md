# 🔧 Environment Setup Guide

## Problem Solved ✅
Your changes now work consistently on localhost AND production after deployment!

---

## How It Works Now

### Local Development (Localhost)
```bash
npm run dev
# Automatically loads .env.local → API calls to http://localhost:5000/api
```

### Production (After Build & Deploy)
```bash
npm run build:prod
# Uses .env.production → API calls to https://api.uabc.co.in/api
```

---

## 📁 Environment Files Explained

| File | Purpose | When Used |
|------|---------|-----------|
| `.env` | Default values for local dev | Fallback only |
| `.env.local` | **Your local dev setup** | `npm run dev` (has priority) |
| `.env.production` | Production deployment settings | `npm run build:prod` |

---

## 🚀 Setup Steps

### 1. Verify `.env.local` exists (should already be there)
```bash
cat .env.local
# Should show: VITE_API_URL=http://localhost:5000/api
```

### 2. Start Backend (Terminal 1)
```bash
cd server
npm install
node server.js
# Should run on http://localhost:5000
```

### 3. Start Frontend (Terminal 2)
```bash
npm run dev
# Automatically opens http://localhost:3000
# API calls go to http://localhost:5000/api ✅
```

### 4. Test Locally
- Make changes in the code
- Save file
- Frontend auto-refreshes (HMR works)
- Changes reflect immediately ✅

---

## 📤 Deploy to Production

### 1. Test Production Build Locally
```bash
npm run build:prod
npm run preview
# Should open http://localhost:4173
# API calls should go to: https://api.uabc.co.in/api
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Your message"
git push origin main
```

### 3. Redeploy on Vercel
- Go to https://vercel.com/dashboard
- Click your project
- Click "Deployments" → "⋯" → "Redeploy"
- Wait for build to complete

### 4. Verify Production Works
- Visit https://your-domain
- API calls should work ✅
- No hardcoded URLs are used anymore

---

## ⚡ Why This Works

### Before (Problems):
❌ Hardcoded fallback URLs in code  
❌ No `.env.local` for local dev  
❌ Backend didn't know to use localhost  
❌ Required restart/rebuild for env changes  

### After (Fixed):
✅ Centralized API configuration  
✅ Proper `.env` file hierarchy  
✅ Automatic HMR + env variable reloading  
✅ Different URLs for dev vs production  
✅ No changes needed - just push and redeploy  

---

## 🔍 Debug Checklist

If something still doesn't work:

1. **Check API URL being used:**
   ```bash
   # Open browser console (F12)
   # Should show: "✅ Using API URL: http://localhost:5000/api"
   ```

2. **Verify backend is running:**
   ```bash
   curl http://localhost:5000/api/ping
   # Should return 200 OK
   ```

3. **Check environment variables:**
   ```bash
   # Look for this in browser console
   console.log(import.meta.env.VITE_API_URL)
   ```

4. **Clear cache and rebuild:**
   ```bash
   rm -rf node_modules/.vite dist
   npm run dev
   ```

5. **For production issues:**
   - Check Vercel project Settings → Environment Variables
   - Ensure VITE_API_URL is set correctly
   - Redeploy after changing env vars

---

## 📝 Key Changes Made

1. ✅ Created `.env.local` for local development
2. ✅ Fixed `vite.config.ts` to properly load env vars
3. ✅ Created `src/config/apiConfig.ts` - centralized API URL management
4. ✅ Updated `src/vite-env.d.ts` - proper TypeScript types
5. ✅ Updated service files to use centralized config
6. ✅ Added `dev:local` script to `package.json`

---

## Questions?

If you still have issues:
- Check that `.env.local` has `VITE_API_URL=http://localhost:5000/api`
- Verify Vercel has `VITE_API_URL=https://api.uabc.co.in/api` in Environment Variables
- Make sure backend is running when testing locally
- Backend CORS must allow `http://localhost:3000` for dev
