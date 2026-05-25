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
        about: '/about.html',
        services: '/ar/services/',
        deviceCare: '/ar/services/repair.html',
        pcBuild: '/ar/services/gaming-pc.html',
        areas: '/ar/areas/',
        contact: '/contact-us.html',
        blog: '/ar/blog/',
        warranty: '/warranty-information.html',
        returns: '/ar/return-policy.html',
        privacy: '/privacy-policy.html',
        terms: '/ar/terms.html'
      }
    : {
        home: '/',
        about: '/about.html',
        services: '/services/index.html',
        deviceCare: '/services/repair.html',
        pcBuild: '/services/gaming-pc.html',
        areas: '/areas/index.html',
        contact: '/contact-us.html',
        blog: '/blog.html',
        warranty: '/warranty-information.html',
        returns: '/return-policy.html',
        privacy: '/privacy-policy.html',
        terms: '/terms.html'
      };

  const copy = isArabic
    ? {
        sectionEyebrow: 'زر المتجر أو اتصل أو راسلنا',
        sectionTitle: 'خطط لزيارتك إلى PZM',
        intro: 'ابدأ عبر واتساب لمعرفة التوفر والسعر أو تقييم جهازك قبل زيارة المتجر في البرشاء.',
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
        supportText1: 'اسأل عن السعر أو التوفر أو قيمة الاستبدال قبل أن تتحرك.',
        supportTitle2: 'خطوات واضحة',
        supportText2: 'نشرح الضمان والحالة وخيارات الاستلام قبل تأكيد الطلب.',
        supportTitle3: 'خيارات مرنة',
        supportText3: 'يمكنك الزيارة مباشرة أو ترتيب الاستلام أو التوصيل في الطلبات المتاحة.',
        storeTag1: 'زيارة مباشرة',
        storeTag2: 'مواقف سهلة',
        storeTag3: 'تنسيق الاستلام عند الطلب',
        mapTitle: 'خريطة موقع PZM Computers & Phones Store',
        footerHome: 'الرئيسية',
        footerAbout: 'من نحن',
        footerServices: 'الخدمات',
        footerDeviceCare: 'عناية الأجهزة',
        footerPcBuild: 'تجميع PC',
        footerAreas: 'المناطق',
        footerContact: 'اتصل بنا',
        footerBlog: 'المدونة',
        footerWarranty: 'معلومات الضمان',
        footerReturns: 'سياسة الإرجاع',
        footerPrivacy: 'الخصوصية',
        footerTerms: 'الشروط والأحكام',
        footerTagline: 'New&#8226;Used&#8226;Phone&#8226;PC&#8226;Trade-In',
        footerCopy: 'جميع الحقوق محفوظة.'
      }
    : {
        sectionEyebrow: 'Visit, Call or WhatsApp',
        sectionTitle: 'Plan Your Visit to PZM',
        intro: "Start on WhatsApp for stock checks, pricing, and trade-in guidance before you visit our Al Barsha store.",
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
        supportText1: 'Ask about stock, pricing, or trade-in value before you leave home.',
        supportTitle2: 'Clear expectations',
        supportText2: 'We explain warranty details, condition notes, and delivery options before you confirm.',
        supportTitle3: 'Flexible fulfilment',
        supportText3: 'Walk in, arrange store pickup, or ask about delivery where available.',
        storeTag1: 'Walk-in friendly',
        storeTag2: 'Easy parking',
        storeTag3: 'Pickup coordination on request',
        mapTitle: 'PZM Computers & Phones Store location map',
        footerHome: 'Home',
        footerAbout: 'About',
        footerServices: 'Services',
        footerDeviceCare: 'Device Care',
        footerPcBuild: 'PC Build',
        footerAreas: 'Areas',
        footerContact: 'Contact',
        footerBlog: 'Blog',
        footerWarranty: 'Warranty',
        footerReturns: 'Return Policy',
        footerPrivacy: 'Privacy',
        footerTerms: 'Terms',
        footerTagline: 'New&#8226;Used&#8226;Phone&#8226;PC&#8226;Trade-In',
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
      <a href="${links.about}">${copy.footerAbout}</a>
      <a href="${links.services}">${copy.footerServices}</a>
      <a href="${links.deviceCare}">${copy.footerDeviceCare}</a>
      <a href="${links.pcBuild}">${copy.footerPcBuild}</a>
      <a href="${links.areas}">${copy.footerAreas}</a>
      <a href="${links.contact}">${copy.footerContact}</a>
      <a href="${links.blog}">${copy.footerBlog}</a>
      <a href="${links.warranty}">${copy.footerWarranty}</a>
      <a href="${links.returns}">${copy.footerReturns}</a>
      <a href="${links.privacy}">${copy.footerPrivacy}</a>
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

  // Floating WhatsApp button — native CSS, instant load, no external dependency
  if (!document.getElementById('pzm-wa-float')) {
    var waStyle = document.createElement('style');
    waStyle.textContent = [
      '#pzm-wa-float{',
        'position:fixed;bottom:calc(24px + env(safe-area-inset-bottom, 0px));',
        isArabic ? 'left:calc(24px + env(safe-area-inset-left, 0px));' : 'right:calc(24px + env(safe-area-inset-right, 0px));',
        'z-index:9999;width:56px;height:56px;',
        'background:#25d366;border-radius:50%;',
        'display:flex;align-items:center;justify-content:center;',
        'box-shadow:0 4px 18px rgba(37,211,102,.45);',
        'transition:transform .2s,box-shadow .2s;text-decoration:none',
      '}',
      '#pzm-wa-float:hover{transform:translateY(-3px) scale(1.07);box-shadow:0 8px 28px rgba(37,211,102,.6)}',
      '#pzm-wa-float svg{width:30px;height:30px;fill:#fff}',
      '@media(max-width:480px){',
        '#pzm-wa-float{bottom:calc(18px + env(safe-area-inset-bottom, 0px));', isArabic ? 'left:calc(20px + env(safe-area-inset-left, 0px));' : 'right:calc(20px + env(safe-area-inset-right, 0px));', 'width:50px;height:50px}',
        '#pzm-wa-float svg{width:26px;height:26px}',
      '}'
    ].join('');
    document.head.appendChild(waStyle);
    var waBtn = document.createElement('a');
    waBtn.id = 'pzm-wa-float';
    waBtn.href = isArabic
      ? 'https://wa.me/971528026677?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85.%20(via%20pzm.ae)'
      : 'https://wa.me/971528026677?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20a%20device%20or%20service.%20(via%20pzm.ae)';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.setAttribute('aria-label', isArabic ? '\u0631\u0627\u0633\u0644\u0646\u0627 \u0639\u0644\u0649 \u0648\u0627\u062a\u0633\u0627\u0628' : 'Chat on WhatsApp');
    waBtn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(waBtn);
  }
})();
