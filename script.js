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


	
// Function to make the quotation-banner draggable

function makeDraggable(element) {
    let initialX = 0, initialY = 0, currentX = 0, currentY = 0;
    let isDragging = false;
    
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;  // For touch devices

    function dragMouseDown(e) {
        e.preventDefault();
        isDragging = true;

        // Get initial positions when drag starts
        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;

        // Attach event listeners for dragging
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;  // For touch devices
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;  // For touch devices

        // Remove transition during dragging
        element.style.transition = "none";
    }

    function elementDrag(e) {
        if (!isDragging) return;

        // Calculate movement
        currentX = (e.clientX || e.touches[0].clientX) - initialX;
        currentY = (e.clientY || e.touches[0].clientY) - initialY;

        // Update element's position
        element.style.top = (element.offsetTop + currentY) + "px";
        element.style.left = (element.offsetLeft + currentX) + "px";

        // Update initial positions for next movement
        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;
    }

    function closeDragElement() {
        isDragging = false;

        // Reapply transition for smooth movement after drag ends
        element.style.transition = "top 0.2s ease, left 0.2s ease";

        // Detach event listeners when dragging ends
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
    }
}

// Initialize draggable functionality on the banner
makeDraggable(document.getElementById('quotation-banner'));


});


