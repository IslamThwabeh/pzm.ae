document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.services-slider');
    const images = slider.querySelectorAll('img');
    const leftButton = document.createElement('button');
    const rightButton = document.createElement('button');

    leftButton.classList.add('slider-button', 'left');
    rightButton.classList.add('slider-button', 'right');
    leftButton.textContent = '<';
    rightButton.textContent = '>';

    slider.appendChild(leftButton);
    slider.appendChild(rightButton);

    let index = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    leftButton.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : images.length - 1;
        showImage(index);
    });

    rightButton.addEventListener('click', () => {
        index = (index < images.length - 1) ? index + 1 : 0;
        showImage(index);
    });

    function autoScroll() {
        index = (index < images.length - 1) ? index + 1 : 0;
        showImage(index);
    }

    setInterval(autoScroll, 3000); // Change image every 3 seconds

    showImage(index);
});

