document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slides img');
    const totalSlides = slides.length;
    
    // Create slide indicators
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slide-indicators';
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => showSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    document.querySelector('.slider').appendChild(indicatorsContainer);
    
    function showSlide(n) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.zIndex = 0;
        });
        document.querySelectorAll('.indicator').forEach(ind => ind.classList.remove('active'));
        
        // Reset to first slide if we've reached the end
        currentSlide = n >= totalSlides ? 0 : n < 0 ? totalSlides - 1 : n;
        
        // Show the current slide
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.zIndex = 1;
        document.querySelectorAll('.indicator')[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Add click handlers for next/prev buttons
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.slider');
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Add scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.category').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.classList.add(index % 2 === 0 ? 'animate-from-left' : 'animate-from-right');
        observer.observe(el);
    });

    document.querySelectorAll('section').forEach((el, index) => {
        if (!el.classList.contains('slider')) {
            el.classList.add('animate-on-scroll');
            el.classList.add('animate-from-bottom');
            observer.observe(el);
        }
    });
});