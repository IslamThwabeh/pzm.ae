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

    // Always keep dropdown visible on mobile for testing
    if (window.innerWidth <= 768) {
        servicesDropdown.classList.add('active');
        const dropdownContent = servicesDropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.style.display = 'block';
        }
    }

    // Toggle dropdown on mobile
    function toggleDropdown(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            servicesDropdown.classList.add('active');
            const dropdownContent = servicesDropdown.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'block';
            }
        }
    }

    servicesLink.addEventListener('touchstart', toggleDropdown, { passive: false });
    servicesLink.addEventListener('click', toggleDropdown);

    // Keep dropdown visible on orientation change
    window.addEventListener('orientationchange', () => {
        if (window.innerWidth <= 768) {
            servicesDropdown.classList.add('active');
            const dropdownContent = servicesDropdown.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'block';
            }
        }
    });

    window.addEventListener('scroll', onScroll, { passive: true });
});