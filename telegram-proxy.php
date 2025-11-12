<?php
// Telegram Proxy - Forwards messages from frontend to Telegram API
// Place this file on a web server with PHP support

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Your Telegram Bot Configuration
$botToken = '8542135345:AAGbOxP43aqCelD3U0RJQOgb5DxrqdvAi8g';
$chatId = '6500739596';

// Get message from POST request
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$message = $data['message'] ?? '';

if (empty($message)) {
    echo json_encode(['ok' => false, 'error' => 'No message provided']);
    exit();
}

// Telegram API URL
$url = "https://api.telegram.org/bot{$botToken}/sendMessage";

// Prepare data
$postData = [
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'HTML'
];

// Send to Telegram
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Return response
http_response_code($httpCode);
echo $response;
?>


