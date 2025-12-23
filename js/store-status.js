// PZM Business Hours - Fetches from your Cloudflare Worker API
const PROXY_URL = 'https://test.pzm.ae/api/business-hours';

// Hardcoded fallback hours (used if API fails)
const FALLBACK_WEEKDAY_TEXT = [
  "Monday: 8 AM – 11 PM",
  "Tuesday: 8 AM – 11 PM",
  "Wednesday: 8 AM – 11 PM",
  "Thursday: 8 AM – 11 PM",
  "Friday: 9:30 AM – 11 PM",
  "Saturday: 7 AM – 1 AM",
  "Sunday: 7 AM – 1 AM"
];

async function fetchBusinessHours() {
  try {
    const response = await fetch(PROXY_URL);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    const openingHours = data?.result?.opening_hours;
    if (!openingHours) throw new Error('No opening_hours');
    return {
      periods: openingHours.periods,
      weekdayText: openingHours.weekday_text,
      openNow: openingHours.open_now
    };
  } catch (error) {
    console.error('Error fetching business hours:', error);
    return null;
  }
}

async function updateStoreStatus() {
  const statusElement = document.getElementById('store-status');
  const hoursElement = document.querySelector('.hours');

  if (!statusElement || !hoursElement) return;

  const hoursData = await fetchBusinessHours();

  if (!hoursData) {
    // Fallback: unknown open/closed status, show fallback hours
    statusElement.innerHTML = '<span class="closed-status">Business Hours</span>';
    displayHours(FALLBACK_WEEKDAY_TEXT);
    return;
  }

  // Set status (open/closed)
  if (hoursData.openNow === true) {
    statusElement.innerHTML = '<span class="open-status">Open Now</span>';
  } else if (hoursData.openNow === false) {
    statusElement.innerHTML = '<span class="closed-status">Closed</span>';
  } else {
    statusElement.innerHTML = '<span class="closed-status">Business Hours</span>';
  }

  // Show the Google-formatted business hours
  displayHours(hoursData.weekdayText);
}

function displayHours(weekdayText) {
  const hoursElement = document.querySelector('.hours');
  if (!weekdayText || !Array.isArray(weekdayText)) {
    hoursElement.textContent = "Business hours unavailable.";
    return;
  }
  
  // Generate HTML with proper structure for two-column layout
  const hoursHTML = weekdayText.map(dayText => {
    // Parse "Monday: 8 AM – 11 PM" format
    const colonIndex = dayText.indexOf(':');
    if (colonIndex === -1) {
      return `<div class="hours-item"><span>${dayText}</span></div>`;
    }
    const day = dayText.substring(0, colonIndex).trim();
    const time = dayText.substring(colonIndex + 1).trim();
    return `<div class="hours-item"><span class="hours-day">${day}</span><span class="hours-time">${time}</span></div>`;
  }).join('');
  
  hoursElement.innerHTML = hoursHTML;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateStoreStatus();
  // Update status every minute
  setInterval(updateStoreStatus, 60000);
});
