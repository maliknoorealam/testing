@echo off
echo Starting local web server with Node.js...
echo.
echo Open your browser and go to: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
npx http-server -p 8000 -c-1
pause

