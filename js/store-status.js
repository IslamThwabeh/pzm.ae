// PZM Business Hours - Fetches from your Cloudflare Worker API
const PROXY_URL = 'https://test.pzm.ae/api/business-hours';

// Hardcoded fallback hours in 24-hour format
const FALLBACK_WEEKDAY_TEXT = [
  "Monday: 08:00 – 23:00",
  "Tuesday: 08:00 – 23:00",
  "Wednesday: 08:00 – 23:00",
  "Thursday: 08:00 – 23:00",
  "Friday: 09:30 – 23:00",
  "Saturday: 07:00 – 01:00",
  "Sunday: 07:00 – 01:00"
];

// Convert 12-hour format to 24-hour format
function convertTo24Hour(timeStr) {
  // Handle formats like "8 AM", "9:30 AM", "11 PM", "1 AM"
  const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!match) return timeStr;
  
  let hours = parseInt(match[1]);
  const minutes = match[2] || '00';
  const period = match[3].toUpperCase();
  
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

// Convert full day text to 24-hour format
function convertDayTo24Hour(dayText) {
  // Parse "Monday: 8 AM – 11 PM" format
  const colonIndex = dayText.indexOf(':');
  if (colonIndex === -1) return dayText;
  
  const day = dayText.substring(0, colonIndex).trim();
  const timePart = dayText.substring(colonIndex + 1).trim();
  
  // Split by dash/en-dash
  const times = timePart.split(/\s*[–-]\s*/);
  if (times.length !== 2) return dayText;
  
  const startTime = convertTo24Hour(times[0].trim());
  const endTime = convertTo24Hour(times[1].trim());
  
  return `${day}: ${startTime} – ${endTime}`;
}

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
    displayHours(FALLBACK_WEEKDAY_TEXT, true); // true = already in 24h format
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

  // Show the Google-formatted business hours (convert to 24h)
  displayHours(hoursData.weekdayText, false);
}

function displayHours(weekdayText, alreadyConverted = false) {
  const hoursElement = document.querySelector('.hours');
  if (!weekdayText || !Array.isArray(weekdayText)) {
    hoursElement.textContent = "Business hours unavailable.";
    return;
  }
  
  // Generate HTML with proper structure for two-column layout
  const hoursHTML = weekdayText.map(dayText => {
    // Convert to 24-hour format if needed
    const convertedText = alreadyConverted ? dayText : convertDayTo24Hour(dayText);
    
    // Parse "Monday: 08:00 – 23:00" format
    const colonIndex = convertedText.indexOf(':');
    if (colonIndex === -1) {
      return `<div class="hours-item"><span>${convertedText}</span></div>`;
    }
    const day = convertedText.substring(0, colonIndex).trim();
    const time = convertedText.substring(colonIndex + 1).trim();
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
