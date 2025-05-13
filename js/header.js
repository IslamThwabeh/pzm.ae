document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    let ticking = false;
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesLink = servicesDropdown.querySelector('a');
    let touchStartY = 0;
    let touchEndY = 0;

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

    // Improved mobile dropdown handling
    function toggleDropdown(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            
            const wasActive = servicesDropdown.classList.contains('active');
            
            // Close all dropdowns first
            document.querySelectorAll('.services-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            if (!wasActive) {
                servicesDropdown.classList.add('active');
            }
        }
    }

    // Enhanced touch event handling
    servicesLink.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        toggleDropdown(e);
    }, { passive: false });

    servicesLink.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        if (Math.abs(touchEndY - touchStartY) < 10) {
            toggleDropdown(e);
        }
    }, { passive: false });

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
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.innerWidth <= 768) {
                servicesDropdown.classList.remove('active');
            }
        }, 150);
    }, { passive: true });

    window.addEventListener('scroll', onScroll, { passive: true });

    // Close dropdown when window is resized
    window.addEventListener('resize', () => {
        servicesDropdown.classList.remove('active');
    }, { passive: true });
});