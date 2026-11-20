// P Z M Computers & Mobile Phones - Sell New Used PC Build Business Hours - Local calculation with Dubai timezone (UTC+4)

// Store hours: [openHour, openMin, closeHour, closeMin]
// closeHour > 23 means next day (e.g. 25 = 1 AM next day)
const STORE_HOURS = {
  0: { open: [10, 30], close: [23, 30] }, // Sunday
  1: { open: [11, 0], close: [23, 0] },  // Monday
  2: { open: [11, 0], close: [23, 0] },  // Tuesday
  3: { open: [11, 0], close: [23, 0] },  // Wednesday
  4: { open: [11, 0], close: [23, 0] },  // Thursday
  5: { open: [10, 30], close: [23, 0] }, // Friday
  6: { open: [10, 30], close: [23, 30] }, // Saturday
};

const WEEKDAY_TEXT = [
  "Sunday: 10:30 AM - 11:30 PM",
  "Monday: 11:00 AM - 11:00 PM",
  "Tuesday: 11:00 AM - 11:00 PM",
  "Wednesday: 11:00 AM - 11:00 PM",
  "Thursday: 11:00 AM - 11:00 PM",
  "Friday: 10:30 AM - 11:00 PM",
  "Saturday: 10:30 AM - 11:30 PM"
];

// The owner chose manual hours updates on 20 November 2026.
// Keep this schedule aligned with the visible HTML, JSON-LD and llms.txt.
const DAY_INDEX = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};

const DAY_NAMES = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
};

const UI_TEXT = {
  en: {
    openNow: 'Open Now',
    closed: 'Closed',
    outsideHours: 'We are still receiving your calls and WhatsApp messages outside walk-in hours',
    today: 'Today',
    unavailable: 'Business hours unavailable.'
  },
  ar: {
    openNow: 'مفتوح الآن',
    closed: 'مغلق الآن',
    outsideHours: 'نستقبل مكالماتكم ورسائلكم على واتساب أيضاً خارج أوقات الزيارة',
    today: 'اليوم',
    unavailable: 'ساعات العمل غير متاحة حالياً.'
  }
};

function getCurrentLocale() {
  const lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
  const path = window.location.pathname;
  if (lang.startsWith('ar') || path === '/ar' || path === '/ar/' || path.startsWith('/ar/')) {
    return 'ar';
  }
  return 'en';
}

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
  if (!today) return false;
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
  const yesterdayHours = STORE_HOURS[yesterday];
  if (!yesterdayHours) return false;
  const yesterdayClose = yesterdayHours.close[0] * 60 + yesterdayHours.close[1];
  if (yesterdayClose > 24 * 60) {
    const overflowMinutes = yesterdayClose - 24 * 60;
    if (currentMinutes < overflowMinutes) return true;
  }

  return false;
}

function updateStoreStatus() {
  const statusElement = document.getElementById('store-status');
  const hoursElement = document.querySelector('.hours');
  const locale = getCurrentLocale();
  const copy = UI_TEXT[locale];

  if (!statusElement || !hoursElement) return;

  const open = isStoreOpen();

  if (open) {
    statusElement.innerHTML = `<span class="open-status">${copy.openNow}</span>`;
  } else {
    statusElement.innerHTML = `<span class="closed-status">${copy.closed}</span>` +
      `<p class="outside-hours-msg">${copy.outsideHours}</p>`;
  }

  displayHours(WEEKDAY_TEXT);
}

function displayHours(weekdayText) {
  const hoursElement = document.querySelector('.hours');
  const locale = getCurrentLocale();
  const copy = UI_TEXT[locale];
  if (!hoursElement) return;
  if (!weekdayText || !Array.isArray(weekdayText)) {
    hoursElement.textContent = copy.unavailable;
    return;
  }

  const now = getDubaiTime();
  const todayDay = now.getDay(); // 0=Sunday

  const hoursHTML = weekdayText.map(dayText => {
    const colonIndex = dayText.indexOf(':');
    if (colonIndex === -1) {
      return `<div class="hours-item"><span>${dayText}</span></div>`;
    }
    const day = dayText.substring(0, colonIndex).trim();
    const time = dayText.substring(colonIndex + 1).trim();
    const dayIndex = DAY_INDEX[day.toLowerCase()];
    const isToday = dayIndex === todayDay;
    const todayClass = isToday ? ' hours-today' : '';
    const localizedDay = typeof dayIndex === 'number' ? DAY_NAMES[locale][dayIndex] : day;
    const todaySuffix = isToday ? ` (${copy.today})` : '';
    return `<div class="hours-item${todayClass}"><span class="hours-day">${localizedDay}${todaySuffix}</span><span class="hours-time">${time}</span></div>`;
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
