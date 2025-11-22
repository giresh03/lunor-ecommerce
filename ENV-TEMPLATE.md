# Environment Variables Template

Copy these templates to create your `.env` files. **Never commit `.env` files to Git!**

## Backend Environment Variables

Create `backend/.env`:

```env
# Server Port (Render sets this automatically)
PORT=4000

# MongoDB Atlas Connection String
# Format: mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
MONGODB_URL=your_mongodb_connection_string_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_random_jwt_secret_key_here

# Optional: Frontend URLs for CORS
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
```

## Frontend Environment Variables

Create `frontend/.env`:

```env
# Backend API URL
VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
```

**For local development:**
```env
VITE_BACKEND_URL=http://localhost:4000
```

## Admin Environment Variables

Create `admin/.env`:

```env
# Backend API URL
VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com
```

**For local development:**
```env
VITE_BACKEND_URL=http://localhost:4000
```

## Where to Get Values

### MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (M0 - Free)
4. Create database user
5. Network Access → Add IP: `0.0.0.0/0`
6. Get connection string from "Connect" button

### Cloudinary
1. Go to https://cloudinary.com
2. Sign up for free account
3. Dashboard shows: Cloud Name, API Key, API Secret

### JWT Secret
Generate a random secret:
```bash
openssl rand -base64 32
```

Or use any long random string.

## Important Notes

- ⚠️ **Never commit `.env` files to Git**
- ✅ `.env` files are already in `.gitignore`
- ✅ Use `.env.example` as a template (without real values)
- ✅ Update `.env` files before deployment
- ✅ Add environment variables in Render/Vercel dashboards for production

