// Store hours functionality using Google Places API

const GOOGLE_PLACE_API_URL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ1aZJvMBtXz4RLrOI1vITjBU&fields=name,opening_hours&key=AIzaSyBcD7hYodf1KBgvfejaxk9Lk-vVEcV1go8";

async function fetchBusinessHours() {
  try {
    const response = await fetch(GOOGLE_PLACE_API_URL);
    const data = await response.json();
    // Defensive: check nested structure
    const openingHours = data?.result?.opening_hours;
    if (!openingHours) return null;
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
    statusElement.innerHTML = '<span class="closed-status">Closed</span>';
    hoursElement.textContent = 'Business hours unavailable.';
    return;
  }

  // Set status (open/closed)
  statusElement.innerHTML = hoursData.openNow
    ? '<span class="open-status">Open</span>'
    : '<span class="closed-status">Closed</span>';

  // Show the Google-formatted business hours
  displayHours(hoursData.weekdayText);
}

function displayHours(weekdayText) {
  const hoursElement = document.querySelector('.hours');
  if (!weekdayText || !Array.isArray(weekdayText)) {
    hoursElement.textContent = "Business hours unavailable.";
    return;
  }
  // Join using line breaks for readability
  hoursElement.textContent = weekdayText.join('\n');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateStoreStatus();
  // Update status every minute
  setInterval(updateStoreStatus, 60000);
});