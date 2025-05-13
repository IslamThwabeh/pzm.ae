document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesLink = servicesDropdown.querySelector('a');

    // Create and add menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.textContent = 'Menu';
    nav.insertBefore(menuToggle, nav.firstChild);

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        servicesDropdown.classList.remove('active');
    });

    // Handle services dropdown
    servicesLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            servicesDropdown.classList.toggle('active');
        }
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            nav.classList.remove('open');
            servicesDropdown.classList.remove('active');
        }
    });

    // Close menus on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('open');
            servicesDropdown.classList.remove('active');
        }
    });

    // Handle scroll behavior
    let lastScrollTop = 0;
    let ticking = false;

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
            // Scrolling down
            if (!nav.classList.contains('open')) {
                requestAnimationFrame(() => {
                    header.style.transform = `translateY(-${header.offsetHeight}px)`;
                    nav.style.transform = `translateY(-${header.offsetHeight}px)`;
                    ticking = false;
                });
            }
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