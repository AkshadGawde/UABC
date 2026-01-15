# 🔐 Environment Variables for Deployment

## 📦 Render (Backend) - https://dashboard.render.com

Go to: **Dashboard → Your Service → Environment**

Add these variables:

```bash
MONGODB_URI=mongodb+srv://gawdeakshad_db_user:uabc1234@cluster0.rzway3p.mongodb.net/uabc?appName=Cluster0

JWT_SECRET=uabc_cms_super_strong_jwt_secret_2026_9f4c1b5e2d

NODE_ENV=production

PORT=5000
```

**Important Notes**:
- ✅ Make sure MongoDB URI includes `/uabc` database name
- ✅ Click "Save Changes" after adding all variables
- ✅ Render will auto-redeploy after saving

---

## 🌐 Vercel (Frontend) - https://vercel.com/dashboard

Go to: **Your Project → Settings → Environment Variables**

Add this variable:

```bash
VITE_API_URL=https://uabc.onrender.com/api
```

**Important Notes**:
- ✅ Set for **ALL** environments (Production, Preview, Development)
- ✅ Click "Save" after adding
- ✅ Redeploy to apply changes: Deployments → ⋯ → Redeploy

---

## 🧪 How to Verify

### Test Backend (Render):
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

### Test Insights Endpoint:
```bash
curl https://uabc.onrender.com/api/insights
```

Expected response:
```json
{
  "success": true,
  "data": {
    "insights": [],
    "pagination": {...}
  }
}
```

### Test Frontend (Vercel):
1. Visit: `https://uabc.vercel.app/insights`
2. Open Browser Console (F12)
3. Look for: `🔧 Insights Service Config`
4. Verify `apiUrl` shows: `https://uabc.onrender.com/api`

---

## 🔄 After Setting Environment Variables

### On Render:
- Automatically redeploys after saving environment variables
- Wait 2-3 minutes for deployment
- Check logs for `✅ Connected to MongoDB Atlas`

### On Vercel:
- Go to: **Deployments**
- Click **⋯ (three dots)** on latest deployment
- Click **"Redeploy"**
- Or push new commit to trigger auto-deploy

---

## 🐛 Troubleshooting

### If /insights still shows error:

1. **Check Render Logs**:
   - Go to Render Dashboard → Logs
   - Look for connection errors
   - Verify MongoDB connection successful

2. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Deployments
   - Click on latest deployment → Function Logs
   - Look for API call errors

3. **Check CORS**:
   - Visit: https://uabc.vercel.app/insights
   - Open Console (F12)
   - Look for CORS errors
   - If found, verify your Vercel URL is in `server/server.js` allowedOrigins

4. **Cold Start (Render Free Tier)**:
   - First request may take 30-60 seconds
   - Be patient on first load
   - Subsequent requests will be faster

---

## ✅ Final Checklist

- [ ] MongoDB URI set on Render with `/uabc` database name
- [ ] JWT_SECRET set on Render
- [ ] NODE_ENV=production set on Render
- [ ] VITE_API_URL set on Vercel
- [ ] Backend redeployed on Render
- [ ] Frontend redeployed on Vercel
- [ ] Backend health check works
- [ ] Insights endpoint returns data
- [ ] No CORS errors in browser console
- [ ] /insights page loads without freezing

---

**Need Help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
