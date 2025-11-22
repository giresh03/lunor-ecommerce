# ⚡ Quick Start - Deploy in 15 Minutes

## 🎯 Fastest Free Deployment

### Prerequisites:
- GitHub account
- MongoDB Atlas account (free)
- Cloudinary account (free)

---

## Step 1: Setup MongoDB (5 min)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Network Access → Add `0.0.0.0/0`
5. Copy connection string

## Step 2: Setup Cloudinary (2 min)
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up (free)
3. Copy: Cloud Name, API Key, API Secret

## Step 3: Push to GitHub (3 min)
```bash
cd /Users/gireshkumar/forever
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/fazh-unisex.git
git push -u origin main
```

## Step 4: Deploy Backend - Render (3 min)
1. Go to [render.com](https://render.com) → Sign up
2. New → Web Service
3. Connect GitHub → Select repo
4. Settings:
   - **Name**: `fazh-backend`
   - **Root Directory**: `backend`
   - **Build**: `npm install`
   - **Start**: `npm start`
   - **Plan**: Free
5. Environment Variables:
   ```
   MONGODB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=any_random_string_here
   PORT=4000
   ```
6. Deploy → Wait for URL: `https://fazh-backend.onrender.com`

## Step 5: Deploy Frontend - Vercel (2 min)
1. Go to [vercel.com](https://vercel.com) → Sign up
2. Add New Project
3. Import GitHub repo
4. Settings:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Environment Variables:
   ```
   VITE_BACKEND_URL=https://fazh-backend.onrender.com
   ```
6. Deploy → Get URL: `https://your-project.vercel.app`

## ✅ Done!
Your site is live at: `https://your-project.vercel.app`

---

## 📝 Notes:
- **Backend URL**: First request after 15min inactivity takes ~30s (free tier)
- **Frontend**: Always fast, always online
- **Total Cost**: $0 (free subdomains) or $1-2/year (custom domain)

---

## 🔗 Useful Links:
- [Full Deployment Guide](./DEPLOYMENT-GUIDE.md)
- [Render Dashboard](https://dashboard.render.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [MongoDB Atlas](https://cloud.mongodb.com)




