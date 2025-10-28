

/**
 * Standalone Homepage JavaScript
 * High-performance animations with 100% fidelity to original
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
    // SMOOTH SCROLL ANIMATIONS
    // ===================================
    
    function updateOnScroll() {
        scrollY = window.pageYOffset;
        
        // Hero parallax
        const heroImg = document.querySelector('.hero-image img');
        if (heroImg) {
            const heroSection = document.querySelector('.hero');
            const heroRect = heroSection.getBoundingClientRect();
            
            if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                const progress = -heroRect.top / heroSection.offsetHeight;
                heroImg.style.transform = `scale(${1.1 + progress * 0.1}) translateY(${progress * 50}px)`;
            }
        }

        // Reveal work title
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            const rect = line.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                setTimeout(() => {
                    line.style.transform = 'translateY(0)';
                    line.style.opacity = '1';
                    line.style.transition = `transform 1s cubic-bezier(0.19, 1, 0.22, 1) ${index * 0.1}s, opacity 1s ${index * 0.1}s`;
                }, 50);
            }
        });

        // Reveal project cards
        const projects = document.querySelectorAll('.project-card');
        projects.forEach((project, index) => {
            const rect = project.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                    project.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 1s cubic-bezier(0.19, 1, 0.22, 1) ${index * 0.1}s`;
                }, 50);
            }
        });

        // Hide scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(0, 1 - scrollY / 400);
            scrollIndicator.style.opacity = opacity;
        }

        ticking = false;
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
    // PROJECT CARD PARALLAX
    // ===================================
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const img = this.querySelector('.project-image img');
            if (img) {
                img.style.transform = `scale(1.05) translate(${deltaX * 10}px, ${deltaY * 10}px)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.project-image img');
            if (img) {
                img.style.transform = 'scale(1)';
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
    // INITIAL LOAD ANIMATIONS
    // ===================================
    
    window.addEventListener('load', function() {
        // Initial scroll update
        setTimeout(updateOnScroll, 100);
        
        // Fade in page
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
    });

    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // GPU acceleration for heavy elements
    const heavyElements = document.querySelectorAll('.hero-image, .project-image, .project-card');
    heavyElements.forEach(el => {
        el.style.backfaceVisibility = 'hidden';
        el.style.perspective = '1000px';
    });

    // Initial call
    updateOnScroll();

})();