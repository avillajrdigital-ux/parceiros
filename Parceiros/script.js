document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));


    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateStats = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for Stats
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        let options = {
            root: null,
            threshold: 0.4
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(statsSection);
    }

    // Smooth Header Background on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll Reveal Animation
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');

        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);

    // Trigger once on load
    reveal();

});
