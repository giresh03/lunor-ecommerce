# 🚀 Quick Deployment Guide - lunor.ko

Follow these steps to deploy your e-commerce platform and get live links.

## 📋 Prerequisites Checklist

Before deploying, make sure you have:

- [ ] **MongoDB Atlas Account** - Database (Free)
- [ ] **Cloudinary Account** - Image storage (Free)
- [ ] **GitHub Account** - Code repository
- [ ] **Render Account** - Backend hosting (Free tier)
- [ ] **Vercel Account** - Frontend hosting (Free)

---

## ⚡ Quick Deploy Steps (15 minutes)

### Step 1: Push Code to GitHub

```bash
cd /Users/gireshkumar/forever

# Initialize git if not done
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for deployment - lunor.ko e-commerce"

# Create repository on GitHub (go to github.com and create new repo)
# Then add remote and push:

git remote add origin https://github.com/YOUR_USERNAME/lunor-ko-ecommerce.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. Click **"New +"** → **"Web Service"**
3. **Connect GitHub** → Select your repository
4. **Configure:**
   - **Name**: `lunor-ko-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. **Add Environment Variables** (in Render Dashboard):
   ```
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_secret
   JWT_SECRET=your_random_secret_here
   ADMIN_EMAIL=your_admin_email@example.com
   ADMIN_PASSWORD=your_admin_password
   PORT=4000
   ```
6. **Click "Create Web Service"**
7. **Wait for deployment** (~5 minutes)
8. **Copy your backend URL**: `https://lunor-ko-backend.onrender.com` (or your chosen name)

### Step 3: Deploy Frontend to Vercel

1. **Go to [Vercel](https://vercel.com/)**
2. Click **"Add New Project"**
3. **Import your GitHub repository**
4. **Configure:**
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Add Environment Variable**:
   - Key: `VITE_BACKEND_URL`
   - Value: Your Render backend URL (e.g., `https://lunor-ko-backend.onrender.com`)
6. **Click "Deploy"**
7. **Wait for deployment** (~2 minutes)
8. **Your frontend will be live!** Copy the URL (e.g., `https://lunor-ko-xyz.vercel.app`)

### Step 4: Deploy Admin Panel to Vercel

1. **Go to Vercel** → **"Add New Project"**
2. **Import the same GitHub repository**
3. **Configure:**
   - **Root Directory**: `admin`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Add Environment Variable**:
   - Key: `VITE_BACKEND_URL`
   - Value: Your Render backend URL (same as frontend)
5. **Click "Deploy"**
6. **Your admin panel will be live!**

---

## 🔗 Your Live Links

After deployment, you'll have:

### Customer Website
- **URL**: `https://your-project.vercel.app`
- Users can browse products, add to cart, place orders

### Admin Panel
- **URL**: `https://your-admin.vercel.app`
- You can manage products, orders, and view members

### Backend API
- **URL**: `https://lunor-ko-backend.onrender.com`
- All API endpoints available here

---

## 📝 Post-Deployment Checklist

### Update Environment Variables

After backend is deployed, update frontend/admin URLs in backend:

1. **Go to Render Dashboard** → Your Backend Service → Environment
2. **Add:**
   - `FRONTEND_URL=https://your-frontend.vercel.app`
   - `ADMIN_URL=https://your-admin.vercel.app`
3. **Save and redeploy**

### Test Your Deployment

- [ ] Frontend loads correctly
- [ ] Can register new users
- [ ] Can login
- [ ] Products display
- [ ] Can add to cart
- [ ] Can place orders
- [ ] Admin panel works
- [ ] Can add products in admin
- [ ] Can see orders in admin
- [ ] Can see members in admin

---

## ⚠️ Important Notes

### Render Free Tier
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes ~30 seconds
- ✅ Good for development/demo
- 💡 For production, consider upgrading to paid tier

### Environment Variables

**Backend (Render):**
```
MONGODB_URL=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=... (generate with: openssl rand -base64 32)
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
```

**Frontend (Vercel):**
```
VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
```

**Admin (Vercel):**
```
VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
```

---

## 🆘 Troubleshooting

### Backend Not Working?
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
- Verify all environment variables in Render
- Check Render logs for errors

### Frontend Can't Connect?
- Verify `VITE_BACKEND_URL` is correct
- Check CORS settings in backend
- Ensure backend is deployed and running

### Admin Panel Issues?
- Verify backend URL is correct
- Check if admin login credentials are set
- Verify environment variables in Vercel

---

## ✅ You're Ready to Deploy!

Follow the steps above and you'll have your lunor.ko e-commerce platform live in ~15 minutes! 🎉

**Need Help?** Check `DEPLOYMENT-GUIDE.md` for detailed instructions.

