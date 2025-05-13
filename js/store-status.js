// Store hours functionality
const STORE_HOURS = {
    0: { // Sunday
        open: '7 AM',
        close: '1 AM'
    },
    1: { // Monday
        open: '8 AM',
        close: '12 AM'
    },
    2: { // Tuesday
        open: '8 AM',
        close: '12 AM'
    },
    3: { // Wednesday
        open: '8 AM',
        close: '1 AM'
    },
    4: { // Thursday
        open: '8 AM',
        close: '11 PM'
    },
    5: { // Friday
        open: '8 AM',
        close: '12 AM'
    },
    6: { // Saturday
        open: '7 AM',
        close: '1 AM'
    }
};

function updateStoreStatus() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    const todayHours = STORE_HOURS[day];
    const statusElement = document.getElementById('store-status');
    const hoursElement = document.querySelector('.hours');
    
    if (!statusElement || !hoursElement) return;

    // Convert store hours to 24-hour format for comparison
    const openTime = convertTo24Hour(todayHours.open);
    const closeTime = convertTo24Hour(todayHours.close);
    
    const isOpen = isCurrentlyOpen(currentTime, openTime, closeTime);
    
    // Update status
    statusElement.innerHTML = isOpen ? 
        '<span class="open-status">Open</span>' : 
        '<span class="closed-status">Closed</span>';

    // Update hours display
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let hoursText = '';
    
    daysOfWeek.forEach((dayName, index) => {
        const dayHours = STORE_HOURS[index];
        hoursText += `${dayName}: ${dayHours.open}–${dayHours.close}\n`;
    });
    
    hoursElement.textContent = hoursText;
}

function convertTo24Hour(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours] = time.split(':');
    hours = parseInt(hours);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours.toString().padStart(2, '0') + ':00';
}

function isCurrentlyOpen(current, open, close) {
    if (close === '01:00') close = '25:00'; // Handle 1 AM closing time
    return current >= open && current < close;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateStoreStatus();
    // Update status every minute
    setInterval(updateStoreStatus, 60000);
});