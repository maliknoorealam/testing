// Discord Webhook Handler - JavaScript/Node.js version
// This works with Vercel serverless functions or Node.js server

const https = require('https');
const http = require('http');

// Discord Webhook Configuration
// Get your webhook URL from Discord: Server Settings → Integrations → Webhooks → New Webhook
// You can set it via environment variable or update this file directly
const DISCORD_CONFIG = {
    // Discord webhook URL
    WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1438255331317907649/2m8sbWY61WdtImRDRn32XfeadUY4ekCCH1frskl6EBftyXrv3vq25etTgjQALRCvMtXp'
};

// Function to send message to Discord
function sendToDiscordAPI(message) {
    return new Promise((resolve, reject) => {
        if (!DISCORD_CONFIG.WEBHOOK_URL || DISCORD_CONFIG.WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
            reject({ success: false, error: 'Discord webhook URL not configured' });
            return;
        }

        // Parse the webhook URL
        const url = new URL(DISCORD_CONFIG.WEBHOOK_URL);
        const isHttps = url.protocol === 'https:';
        const client = isHttps ? https : http;

        // Discord webhook expects form data
        const formData = new URLSearchParams();
        formData.append('content', message);

        const postData = formData.toString();

        const options = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname + url.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 10000
        };

        const req = client.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log('📡 Discord API Response Status:', res.statusCode);
                console.log('📡 Discord API Response Data:', data);
                
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log('✅ Discord webhook accepted the message!');
                    resolve({ success: true, statusCode: res.statusCode, response: data });
                } else {
                    console.error('❌ Discord API returned error status:', res.statusCode);
                    console.error('❌ Response body:', data);
                    reject({ 
                        success: false, 
                        error: `Discord API error: ${res.statusCode}`,
                        response: data 
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject({ success: false, error: error.message });
        });

        req.on('timeout', () => {
            req.destroy();
            reject({ success: false, error: 'Request timeout' });
        });

        req.write(postData);
        req.end();
    });
}

// Export for Node.js server - export the function directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports.sendToDiscordAPI = sendToDiscordAPI;
    
    // Also export as default for Vercel serverless function
    module.exports.default = async (req, res) => {
        // Enable CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

        if (req.method !== 'POST') {
            res.status(405).json({ ok: false, error: 'Method not allowed' });
            return;
        }

        try {
            const { message } = req.body;

            if (!message) {
                res.status(400).json({ ok: false, error: 'No message provided' });
                return;
            }

            const result = await sendToDiscordAPI(message);
            res.status(200).json({ ok: true, result: result });
        } catch (error) {
            console.error('Discord API Error:', error);
            res.status(500).json({ 
                ok: false, 
                error: error.error || error.message || 'Unknown error' 
            });
        }
    };
}
