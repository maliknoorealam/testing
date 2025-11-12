// Telegram API Handler - JavaScript/Node.js version
// This works with Vercel serverless functions or Node.js server

const https = require('https');

// Telegram Bot Configuration
const TELEGRAM_CONFIG = {
    BOT_TOKEN: '8542135345:AAGbOxP43aqCelD3U0RJQOgb5DxrqdvAi8g',
    CHAT_ID: '6500739596'
};

// Function to send message to Telegram
function sendToTelegramAPI(message) {
    return new Promise((resolve, reject) => {
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;
        
        const postData = JSON.stringify({
            chat_id: TELEGRAM_CONFIG.CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 10000
        };

        const req = https.request(telegramUrl, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.ok) {
                        resolve({ success: true, data: response });
                    } else {
                        reject({ success: false, error: response.description || 'Unknown error' });
                    }
                } catch (error) {
                    reject({ success: false, error: 'Parse error: ' + error.message });
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
    module.exports.sendToTelegramAPI = sendToTelegramAPI;
    
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

            const result = await sendToTelegramAPI(message);
            res.status(200).json({ ok: true, result: result.data });
        } catch (error) {
            console.error('Telegram API Error:', error);
            res.status(500).json({ 
                ok: false, 
                error: error.error || error.message || 'Unknown error' 
            });
        }
    };
}