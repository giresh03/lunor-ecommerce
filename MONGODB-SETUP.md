# How to Fix MongoDB Connection - Step by Step Guide

## The Problem
You're getting a **503 Service Unavailable** error because your IP address is not whitelisted in MongoDB Atlas.

## Solution: Whitelist Your IP Address

### Step 1: Go to MongoDB Atlas
1. Open your browser
2. Go to: **https://cloud.mongodb.com/**
3. Log in to your account

### Step 2: Navigate to Network Access
1. In the left sidebar, click **"Network Access"**
2. You'll see the "IP Access List" page

### Step 3: Add IP Address
1. Click the green **"Add IP Address"** button
2. A dialog box will appear

### Step 4: Choose Whitelist Option

**Option A: Allow Access from Anywhere (Recommended for Development)**
- Click **"Allow Access from Anywhere"** button
- This will add `0.0.0.0/0` to your whitelist
- ⚠️ **Note:** This allows access from any IP address (less secure, but convenient for development)
- Click **"Confirm"**

**Option B: Add Current IP Address (More Secure)**
- Click **"Add Current IP Address"** button
- This automatically detects and adds your current IP
- ✅ **More secure** but you'll need to update if your IP changes
- Click **"Confirm"**

### Step 5: Wait for Changes
- MongoDB Atlas takes **1-2 minutes** to apply the changes
- You'll see a status indicator showing the change is being applied

### Step 6: Verify
1. Go back to your admin panel
2. Try adding a product again
3. It should work now! ✅

## After Whitelisting

1. **Restart your backend server:**
   ```bash
   cd backend
   ./start-server.sh
   ```

2. **Check if MongoDB connects:**
   - Look for "Connected to MongoDB" in the server logs
   - If you see this, the connection is successful!

3. **Try adding a product:**
   - Go to http://localhost:3001/add
   - Fill in product details
   - Select images
   - Click "ADD"
   - It should work now! 🎉

## Troubleshooting

### If you still see 503 error:
1. Make sure you clicked "Confirm" after adding IP
2. Wait 2-3 minutes (sometimes takes longer)
3. Restart the backend server
4. Check backend logs for MongoDB connection status

### If MongoDB connection still fails:
1. Double-check your IP whitelist in MongoDB Atlas
2. Verify your MongoDB URI in `.env` file is correct
3. Check your internet connection
4. Make sure MongoDB Atlas cluster is running (not paused)

## Need Help?
- MongoDB Atlas Documentation: https://www.mongodb.com/docs/atlas/security-whitelist/
- Check MongoDB Atlas status page for any outages

