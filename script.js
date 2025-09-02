document.addEventListener('DOMContentLoaded', () => {

    // Hero Slider
    const heroSliderEl = document.querySelector('.hero-swiper-container');
    if (heroSliderEl) {
        const heroSwiper = new Swiper(heroSliderEl, {
            effect: 'slide',
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.hero-swiper-container .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1.2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            },
            observer: true,
            observeParents: true,
        });

        const header = document.querySelector('.sticky-top');
        const sliderSection = document.querySelector('.hero-slider-section');
        if (header && sliderSection) {
            const headerHeight = header.offsetHeight;
            sliderSection.style.paddingTop = `${headerHeight + 20}px`;
        }
    }

    // Why Us Section (Counters)
    const counters = document.querySelectorAll('.why-us-section .number[data-count]');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000;
                    let current = 0;
                    const stepTime = 16; // roughly 60fps
                    const increment = target / (duration / stepTime);

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString() + suffix;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Testimonials Slider
    const testimonialsSliderEl = document.querySelector('.testimonials-swiper-container');
    if (testimonialsSliderEl) {
        const equalizeSlideHeights = (swiper) => {
            setTimeout(() => {
                const slides = swiper.slides;
                let maxHeight = 0;
                slides.forEach(slide => { slide.style.height = 'auto'; });
                slides.forEach(slide => { if (slide.offsetHeight > maxHeight) maxHeight = slide.offsetHeight; });
                slides.forEach(slide => { slide.style.height = `${maxHeight}px`; });
            }, 300);
        };

        const swiper = new Swiper(testimonialsSliderEl, {
            loop: true,
            loopedSlides: 8,
            grabCursor: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonials-swiper-container .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 }
            },
            on: {
                init: equalizeSlideHeights,
                resize: equalizeSlideHeights
            }
        });
    }

    

});
