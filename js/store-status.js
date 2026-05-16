// PZM Business Hours - Local calculation with Dubai timezone (UTC+4)

// Store hours: [openHour, openMin, closeHour, closeMin]
// closeHour > 23 means next day (e.g. 25 = 1 AM next day)
const FALLBACK_STORE_HOURS = {
  0: { open: [10, 0], close: [25, 0] },  // Sunday: 10 AM – 1 AM
  1: { open: [10, 0], close: [23, 0] },  // Monday: 10 AM – 11 PM
  2: { open: [10, 0], close: [22, 30] },  // Tuesday: 10 AM – 10:30 PM
  3: { open: [10, 0], close: [23, 0] },  // Wednesday: 10 AM – 11 PM
  4: { open: [10, 0], close: [23, 0] },  // Thursday: 10 AM – 11 PM
  5: { open: [10, 0], close: [23, 0] },  // Friday: 10 AM – 11 PM
  6: { open: [10, 0], close: [24, 0] },  // Saturday: 10 AM – 12 AM
};

const FALLBACK_WEEKDAY_TEXT = [
  "Sunday: 10:00 AM – 01:00 AM",
  "Monday: 10:00 AM – 11:00 PM",
  "Tuesday: 10:00 AM – 10:30 PM",
  "Wednesday: 10:00 AM – 11:00 PM",
  "Thursday: 10:00 AM – 11:00 PM",
  "Friday: 10:00 AM – 11:00 PM",
  "Saturday: 10:00 AM – 12:00 AM"
];

const HOURS_ENDPOINT = 'https://pzm-business-hours.islam-thwabeh.workers.dev/hours';
const HOURS_FETCH_TIMEOUT_MS = 5000;
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
    outsideHours: 'We are still receiving your calls and messages outside working hours',
    today: 'Today',
    unavailable: 'Business hours unavailable.'
  },
  ar: {
    openNow: 'مفتوح الآن',
    closed: 'مغلق الآن',
    outsideHours: 'نستقبل مكالماتكم ورسائلكم أيضاً خارج أوقات العمل',
    today: 'اليوم',
    unavailable: 'ساعات العمل غير متاحة حالياً.'
  }
};

let activeWeekdayText = FALLBACK_WEEKDAY_TEXT.slice();
let activeStoreHours = { ...FALLBACK_STORE_HOURS };

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
  const today = activeStoreHours[day];
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
  const yesterdayHours = activeStoreHours[yesterday];
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

  displayHours(activeWeekdayText);
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

function parseTime12h(timeText) {
  const match = String(timeText).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'AM') {
    if (hour === 12) hour = 0;
  } else if (hour !== 12) {
    hour += 12;
  }

  return [hour, minute];
}

function parseStoreHours(weekdayText) {
  if (!Array.isArray(weekdayText) || weekdayText.length === 0) return null;

  const parsed = {};
  for (let i = 0; i < weekdayText.length; i += 1) {
    const line = String(weekdayText[i] || '').trim();
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return null;

    const dayName = line.substring(0, colonIndex).trim().toLowerCase();
    const dayIndex = DAY_INDEX[dayName];
    if (typeof dayIndex !== 'number') return null;

    const rangeText = line.substring(colonIndex + 1).trim();
    if (!rangeText || /closed/i.test(rangeText)) return null;

    const normalizedRange = rangeText.replace(/[–—]/g, '-');
    const parts = normalizedRange.split('-');
    if (parts.length !== 2) return null;

    const open = parseTime12h(parts[0]);
    const close = parseTime12h(parts[1]);
    if (!open || !close) return null;

    let closeMinutes = close[0] * 60 + close[1];
    const openMinutes = open[0] * 60 + open[1];
    if (closeMinutes <= openMinutes) {
      closeMinutes += 24 * 60;
    }

    parsed[dayIndex] = {
      open: open,
      close: [Math.floor(closeMinutes / 60), closeMinutes % 60]
    };
  }

  return Object.keys(parsed).length === 7 ? parsed : null;
}

function fetchLiveHours() {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = setTimeout(function () {
    if (controller) controller.abort();
  }, HOURS_FETCH_TIMEOUT_MS);

  fetch(HOURS_ENDPOINT, {
    signal: controller ? controller.signal : undefined,
    cache: 'no-store'
  })
    .then(function (response) {
      if (!response.ok) throw new Error('hours fetch failed');
      return response.json();
    })
    .then(function (payload) {
      const nextHours = Array.isArray(payload) ? payload : (Array.isArray(payload && payload.hours) ? payload.hours : null);
      if (!nextHours || nextHours.length === 0) return;

      const parsed = parseStoreHours(nextHours);
      if (!parsed) return;

      activeWeekdayText = nextHours;
      activeStoreHours = parsed;
      updateStoreStatus();
    })
    .catch(function () {
      // Keep fallback hours unchanged when endpoint is unavailable.
    })
    .finally(function () {
      clearTimeout(timeoutId);
    });
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
  fetchLiveHours();
  setInterval(updateStoreStatus, 60000);
}
