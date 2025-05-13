// Use requestAnimationFrame for smoother header animations
document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    let ticking = false;
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesLink = servicesDropdown.querySelector('a');

    function updateHeader() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Don't hide elements when at the top of the page
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            nav.style.transform = 'translateY(0)';
            lastScrollTop = 0;
            ticking = false;
            return;
        }

        // Determine scroll direction
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            requestAnimationFrame(() => {
                if (!servicesDropdown.classList.contains('active')) {
                    header.style.transform = `translateY(-${header.offsetHeight}px)`;
                    nav.style.transform = `translateY(-${header.offsetHeight}px)`;
                }
                ticking = false;
            });
        } else {
            // Scrolling up
            requestAnimationFrame(() => {
                header.style.transform = 'translateY(0)';
                nav.style.transform = 'translateY(0)';
                ticking = false;
            });
        }
        
        lastScrollTop = currentScroll;
    }

    // Throttle scroll events
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Toggle dropdown on mobile
    function toggleDropdown(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            servicesDropdown.classList.toggle('active');
            
            if (servicesDropdown.classList.contains('active')) {
                header.style.transform = 'translateY(0)';
                nav.style.transform = 'translateY(0)';
            }
            
            e.stopPropagation();
        }
    }

    // Handle mobile touch events for services dropdown
    servicesLink.addEventListener('touchstart', toggleDropdown, { passive: false });
    servicesLink.addEventListener('click', toggleDropdown);

    // Close dropdown when touching outside
    document.addEventListener('touchstart', (e) => {
        if (!servicesDropdown.contains(e.target)) {
            servicesDropdown.classList.remove('active');
        }
    }, { passive: true });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!servicesDropdown.contains(e.target)) {
            servicesDropdown.classList.remove('active');
        }
    });

    // Close dropdown when scrolling
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            servicesDropdown.classList.remove('active');
        }
    }, { passive: true });

    window.addEventListener('scroll', onScroll, { passive: true });
});