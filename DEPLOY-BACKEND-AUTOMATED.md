# 🚀 Automated Backend Deployment - Quick Setup

## ✅ Frontend & Admin Already Deployed!

**Frontend URL**: https://frontend-m3z3odwf0-girishs-projects-909ea714.vercel.app  
**Admin URL**: https://admin-dz51tnbzh-girishs-projects-909ea714.vercel.app

---

## 📦 Backend Deployment - Render

Since Render requires web interface, here's the **SIMPLEST** way:

### Option 1: Use Render Dashboard (5 minutes) ⭐ RECOMMENDED

1. **Go to**: https://dashboard.render.com/
2. **Sign up/Login** with GitHub
3. **Click**: "New +" → "Web Service"
4. **Connect GitHub**: Select your repository `giresh03/lunor-ecommerce`
5. **Configure**:
   ```
   Name: lunor-ko-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```
6. **Add Environment Variables** (Copy-paste these):
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET_KEY=your_secret
   JWT_SECRET=generate_random_string_here
   ADMIN_EMAIL=admin@lunor.ko
   ADMIN_PASSWORD=admin123
   PORT=4000
   FRONTEND_URL=https://frontend-m3z3odwf0-girishs-projects-909ea714.vercel.app
   ADMIN_URL=https://admin-dz51tnbzh-girishs-projects-909ea714.vercel.app
   ```
7. **Click**: "Create Web Service"
8. **Wait**: 5-10 minutes for deployment
9. **Copy your backend URL**: `https://lunor-ko-backend.onrender.com`

---

## 🔄 Update Frontend & Admin with Backend URL

After backend is deployed, update environment variables:

### Update Frontend on Vercel:
1. Go to: https://vercel.com/girishs-projects-909ea714/frontend/settings/environment-variables
2. Add/Update: `VITE_BACKEND_URL` = `https://lunor-ko-backend.onrender.com`
3. Redeploy

### Update Admin on Vercel:
1. Go to: https://vercel.com/girishs-projects-909ea714/admin/settings/environment-variables
2. Add/Update: `VITE_BACKEND_URL` = `https://lunor-ko-backend.onrender.com`
3. Redeploy

---

## 📝 Quick Setup Checklist

### Before Deployment:
- [ ] MongoDB Atlas account (free): https://www.mongodb.com/cloud/atlas/register
- [ ] Cloudinary account (free): https://cloudinary.com/users/register/free
- [ ] Render account (free): https://dashboard.render.com/

### MongoDB Setup (2 minutes):
1. Create cluster (M0 Free)
2. Database Access → Create user
3. Network Access → Add IP: `0.0.0.0/0`
4. Get connection string

### Cloudinary Setup (1 minute):
1. Sign up free
2. Copy: Cloud Name, API Key, API Secret

---

## ⚡ One-Click Generate JWT_SECRET

Run this in terminal to generate a secure JWT_SECRET:

```bash
openssl rand -base64 32
```

Copy the output and use it as `JWT_SECRET` value.

---

## 🎯 Your Live Links (After Backend Deployment)

- 🌐 **Customer Website**: https://frontend-m3z3odwf0-girishs-projects-909ea714.vercel.app
- 🔧 **Admin Panel**: https://admin-dz51tnbzh-girishs-projects-909ea714.vercel.app
- ⚙️ **Backend API**: https://lunor-ko-backend.onrender.com (after deployment)

---

**Note**: Frontend and Admin are already live! Just need backend now. 🚀

