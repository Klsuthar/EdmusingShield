// script for other-courses page
// Add any page-specific JS here

document.addEventListener('DOMContentLoaded', function() {
    // Animate WhatsApp button on scroll (optional)
    const stickyBtn = document.getElementById('stickyContactBtn');
    if (stickyBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                stickyBtn.style.boxShadow = '0 8px 24px rgba(161,140,209,0.18)';
            } else {
                stickyBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }
        });
    }

    // Card icon animation on hover (for touch devices)
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            card.classList.add('hover');
        });
        card.addEventListener('touchend', function() {
            card.classList.remove('hover');
        });
    });
});
