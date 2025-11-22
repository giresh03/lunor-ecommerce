# 🚀 Deployment Checklist - lunor.ko E-commerce

Use this checklist to ensure everything is ready for deployment.

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [ ] All code changes committed to Git
- [ ] All "forever" references changed to "lunor.ko"
- [ ] Logo updated (animated text version)
- [ ] Brand name updated throughout the application
- [ ] No console.log errors in production build
- [ ] All linting errors fixed

### 2. Environment Variables Setup

#### Backend (.env file in `/backend/`):
- [ ] `MONGODB_URL` - MongoDB Atlas connection string
- [ ] `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` - Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` - Cloudinary API secret
- [ ] `JWT_SECRET` - Random secure string (generate with: `openssl rand -base64 32`)
- [ ] `PORT` - Server port (Render sets this automatically)
- [ ] `FRONTEND_URL` - Your frontend deployed URL (optional, for CORS)
- [ ] `ADMIN_URL` - Your admin deployed URL (optional, for CORS)

#### Frontend (.env file in `/frontend/`):
- [ ] `VITE_BACKEND_URL` - Your deployed backend URL (e.g., `https://lunor-ko-backend.onrender.com`)

#### Admin (.env file in `/admin/`):
- [ ] `VITE_BACKEND_URL` - Your deployed backend URL (e.g., `https://lunor-ko-backend.onrender.com`)

### 3. MongoDB Atlas Setup
- [ ] MongoDB Atlas account created
- [ ] Free cluster (M0) created
- [ ] Database user created (username & password)
- [ ] Network Access configured - IP whitelist set to `0.0.0.0/0` (allow all)
- [ ] Connection string obtained
- [ ] Test connection from local machine

### 4. Cloudinary Setup
- [ ] Cloudinary account created
- [ ] Cloud name noted
- [ ] API Key obtained
- [ ] API Secret obtained
- [ ] Test image upload from local

### 5. GitHub Repository
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] `.gitignore` properly configured (excludes `.env` files)
- [ ] README.md updated
- [ ] All sensitive data excluded

### 6. Build Testing
- [ ] Frontend builds successfully: `cd frontend && npm run build`
- [ ] Admin builds successfully: `cd admin && npm run build`
- [ ] Backend starts successfully: `cd backend && npm start`
- [ ] No build errors or warnings

### 7. Production Readiness
- [ ] CORS configured for production domains
- [ ] Error handling in place
- [ ] Environment variables validated
- [ ] Database indexes created (if needed)
- [ ] Security measures in place (JWT, password hashing)

---

## 📋 Deployment Steps

### Step 1: Deploy Backend to Render

1. **Create Render Account**
   - [ ] Sign up at https://render.com
   - [ ] Connect GitHub account

2. **Create Web Service**
   - [ ] Click "New +" → "Web Service"
   - [ ] Select your GitHub repository
   - [ ] Configure service:
     - Name: `lunor-ko-backend`
     - Root Directory: `backend`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Plan: `Free`

3. **Add Environment Variables**
   - [ ] Add all backend environment variables from checklist
   - [ ] Save and deploy

4. **Wait for Deployment**
   - [ ] Check deployment logs
   - [ ] Verify health check passes
   - [ ] Copy backend URL (e.g., `https://lunor-ko-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - [ ] Sign up at https://vercel.com
   - [ ] Connect GitHub account

2. **Create Project**
   - [ ] Click "Add New Project"
   - [ ] Import your GitHub repository
   - [ ] Configure:
     - Root Directory: `frontend`
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Add Environment Variables**
   - [ ] Go to Project Settings → Environment Variables
   - [ ] Add: `VITE_BACKEND_URL` with your Render backend URL
   - [ ] Save and redeploy

4. **Verify Deployment**
   - [ ] Check deployment status
   - [ ] Test frontend URL
   - [ ] Verify API connection

### Step 3: Deploy Admin Panel (Optional - can use Vercel or Render)

1. **Create New Vercel Project** (or use Render Static Site)
   - [ ] Import same GitHub repository
   - [ ] Configure:
     - Root Directory: `admin`
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`

2. **Add Environment Variables**
   - [ ] Add: `VITE_BACKEND_URL` with your Render backend URL

3. **Verify Deployment**
   - [ ] Test admin panel URL
   - [ ] Test login functionality

---

## 🔍 Post-Deployment Testing

### Frontend Testing
- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] Product listing displays
- [ ] Product details page works
- [ ] Cart functionality works
- [ ] User registration works
- [ ] User login works
- [ ] Order placement works
- [ ] Order history displays

### Admin Panel Testing
- [ ] Admin login works
- [ ] Add product works
- [ ] Product list displays
- [ ] Delete product works
- [ ] Orders list displays
- [ ] Update order status works

### Backend Testing
- [ ] API endpoints respond
- [ ] Database connections work
- [ ] Image uploads work (Cloudinary)
- [ ] Authentication works
- [ ] Error handling works

---

## 🐛 Troubleshooting

### Backend Issues
- **503 Error**: Check MongoDB Atlas IP whitelist
- **Image upload fails**: Verify Cloudinary credentials
- **Slow response**: Render free tier spins down after 15min - first request after spin-down takes ~30s

### Frontend Issues
- **API errors**: Verify `VITE_BACKEND_URL` is correct
- **CORS errors**: Check backend CORS configuration
- **Build fails**: Check for missing dependencies

### Database Issues
- **Connection fails**: Verify MongoDB connection string
- **IP not whitelisted**: Add `0.0.0.0/0` to Network Access

---

## 📝 Quick Reference

### Environment Variables Template

**Backend:**
```env
PORT=4000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
JWT_SECRET=your_random_secret
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
```

**Frontend:**
```env
VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
```

**Admin:**
```env
VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
```

---

## 🎉 Deployment Complete!

Once all checks pass:
- [ ] Frontend is live and accessible
- [ ] Admin panel is live and accessible
- [ ] Backend API is responding
- [ ] All functionality tested and working
- [ ] Custom domain configured (optional)

**Your lunor.ko e-commerce platform is now live! 🚀**

