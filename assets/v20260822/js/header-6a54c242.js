document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesLink = servicesDropdown ? servicesDropdown.querySelector('a') : null;

    if (!header || !nav) {
        return;
    }

    // Handle services dropdown
    if (servicesDropdown && servicesLink) {
        servicesLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                servicesDropdown.classList.toggle('active');

                // Close other dropdowns
                document.querySelectorAll('.services-dropdown').forEach(dropdown => {
                    if (dropdown !== servicesDropdown) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        });
    }

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (servicesDropdown && !servicesDropdown.contains(e.target)) {
            servicesDropdown.classList.remove('active');
        }
    });

    // Close menus on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && servicesDropdown) {
            servicesDropdown.classList.remove('active');
        }
    });

    // Handle scroll behavior
    let lastScrollTop = 0;
    let ticking = false;
    let hideTimer = null;

    function showHeader() {
        header.style.transform = 'translateY(0)';
        nav.style.transform = 'translateY(0)';
    }

    function hideHeader() {
        const headerHeight = header.offsetHeight;
        const navHeight = nav.offsetHeight;

        // Move each bar fully above viewport.
        header.style.transform = `translateY(-${headerHeight}px)`;
        nav.style.transform = `translateY(-${headerHeight + navHeight}px)`;
    }

    function scheduleAutoHide(currentScroll) {
        if (hideTimer) {
            clearTimeout(hideTimer);
        }

        // Keep header visible only when we are exactly at top.
        if (currentScroll <= 0) {
            return;
        }

        hideTimer = setTimeout(() => {
            hideHeader();
        }, 2500);
    }

    function updateHeader() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll <= 0) {
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
            showHeader();
            lastScrollTop = 0;
            return;
        }

        if (currentScroll > lastScrollTop) {
            // Scrolling down
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
            hideHeader();
        } else {
            // Scrolling up
            showHeader();
            scheduleAutoHide(currentScroll);
        }

        lastScrollTop = currentScroll;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});