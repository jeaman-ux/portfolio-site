#!/bin/bash
# Windows 98 Simulator - Start Server Script

echo "Starting Jordan Design Portfolio 2026..."
echo "=================================="
echo ""
echo "Server will run at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8080
