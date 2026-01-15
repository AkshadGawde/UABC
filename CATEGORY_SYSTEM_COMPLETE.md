# 🔐 Environment Variables for Deployment

## 📦 **Render (Backend)** - https://dashboard.render.com

Go to: **Dashboard → Your Service → Environment**

Copy and paste these variables:

```bash
MONGODB_URI=mongodb+srv://gawdeakshad_db_user:uabc1234@cluster0.rzway3p.mongodb.net/uabc?appName=Cluster0
JWT_SECRET=uabc_cms_super_strong_jwt_secret_2026_9f4c1b5e2d
NODE_ENV=production
PORT=5000
```

---

## 🌐 **Vercel (Frontend)** - https://vercel.com/dashboard

Go to: **Your Project → Settings → Environment Variables**

Add this variable for **ALL** environments (Production, Preview, Development):

```bash
VITE_API_URL=https://uabc.onrender.com/api
```

---

## ✅ **What Was Implemented**

### 1. Category System
- ✅ Added `category` field to Insight model (supports both PDF and text insights)
- ✅ Categories are stored with each insight in MongoDB
- ✅ Default categories: Research Papers, Interests, Regulatory Reports
- ✅ Custom category creation supported in admin dashboard

### 2. Admin Dashboard (`/admin/dashboard`)
- ✅ Category dropdown in PDF upload form
- ✅ "Create New Category" option with custom input field
- ✅ Category saved with PDF in database
- ✅ Form validation for category selection

### 3. Main Insights Page (`/insights`)
- ✅ Displays ALL insights by default (10 per page)
- ✅ Category filter dropdown at top
- ✅ Pagination with page numbers
- ✅ Filters insights by selected category
- ✅ Maintains pagination for filtered results
- ✅ Smooth animations and responsive design

### 4. Category-Specific Pages
- ✅ Dynamic route: `/insights/:category`
- ✅ Displays only insights from that category
- ✅ 15 insights per page with pagination
- ✅ Same UI as main insights page
- ✅ Smooth animations and dark theme support
- ✅ Fully responsive on all devices

### 5. Navbar Dropdown
- ✅ Fetches unique categories from database dynamically
- ✅ Generates dropdown menu items automatically
- ✅ Links to `/insights/[category-slug]`
- ✅ Auto-updates when new category is added
- ✅ Works in both desktop and mobile views

### 6. Technical Implementation
- ✅ Single database collection with category field
- ✅ Reusable InsightsCategory component
- ✅ Category passed as URL parameter for filtering
- ✅ Backend API supports category filtering
- ✅ Pagination on both frontend and backend
- ✅ Category slugs automatically generated from names

---

## 📂 **Files Modified/Created**

### Backend:
1. **server/models/Insight.js** - Category field already exists, made flexible for PDF and text
2. **server/routes/pdfInsights.js** - Accept and save category from upload form
3. **server/routes/insights.js** - Already supports category filtering via query params

### Frontend:
1. **src/admin/components/PDFInsightUploader.tsx** - Added category dropdown and custom input
2. **src/pages/Insights.tsx** - Added pagination (10 per page) and category state management
3. **src/pages/InsightsCategory.tsx** - NEW: Category-specific page component (15 per page)
4. **src/pages/index.ts** - Export InsightsCategory component
5. **src/App.tsx** - Added route `/insights/:category`
6. **src/components/layout/Navbar.tsx** - Dynamic category dropdown from database

---

## 🚀 **Usage Guide**

### For Admins (Uploading PDFs):

1. Go to `/admin/dashboard`
2. Upload PDF in "Upload PDF Insight" section
3. Select category from dropdown:
   - Research Papers
   - Interests
   - Regulatory Reports
   - Or click "+ Create New Category" to add custom one
4. Fill in other optional fields (image, publish date)
5. Click "Upload PDF Insight"

### For Users (Viewing Insights):

1. **View All**: Go to `/insights` to see all insights (paginated, 10 per page)
2. **Filter**: Click category buttons at top to filter by category
3. **Category Pages**: Use navbar dropdown under "Insights" to go directly to category page
4. **Navigation**: Use pagination buttons to browse through insights

---

## 🎨 **UI Features**

- ✅ Smooth scroll animations
- ✅ Dark theme support
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Loading states with spinners
- ✅ Error handling with retry buttons
- ✅ Hover effects on cards
- ✅ PDF badge indicators
- ✅ Category badges on cards
- ✅ Pagination with ellipsis for many pages
- ✅ "Back to All Insights" button on category pages

---

## 🧪 **Testing**

1. **Test Category Creation**:
   ```
   - Upload PDF with "Research Papers"
   - Upload PDF with custom category "Market Analysis"
   - Check navbar dropdown updates automatically
   ```

2. **Test Category Filtering**:
   ```
   - Go to /insights
   - Click different category buttons
   - Verify only that category's insights show
   - Check pagination resets to page 1
   ```

3. **Test Category Pages**:
   ```
   - Click "Research Papers" in navbar
   - Verify URL is /insights/research-papers
   - Check only research papers display
   - Test pagination (15 per page)
   ```

4. **Test Responsiveness**:
   ```
   - Open on mobile device (< 768px)
   - Check dropdown works in mobile menu
   - Verify pagination buttons stack properly
   - Test card grid adjusts to screen size
   ```

---

## 🔧 **Deployment Steps**

### 1. Push to GitHub:
```bash
git add .
git commit -m "Add PDF category filtering system with dynamic navbar"
git push origin main
```

### 2. Deploy Backend (Render):
- Auto-deploys from GitHub
- Verify environment variables are set (see top of this file)
- Check logs: Dashboard → Logs → Look for "✅ Connected to MongoDB Atlas"

### 3. Deploy Frontend (Vercel):
- Auto-deploys from GitHub
- Verify `VITE_API_URL` is set for all environments
- Test: https://your-app.vercel.app/insights

### 4. Verify:
```bash
# Test backend API
curl https://uabc.onrender.com/api/insights

# Test category page
curl https://uabc.onrender.com/api/insights?category=Research%20Papers
```

---

## 🆘 **Troubleshooting**

### Categories not showing in navbar:
- Check browser console for errors
- Verify backend is returning insights with categories
- Clear browser cache and refresh

### Category page shows 404:
- Make sure route is added in App.tsx: `/insights/:category`
- Check InsightsCategory is exported from pages/index.ts
- Verify component name matches import

### Pagination not working:
- Check `totalPages` state is being set from API response
- Verify backend pagination logic in server/routes/insights.js
- Check console for API errors

### Custom category not saving:
- Check `category` field is being sent in FormData
- Verify backend accepts category parameter
- Check MongoDB to confirm category is saved

---

## 📊 **Database Structure**

```javascript
// Insight Collection
{
  _id: ObjectId,
  title: String,
  excerpt: String,
  category: String,  // ← NEW: Flexible category field
  author: String,
  featured: Boolean,
  published: Boolean,
  publishDate: Date,
  featuredImage: String,
  // PDF-specific (optional)
  pdfData: String,    // base64
  pdfFilename: String,
  pdfSize: Number,
  // Text-specific (optional)
  content: String,
  tags: [String],
  readTime: Number,
  // Auto-generated
  createdAt: Date,
  updatedAt: Date,
  slug: String
}
```

---

**Last Updated**: January 15, 2026  
**Status**: ✅ Fully Implemented and Ready for Production
