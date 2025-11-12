# How to Run the Website and Fix Telegram Integration

## The Problem
You're getting CORS errors because you're opening files directly (`file://`). You need to run a local web server.

## Solution: Use Local Web Server

### Option 1: Node.js Server (Recommended)

1. **Install Node.js** (if not installed):
   - Download from: https://nodejs.org
   - Install it

2. **Start the server**:
   - Double-click `start-server.bat`
   - Or open terminal in this folder and run: `node server.js`

3. **Open in browser**:
   - Go to: `http://localhost:8000/splash.html`
   - NOT `file:///...` - use `http://localhost:8000/`

4. **Test Telegram**:
   - Now Telegram integration will work!
   - Messages will be sent to your Telegram bot

### Option 2: Python Server (If you have Python)

1. Open terminal in this folder
2. Run: `python -m http.server 8000`
3. Open: `http://localhost:8000/splash.html`

### Option 3: Use Online Hosting

Upload all files to a web hosting service (like 000webhost, InfinityFree, etc.) and access via `https://yourdomain.com`

## Important Notes

- ✅ Always use `http://localhost:8000/` NOT `file:///`
- ✅ Keep the server running while testing
- ✅ Telegram will work once you're using HTTP protocol
- ✅ The server handles CORS automatically

## Testing Telegram

1. Start the server (Option 1 or 2)
2. Open `http://localhost:8000/test-telegram.html`
3. Click "Test Send Message"
4. Check your Telegram - you should receive the message!

## Files Created

- `server.js` - Node.js server that handles Telegram requests
- `start-server.bat` - Easy way to start the server
- `telegram-proxy.php` - For use on web hosting (if you upload online)

