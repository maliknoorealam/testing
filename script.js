// Commercial Bank Mobile App - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Language Selector Toggle
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            const langText = this.querySelector('.lang-text');
            if (langText.textContent === 'EN') {
                langText.textContent = 'AR';
            } else {
                langText.textContent = 'EN';
            }
        });
    }

    // Login Button Click Handler
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            console.log('Login button clicked');
            // Navigate to login page
            window.location.href = 'login.html';
        });
    }

    // Bottom Navigation Items - Display only (no click functionality)
    // Footer buttons are now just visual elements, not clickable

    // Handle logo loading - if logo doesn't exist, show placeholder
    const logos = document.querySelectorAll('.logo-placeholder');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
            // Create a placeholder div if image fails to load
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.backgroundColor = '#8B0000';
            placeholder.style.borderRadius = '50%';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = '#ffffff';
            placeholder.style.fontSize = '24px';
            placeholder.style.fontWeight = 'bold';
            placeholder.textContent = 'CB';
            this.parentNode.appendChild(placeholder);
        });
    });
});
