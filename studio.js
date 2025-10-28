/**
 * Studio Page - 100% ExoApe Fidelity with GSAP + Lenis
 */

(function() {
    'use strict';

    // ===================================
    // GSAP SETUP
    // ===================================
    gsap.registerPlugin(ScrollTrigger);

    // ===================================
    // PRELOADER
    // ===================================
    let imagesLoaded = 0;
    let totalImages = 0;
    const preloader = document.querySelector('.preloader');
    const preloaderProgress = document.querySelector('.preloader-progress');
    
    const images = document.querySelectorAll('img');
    totalImages = images.length;
    
    function imageLoaded() {
        imagesLoaded++;
        const progress = (imagesLoaded / totalImages) * 100;
        
        if (preloaderProgress) {
            preloaderProgress.style.width = progress + '%';
        }
        
        if (imagesLoaded === totalImages) {
            setTimeout(hidePreloader, 500);
        }
    }
    
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
                initAnimations();
            }, 600);
        }
    }
    
    images.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded);
        }
    });
    
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            hidePreloader();
        }
    }, 3000);

    // ===================================
    // INITIALIZE ANIMATIONS
    // ===================================
    function initAnimations() {
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
        // HERO TITLE REVEAL (EXACT EXOAPE)
        // ===================================
        gsap.utils.toArray('.hero-line').forEach((line, index) => {
            gsap.from(line, {
                y: '120%',
                duration: 1.4,
                ease: 'power4.out',
                delay: 0.2 + (index * 0.15)
            });
        });

        // Hero subtitle
        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.7
        });

        // ===================================
        // STORY SECTION REVEALS
        // ===================================
        gsap.from('.story-label', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.story-label',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('.story-title', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.story-title',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.utils.toArray('.story-column').forEach((col, index) => {
            gsap.from(col, {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power3.out',
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: col,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // ===================================
        // PARTNERS SECTION
        // ===================================
        gsap.from('.section-heading', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.section-heading',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.utils.toArray('.partner-category').forEach((partner, index) => {
            gsap.from(partner, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: partner,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // ===================================
        // PHILOSOPHY SECTION (EXACT EXOAPE)
        // ===================================
        gsap.utils.toArray('.philosophy-item').forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: 100,
                duration: 1.4,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // ===================================
        // BELIEFS SECTION
        // ===================================
        gsap.from('.beliefs-title', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.beliefs-title',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.utils.toArray('.belief-card').forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // ===================================
        // TEAM SECTION
        // ===================================
        gsap.from('.team-label', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.team-label',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('.team-title', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.team-title',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('.team-description', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.team-description',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('.team-image', {
            opacity: 0,
            y: 80,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.team-image',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        // ===================================
        // CTA SECTION
        // ===================================
        gsap.from('.cta-title', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.cta-title',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
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
        const ctaButton = document.querySelector('.cta-button');

        if (ctaButton) {
            ctaButton.addEventListener('mousemove', (e) => {
                const rect = ctaButton.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                gsap.to(ctaButton, {
                    x: (x - rect.width / 2) * 0.2,
                    y: (y - rect.height / 2) * 0.2,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });

            ctaButton.addEventListener('mouseleave', () => {
                gsap.to(ctaButton, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        }
    }

})();