document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slides img');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    setInterval(nextSlide, 3000); // Change slide every 3 seconds

    // Show the first slide
    showSlide(currentSlide);

    // Get the current year and set it in the footer
    const currentYear = new Date().getFullYear();
    document.getElementById('year').textContent = currentYear;


    const headerImages = document.querySelectorAll('.fixed-header img');

    setInterval(() => {
        headerImages.forEach(img => img.classList.add('no-shake'));
        setTimeout(() => {
            headerImages.forEach(img => img.classList.remove('no-shake'));
        }, 2000); // Adjust timing to match the animation duration
    }, 5000); // Shake interval in milliseconds


    //add shaking for GIF	
let banner = document.getElementById('quotation-banner');
let isDragging = false;
let isClicking = true;  // To differentiate between drag and click
let offsetX, offsetY;

// Handle mouse events
banner.addEventListener('mousedown', function(e) {
    isDragging = true;
    isClicking = true;
    offsetX = e.clientX - banner.getBoundingClientRect().left;
    offsetY = e.clientY - banner.getBoundingClientRect().top;
    banner.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        isClicking = false;
        banner.style.top = (e.clientY - offsetY) + 'px';
        banner.style.left = (e.clientX - offsetX) + 'px';
        banner.style.bottom = 'unset'; // Reset bottom to allow movement
        banner.style.right = 'unset';  // Reset right to allow movement
    }
});

document.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        banner.style.cursor = 'pointer';

        // Snap to top or bottom
        if (window.innerHeight - banner.getBoundingClientRect().top > window.innerHeight / 2) {
            banner.style.bottom = '20px';
            banner.style.top = 'unset';
        } else {
            banner.style.top = '20px';
            banner.style.bottom = 'unset';
        }

        // Snap to left or right
        if (window.innerWidth - banner.getBoundingClientRect().left > window.innerWidth / 2) {
            banner.style.right = '20px';
            banner.style.left = 'unset';
        } else {
            banner.style.left = '20px';
            banner.style.right = 'unset';
        }

        setTimeout(() => {
            isClicking = true; // Reset isClicking after drag ends
        }, 100);
    }
});

// Handle click event for redirection
banner.addEventListener('click', function(e) {
    if (!isClicking) {
        e.preventDefault(); // Prevent click redirection during drag
    }
});

// Handle touch events
banner.addEventListener('touchstart', function(e) {
    let touch = e.touches[0];
    isDragging = true;
    isClicking = true;
    offsetX = touch.clientX - banner.getBoundingClientRect().left;
    offsetY = touch.clientY - banner.getBoundingClientRect().top;
});

document.addEventListener('touchmove', function(e) {
    if (isDragging) {
        isClicking = false;
        let touch = e.touches[0];
        banner.style.top = (touch.clientY - offsetY) + 'px';
        banner.style.left = (touch.clientX - offsetX) + 'px';
        banner.style.bottom = 'unset'; // Reset bottom to allow movement
        banner.style.right = 'unset';  // Reset right to allow movement
    }
});

document.addEventListener('touchend', function() {
    if (isDragging) {
        isDragging = false;

        // Snap to top or bottom
        if (window.innerHeight - banner.getBoundingClientRect().top > window.innerHeight / 2) {
            banner.style.bottom = '20px';
            banner.style.top = 'unset';
        } else {
            banner.style.top = '20px';
            banner.style.bottom = 'unset';
        }

        // Snap to left or right
        if (window.innerWidth - banner.getBoundingClientRect().left > window.innerWidth / 2) {
            banner.style.right = '20px';
            banner.style.left = 'unset';
        } else {
            banner.style.left = '20px';
            banner.style.right = 'unset';
        }

        setTimeout(() => {
            isClicking = true; // Reset isClicking after drag ends
        }, 100);
    }
});
});


