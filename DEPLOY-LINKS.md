# 🔗 Deployment Links - lunor.ko

## 📦 Your Repository
**GitHub**: https://github.com/DivanshiJain2005/forever.git

---

## 🚀 Quick Deploy Links

### Step 1: Backend (Render) - ~5 minutes
**🔗 Link**: https://dashboard.render.com/

1. Click "New +" → "Web Service"
2. Connect GitHub repo
3. Configure:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Add environment variables (see below)
5. Deploy!

**Backend URL will be**: `https://lunor-ko-backend.onrender.com`

### Step 2: Frontend (Vercel) - ~3 minutes
**🔗 Link**: https://vercel.com/new

1. Import GitHub repository
2. Root Directory: `frontend`
3. Add env: `VITE_BACKEND_URL` = your Render backend URL
4. Deploy!

**Frontend URL will be**: `https://your-project.vercel.app`

### Step 3: Admin Panel (Vercel) - ~3 minutes
**🔗 Link**: https://vercel.com/new

1. Import same GitHub repository
2. Root Directory: `admin`
3. Add env: `VITE_BACKEND_URL` = your Render backend URL
4. Deploy!

**Admin URL will be**: `https://your-admin.vercel.app`

---

## 📋 Required Services

### 1. MongoDB Atlas (Free)
**🔗 Link**: https://www.mongodb.com/cloud/atlas/register

- Create free account
- Create M0 cluster (free)
- Network Access → Add IP: `0.0.0.0/0`
- Get connection string

### 2. Cloudinary (Free)
**🔗 Link**: https://cloudinary.com/users/register/free

- Sign up free
- Get Cloud Name, API Key, API Secret

### 3. Render (Backend Hosting - Free)
**🔗 Link**: https://dashboard.render.com/

- Sign up with GitHub
- Free tier available

### 4. Vercel (Frontend Hosting - Free)
**🔗 Link**: https://vercel.com/signup

- Sign up with GitHub
- Free tier available

---

## 🔑 Environment Variables Needed

### Backend (Render)
```
MONGODB_URL=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=generate_with_openssl_rand_-base64_32
ADMIN_EMAIL=your_email@example.com
ADMIN_PASSWORD=your_password
PORT=4000
FRONTEND_URL=https://your-frontend.vercel.app (add after frontend deployed)
ADMIN_URL=https://your-admin.vercel.app (add after admin deployed)
```

### Frontend (Vercel)
```
VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
```

### Admin (Vercel)
```
VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
```

---

## ⚡ One-Command Deploy Script

After setting up accounts, you can use:

```bash
# 1. Push to GitHub (authenticate first)
git push origin main

# Then follow the web interfaces above!
```

---

## 📖 Full Instructions

See **DEPLOY-NOW.md** for detailed step-by-step guide!

---

## ✅ After Deployment

You'll have:
- 🌐 Customer Website: `https://your-frontend.vercel.app`
- 🔧 Admin Panel: `https://your-admin.vercel.app`
- ⚙️ Backend API: `https://lunor-ko-backend.onrender.com`

🎉 **You're live!**

