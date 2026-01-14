# ✅ Production Deployment Checklist

## 🎯 Quick Setup (Copy & Paste)

### 1️⃣ Render Environment Variables
Go to Render Dashboard → Your Service → Environment

```bash
MONGODB_URI=mongodb+srv://gawdeakshad_db_user:uabc1234@cluster0.rzway3p.mongodb.net/uabc?appName=Cluster0
JWT_SECRET=uabc_cms_super_strong_jwt_secret_2026_9f4c1b5e2d
NODE_ENV=production
PORT=5000
```

### 2️⃣ Vercel Environment Variables
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

```bash
VITE_API_URL=https://uabc.onrender.com/api
```

**Important**: Set for Production, Preview, AND Development environments

### 3️⃣ MongoDB Atlas Network Access
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (allow all)
3. Or add Render's IPs specifically

---

## ✅ Pre-Deployment Checklist

- [x] MongoDB URI includes database name `/uabc`
- [x] CORS configuration includes Vercel URL
- [x] Frontend uses correct API URLs (dev/prod)
- [x] All environment variables documented
- [x] Database fields support both PDF and text insights
- [x] Error handling and logging added
- [x] Test script created

---

## 🚀 Deployment Steps

### Step 1: Update CORS with Your Vercel URL

After deploying to Vercel, update `server/server.js` line 31:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://your-actual-app.vercel.app",  // 👈 ADD YOUR URL HERE
];
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Production ready"
git push origin main
```

### Step 3: Verify Deployment

**Backend Health Check**:
```bash
curl https://uabc.onrender.com/api/health
```

**Frontend Check**:
- Visit your Vercel URL
- Open browser console (F12)
- Check for any CORS or API errors

---

## 🧪 Testing

### Local Testing
```bash
# Run the test script
./test-deployment.sh

# Or manually test
curl http://localhost:5000/api/health
curl http://localhost:5000/api/insights
```

### Production Testing
```bash
# Test backend
curl https://uabc.onrender.com/api/health
curl https://uabc.onrender.com/api/insights

# Test frontend
# Visit: https://your-app.vercel.app
# Try: /insights page
# Try: /admin login
```

---

## 🔧 Troubleshooting

### Issue: CORS Error
**Symptom**: "Access to fetch blocked by CORS policy"
**Fix**: 
1. Add your Vercel URL to `allowedOrigins` in `server/server.js`
2. Redeploy backend on Render

### Issue: Insights Page Freezes
**Symptom**: Shows "Loading insights..." forever
**Fix**:
1. Check `VITE_API_URL` is set on Vercel
2. Test backend: `curl https://uabc.onrender.com/api/insights`
3. Check Render logs for errors
4. Wait 30s for Render cold start (free tier)

### Issue: Admin Login Fails
**Symptom**: "Connection failed, backend may be offline"
**Fix**:
1. Verify `JWT_SECRET` is set on Render
2. Run seed script: `cd server && node seed.js`
3. Check MongoDB connection in Render logs

### Issue: Database Connection Failed
**Symptom**: "MongoDB connection error"
**Fix**:
1. Verify MongoDB URI includes `/uabc` database name
2. Check MongoDB Atlas Network Access allows `0.0.0.0/0`
3. Verify credentials are correct

---

## 📊 Monitoring

### Check Logs

**Render Backend Logs**:
- Dashboard → Logs tab
- Look for: `✅ Connected to MongoDB Atlas`
- Check for errors

**Vercel Frontend Logs**:
- Dashboard → Deployments → Function Logs
- Check browser console (F12)

---

## 🎉 Success Indicators

You'll know it's working when:

✅ Backend health check returns `{"status":"OK"}`
✅ Insights API returns data (even if empty: `{"insights":[],"pagination":{...}}`)
✅ Frontend loads without freezing
✅ Admin login works
✅ PDF upload works and appears on /insights page
✅ No CORS errors in browser console

---

## 🆘 Quick Fixes

### Reset Everything
```bash
# Stop all servers
# Clear browser cache
# Restart backend: cd server && npm start
# Restart frontend: npm run dev
```

### Re-seed Database
```bash
cd server
node seed.js
```

Admin credentials:
- Email: `admin@uabc.com`
- Password: `admin123`

---

## 📞 Support Contacts

- **Render Status**: https://status.render.com/
- **Vercel Status**: https://www.vercel-status.com/
- **MongoDB Atlas Status**: https://status.cloud.mongodb.com/

---

## 🔄 Update Workflow

1. Make changes locally
2. Test locally: `npm run dev` + backend running
3. Commit: `git add . && git commit -m "Description"`
4. Push: `git push origin main`
5. Auto-deploys to Render + Vercel
6. Verify production works

---

**Last Updated**: January 14, 2026
**Status**: ✅ Ready for Production
