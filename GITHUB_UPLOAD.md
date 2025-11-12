# How to Upload to GitHub

## The Issue
Git needs authentication to push to GitHub. Here are two ways to fix it:

## Method 1: Using GitHub Desktop (Easiest)

1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in with your GitHub account
3. Click "File" → "Add Local Repository"
4. Select your project folder
5. Click "Publish repository"
6. Done! ✅

## Method 2: Using Personal Access Token (Command Line)

### Step 1: Create Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Commercial Bank Project"
4. Select scopes: Check "repo" (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Push Using Token

Open terminal in your project folder and run:

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/maliknoorealam/testing.git
```

Replace `YOUR_TOKEN` with the token you copied.

Then push:
```bash
git push -u origin main
```

## Method 3: Using SSH (Advanced)

1. Generate SSH key (if you don't have one)
2. Add SSH key to GitHub
3. Change remote URL:
```bash
git remote set-url origin git@github.com:maliknoorealam/testing.git
git push -u origin main
```

## Quick Check

After pushing, visit: https://github.com/maliknoorealam/testing

You should see all your files there!

## After Uploading to GitHub

You can then easily deploy to Vercel:
1. Go to https://vercel.com/new
2. Import from GitHub
3. Select your repository
4. Deploy!

This is the easiest way to get Telegram working! 🚀
