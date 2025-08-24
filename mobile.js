// mobile.js - Scripts for mobile-specific functionality

document.addEventListener('DOMContentLoaded', function() {
    
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Function to toggle the menu
    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body from scrolling when the menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Toggle menu on hamburger click
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', toggleMenu);
    }

    // Close the menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Disable the desktop header's hide-on-scroll functionality for mobile
    function handleMobileHeader() {
        const header = document.querySelector('.sticky-top');
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // The '!important' in mobile.css is the primary fix.
            // This JS ensures the transform style is set to none if it was added by script.js
            header.style.transform = 'translateY(0)';
        }
    }
    
    // Run on initial load and on window resize
    handleMobileHeader();
    window.addEventListener('resize', handleMobileHeader);
});