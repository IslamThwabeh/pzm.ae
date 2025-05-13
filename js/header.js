// Use requestAnimationFrame for smoother header animations
document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    let ticking = false;
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');

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
                header.style.transform = `translateY(-${header.offsetHeight}px)`;
                nav.style.transform = `translateY(-${header.offsetHeight}px)`;
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

    window.addEventListener('scroll', onScroll, { passive: true });
});