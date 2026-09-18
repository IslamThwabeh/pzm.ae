// P Z M Computers & Mobile Phones - Sell New Used PC Build Navbar — Mobile menu toggle & dropdown handling

var LANGUAGE_SWITCH_ROUTES = {
    '/': '/ar/',
    '/index.html': '/ar/',
    '/about.html': '/ar/about.html',
    '/areas/al-barsha.html': '/ar/areas/al-barsha.html',
    '/services/': '/ar/services/',
    '/services/index.html': '/ar/services/',
    '/services/brand-new.html': '/ar/services/brand-new.html',
    '/iphone-18-pro-dubai.html': '/ar/iphone-18-pro-dubai.html',
    '/ar/iphone-18-pro-dubai.html': '/iphone-18-pro-dubai.html',
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
        var isChannelLink = anchor.hasAttribute('data-whatsapp-channel-link');
        var eventName = isChannelLink
            ? 'pzm_whatsapp_channel_click'
            : (contactType === 'whatsapp' ? 'pzm_whatsapp_click' : 'pzm_call_click');
        pushGaEvent(eventName, {
            event_category: 'engagement',
            event_label: isChannelLink ? (anchor.getAttribute('data-channel-placement') || 'sitewide') : href,
            link_text: label.slice(0, 120),
            page_path: window.location.pathname
        });
    }, true);
}

var WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbDKyOU6hENr1ktFAq1a';
var WHATSAPP_CHANNEL_SESSION_KEY = 'pzm_whatsapp_channel_popup_dismissed';

function isWhatsAppChannelPopupPage() {
    var robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta && (robotsMeta.getAttribute('content') || '').toLowerCase().indexOf('noindex') !== -1) {
        return false;
    }

    var pathname = normalizePathname(window.location.pathname);
    var exactPages = [
        '/', '/index.html', '/ar/', '/ar/index.html',
        '/about.html', '/ar/about.html',
        '/contact.html', '/contact-us.html', '/ar/contact.html', '/ar/contact-us.html',
        '/faq.html', '/ar/faq.html',
        '/blog.html', '/ar/blog.html'
    ];
    var sectionPrefixes = ['/services/', '/areas/', '/blog/', '/ar/services/', '/ar/areas/', '/ar/blog/'];

    return exactPages.indexOf(pathname) !== -1 || sectionPrefixes.some(function (prefix) {
        return pathname.indexOf(prefix) === 0;
    });
}

function wasWhatsAppChannelPopupDismissed() {
    try {
        return window.sessionStorage.getItem(WHATSAPP_CHANNEL_SESSION_KEY) === 'true';
    } catch (error) {
        return false;
    }
}

function rememberWhatsAppChannelPopupDismissal() {
    try {
        window.sessionStorage.setItem(WHATSAPP_CHANNEL_SESSION_KEY, 'true');
    } catch (error) {
        // The popup still closes when storage is unavailable.
    }
}

