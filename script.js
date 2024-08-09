let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

let sliderInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

const sliderContainer = document.querySelector('.slider');

sliderContainer.addEventListener('mouseover', () => {
    clearInterval(sliderInterval);
});

sliderContainer.addEventListener('mouseout', () => {
    sliderInterval = setInterval(nextSlide, 3000);
});

