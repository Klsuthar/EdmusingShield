// slider.js - FINAL FIX for Testimonials slider

document.addEventListener('DOMContentLoaded', function () {
    
    // Function to make all slides have the same height
    function equalizeSlideHeights(swiper) {
        // Use a timeout to make sure all images are loaded
        setTimeout(() => {
            const slides = swiper.slides;
            let maxHeight = 0;

            // Reset heights first to get the natural height
            slides.forEach(slide => {
                slide.style.height = 'auto';
            });

            // Find the maximum height among all slides
            slides.forEach(slide => {
                if (slide.offsetHeight > maxHeight) {
                    maxHeight = slide.offsetHeight;
                }
            });

            // Apply the maximum height to all slides
            slides.forEach(slide => {
                slide.style.height = `${maxHeight}px`;
            });
        }, 300); // A small delay ensures content is rendered
    }

    const swiper = new Swiper('.swiper-container', {
        loop: true,
        grabCursor: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Responsive Breakpoints
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 }
        },

        // This is the most important part: run the height function
        on: {
            init: function () {
                equalizeSlideHeights(this);
            },
            resize: function () {
                equalizeSlideHeights(this);
            }
        }
    });
});