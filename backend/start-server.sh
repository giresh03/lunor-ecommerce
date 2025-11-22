#!/bin/bash
cd "$(dirname "$0")"

# Ensure PORT is set correctly
unset PORT
export PORT=8000

echo "Starting backend server on port $PORT..."
echo "Press Ctrl+C to stop"

# Start server and keep it running
node server.js
