// One lead event per customer click. The shared navbar handler records the WhatsApp click.
(function () {
  var lastClick = 0;
  if (document.body.querySelector('.launch-hero') && typeof window.gtag === 'function') {
    window.gtag('event', 'view_item', {
      items: [
        { item_name: 'iPhone 18 Pro' },
        { item_name: 'iPhone 18 Pro Max' }
      ]
    });
  }
  document.querySelectorAll('.launch-enquiry').forEach(function (link) {
    link.addEventListener('click', function () {
      var now = Date.now();
      if (now - lastClick < 800) return;
      lastClick = now;
      var model = link.getAttribute('data-model');
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'select_item', { items: [{ item_name: model }] });
        window.gtag('event', 'generate_lead', {
          item_name: model,
          method: 'WhatsApp',
          page_path: window.location.pathname
        });
      }
    });
  });
})();
