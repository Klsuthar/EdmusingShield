// Modern JavaScript for Edumusing Website
// Optimized for performance and smooth animations

function adjustContentForHeader() {
    const header = document.querySelector('.sticky-top');
    const heroBanner = document.querySelector('.hero-banner');
    if (header && heroBanner) {
        const headerHeight = header.offsetHeight;
        heroBanner.style.marginTop = headerHeight + 'px';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = document.querySelector('.sticky-top').offsetHeight;
                    let targetPosition = targetSection.offsetTop - headerHeight;
                    if (targetId !== "#home") {
                        targetPosition -= 20;
                    }
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    function initHeaderEffects() {
        const header = document.querySelector('.sticky-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // ===== ANIMATED COUNTER (WITH "+" SIGN FIX) =====
    function animateCounters() {
        const counters = document.querySelectorAll('.number[data-count]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            // THIS IS THE FIX: It gets the "+" from the HTML and adds it at the end
                            const suffix = counter.getAttribute('data-suffix') || '';
                            counter.textContent = target.toLocaleString() + suffix;
                        }
                    };
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => counterObserver.observe(counter));
    }

    function initCardEffects() {
        const cards = document.querySelectorAll('.feature-card, .course-card, .testimonial');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            });
        });
    }

    function initButtonEffects() {
        const buttons = document.querySelectorAll('.primary-cta, .course-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                ripple.style.cssText = `position: absolute; width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px; background: rgba(255, 255, 255, 0.3); border-radius: 50%; transform: scale(0); animation: ripple 0.6s ease-out; pointer-events: none;`;
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    function initScrollReveal() {
        const style = document.createElement('style');
        style.textContent = `.scroll-reveal { opacity: 0; transform: translateY(50px); transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); } .scroll-reveal.animate-in { opacity: 1; transform: translateY(0); } .scroll-reveal-left { opacity: 0; transform: translateX(-50px); transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); } .scroll-reveal-left.animate-in { opacity: 1; transform: translateX(0); } .scroll-reveal-right { opacity: 0; transform: translateX(50px); transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); } .scroll-reveal-right.animate-in { opacity: 1; transform: translateX(0); } .scroll-reveal-scale { opacity: 0; transform: scale(0.8); transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); } .scroll-reveal-scale.animate-in { opacity: 1; transform: scale(1); } @keyframes ripple { to { transform: scale(2); opacity: 0; } }`;
        document.head.appendChild(style);
        document.querySelectorAll('section').forEach(section => section.classList.add('scroll-reveal'));
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.classList.add('scroll-reveal-scale');
            card.style.transitionDelay = `${index * 150}ms`;
        });
        document.querySelectorAll('.testimonial').forEach((testimonial, index) => {
            testimonial.classList.add(index % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right');
        });
        const founderImage = document.querySelector('.founder-image');
        const founderText = document.querySelector('.founder-text');
        if (founderImage) founderImage.classList.add('scroll-reveal-left');
        if (founderText) founderText.classList.add('scroll-reveal-right');
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => scrollObserver.observe(el));
    }

    function initLogoAnimation() {
        const logo = document.querySelector('.logo-section img');
        if (logo) {
            logo.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(360deg) scale(1.1)';
                this.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            });
            logo.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0deg) scale(1)';
            });
        }
    }

    function initAccreditationSlider() {
        const items = document.querySelectorAll('.accred-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                items.forEach(other => { if (other !== item) other.style.opacity = '0.3'; });
            });
            item.addEventListener('mouseleave', () => {
                items.forEach(other => other.style.opacity = '0.7');
            });
        });
    }

    function optimizePerformance() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
            scrollTimeout = requestAnimationFrame(() => {});
        }, { passive: true });
    }

    function init() {
        adjustContentForHeader();
        initSmoothScroll();
        initHeaderEffects();
        animateCounters();
        initCardEffects();
        initButtonEffects();
        initScrollReveal();
        initLogoAnimation();
        initAccreditationSlider();
        optimizePerformance();
        document.body.classList.add('loaded');
    }

    init();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        adjustContentForHeader();
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {}, 250);
    });
});