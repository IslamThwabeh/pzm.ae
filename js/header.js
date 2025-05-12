let lastScrollTop = 0;
let isScrolling;
let scrollTimeout;

// Function to handle scroll events
function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    const headerHeight = header.offsetHeight;
    const navHeight = nav.offsetHeight;
    
    // Don't hide elements when at the top of the page
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        nav.style.transform = 'translateY(0)';
        return;
    }

    // Determine scroll direction
    if (currentScroll > lastScrollTop) {
        // Scrolling down - hide both header and nav completely
        header.style.transform = `translateY(-${headerHeight + navHeight}px)`;
        nav.style.transform = `translateY(-${headerHeight + navHeight}px)`;
    } else {
        // Scrolling up - show both header and nav
        header.style.transform = 'translateY(0)';
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll;
    
    // Clear the previous timeout
    clearTimeout(scrollTimeout);
    
    // Set a timeout to run after scrolling ends
    scrollTimeout = setTimeout(() => {
        // Show both header and nav when scrolling stops
        header.style.transform = 'translateY(0)';
        nav.style.transform = 'translateY(0)';
    }, 150);
}

// Add scroll event listener with passive option for better performance
window.addEventListener('scroll', handleScroll, { passive: true });