// PZM Business Hours - Fetches from your Cloudflare Worker API
const PROXY_URL = 'https://test.pzm.ae/api/business-hours';

// Hardcoded fallback hours in hh:mm AM/PM format
const FALLBACK_WEEKDAY_TEXT = [
  "Monday: 08:00 AM – 11:00 PM",
  "Tuesday: 08:00 AM – 11:00 PM",
  "Wednesday: 08:00 AM – 11:00 PM",
  "Thursday: 08:00 AM – 11:00 PM",
  "Friday: 09:30 AM – 11:00 PM",
  "Saturday: 07:00 AM – 01:00 AM",
  "Sunday: 07:00 AM – 01:00 AM"
];

// Convert time to hh:mm AM/PM format
function formatTime(timeStr) {
  // Handle formats like "8 AM", "9:30 AM", "11 PM", "1 AM"
  const match = timeStr.trim().match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!match) return timeStr;
  
  const hours = match[1].padStart(2, '0');
  const minutes = match[2] || '00';
  const period = match[3].toUpperCase();
  
  return `${hours}:${minutes} ${period}`;
}

// Convert full day text to hh:mm AM/PM format
function formatDayText(dayText) {
  const colonIndex = dayText.indexOf(':');
  if (colonIndex === -1) return dayText;
  
  const day = dayText.substring(0, colonIndex).trim();
  const timePart = dayText.substring(colonIndex + 1).trim();
  
  // Split by dash/en-dash
  const times = timePart.split(/\s*[–-]\s*/);
  if (times.length !== 2) return dayText;
  
  const startTime = formatTime(times[0]);
  const endTime = formatTime(times[1]);
  
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
    statusElement.innerHTML = '<span class="closed-status">Business Hours</span>';
    displayHours(FALLBACK_WEEKDAY_TEXT, true);
    return;
  }

  if (hoursData.openNow === true) {
    statusElement.innerHTML = '<span class="open-status">Open Now</span>';
  } else if (hoursData.openNow === false) {
    statusElement.innerHTML = '<span class="closed-status">Closed</span>';
  } else {
    statusElement.innerHTML = '<span class="closed-status">Business Hours</span>';
  }

  displayHours(hoursData.weekdayText, false);
}

function displayHours(weekdayText, alreadyFormatted = false) {
  const hoursElement = document.querySelector('.hours');
  if (!weekdayText || !Array.isArray(weekdayText)) {
    hoursElement.textContent = "Business hours unavailable.";
    return;
  }
  
  const hoursHTML = weekdayText.map(dayText => {
    const formattedText = alreadyFormatted ? dayText : formatDayText(dayText);
    const colonIndex = formattedText.indexOf(':');
    if (colonIndex === -1) {
      return `<div class="hours-item"><span>${formattedText}</span></div>`;
    }
    const day = formattedText.substring(0, colonIndex).trim();
    const time = formattedText.substring(colonIndex + 1).trim();
    return `<div class="hours-item"><span class="hours-day">${day}</span><span class="hours-time">${time}</span></div>`;
  }).join('');
  
  hoursElement.innerHTML = hoursHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);
});
