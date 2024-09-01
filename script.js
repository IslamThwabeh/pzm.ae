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

// Handle mouse down event (start dragging)
banner.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - banner.getBoundingClientRect().left;
    offsetY = e.clientY - banner.getBoundingClientRect().top;
    banner.style.cursor = 'grabbing';
});

// Handle mouse move event (dragging)
document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        banner.style.transition = 'none'; // Disable transition during drag
        banner.style.top = (e.clientY - offsetY) + 'px';
        banner.style.left = (e.clientX - offsetX) + 'px';
        banner.style.bottom = 'unset'; // Reset bottom to allow movement
        banner.style.right = 'unset';  // Reset right to allow movement
    }
});

// Handle mouse up event (stop dragging and snap to nearest corner)
document.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        banner.style.cursor = 'pointer';
        banner.style.transition = 'top 0.5s ease, left 0.5s ease'; // Add smooth transition

        // Get banner's current position
        let bannerRect = banner.getBoundingClientRect();

        // Calculate distances to corners
        let distanceToTop = bannerRect.top;
        let distanceToBottom = window.innerHeight - bannerRect.bottom;
        let distanceToLeft = bannerRect.left;
        let distanceToRight = window.innerWidth - bannerRect.right;

        // Snap to nearest corner with smooth transition
        if (distanceToTop < distanceToBottom) {
            banner.style.top = '20px';
            banner.style.bottom = 'unset';
        } else {
            banner.style.bottom = '20px';
            banner.style.top = 'unset';
        }

        if (distanceToLeft < distanceToRight) {
            banner.style.left = '20px';
            banner.style.right = 'unset';
        } else {
            banner.style.right = '20px';
            banner.style.left = 'unset';
        }
    }
});

// Prevent default click action if dragging occurred
banner.addEventListener('click', function(e) {
    if (isDragging) {
        e.preventDefault();
    }
});

// Handle touch start event (start dragging on mobile devices)
banner.addEventListener('touchstart', function(e) {
    let touch = e.touches[0];
    isDragging = true;
    offsetX = touch.clientX - banner.getBoundingClientRect().left;
    offsetY = touch.clientY - banner.getBoundingClientRect().top;
    banner.style.cursor = 'grabbing';
});

// Handle touch move event (dragging on mobile devices)
document.addEventListener('touchmove', function(e) {
    if (isDragging) {
        let touch = e.touches[0];
        banner.style.transition = 'none'; // Disable transition during drag
        banner.style.top = (touch.clientY - offsetY) + 'px';
        banner.style.left = (touch.clientX - offsetX) + 'px';
        banner.style.bottom = 'unset'; // Reset bottom to allow movement
        banner.style.right = 'unset';  // Reset right to allow movement
    }
});

// Handle touch end event (stop dragging and snap to nearest corner on mobile devices)
document.addEventListener('touchend', function() {
    if (isDragging) {
        isDragging = false;
        banner.style.cursor = 'pointer';
        banner.style.transition = 'top 0.5s ease, left 0.5s ease'; // Add smooth transition

        // Get banner's current position
        let bannerRect = banner.getBoundingClientRect();

        // Calculate distances to corners
        let distanceToTop = bannerRect.top;
        let distanceToBottom = window.innerHeight - bannerRect.bottom;
        let distanceToLeft = bannerRect.left;
        let distanceToRight = window.innerWidth - bannerRect.right;

        // Snap to nearest corner with smooth transition
        if (distanceToTop < distanceToBottom) {
            banner.style.top = '20px';
            banner.style.bottom = 'unset';
        } else {
            banner.style.bottom = '20px';
            banner.style.top = 'unset';
        }

        if (distanceToLeft < distanceToRight) {
            banner.style.left = '20px';
            banner.style.right = 'unset';
        } else {
            banner.style.right = '20px';
            banner.style.left = 'unset';
        }
    }
});


  const banner = document.getElementById("draggable-banner");

  let isDragging = false;

  banner.addEventListener("mousedown", function(e) {
    isDragging = true;
  });

  document.addEventListener("mousemove", function(e) {
    if (isDragging) {
      // Move the banner with the mouse
      banner.style.left = e.clientX - banner.offsetWidth / 2 + "px";
      banner.style.top = e.clientY - banner.offsetHeight / 2 + "px";
    }
  });

  document.addEventListener("mouseup", function() {
    // When the mouse button is released, stop dragging
    isDragging = false;
  });

  banner.addEventListener("click", function(e) {
    if (!isDragging) {
      // Redirect to WhatsApp only if not dragging
      window.location.href = "https://wa.me/your_whatsapp_number";
    }
  });

});


