/**
 * Home Page - 100% ExoApe Fidelity with GSAP + Lenis
 */

(function() {
    'use strict';

    // ===================================
    // GSAP SETUP
    // ===================================
    gsap.registerPlugin(ScrollTrigger);

    // ===================================
    // LENIS SMOOTH SCROLL (EXACT EXOAPE)
    // ===================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ===================================
    // HERO PARALLAX (EXACT EXOAPE)
    // ===================================
    gsap.to('.hero-image img', {
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
        }
    });

    // Scroll indicator fade
    gsap.to('.scroll-indicator', {
        opacity: 0,
        y: -20,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '20% top',
            scrub: 0.5
        }
    });

    // ===================================
    // WORK TITLE REVEAL (EXACT EXOAPE)
    // ===================================
    gsap.utils.toArray('.title-line').forEach((line, index) => {
        gsap.from(line, {
            y: '100%',
            duration: 1.2,
            ease: 'power4.out',
            delay: index * 0.1,
            scrollTrigger: {
                trigger: line,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ===================================
    // PROJECT CARDS STAGGER (EXACT EXOAPE)
    // ===================================
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ===================================
    // FOOTER TITLE REVEAL (EXACT EXOAPE)
    // ===================================
    gsap.utils.toArray('.footer-title-line').forEach((line, index) => {
        gsap.from(line, {
            y: '100%',
            duration: 1.2,
            ease: 'power4.out',
            delay: index * 0.1,
            scrollTrigger: {
                trigger: line,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // ===================================
    // MAGNETIC BUTTON EFFECT (EXACT EXOAPE)
    // ===================================
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        const circle = button.querySelector('.cta-circle');
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(button, {
                x: (x - rect.width / 2) * 0.2,
                y: (y - rect.height / 2) * 0.2,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });

    // ===================================
    // PAGE LOAD ANIMATION
    // ===================================
    window.addEventListener('load', () => {
        gsap.from('body', {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

})();