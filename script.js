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
    let posX = 0, posY = 0, initialX = 0, initialY = 0;
    let isDragging = false;
    const transitionTime = window.innerWidth >= 1024 ? 2000 : 1000; // 2s for laptops, 1s for mobile

    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;  // For touch devices

    function dragMouseDown(e) {
        e.preventDefault();
        isDragging = true;
        
        // Get initial mouse or touch positions
        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;

        // Attach event listeners for dragging
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;  // For touch devices
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;  // For touch devices
    }

    function elementDrag(e) {
        if (!isDragging) return;
        
        // Calculate new positions
        posX = initialX - (e.clientX || e.touches[0].clientX);
        posY = initialY - (e.clientY || e.touches[0].clientY);
        initialX = e.clientX || e.touches[0].clientX;
        initialY = e.clientY || e.touches[0].clientY;

        // Move the element by changing its top and left properties
        element.style.top = (element.offsetTop - posY) + "px";
        element.style.left = (element.offsetLeft - posX) + "px";

        // Disable the transition during dragging
        element.style.transition = "none";
    }

    function closeDragElement() {
        isDragging = false;

        // Enable the slow-motion transition after dragging
        element.style.transition = `transform ${transitionTime}ms ease-in-out`;

        // Ensure the element stays within bounds after releasing
        if (element.offsetTop < 0) element.style.top = "0px";
        if (element.offsetLeft < 0) element.style.left = "0px";
        if (element.offsetTop + element.offsetHeight > window.innerHeight) {
            element.style.top = (window.innerHeight - element.offsetHeight) + "px";
        }
        if (element.offsetLeft + element.offsetWidth > window.innerWidth) {
            element.style.left = (window.innerWidth - element.offsetWidth) + "px";
        }

        // Remove the event listeners after dragging is finished
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
    }
}

// Call the makeDraggable function on the quotation banner element
makeDraggable(document.getElementById('quotation-banner'));


});


