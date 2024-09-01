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
      window.open('https://wa.me/971528026677?text=I%20would%20like%20an%20instant%20quotation', '_blank');
    }
  });

});


