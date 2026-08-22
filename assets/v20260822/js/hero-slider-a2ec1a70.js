document.addEventListener('DOMContentLoaded', function () {
    const root = document.querySelector('.slider-lab');
    if (!root) return;

    const slides = Array.from(root.querySelectorAll('.slider-lab-slide'));
    const dotsContainer = root.querySelector('.slider-lab-dots');
    const caption = root.querySelector('.slider-lab-caption');
    const prev = root.querySelector('[data-action="prev"]');
    const next = root.querySelector('[data-action="next"]');
    const toggle = root.querySelector('[data-action="toggle"]');

    if (!slides.length || !dotsContainer || !caption || !prev || !next || !toggle) return;

    let index = 0;
    let timer = null;
    let playing = true;

    const dots = slides.map(function (_, i) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'slider-lab-dot' + (i === 0 ? ' is-active' : '');
        btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        btn.addEventListener('click', function () {
            show(i);
            restart();
        });
        dotsContainer.appendChild(btn);
        return btn;
    });

    function show(newIndex) {
        index = (newIndex + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === index);
            slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === index);
        });

        caption.textContent = slides[index].dataset.caption || '';
    }

    function start() {
        stop();
        timer = window.setInterval(function () {
            show(index + 1);
        }, 5000);
    }

    function stop() {
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
    }

    function restart() {
        if (playing) start();
    }

    prev.addEventListener('click', function () {
        show(index - 1);
        restart();
    });

    next.addEventListener('click', function () {
        show(index + 1);
        restart();
    });

    toggle.addEventListener('click', function () {
        playing = !playing;
        toggle.innerHTML = playing ? '&#10074;&#10074;' : '&#9654;';
        toggle.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
        if (playing) start();
        else stop();
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', restart);

    root.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            show(index - 1);
            restart();
        }
        if (event.key === 'ArrowRight') {
            show(index + 1);
            restart();
        }
    });

    let startX = 0;
    root.addEventListener('touchstart', function (event) {
        startX = event.changedTouches[0].screenX;
    }, { passive: true });

    root.addEventListener('touchend', function (event) {
        const delta = startX - event.changedTouches[0].screenX;
        if (Math.abs(delta) < 50) return;
        show(delta > 0 ? index + 1 : index - 1);
        restart();
    }, { passive: true });

    show(0);
    start();
});
