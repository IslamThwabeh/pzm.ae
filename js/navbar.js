// PZM Navbar — Mobile menu toggle & dropdown handling

var LANGUAGE_SWITCH_ROUTES = {
    '/': '/ar/',
    '/index.html': '/ar/',
    '/services/': '/ar/services/',
    '/services/index.html': '/ar/services/',
    '/services/repair.html': '/ar/services/repair.html',
    '/services/buy-iphone.html': '/ar/services/buy-iphone.html',
    '/services/buy-used.html': '/ar/services/buy-used.html',
    '/return-policy.html': '/ar/return-policy.html',
    '/terms.html': '/ar/terms.html',
    '/ar/': '/',
    '/ar/index.html': '/',
    '/ar/services/': '/services/',
    '/ar/services/index.html': '/services/',
    '/ar/services/repair.html': '/services/repair.html',
    '/ar/services/buy-iphone.html': '/services/buy-iphone.html',
    '/ar/services/buy-used.html': '/services/buy-used.html',
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
