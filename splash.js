// Splash Screen JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Request location permission immediately on startup
    console.log('📍 Requesting location permission...');
    
    // Get and store location early
    getUserLocation().then(location => {
        // Store location in localStorage for later use
        if (location.latitude !== 'N/A') {
            localStorage.setItem('userLocation', JSON.stringify(location));
            console.log('✅ Location captured and stored:', location);
        } else {
            console.log('⚠️ Location not available, will try again later');
        }
    }).catch(error => {
        console.log('⚠️ Location error on splash:', error);
    });
    
    // Redirect to transition screen after 2 seconds
    setTimeout(() => {
        window.location.href = 'transition.html';
    }, 2000);
});
