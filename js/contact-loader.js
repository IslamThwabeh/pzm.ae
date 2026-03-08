// Loads the shared contact section + footer into any page
// Usage: <div id="contact-section"></div> then <script src="/js/contact-loader.js"></script>

(function () {
  const placeholder = document.getElementById('contact-section');
  if (!placeholder) return;

  fetch('/components/contact.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      placeholder.innerHTML = html;

      // Set the copyright year
      var yearEl = placeholder.querySelector('#year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // Load store-status.js to populate hours & open/closed badge
      var script = document.createElement('script');
      script.src = '/js/store-status.js';
      document.body.appendChild(script);
    })
    .catch(function (err) {
      console.error('Failed to load contact section:', err);
    });
})();
