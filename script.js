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
let offsetX, offsetY;

// Handle mouse events
banner.addEventListener('mousedown', function(e) {
    startDrag(e.clientX, e.clientY);
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        moveBanner(e.clientX, e.clientY);
    }
});

document.addEventListener('mouseup', function() {
    endDrag();
});

// Handle touch events
banner.addEventListener('touchstart', function(e) {
    let touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
});

document.addEventListener('touchmove', function(e) {
    if (isDragging) {
        let touch = e.touches[0];
        moveBanner(touch.clientX, touch.clientY);
    }
});

document.addEventListener('touchend', function() {
    endDrag();
});

// Common functions for drag logic
function startDrag(clientX, clientY) {
    isDragging = true;
    offsetX = clientX - banner.getBoundingClientRect().left;
    offsetY = clientY - banner.getBoundingClientRect().top;
    banner.style.cursor = 'grabbing';
}

function moveBanner(clientX, clientY) {
    banner.style.top = (clientY - offsetY) + 'px';
    banner.style.left = (clientX - offsetX) + 'px';
    banner.style.bottom = 'unset'; // Reset bottom to allow movement
    banner.style.right = 'unset';  // Reset right to allow movement
}

function endDrag() {
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
    }
}


});


