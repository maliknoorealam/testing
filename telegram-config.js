// Telegram Bot Configuration
// IMPORTANT: Replace these with your own Telegram Bot Token and Chat ID

const TELEGRAM_CONFIG = {
    // Bot token from @BotFather
    BOT_TOKEN: '8542135345:AAGbOxP43aqCelD3U0RJQOgb5DxrqdvAi8g',
    
    // Chat ID
    CHAT_ID: '6500739596'
};

// Telegram Bot API endpoint
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;

// Use local Node.js server proxy (when running via start-server.bat)
// Or use PHP proxy if available on web server
const TELEGRAM_PROXY_URL = '/telegram-proxy'; // Local Node.js server endpoint

// Function to send message to Telegram
async function sendToTelegram(message) {
    // Try using proxy first (if available on server)
    try {
        const proxyResponse = await fetch(TELEGRAM_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        if (proxyResponse.ok) {
            const proxyData = await proxyResponse.json();
            if (proxyData.ok) {
                console.log('✅ Message sent via proxy!', proxyData);
                return true;
            }
        }
    } catch (proxyError) {
        console.log('Proxy not available, trying direct method...', proxyError);
    }
    
    // Fallback to direct method (will likely fail due to CORS)
    try {
        // Method 1: Standard POST request
        const response = await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        if (!response.ok) {
            throw new Error('Response not OK');
        }
        
        const data = await response.json();
        
        if (data.ok) {
            console.log('✅ Message sent to Telegram successfully!', data);
            return true;
        } else {
            console.error('❌ Telegram API error:', data);
            throw new Error(data.description || 'Unknown error');
        }
    } catch (error) {
        console.error('❌ Error sending to Telegram:', error);
        console.error('Error details:', {
            message: error.message,
            config: {
                botToken: TELEGRAM_CONFIG.BOT_TOKEN.substring(0, 10) + '...',
                chatId: TELEGRAM_CONFIG.CHAT_ID
            }
        });
        
        // Don't show alert - just log the error
        console.log('💡 TIP: Upload telegram-proxy.php to your web server to fix CORS issues');
        return false;
    }
}
