#!/bin/bash

echo "🚀 Starting Deployment Process..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Deploy Frontend
echo -e "${BLUE}📦 Step 1: Deploying Frontend to Vercel...${NC}"
cd frontend

# Check if .env exists, if not create with placeholder
if [ ! -f .env ]; then
    echo "Creating .env file with placeholder backend URL..."
    echo "VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com" > .env
fi

echo "Deploying frontend..."
vercel --yes --prod

FRONTEND_URL=$(vercel ls | grep "lunor-ko-frontend\|forever-frontend" | head -1 | awk '{print $2}' || echo "")

cd ..

echo -e "${GREEN}✅ Frontend deployment initiated!${NC}"
echo ""

# Step 2: Deploy Admin
echo -e "${BLUE}📦 Step 2: Deploying Admin Panel to Vercel...${NC}"
cd admin

# Check if .env exists, if not create with placeholder
if [ ! -f .env ]; then
    echo "Creating .env file with placeholder backend URL..."
    echo "VITE_BACKEND_URL=https://lunor-ko-backend.onrender.com" > .env
fi

echo "Deploying admin panel..."
vercel --yes --prod

ADMIN_URL=$(vercel ls | grep "lunor-ko-admin\|forever-admin" | head -1 | awk '{print $2}' || echo "")

cd ..

echo -e "${GREEN}✅ Admin deployment initiated!${NC}"
echo ""

echo -e "${YELLOW}⏳ Waiting for deployments to complete...${NC}"
sleep 5

# Get actual URLs
echo -e "${BLUE}🔗 Getting deployment URLs...${NC}"
vercel ls

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo "1. Note your frontend and admin URLs above"
echo "2. Deploy backend to Render: https://dashboard.render.com/"
echo "3. Update backend environment variables with frontend/admin URLs"
echo "4. Update frontend/admin VITE_BACKEND_URL with your Render backend URL"