function installWhatsAppChannelPopupStyles() {
    if (document.getElementById('pzm-whatsapp-channel-popup-styles')) {
        return;
    }

    var style = document.createElement('style');
    style.id = 'pzm-whatsapp-channel-popup-styles';
    style.textContent = [
        '.pzm-channel-popup{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(15,23,42,.64);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s ease}',
        '.pzm-channel-popup.is-open{opacity:1;visibility:visible}',
        '.pzm-channel-popup-card{position:relative;width:min(100%,520px);max-height:calc(100dvh - 32px);overflow:auto;padding:34px;border:1px solid rgba(37,211,102,.24);border-radius:24px;background:linear-gradient(145deg,#effdf7 0%,#fff 58%,#eef9ff 100%);box-shadow:0 28px 80px rgba(15,23,42,.32);color:#0f172a;text-align:center;transform:translateY(14px) scale(.98);transition:transform .22s ease}',
        '.pzm-channel-popup.is-open .pzm-channel-popup-card{transform:translateY(0) scale(1)}',
        '.pzm-channel-popup-close{position:absolute;top:14px;inset-inline-end:14px;width:40px;height:40px;border:0;border-radius:50%;background:rgba(15,23,42,.07);color:#334155;font-size:25px;line-height:1;cursor:pointer}',
        '.pzm-channel-popup-icon{width:72px;height:72px;margin:0 auto 18px;display:grid;place-items:center;border-radius:22px;background:#25d366;color:#fff;box-shadow:0 12px 28px rgba(37,211,102,.28)}',
        '.pzm-channel-popup-icon svg{width:46px;height:46px}',
        '.pzm-channel-popup-kicker{display:inline-block;margin-bottom:8px;color:#08783f;font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}',
        '.pzm-channel-popup h2{margin:0 0 12px;color:#0f172a;font-size:clamp(1.55rem,5vw,2.15rem);line-height:1.2}',
        '.pzm-channel-popup-copy{margin:0 auto;color:#475569;line-height:1.7}',
        '.pzm-channel-popup-proof{margin:18px 0;padding:11px 14px;border-radius:12px;background:rgba(37,211,102,.1);color:#166534;font-size:.9rem;font-weight:750}',
        '.pzm-channel-popup-primary{display:flex;align-items:center;justify-content:center;width:100%;min-height:50px;padding:13px 20px;border-radius:13px;background:#128c4a;color:#fff!important;font-weight:800;text-decoration:none;box-shadow:0 9px 22px rgba(18,140,74,.24)}',
        '.pzm-channel-popup-later{margin-top:8px;padding:10px 16px;border:0;background:transparent;color:#64748b;font:inherit;font-weight:700;cursor:pointer}',
        '.pzm-channel-popup-note{margin:6px 0 0;color:#64748b;font-size:.76rem;line-height:1.5}',
        'html[dir="rtl"] .pzm-channel-popup-card{direction:rtl}',
        '@media(max-width:600px){.pzm-channel-popup{align-items:flex-end;padding:12px}.pzm-channel-popup-card{width:100%;padding:28px 20px 22px;border-radius:22px}.pzm-channel-popup-icon{width:62px;height:62px;margin-bottom:14px}.pzm-channel-popup-icon svg{width:40px;height:40px}.pzm-channel-popup-close{top:10px;inset-inline-end:10px}}',
        '@media(prefers-reduced-motion:reduce){.pzm-channel-popup,.pzm-channel-popup-card{transition:none}}'
    ].join('');
    document.head.appendChild(style);
}

