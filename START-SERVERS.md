# How to Start All Servers

## Quick Start

### Backend (Required First)
```bash
cd backend
./start-server.sh
```

Or manually:
```bash
cd backend
unset PORT
PORT=8000 node server.js
```

### Frontend
```bash
cd frontend
npm run dev
```

### Admin Panel
```bash
cd admin
npm run dev
```

## Server Ports
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3001

## Admin Login Credentials
- **Email**: admin@example.com
- **Password**: admin123

## Troubleshooting

### If backend keeps stopping:
1. Check MongoDB connection in logs
2. Server will continue running even if MongoDB fails
3. Make sure PORT environment variable is not set: `unset PORT`

### If you see network errors:
1. Make sure backend is running: `curl http://localhost:8000`
2. Hard refresh admin panel: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
3. Check browser console for specific errors

## Important Notes
- Always start backend first
- Backend must be running for admin/frontend to work
- If MongoDB connection fails, server will still run (but DB operations will fail)

