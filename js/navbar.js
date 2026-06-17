// P Z M Computers & Mobile Phones -Sell New Used PC Build Navbar — Mobile menu toggle & dropdown handling

var LANGUAGE_SWITCH_ROUTES = {
    '/': '/ar/',
    '/index.html': '/ar/',
    '/about.html': '/ar/about.html',
    '/areas/al-barsha.html': '/ar/areas/al-barsha.html',
    '/services/': '/ar/services/',
    '/services/index.html': '/ar/services/',
    '/services/brand-new.html': '/ar/services/brand-new.html',
    '/services/buy-iphone.html': '/ar/services/buy-iphone.html',
    '/services/buy-used.html': '/ar/services/buy-used.html',
    '/services/used-iphone-al-barsha.html': '/ar/services/used-iphone-al-barsha.html',
    '/services/gaming-pc.html': '/ar/services/gaming-pc.html',
    '/services/sell-gadgets.html': '/ar/services/sell-gadgets.html',
    '/services/accessories.html': '/ar/services/accessories.html',
    '/blog.html': '/ar/blog/',
    '/return-policy.html': '/ar/return-policy.html',
    '/terms.html': '/ar/terms.html',
    '/ar/': '/',
    '/ar/index.html': '/',
    '/ar/about.html': '/about.html',
    '/ar/areas/al-barsha.html': '/areas/al-barsha.html',
    '/ar/services/': '/services/',
    '/ar/services/index.html': '/services/',
    '/ar/services/brand-new.html': '/services/brand-new.html',
    '/ar/services/buy-iphone.html': '/services/buy-iphone.html',
    '/ar/services/buy-used.html': '/services/buy-used.html',
    '/ar/services/used-iphone-al-barsha.html': '/services/used-iphone-al-barsha.html',
    '/ar/services/gaming-pc.html': '/services/gaming-pc.html',
    '/ar/services/sell-gadgets.html': '/services/sell-gadgets.html',
    '/ar/services/accessories.html': '/services/accessories.html',
    '/ar/blog/': '/blog.html',
    '/ar/return-policy.html': '/return-policy.html',
    '/ar/terms.html': '/terms.html'
};

function normalizePathname(pathname) {
    if (!pathname || pathname === '') {
        return '/';
    }

    if (pathname !== '/' && pathname.slice(-11) === '/index.html') {
        return pathname.slice(0, -10);
    }

    if (pathname !== '/' && pathname.slice(-1) !== '/' && pathname.slice(-5) !== '.html') {
        return pathname + '/';
    }

    return pathname;
}

function getLanguageSwitchConfig() {
    var pathname = normalizePathname(window.location.pathname);
    var isArabicPage = document.documentElement.getAttribute('lang') === 'ar' || pathname === '/ar/' || pathname.indexOf('/ar/') === 0;

    return {
        href: LANGUAGE_SWITCH_ROUTES[pathname] || (isArabicPage ? '/' : '/ar/'),
        label: isArabicPage ? 'English' : 'العربية',
        lang: isArabicPage ? 'en' : 'ar',
        dir: isArabicPage ? 'ltr' : 'rtl'
    };
}

function addLanguageSwitchLink() {
    var navLinks = document.getElementById('navLinks');
    if (!navLinks || navLinks.querySelector('[data-language-switch="true"]')) {
        return;
    }

    var config = getLanguageSwitchConfig();
    var link = document.createElement('a');
    link.href = config.href;
    link.textContent = config.label;
    link.setAttribute('lang', config.lang);
    link.setAttribute('dir', config.dir);
    link.setAttribute('data-language-switch', 'true');
    navLinks.appendChild(link);
}

function pushGaEvent(eventName, payload) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
        return;
    }

    if (Array.isArray(window.dataLayer)) {
        var fallbackPayload = Object.assign({ event: eventName }, payload || {});
        window.dataLayer.push(fallbackPayload);
    }
}

function classifyContactHref(href) {
    if (!href) {
        return null;
    }

    var normalizedHref = href.toLowerCase();
    if (normalizedHref.indexOf('tel:') === 0) {
        return 'phone';
    }

    if (normalizedHref.indexOf('wa.me/') !== -1 || normalizedHref.indexOf('whatsapp.com/') !== -1) {
        return 'whatsapp';
    }

    return null;
}

function installContactClickTracking() {
    if (window.__pzmContactTrackingInstalled) {
        return;
    }

    window.__pzmContactTrackingInstalled = true;

    document.addEventListener('click', function (event) {
        if (!event.target || typeof event.target.closest !== 'function') {
            return;
        }

        var anchor = event.target.closest('a[href]');
        if (!anchor) {
            return;
        }

        var rawHref = anchor.getAttribute('href') || '';
        var contactType = classifyContactHref(rawHref);
        if (!contactType) {
            return;
        }

        var href = anchor.href || rawHref;
        var label = (anchor.textContent || '').replace(/\s+/g, ' ').trim();
        pushGaEvent(contactType === 'whatsapp' ? 'pzm_whatsapp_click' : 'pzm_call_click', {
            event_category: 'engagement',
            event_label: href,
            link_text: label.slice(0, 120),
            page_path: window.location.pathname
        });
    }, true);
}

function toggleMenu() {
    var navLinks = document.getElementById('navLinks');
    var navActions = document.getElementById('navActions');
    var isOpening = !navLinks.classList.contains('open');

    navLinks.classList.toggle('open');
    navActions.classList.toggle('open');

    // Move nav-actions to body when open (escapes backdrop-filter containing block)
    if (isOpening) {
        document.body.appendChild(navActions);
    } else {
        document.querySelector('.navbar-inner').appendChild(navActions);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    addLanguageSwitchLink();
    installContactClickTracking();

    if (document.documentElement.getAttribute('lang') === 'ar') {
        var phoneAction = document.querySelector('#navActions .btn-login[href^="tel:"]');
        if (phoneAction && phoneAction.textContent.trim() === 'اتصل بنا') {
            phoneAction.textContent = 'اتصل بالمتجر';
        }
    }

    // Close mobile menu on link click
    var navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.querySelectorAll('a:not(.nav-dropdown-trigger)').forEach(function (link) {
            link.addEventListener('click', function () {
                document.getElementById('navLinks').classList.remove('open');
                document.getElementById('navActions').classList.remove('open');
            });
        });
    }

    // Handle mobile dropdown toggle
    var dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
    dropdownTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                var dropdown = trigger.closest('.nav-dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menus on resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            var navLinks = document.getElementById('navLinks');
            var navActions = document.getElementById('navActions');
            if (navLinks) navLinks.classList.remove('open');
            if (navActions) {
                navActions.classList.remove('open');
                // Return nav-actions to navbar if it was moved to body
                var navbarInner = document.querySelector('.navbar-inner');
                if (navActions.parentNode !== navbarInner) {
                    navbarInner.appendChild(navActions);
                }
            }
            document.querySelectorAll('.nav-dropdown').forEach(function (d) {
                d.classList.remove('active');
            });
        }
    });
});
