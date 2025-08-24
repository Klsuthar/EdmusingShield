// animation.js - For the hero banner subtle slider

document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.hero-banner');
    if (!banner) return;

    const slides = banner.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide

    function nextSlide() {
        if (slides.length === 0) return;
        
        // Fade out the current slide
        slides[currentSlide].classList.remove('active');

        // Move to the next slide, looping back to the start if necessary
        currentSlide = (currentSlide + 1) % slides.length;

        // Fade in the new slide
        slides[currentSlide].classList.add('active');
    }

    // Set the first slide as active immediately
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // Start the automatic slide transition
    setInterval(nextSlide, slideInterval);
});