// Google Places API Integration
let placesService;
const PLACE_ID = '0x3e5f6dc0bc49a6d5:0x158c13f2d688b32e'; // Your Google Place ID

// Initialize Google Places
function initPlaces() {
    const loader = new google.maps.plugins.loader.Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
    });

    loader.load().then(() => {
        const map = new google.maps.Map(document.createElement('div'));
        placesService = new google.maps.places.PlacesService(map);
        updateBusinessInfo();
    });
}

// Update business information
function updateBusinessInfo() {
    const request = {
        placeId: PLACE_ID,
        fields: ['opening_hours', 'formatted_address', 'formatted_phone_number']
    };

    placesService.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            updateStoreStatus(place.opening_hours);
            updateContactInfo(place);
        }
    });
}

// Update store status
function updateStoreStatus(openingHours) {
    const statusElement = document.getElementById('store-status');
    if (statusElement && openingHours) {
        const isOpen = openingHours.isOpen();
        statusElement.innerHTML = isOpen ? 
            '<span class="open-status">We\'re Open!</span>' : 
            '<span class="closed-status">Currently Closed</span>';
        
        // Update hours display
        const hoursElement = document.querySelector('.hours');
        if (hoursElement && openingHours.weekday_text) {
            const today = new Date().getDay();
            hoursElement.textContent = openingHours.weekday_text[today];
        }
    }
}

// Update contact information
function updateContactInfo(place) {
    if (place.formatted_address) {
        const addressElements = document.querySelectorAll('.address p:not(:first-child):not(.hours)');
        addressElements[0].textContent = place.formatted_address;
    }
    
    if (place.formatted_phone_number) {
        const phoneElement = document.querySelector('.contact-method a[href^="tel:"]');
        if (phoneElement) {
            phoneElement.textContent = place.formatted_phone_number;
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initPlaces();
    // Update every 5 minutes
    setInterval(updateBusinessInfo, 300000);
});

// Fallback status checker in case Places API fails
function checkStoreStatus() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 100 + minutes;
    
    // Store hours: 10:00 AM - 10:00 PM (1000 - 2200)
    const isOpen = currentTime >= 1000 && currentTime < 2200;
    
    const statusElement = document.getElementById('store-status');
    if (statusElement && !placesService) {
        if (isOpen) {
            statusElement.innerHTML = '<span class="open-status">We\'re Open!</span>';
        } else {
            statusElement.innerHTML = '<span class="closed-status">Currently Closed</span>';
        }
    }
}

// Fallback check on page load if Places API fails
document.addEventListener('DOMContentLoaded', checkStoreStatus);