function createWhatsAppChannelPopup() {
    if (!isWhatsAppChannelPopupPage() || wasWhatsAppChannelPopupDismissed() || document.getElementById('pzm-whatsapp-channel-popup')) {
        return;
    }

    var isArabic = document.documentElement.getAttribute('lang') === 'ar';
    var copy = isArabic ? {
        label: 'قناة واتساب مجانية',
        title: 'تابع أحدث عروض الهواتف في الإمارات',
        description: 'تابع قناة Used Apple Deals Dubai لعروض مختارة على iPhone وMacBook وأجهزة Apple المستعملة، مع تحديثات الأسعار والتوفر.',
        proof: 'ضمان 6 أشهر على اللوحة الأم للأجهزة المستعملة',
        action: 'تابع قناة واتساب',
        later: 'ربما لاحقاً',
        note: 'قد تتغير الأسعار والكميات. تأكد من التوفر وتفاصيل الضمان قبل الشراء.',
        close: 'إغلاق نافذة عروض واتساب',
        placement: 'popup-ar'
    } : {
        label: 'Free WhatsApp Channel',
        title: 'Get UAE phone offers on WhatsApp',
        description: 'Follow Used Apple Deals Dubai for selected iPhone, MacBook, and pre-owned Apple offers, plus price and stock updates.',
        proof: '6-month motherboard warranty on pre-owned items',
        action: 'Follow the WhatsApp Channel',
        later: 'Maybe later',
        note: 'Stock and prices can change. Confirm availability and warranty details before buying.',
        close: 'Close WhatsApp offers popup',
        placement: 'popup'
    };

    installWhatsAppChannelPopupStyles();

    var popup = document.createElement('div');
    popup.id = 'pzm-whatsapp-channel-popup';
    popup.className = 'pzm-channel-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    popup.setAttribute('aria-labelledby', 'pzm-channel-popup-title');
    popup.setAttribute('aria-describedby', 'pzm-channel-popup-description');
    popup.innerHTML = [
        '<div class="pzm-channel-popup-card">',
        '<button class="pzm-channel-popup-close" type="button" aria-label="' + copy.close + '">&times;</button>',
        '<div class="pzm-channel-popup-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6c-2.1 0-4.1-.6-5.8-1.7l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.7.1-1.9-.9-3.2-1.7-4.5-3.9-.3-.6.3-.6.9-1.9.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.3 3.4 1.5 3.7c.2.2 2.5 3.8 6 5.3 2.2.9 3 .9 4.1.8.7-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.4-.2-.7-.3Z"/></svg></div>',
        '<span class="pzm-channel-popup-kicker">' + copy.label + '</span>',
        '<h2 id="pzm-channel-popup-title">' + copy.title + '</h2>',
        '<p class="pzm-channel-popup-copy" id="pzm-channel-popup-description">' + copy.description + '</p>',
        '<p class="pzm-channel-popup-proof">' + copy.proof + '</p>',
        '<a class="pzm-channel-popup-primary" href="' + WHATSAPP_CHANNEL_URL + '" target="_blank" rel="noopener noreferrer" data-whatsapp-channel-link data-channel-placement="' + copy.placement + '">' + copy.action + '</a>',
        '<button class="pzm-channel-popup-later" type="button">' + copy.later + '</button>',
        '<p class="pzm-channel-popup-note">' + copy.note + '</p>',
        '</div>'
    ].join('');

    var previousOverflow = document.body.style.overflow;
    var previouslyFocused = document.activeElement;
    var closeButton = popup.querySelector('.pzm-channel-popup-close');
    var laterButton = popup.querySelector('.pzm-channel-popup-later');
    var channelLink = popup.querySelector('[data-whatsapp-channel-link]');

    function closePopup(reason, trackDismiss) {
        rememberWhatsAppChannelPopupDismissal();
        popup.classList.remove('is-open');
        document.body.style.overflow = previousOverflow;
        document.removeEventListener('keydown', onPopupKeydown);
        if (trackDismiss !== false) {
            pushGaEvent('pzm_whatsapp_channel_popup_dismiss', {
                event_category: 'engagement',
                event_label: reason,
                page_path: window.location.pathname
            });
        }
        window.setTimeout(function () {
            if (popup.parentNode) popup.parentNode.removeChild(popup);
            if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
        }, 240);
    }

    closeButton.addEventListener('click', function () { closePopup('close_button'); });
    laterButton.addEventListener('click', function () { closePopup('maybe_later'); });
    popup.addEventListener('click', function (event) {
        if (event.target === popup) closePopup('backdrop');
    });
    channelLink.addEventListener('click', function () { closePopup('channel_click', false); });
    function onPopupKeydown(event) {
        if (event.key === 'Escape' && popup.parentNode) {
            closePopup('escape_key');
            return;
        }
        if (event.key === 'Tab' && popup.parentNode) {
            var focusable = [closeButton, channelLink, laterButton];
            var currentIndex = focusable.indexOf(document.activeElement);
            if (event.shiftKey && currentIndex <= 0) {
                event.preventDefault();
                focusable[focusable.length - 1].focus();
            } else if (!event.shiftKey && currentIndex === focusable.length - 1) {
                event.preventDefault();
                focusable[0].focus();
            }
        }
    }
    document.addEventListener('keydown', onPopupKeydown);

    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(function () {
        popup.classList.add('is-open');
        closeButton.focus();
    });
    pushGaEvent('pzm_whatsapp_channel_popup_view', {
        event_category: 'engagement',
        event_label: isArabic ? 'popup-ar' : 'popup',
        page_path: window.location.pathname
    });
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
    if (isWhatsAppChannelPopupPage() && !wasWhatsAppChannelPopupDismissed()) {
        window.setTimeout(createWhatsAppChannelPopup, 2500);
    }

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
