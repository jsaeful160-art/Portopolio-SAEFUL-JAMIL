// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 0, 21, 0.7)';
        navbar.style.backdropFilter = 'blur(40px)';
    } else {
        navbar.style.background = 'rgba(10, 0, 21, 0.4)';
        navbar.style.backdropFilter = 'blur(30px)';
    }
});

// 3D Card Tilt Effect dengan Mouse Movement
const cards3D = document.querySelectorAll('.card-3d-container');

cards3D.forEach(card => {
    // Desktop 3D Effect
    if (window.innerWidth > 768) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

            const rotateX = -y * 12;
            const rotateY = x * 12;

            this.querySelector('.card-3d').style.transform = 
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) perspective(1000px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-3d').style.transform = 
                'rotateX(0) rotateY(0) scale(1) perspective(1000px)';
        });
    }

    // Mobile Touch Effect
    if (window.innerWidth <= 768) {
        card.addEventListener('touchstart', function() {
            this.querySelector('.card-3d').style.transform = 
                'scale(1.02) perspective(1000px)';
        });

        card.addEventListener('touchend', function() {
            this.querySelector('.card-3d').style.transform = 
                'scale(1) perspective(1000px)';
        });
    }
});

// Intersection Observer untuk Animasi Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
    observer.observe(card);
});

// Cursor follow effect untuk kartu (Desktop only)
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        document.querySelectorAll('.card-front').forEach(card => {
            card.style.boxShadow = `
                ${(x - 0.5) * 50}px 
                ${(y - 0.5) * 50}px 
                60px rgba(99, 102, 241, ${0.2 + x * 0.2}),
                0 0 40px rgba(236, 72, 153, ${0.1 + y * 0.1})
            `;
        });
    });
}

// Handle window resize untuk responsive behavior
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset card transforms on resize
        document.querySelectorAll('.card-3d').forEach(card => {
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    }, 250);
});

// Optimize animations untuk mobile
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.querySelectorAll('*').forEach(el => {
        if (el.style.animation) {
            const animDuration = el.style.animationDuration;
            if (animDuration) {
                el.style.animationDuration = (parseFloat(animDuration) * 0.75) + 's';
            }
        }
    });
}
