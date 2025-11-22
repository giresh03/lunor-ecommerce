# 🚀 Deployment Guide - lunor.ko E-commerce Platform

## Free Deployment Strategy (1 Year)

### Recommended Setup:
- **Frontend**: Vercel (Free Forever)
- **Backend**: Render (Free Tier)
- **Database**: MongoDB Atlas (Free Forever)
- **Domain**: Free subdomains OR ~$1-2/year custom domain

---

## 📋 Pre-Deployment Checklist

### 1. MongoDB Atlas Setup (FREE)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account → Create free cluster (M0)
3. Create database user (username/password)
4. Network Access → Add IP Address → `0.0.0.0/0` (allow all)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

### 2. Cloudinary Setup (FREE)
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Get: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### 3. Environment Variables Needed

**Backend (.env):**
```
PORT=4000
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_random_secret_key_here
```

**Frontend (.env):**
```
VITE_BACKEND_URL=https://your-backend.onrender.com
```

---

## 🎯 Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED

### Step 1: Deploy Backend to Render

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository
   - Configure:
     - **Name**: `lunor-ko-backend` (or your choice)
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free
   
3. **Add Environment Variables in Render**
   - Go to your service → Environment
   - Add all backend environment variables
   - Save changes (auto-deploys)

4. **Get Backend URL**
   - Your backend will be: `https://lunor-ko-backend.onrender.com` (or your chosen name)
   - ⚠️ Free tier spins down after 15min inactivity (first request takes ~30s)

### Step 2: Deploy Frontend to Vercel

1. **Update Frontend Environment**
   - Create `frontend/.env`:
   ```
   VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   
3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_BACKEND_URL=https://fazh-backend.onrender.com`
   - Redeploy

4. **Get Frontend URL**
   - Your site will be: `https://your-project.vercel.app`
   - ✅ Always online, fast CDN

---

## 🎯 Option 2: All on Render (Simpler)

### Deploy Both Frontend & Backend on Render

1. **Backend** (same as above)

2. **Frontend on Render**
   - New → Static Site
   - Connect GitHub repo
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Add environment variable: `VITE_BACKEND_URL`

---

## 🌐 Custom Domain (Optional - $1-2/year)

### Free Domain Options:
1. **Freenom** (.tk, .ml, .ga, .cf) - Free but unreliable
2. **Namecheap** - ~$1-2/year for .xyz domains
3. **Cloudflare** - Domain registration at cost price

### Add Custom Domain:
1. **Vercel**: Project Settings → Domains → Add domain
2. **Render**: Service Settings → Custom Domains → Add domain
3. Update DNS records as instructed

---

## 📝 Important Notes

### Render Free Tier Limitations:
- ⚠️ Spins down after 15min inactivity
- ⚠️ First request after spin-down takes ~30 seconds
- ✅ Good for development/demo
- 💡 For production, consider Render Starter ($7/month) or Railway

### Vercel Free Tier:
- ✅ Always online
- ✅ Unlimited bandwidth
- ✅ Free SSL
- ✅ Perfect for frontend

### MongoDB Atlas Free Tier:
- ✅ 512MB storage
- ✅ Shared cluster
- ✅ Free forever
- ✅ Perfect for small-medium projects

---

## 🔧 Troubleshooting

### Backend not connecting?
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
- Verify environment variables in Render
- Check Render logs for errors

### Frontend can't reach backend?
- Verify `VITE_BACKEND_URL` is correct
- Check CORS settings in backend
- Ensure backend is deployed and running

### Images not uploading?
- Verify Cloudinary credentials
- Check file size limits
- Review Cloudinary dashboard

---

## 💰 Cost Summary (First Year)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (Frontend) | FREE | Forever free |
| Render (Backend) | FREE | Free tier available |
| MongoDB Atlas | FREE | Free tier forever |
| Cloudinary | FREE | Free tier available |
| Domain (Optional) | $0-2 | Free subdomain or cheap domain |
| **TOTAL** | **$0-2** | ✅ |

---

## 🚀 Quick Deploy Commands

```bash
# 1. Initialize Git (if not done)
cd /Users/gireshkumar/forever
git init
git add .
git commit -m "Ready for deployment"

# 2. Push to GitHub
git remote add origin https://github.com/yourusername/lunor-ko-ecommerce.git
git push -u origin main

# 3. Then follow deployment steps above
```

---

## 📞 Support

If you face any issues during deployment, check:
1. Render logs: Dashboard → Your Service → Logs
2. Vercel logs: Dashboard → Your Project → Deployments → View Logs
3. MongoDB Atlas: Check cluster status and connection string

---

**Good luck with your deployment! 🎉**




