// Store status functionality
const STORE_HOURS = {
    open: 10, // 10 AM
    close: 22  // 10 PM
};

function checkStoreStatus() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 100 + minutes;
    
    // Store hours: 10:00 AM - 10:00 PM (1000 - 2200)
    const isOpen = currentTime >= 1000 && currentTime < 2200;
    
    const statusElement = document.getElementById('store-status');
    if (statusElement) {
        statusElement.innerHTML = isOpen ? 
            '<span class="open-status">We\'re Open!</span>' : 
            '<span class="closed-status">Currently Closed</span>';
    }
}

// Check store status on page load and every minute
document.addEventListener('DOMContentLoaded', () => {
    checkStoreStatus();
    setInterval(checkStoreStatus, 60000);
});