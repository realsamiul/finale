/**
 * Standalone Studio Page JavaScript
 * High-performance scroll animations with 100% fidelity
 */

(function() {
    'use strict';

    // ===================================
    // PERFORMANCE SETUP
    // ===================================
    
    let ticking = false;
    let scrollY = 0;
    
    // Enable scrolling immediately
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

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
            }, 600);
        }
        
        // Trigger initial animations
        animateHero();
        setTimeout(updateOnScroll, 100);
    }
    
    images.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded);
        }
    });
    
    // Fallback
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            hidePreloader();
        }
    }, 3000);

    // ===================================
    // HERO ANIMATIONS
    // ===================================
    
    function animateHero() {
        const heroLines = document.querySelectorAll('.hero-line');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        heroLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.transform = 'translateY(0)';
                line.style.opacity = '1';
                line.style.transition = `transform 1.2s cubic-bezier(0.19, 1, 0.22, 1) ${index * 0.1}s, opacity 1.2s ${index * 0.1}s`;
            }, 300);
        });
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
                heroSubtitle.style.transition = 'opacity 1s ease 0.6s, transform 1s cubic-bezier(0.19, 1, 0.22, 1) 0.6s';
            }, 300);
        }
    }

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    
    function updateOnScroll() {
        scrollY = window.pageYOffset;
        
        // Animate story section
        animateElement('.story-label', 0.8);
        animateElement('.story-title', 0.75);
        document.querySelectorAll('.story-column').forEach((col, index) => {
            animateElement(col, 0.7, index * 0.1);
        });
        
        // Animate partners section
        animateElement('.section-heading', 0.8);
        document.querySelectorAll('.partner-category').forEach((partner, index) => {
            animateElement(partner, 0.75, index * 0.1);
        });
        
        // Animate philosophy items
        document.querySelectorAll('.philosophy-item').forEach((item, index) => {
            animateElement(item, 0.7, index * 0.05);
        });
        
        // Animate beliefs section
        animateElement('.beliefs-title', 0.75);
        document.querySelectorAll('.belief-card').forEach((card, index) => {
            animateElement(card, 0.7, index * 0.1);
        });
        
        // Animate team section
        animateElement('.team-label', 0.8);
        animateElement('.team-title', 0.75);
        animateElement('.team-description', 0.7);
        animateElement('.team-image', 0.65);
        
        // Animate CTA section
        animateElement('.cta-title', 0.75);
        
        ticking = false;
    }
    
    function animateElement(selector, threshold = 0.75, delay = 0) {
        const elements = typeof selector === 'string' 
            ? document.querySelectorAll(selector) 
            : [selector];
        
        elements.forEach(element => {
            if (!element) return;
            
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * threshold) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.style.transition = `opacity 0.8s ease ${delay}s, transform 1s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s`;
                }, 50);
            }
        });
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ===================================
    // CTA BUTTON INTERACTIONS
    // ===================================
    
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const circle = this.querySelector('.cta-circle');
            if (circle) {
                circle.style.width = '300%';
                circle.style.height = '300%';
            }
        });

        button.addEventListener('mouseleave', function() {
            const circle = this.querySelector('.cta-circle');
            if (circle) {
                circle.style.width = '0';
                circle.style.height = '0';
            }
        });
    });

    // ===================================
    // PHILOSOPHY IMAGE PARALLAX
    // ===================================
    
    const philosophyItems = document.querySelectorAll('.philosophy-item');
    philosophyItems.forEach(item => {
        const image = item.querySelector('.philosophy-image img');
        
        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });

        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // ===================================
    // SMOOTH ANCHOR SCROLLING
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    const heavyElements = document.querySelectorAll('.philosophy-image, .team-image, .hero-image');
    heavyElements.forEach(el => {
        el.style.backfaceVisibility = 'hidden';
        el.style.perspective = '1000px';
    });

    // Initial call
    document.body.style.opacity = '1';

})();