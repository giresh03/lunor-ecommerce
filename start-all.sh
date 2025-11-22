#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting all servers...${NC}"

# Start Backend
echo -e "${YELLOW}Starting Backend on port 8000...${NC}"
cd backend
unset PORT
node server.js &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}Backend started with PID: $BACKEND_PID${NC}"

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:8000 > /dev/null; then
    echo -e "${GREEN}✅ Backend is running on http://localhost:8000${NC}"
else
    echo -e "${YELLOW}⚠️  Backend may still be starting...${NC}"
fi

echo ""
echo -e "${GREEN}All servers are starting!${NC}"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Admin: http://localhost:3001"
echo ""
echo "To stop all servers, press Ctrl+C or run: pkill -f 'node.*server.js'"

# Keep script running
wait

