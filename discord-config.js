// Discord Webhook Configuration
// Get your webhook URL from Discord: Server Settings → Integrations → Webhooks → New Webhook

const DISCORD_CONFIG = {
    // Discord webhook URL
    WEBHOOK_URL: 'https://discord.com/api/webhooks/1438255331317907649/2m8sbWY61WdtImRDRn32XfeadUY4ekCCH1frskl6EBftyXrv3vq25etTgjQALRCvMtXp'
};

// Discord proxy endpoint (uses Vercel serverless function)
const DISCORD_PROXY_URL = '/api/discord';

// Function to send message to Discord (works like sendToTelegram)
async function sendToDiscord(message) {
    // Try using proxy first (via local server)
    try {
        const proxyResponse = await fetch(DISCORD_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        if (proxyResponse.ok) {
            const proxyData = await proxyResponse.json();
            if (proxyData.ok) {
                console.log('✅ Message sent to Discord via proxy!', proxyData);
                return true;
            }
        }
    } catch (proxyError) {
        console.log('Proxy not available, trying direct method...', proxyError);
    }
    
    // Fallback: Try direct webhook (might work if not blocked)
    if (!DISCORD_CONFIG.WEBHOOK_URL || DISCORD_CONFIG.WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        console.error('❌ Discord webhook URL not configured!');
        return false;
    }

    try {
        // Discord webhook expects form data, not JSON
        const formData = new URLSearchParams();
        formData.append('content', message);

        const response = await fetch(DISCORD_CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });

        if (response.ok) {
            console.log('✅ Message sent to Discord successfully!');
            return true;
        } else {
            const errorText = await response.text();
            console.error('❌ Discord API error:', response.status, errorText);
            return false;
        }
    } catch (error) {
        console.error('❌ Error sending to Discord:', error.message);
        return false;
    }
}

// Alias for compatibility (so we can use sendToTelegram name)
const sendToTelegram = sendToDiscord;
