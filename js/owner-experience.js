(function () {
  'use strict';
  document.querySelectorAll('.repair-enquiry').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var values = new FormData(form);
      var ar = document.documentElement.lang === 'ar';
      var device = form.getAttribute('data-device');
      var message = ar
        ? 'مرحباً، أحتاج صيانة ' + device + '. الموديل: ' + values.get('model') + '. المشكلة: ' + values.get('issue') + '. يرجى توضيح التقييم والسعر والوقت المتوقع والضمان.'
        : 'Hi, I need ' + device + ' repair. Model: ' + values.get('model') + '. Issue: ' + values.get('issue') + '. Please explain the assessment, price, estimated timing and warranty.';
      var href = 'https://wa.me/971528026677?text=' + encodeURIComponent(message + ' (via pzm.ae)');
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'pzm_whatsapp_click', { event_category: 'engagement', event_label: href, page_path: location.pathname });
        window.gtag('event', 'generate_lead', { service: device + ' Repair', method: 'WhatsApp', page_path: location.pathname });
      }
      window.open(href, '_blank', 'noopener,noreferrer');
    });
  });
  document.querySelectorAll('.product-enquiry').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof window.gtag !== 'function') return;
      var item = { item_name: link.getAttribute('data-model'), item_variant: link.getAttribute('data-variant') };
      window.gtag('event', 'select_item', { items: [item] });
      window.gtag('event', 'generate_lead', { item_name: item.item_name, method: 'WhatsApp', page_path: location.pathname });
    });
  });
})();
