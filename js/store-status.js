// Store status functionality
async function fetchBusinessHours() {
    const placeId = 'ChIJLxLxL2VZXz4RgqjxGwvJxac'; // PZM Computer Phone Trading & Repair Place ID
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&key=${apiKey}`);
        const data = await response.json();
        
        if (data.result && data.result.opening_hours) {
            return data.result.opening_hours;
        }
    } catch (error) {
        console.error('Error fetching business hours:', error);
    }
    
    // Fallback hours if API fails
    return {
        open: 10, // 10 AM
        close: 22 // 10 PM
    };
}

async function checkStoreStatus() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 100 + minutes;
    
    const businessHours = await fetchBusinessHours();
    const isOpen = currentTime >= 1000 && currentTime < 2200;
    
    const statusElement = document.getElementById('store-status');
    if (statusElement) {
        statusElement.innerHTML = isOpen ? 
            '<span class="open-status">We\'re Open!</span>' : 
            '<span class="closed-status">Currently Closed</span>';
    }
}

// Initialize Google Maps
function initMap() {
    const location = { lat: 25.0657001, lng: 55.2126007 };
    const mapElement = document.getElementById('google-map');
    
    if (mapElement) {
        const map = new google.maps.Map(mapElement, {
            center: location,
            zoom: 15,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });

        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'PZM Computer Phone Trading & Repair'
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px;">
                    <h3 style="margin: 0 0 5px;">PZM Computer Phone Trading & Repair</h3>
                    <p style="margin: 0;">Inside Hessa Union Coop Hypermarket, Ground floor</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }
}

// Check store status on page load and every minute
document.addEventListener('DOMContentLoaded', () => {
    checkStoreStatus();
    setInterval(checkStoreStatus, 60000);
    
    // Load Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
});

window.initMap = initMap;