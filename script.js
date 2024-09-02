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
    let initialX = 0, initialY = 0, posX = 0, posY = 0;
    let isDragging = false;
    
    // Set initial positions
    let initialTop = element.offsetTop;
    let initialLeft = element.offsetLeft;

    // Set the transition time based on device type
    const transitionTime = window.innerWidth >= 1024 ? '2s' : '1s';
    element.style.transition = `top ${transitionTime}, left ${transitionTime}`;

    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        isDragging = true;

        // Get initial touch/mouse positions
        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;

        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;

        // Disable the transition during dragging
        element.style.transition = 'none';
    }

    function elementDrag(e) {
        if (!isDragging) return;

        // Calculate new cursor positions
        posX = initialX - (e.clientX || e.touches[0].clientX);
        posY = initialY - (e.clientY || e.touches[0].clientY);

        // Set the element's new position
        element.style.top = `${element.offsetTop - posY}px`;
        element.style.left = `${element.offsetLeft - posX}px`;

        // Update initial positions for the next iteration
        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;
    }

    function closeDragElement() {
        isDragging = false;

        // Enable the transition after dragging
        element.style.transition = `top ${transitionTime}, left ${transitionTime}`;

        // Ensure the element stays within bounds after dragging
        if (element.offsetTop < 0) element.style.top = '0px';
        if (element.offsetLeft < 0) element.style.left = '0px';
        if (element.offsetTop + element.offsetHeight > window.innerHeight) {
            element.style.top = `${window.innerHeight - element.offsetHeight}px`;
        }
        if (element.offsetLeft + element.offsetWidth > window.innerWidth) {
            element.style.left = `${window.innerWidth - element.offsetWidth}px`;
        }

        // Remove event listeners
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
    }
}

// Initialize draggable functionality on the banner
makeDraggable(document.getElementById('quotation-banner'));


});


