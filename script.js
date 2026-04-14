// Smooth Scroll Navigation
const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetPosition = document.querySelector(targetId).offsetTop;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
};

// 3D Card Tilt Effect
const tiltCards = () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            const tiltX = (y - 0.5) * 20;
            const tiltY = (x - 0.5) * -20;

            card.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
        });
    });
};

// Intersection Observer for Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');
    const options = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Responsive Touch Events
const enableTouchEvents = () => {
    const touchElements = document.querySelectorAll('.touch-item');

    touchElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.classList.add('touched');
        });
        element.addEventListener('touchend', () => {
            element.classList.remove('touched');
        });
    });
};

// Initialize Functions
const init = () => {
    smoothScroll();
    tiltCards();
    animateOnScroll();
    enableTouchEvents();
};

document.addEventListener('DOMContentLoaded', init);