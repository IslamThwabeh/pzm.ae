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



function makeDraggable(element) {
    let posX = 0, posY = 0, initialX = 0, initialY = 0;
    let isDragging = false;

    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        isDragging = true;

        // Get the initial cursor position
        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;

        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;

        element.style.transition = "none"; // Disable transition during dragging
    }

    function elementDrag(e) {
        if (!isDragging) return;

        posX = initialX - (e.clientX || e.touches[0].clientX);
        posY = initialY - (e.clientY || e.touches[0].clientY);

        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;

        element.style.top = (element.offsetTop - posY) + "px";
        element.style.left = (element.offsetLeft - posX) + "px";
    }

    function closeDragElement() {
        isDragging = false;
        element.style.transition = "top 0.2s ease, left 0.2s ease";
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

makeDraggable(document.getElementById('quotation-banner'));



});


