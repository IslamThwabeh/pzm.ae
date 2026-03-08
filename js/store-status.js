// PZM Business Hours - Local calculation with Dubai timezone (UTC+4)

// Store hours: [openHour, openMin, closeHour, closeMin]
// closeHour > 23 means next day (e.g. 25 = 1 AM next day)
const STORE_HOURS = {
  0: { open: [10, 0], close: [25, 0] },  // Sunday: 10 AM – 1 AM
  1: { open: [10, 0], close: [23, 0] },  // Monday: 10 AM – 11 PM
  2: { open: [10, 0], close: [22, 30] },  // Tuesday: 10 AM – 10:30 PM
  3: { open: [10, 0], close: [23, 0] },  // Wednesday: 10 AM – 11 PM
  4: { open: [10, 0], close: [23, 0] },  // Thursday: 10 AM – 11 PM
  5: { open: [10, 0], close: [23, 0] },  // Friday: 10 AM – 11 PM
  6: { open: [10, 0], close: [24, 0] },  // Saturday: 10 AM – 12 AM
};

const WEEKDAY_TEXT = [
  "Sunday: 10:00 AM – 01:00 AM",
  "Monday: 10:00 AM – 11:00 PM",
  "Tuesday: 10:00 AM – 10:30 PM",
  "Wednesday: 10:00 AM – 11:00 PM",
  "Thursday: 10:00 AM – 11:00 PM",
  "Friday: 10:00 AM – 11:00 PM",
  "Saturday: 10:00 AM – 12:00 AM"
];

function getDubaiTime() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
}

function isStoreOpen() {
  const now = getDubaiTime();
  const day = now.getDay();       // 0=Sunday
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentMinutes = hour * 60 + minute;

  // Check today's hours
  const today = STORE_HOURS[day];
  const openMinutes = today.open[0] * 60 + today.open[1];
  const closeMinutes = today.close[0] * 60 + today.close[1];

  if (closeMinutes <= 24 * 60) {
    // Closes same day
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }

  // Closes after midnight — check if within today's open-to-midnight window
  if (currentMinutes >= openMinutes) return true;

  // Check if we're in the after-midnight portion of yesterday's hours
  const yesterday = (day + 6) % 7;
  const yesterdayClose = STORE_HOURS[yesterday].close[0] * 60 + STORE_HOURS[yesterday].close[1];
  if (yesterdayClose > 24 * 60) {
    const overflowMinutes = yesterdayClose - 24 * 60;
    if (currentMinutes < overflowMinutes) return true;
  }

  return false;
}

function updateStoreStatus() {
  const statusElement = document.getElementById('store-status');
  const hoursElement = document.querySelector('.hours');

  if (!statusElement || !hoursElement) return;

  const open = isStoreOpen();

  if (open) {
    statusElement.innerHTML = '<span class="open-status">Open Now</span>';
  } else {
    statusElement.innerHTML = '<span class="closed-status">Closed</span>' +
      '<p class="outside-hours-msg">We are still receiving your calls and messages outside working hours</p>';
  }

  displayHours(WEEKDAY_TEXT);
}

function displayHours(weekdayText) {
  const hoursElement = document.querySelector('.hours');
  if (!weekdayText || !Array.isArray(weekdayText)) {
    hoursElement.textContent = "Business hours unavailable.";
    return;
  }

  const now = getDubaiTime();
  const todayDay = now.getDay(); // 0=Sunday
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const hoursHTML = weekdayText.map(dayText => {
    const colonIndex = dayText.indexOf(':');
    if (colonIndex === -1) {
      return `<div class="hours-item"><span>${dayText}</span></div>`;
    }
    const day = dayText.substring(0, colonIndex).trim();
    const time = dayText.substring(colonIndex + 1).trim();
    const isToday = day === dayNames[todayDay];
    const todayClass = isToday ? ' hours-today' : '';
    return `<div class="hours-item${todayClass}"><span class="hours-day">${day}${isToday ? ' (Today)' : ''}</span><span class="hours-time">${time}</span></div>`;
  }).join('');

  hoursElement.innerHTML = hoursHTML;
}

// Run immediately if DOM is ready (e.g. loaded dynamically by contact-loader),
// otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);
}
