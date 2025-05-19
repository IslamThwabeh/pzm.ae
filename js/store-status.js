// Store hours functionality
async function fetchBusinessHours() {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/business-hours`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      }
    });
    const data = await response.json();
    return data.result?.opening_hours?.periods || null;
  } catch (error) {
    console.error('Error fetching business hours:', error);
    return null;
  }
}

async function updateStoreStatus() {
  const statusElement = document.getElementById('store-status');
  const hoursElement = document.querySelector('.hours');
  
  if (!statusElement || !hoursElement) return;

  const periods = await fetchBusinessHours();
  
  if (!periods) {
    // Fallback to default hours if API fails
    const defaultHours = {
      0: { open: '7 AM', close: '1 AM' },  // Sunday
      1: { open: '8 AM', close: '12 AM' }, // Monday
      2: { open: '8 AM', close: '12 AM' }, // Tuesday
      3: { open: '8 AM', close: '1 AM' },  // Wednesday
      4: { open: '8 AM', close: '11 PM' }, // Thursday
      5: { open: '8 AM', close: '12 AM' }, // Friday
      6: { open: '7 AM', close: '1 AM' }   // Saturday
    };
    displayHours(defaultHours);
    return;
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentPeriod = periods[currentDay];

  if (!currentPeriod) {
    statusElement.innerHTML = '<span class="closed-status">Closed</span>';
    return;
  }

  const isOpen = isCurrentlyOpen(currentPeriod);
  statusElement.innerHTML = isOpen ? 
    '<span class="open-status">Open</span>' : 
    '<span class="closed-status">Closed</span>';

  displayHours(periods);
}

function isCurrentlyOpen(period) {
  const now = new Date();
  const openTime = new Date(period.open.time);
  const closeTime = new Date(period.close.time);
  
  return now >= openTime && now <= closeTime;
}

function displayHours(periods) {
  const hoursElement = document.querySelector('.hours');
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let hoursText = '';
  daysOfWeek.forEach((day, index) => {
    const period = periods[index];
    const hours = period ? 
      `${formatTime(period.open)} – ${formatTime(period.close)}` :
      'Closed';
    hoursText += `${day}: ${hours}\n`;
  });
  
  hoursElement.textContent = hoursText;
}

function formatTime(time) {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateStoreStatus();
  // Update status every minute
  setInterval(updateStoreStatus, 60000);
});