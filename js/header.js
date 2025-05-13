document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    let ticking = false;
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesLink = servicesDropdown.querySelector('a');

    function updateHeader() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            nav.style.transform = 'translateY(0)';
            lastScrollTop = 0;
            ticking = false;
            return;
        }

        if (currentScroll > lastScrollTop) {
            requestAnimationFrame(() => {
                header.style.transform = `translateY(-${header.offsetHeight}px)`;
                nav.style.transform = `translateY(-${header.offsetHeight}px)`;
                ticking = false;
            });
        } else {
            requestAnimationFrame(() => {
                header.style.transform = 'translateY(0)';
                nav.style.transform = 'translateY(0)';
                ticking = false;
            });
        }
        
        lastScrollTop = currentScroll;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Mobile dropdown handling
    function toggleDropdown(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            servicesDropdown.classList.toggle('active');
        }
    }

    // Add both click and touch events for better mobile support
    servicesLink.addEventListener('touchstart', toggleDropdown, { passive: false });
    servicesLink.addEventListener('click', toggleDropdown);

    // Close dropdown when clicking/touching outside
    document.addEventListener('click', (e) => {
        if (!servicesDropdown.contains(e.target)) {
            servicesDropdown.classList.remove('active');
        }
    });

    document.addEventListener('touchstart', (e) => {
        if (!servicesDropdown.contains(e.target)) {
            servicesDropdown.classList.remove('active');
        }
    }, { passive: true });

    // Close dropdown on scroll
    window.addEventListener('scroll', () => {
        servicesDropdown.classList.remove('active');
    }, { passive: true });

    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        servicesDropdown.classList.remove('active');
    });
});