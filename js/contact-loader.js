// Loads the shared contact section + footer into any page
// Usage: <div id="contact-section"></div> then <script src="/js/contact-loader.js"></script>

(function () {
  const placeholder = document.getElementById('contact-section');
  if (!placeholder) return;

  const path = window.location.pathname;
  const lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
  const isArabic = lang.startsWith('ar') || path === '/ar' || path === '/ar/' || path.startsWith('/ar/');

  const links = isArabic
    ? {
        home: '/ar/',
        services: '/ar/services/',
        repair: '/ar/services/repair.html',
        pcBuild: '/ar/services/gaming-pc.html',
        areas: '/ar/areas/',
        blog: '/blog.html',
        returns: '/ar/return-policy.html',
        terms: '/ar/terms.html'
      }
    : {
        home: '/',
        services: '/services/index.html',
        repair: '/services/repair.html',
        pcBuild: '/services/gaming-pc.html',
        areas: '/areas/index.html',
        blog: '/blog.html',
        returns: '/return-policy.html',
        terms: '/terms.html'
      };

  const copy = isArabic
    ? {
        sectionEyebrow: 'زر المتجر أو اتصل أو راسلنا',
        sectionTitle: 'خطط لزيارتك إلى PZM',
        intro: 'ابدأ عبر واتساب لمعرفة التوفر أو سعر الصيانة أو تقييم جهازك قبل زيارة المتجر في البرشاء.',
        phoneAlt: 'الهاتف',
        phoneLabel: '+971 528 026 677',
        whatsappAlt: 'واتساب',
        whatsappHref: 'https://wa.me/971528026677?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D9%88%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%D9%83%D9%85.%20(via%20pzm.ae)',
        whatsappLabel: 'راسلنا على واتساب',
        mapAlt: 'الموقع',
        mapLabel: 'افتح خرائط جوجل',
        visitTitle: 'زوروا متجرنا في البرشاء',
        locationBadge: 'المتجر الرئيسي',
        storeName: 'PZM Computers & Phones Store',
        addressLine1: 'داخل Union Coop Hypermarket، الطابق الأرضي',
        addressLine2: 'شارع حصة، البرشاء، دبي',
        supportTitle1: 'استجابة سريعة',
        supportText1: 'اسأل عن السعر أو التوفر أو وقت الصيانة قبل أن تتحرك.',
        supportTitle2: 'خطوات واضحة',
        supportText2: 'نشرح الضمان والحالة والخطوة التالية قبل تأكيد الطلب أو الصيانة.',
        supportTitle3: 'خيارات مرنة',
        supportText3: 'يمكنك الزيارة مباشرة أو ترتيب الاستلام أو التوصيل في الحالات المتاحة.',
        storeTag1: 'زيارة مباشرة',
        storeTag2: 'مواقف سهلة',
        storeTag3: 'تنسيق الاستلام عند الطلب',
        mapTitle: 'خريطة موقع PZM Computers & Phones Store',
        footerHome: 'الرئيسية',
        footerServices: 'الخدمات',
        footerRepair: 'الصيانة',
        footerPcBuild: 'تجميع PC',
        footerAreas: 'المناطق',
        footerBlog: 'المدونة',
        footerReturns: 'سياسة الإرجاع',
        footerTerms: 'الشروط والأحكام',
        footerTagline: 'New&#8226;Used&#8226;Repair&#8226;PC&#8226;Build',
        footerCopy: 'جميع الحقوق محفوظة.'
      }
    : {
        sectionEyebrow: 'Visit, Call or WhatsApp',
        sectionTitle: 'Plan Your Visit to PZM',
        intro: "Start on WhatsApp for availability checks, repair quotes, or trade-in guidance before you visit our Al Barsha store.",
        phoneAlt: 'Phone',
        phoneLabel: '+971 528 026 677',
        whatsappAlt: 'WhatsApp',
        whatsappHref: 'https://wa.me/971528026677?text=Hi%2C%20I%27m%20interested%20in%20the%20services%20listed%20on%20your%20website.%20Can%20you%20tell%20me%20more%3F%20(via%20pzm.ae)',
        whatsappLabel: 'Request Help on WhatsApp',
        mapAlt: 'Location',
        mapLabel: 'Open Google Maps',
        visitTitle: 'Visit Our Al Barsha Store',
        locationBadge: 'Local Store',
        storeName: 'PZM Computers & Phones Store',
        addressLine1: 'Inside Union Coop Hypermarket, Ground Floor',
        addressLine2: 'Hessa Street, Al Barsha, Dubai',
        supportTitle1: 'Fast next-step help',
        supportText1: 'Ask about stock, repair timing, or trade-in value before you leave home.',
        supportTitle2: 'Clear expectations',
        supportText2: 'We explain warranty details, condition notes, and the next step before you confirm.',
        supportTitle3: 'Flexible fulfilment',
        supportText3: 'Walk in, arrange store pickup, or ask about delivery or device collection where available.',
        storeTag1: 'Walk-in friendly',
        storeTag2: 'Easy parking',
        storeTag3: 'Pickup coordination on request',
        mapTitle: 'PZM Computers & Phones Store location map',
        footerHome: 'Home',
        footerServices: 'Services',
        footerRepair: 'Repair',
        footerPcBuild: 'PC Build',
        footerAreas: 'Areas',
        footerBlog: 'Blog',
        footerReturns: 'Return Policy',
        footerTerms: 'Terms',
        footerTagline: 'New&#8226;Used&#8226;Repair&#8226;PC&#8226;Build',
        footerCopy: 'All rights reserved.'
      };

  placeholder.innerHTML = `
<section class="contact" id="contact" data-locale="${isArabic ? 'ar' : 'en'}">
  <div class="contact-header">
    <span class="contact-eyebrow">${copy.sectionEyebrow}</span>
    <h2>${copy.sectionTitle}</h2>
    <p>${copy.intro}</p>
  </div>
  <div class="contact-container">
    <div class="contact-info">
      <div class="contact-methods">
        <div class="contact-method">
          <img src="/images/Header/call-logo.png" alt="${copy.phoneAlt}" class="contact-icon-small">
          <a href="tel:+971528026677" dir="ltr">${copy.phoneLabel}</a>
        </div>
        <div class="contact-method">
          <img src="/images/Header/whatsapp-logo.png" alt="${copy.whatsappAlt}" class="contact-icon-small">
          <a href="${copy.whatsappHref}" target="_blank" rel="noopener noreferrer">${copy.whatsappLabel}</a>
        </div>
        <div class="contact-method">
          <img src="/images/Header/map-logo.png" alt="${copy.mapAlt}" class="contact-icon-small">
          <a href="https://maps.app.goo.gl/e5Rhfo8YY3i8CatM7?g_st=ic" target="_blank" rel="noopener noreferrer">${copy.mapLabel}</a>
        </div>
      </div>
      <div class="contact-assurance-list">
        <div class="contact-assurance-item">
          <strong>${copy.supportTitle1}</strong>
          <p>${copy.supportText1}</p>
        </div>
        <div class="contact-assurance-item">
          <strong>${copy.supportTitle2}</strong>
          <p>${copy.supportText2}</p>
        </div>
        <div class="contact-assurance-item">
          <strong>${copy.supportTitle3}</strong>
          <p>${copy.supportText3}</p>
        </div>
      </div>
    </div>
    <div class="address">
      <span class="location-badge">${copy.locationBadge}</span>
      <h3>${copy.visitTitle}</h3>
      <p class="store-name">${copy.storeName}</p>
      <p class="store-address">${copy.addressLine1}</p>
      <p class="store-address">${copy.addressLine2}</p>
      <div class="store-convenience">
        <span>${copy.storeTag1}</span>
        <span>${copy.storeTag2}</span>
        <span>${copy.storeTag3}</span>
      </div>
      <div id="store-status"></div>
      <div id="working-hours" class="hours"></div>
    </div>
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.231830114033!2d55.1992671!3d25.0848627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6dc0bc49a6d5%3A0x158c13f2d688b32e!2sPZM%20Computer%20Phone%20Trading%20%26%20Repair%20(Sell%2CUsed%2CNew%2CBuild)!5e0!3m2!1sen!2sae!4v1715590341023!5m2!1sen!2sae"
        title="${copy.mapTitle}"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>
</section>

<footer>
  <div class="footer-inner">
    <div class="footer-logo">
      ${copy.storeName}
      <small>${copy.footerTagline}</small>
    </div>
    <div class="footer-links">
      <a href="${links.home}">${copy.footerHome}</a>
      <a href="${links.services}">${copy.footerServices}</a>
      <a href="${links.repair}">${copy.footerRepair}</a>
      <a href="${links.pcBuild}">${copy.footerPcBuild}</a>
      <a href="${links.areas}">${copy.footerAreas}</a>
      <a href="${links.blog}">${copy.footerBlog}</a>
      <a href="${links.returns}">${copy.footerReturns}</a>
      <a href="${links.terms}">${copy.footerTerms}</a>
    </div>
  </div>
  <div class="footer-bottom">
    ${copy.storeName} &copy; <span id="year"></span> ${copy.footerCopy}
  </div>
</footer>`;

  // Set the copyright year
  var yearEl = placeholder.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Load store-status.js to populate hours & open/closed badge
  if (!document.querySelector('script[data-store-status-loader="true"]')) {
    var script = document.createElement('script');
    script.src = '/js/store-status.js';
    script.dataset.storeStatusLoader = 'true';
    document.body.appendChild(script);
  }
})();
