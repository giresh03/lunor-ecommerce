# 🚀 Deploy Now - lunor.ko E-commerce

## ⚡ Quick Deployment Steps

### 📋 Prerequisites (5 minutes)

1. **MongoDB Atlas** (Free)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create M0 Free Cluster
   - Database Access → Create user (username/password)
   - Network Access → Add IP: `0.0.0.0/0` (allow all)
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

2. **Cloudinary** (Free)
   - Go to https://cloudinary.com
   - Sign up for free account
   - Copy: Cloud Name, API Key, API Secret from dashboard

3. **GitHub Repository** ✅
   - Your code is already at: `https://github.com/DivanshiJain2005/forever.git`

---

## 🎯 Step-by-Step Deployment

### Step 1: Deploy Backend to Render (5 minutes)

1. **Go to**: https://dashboard.render.com/
2. **Sign up/Login** with GitHub
3. **Click**: "New +" → "Web Service"
4. **Connect**: Your GitHub repository (`DivanshiJain2005/forever`)
5. **Configure**:
   ```
   Name: lunor-ko-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```
6. **Add Environment Variables** (in Render dashboard):
   ```
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_secret
   JWT_SECRET=[Generate: openssl rand -base64 32]
   ADMIN_EMAIL=your_admin@email.com
   ADMIN_PASSWORD=your_admin_password
   PORT=4000
   ```
7. **Click**: "Create Web Service"
8. **Wait**: ~5 minutes for deployment
9. **Copy your backend URL**: `https://lunor-ko-backend.onrender.com`

### Step 2: Deploy Frontend to Vercel (3 minutes)

1. **Go to**: https://vercel.com/
2. **Sign up/Login** with GitHub
3. **Click**: "Add New Project"
4. **Import**: Your GitHub repository (`DivanshiJain2005/forever`)
5. **Configure**:
   ```
   Root Directory: frontend
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
6. **Add Environment Variable**:
   ```
   Key: VITE_BACKEND_URL
   Value: https://lunor-ko-backend.onrender.com (your backend URL from Step 1)
   ```
7. **Click**: "Deploy"
8. **Wait**: ~2 minutes
9. **Copy your frontend URL**: `https://your-project.vercel.app` ✨

### Step 3: Deploy Admin Panel to Vercel (3 minutes)

1. **Go to**: https://vercel.com/
2. **Click**: "Add New Project"
3. **Import**: Same GitHub repository
4. **Configure**:
   ```
   Root Directory: admin
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
5. **Add Environment Variable**:
   ```
   Key: VITE_BACKEND_URL
   Value: https://lunor-ko-backend.onrender.com (same as frontend)
   ```
6. **Click**: "Deploy"
7. **Copy your admin URL**: `https://your-admin.vercel.app` ✨

### Step 4: Update Backend CORS (2 minutes)

1. **Go back to Render Dashboard**
2. **Select**: Your `lunor-ko-backend` service
3. **Go to**: Environment → Add Variables
4. **Add**:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ADMIN_URL=https://your-admin.vercel.app
   ```
5. **Save**: Render will auto-redeploy

---

## 🔗 Your Live Links

After deployment:

### Customer Website
🌐 **URL**: `https://your-project.vercel.app`
- Browse products
- Add to cart
- Place orders
- User registration

### Admin Panel  
🔧 **URL**: `https://your-admin.vercel.app`
- Manage products
- View orders
- **See all registered members**
- Update order status

### Backend API
⚙️ **URL**: `https://lunor-ko-backend.onrender.com`
- API endpoints
- Database connection
- Image uploads

---

## 📝 Environment Variables Summary

### Backend (Render)
```
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
JWT_SECRET=your_random_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
PORT=4000
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

## ⚠️ Important Notes

1. **Render Free Tier**: Spins down after 15min inactivity. First request after spin-down takes ~30 seconds.
2. **MongoDB Atlas**: Make sure IP whitelist includes `0.0.0.0/0` (allow all)
3. **Environment Variables**: Never commit `.env` files to GitHub
4. **Backend URL**: Use the Render URL, not localhost, in production

---

## ✅ Test Your Deployment

After deployment, test:

- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] Admin loads: `https://your-admin.vercel.app`
- [ ] User registration works
- [ ] Login works
- [ ] Products display
- [ ] Cart works
- [ ] Orders can be placed
- [ ] Admin can add products
- [ ] Admin can see orders
- [ ] Admin can see members

---

## 🎉 You're Live!

Once deployed, your lunor.ko e-commerce platform will be live and accessible worldwide!

**Need help?** Check the deployment logs in Render/Vercel dashboards.

