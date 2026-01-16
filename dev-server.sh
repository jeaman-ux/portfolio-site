#!/bin/bash

# Development server with auto-reload
# Run this script instead of the Python server

echo "Starting development server with auto-reload..."
echo "Server will run on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npx browser-sync start --server --files "**/*.html, **/*.css, **/*.js, **/*.png, **/*.jpg" --port 3000 --no-notify --no-open
