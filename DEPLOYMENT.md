# 🚀 Deployment Guide for UABC

## 📋 Prerequisites

- Render account (for backend)
- Vercel account (for frontend)
- MongoDB Atlas cluster

---

## 🔧 Backend Deployment (Render)

### 1. Push Code to GitHub/GitLab
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your repository
4. Configure:
   - **Name**: `uabc-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or paid for better performance)

### 3. Set Environment Variables on Render

Go to **Environment** tab and add:

```bash
MONGODB_URI=mongodb+srv://gawdeakshad_db_user:uabc1234@cluster0.rzway3p.mongodb.net/uabc?appName=Cluster0
JWT_SECRET=uabc_cms_super_strong_jwt_secret_2026_9f4c1b5e2d
NODE_ENV=production
PORT=5000
```

### 4. Deploy
- Click **"Create Web Service"**
- Wait for deployment to complete
- Note your backend URL: `https://uabc.onrender.com`

---

## 🌐 Frontend Deployment (Vercel)

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Set Environment Variables on Vercel

Go to **Settings** → **Environment Variables** and add:

```bash
VITE_API_URL=https://uabc.onrender.com/api
```

**Important**: Add this for all environments (Production, Preview, Development)

### 4. Deploy
- Click **"Deploy"**
- Wait for deployment
- Your site will be live at: `https://your-app.vercel.app`

### 5. Add Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed

---

## 🔒 Update CORS After Deployment

Once you have your Vercel URL, update `server/server.js`:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://your-actual-vercel-url.vercel.app", // 👈 Update this
  "https://your-custom-domain.com", // 👈 If you have one
];
```

Then redeploy on Render.

---

## 🗄️ Database Setup

### MongoDB Atlas Configuration

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Network Access**: Add `0.0.0.0/0` to allow Render access
3. **Database Users**: Ensure user has read/write permissions
4. **Connection String**: Already configured in `.env`

### Seed Admin User

Run locally once:
```bash
cd server
node seed.js
```

This creates:
- **Email**: `admin@uabc.com`
- **Password**: `admin123`

---

## ✅ Post-Deployment Checklist

### Backend Health Check
```bash
curl https://uabc.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "UABC CMS Backend is running",
  "environment": "production"
}
```

### Frontend Test
1. Visit your Vercel URL
2. Navigate to `/insights` - should load without freezing
3. Login at `/admin` with credentials above
4. Upload a PDF - should save and appear on `/insights`

### Common Issues

#### 🔴 CORS Errors
- Verify Vercel URL is in `allowedOrigins` array
- Check browser console for exact origin being blocked
- Redeploy backend after CORS changes

#### 🔴 Database Connection Failed
- Verify MongoDB Atlas allows connections from `0.0.0.0/0`
- Check connection string includes database name `/uabc`
- Verify credentials are correct

#### 🔴 Insights Page Freezes
- Check `VITE_API_URL` is set on Vercel
- Test backend health endpoint
- Check browser console for API errors
- Render free tier has cold starts (30s delay)

#### 🔴 Admin Login Fails
- Verify JWT_SECRET is set on Render
- Run seed script to create admin user
- Check MongoDB connection in Render logs

---

## 🔄 Continuous Deployment

### Automatic Deployments

Both Render and Vercel auto-deploy when you push to `main`:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Manual Redeploy

**Render**: Dashboard → Manual Deploy → Clear build cache & deploy

**Vercel**: Dashboard → Deployments → Redeploy

---

## 📊 Monitoring

### Backend Logs (Render)
- Dashboard → Logs tab
- Look for: `✅ Connected to MongoDB Atlas`
- Check for error messages

### Frontend Errors (Vercel)
- Dashboard → Deployments → Function Logs
- Or use browser DevTools Console

---

## 🆘 Support

If issues persist:
1. Check Render logs for backend errors
2. Check Vercel logs for build errors
3. Test API endpoints directly with curl/Postman
4. Verify all environment variables are set correctly
5. Check MongoDB Atlas network access whitelist

---

## 🎉 Success!

Your app should now be:
- ✅ Backend running on Render
- ✅ Frontend running on Vercel
- ✅ Database on MongoDB Atlas
- ✅ Admin panel working
- ✅ PDF uploads functional
- ✅ Insights page displaying content

**Live URLs**:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://uabc.onrender.com/api`
- Admin: `https://your-app.vercel.app/admin`
