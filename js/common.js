document.addEventListener('DOMContentLoaded', function() {
    const scriptTag = document.querySelector('script[src$="js/common.js"]');
    const basePath = scriptTag.getAttribute('data-base-path') || '';

    // Load Header
    fetch(basePath + 'header.html')
        .then(response => response.ok ? response.text() : Promise.reject('header.html not found'))
        .then(html => {
            // Create a temporary container to parse the HTML and fix paths
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Fix image paths by prepending the base path
            const images = tempDiv.querySelectorAll('img');
            images.forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    img.setAttribute('src', basePath + src);
                }
            });

            // Fix navigation links by prepending the base path
            const navLinksToFix = tempDiv.querySelectorAll('.navbar a');
            navLinksToFix.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
                    link.setAttribute('href', basePath + href);
                }
            });

            // --- Active Nav Link Logic ---
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = tempDiv.querySelectorAll('.nav-menu li a');

            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href') || '';
                // Get the base filename from the href, e.g., "about.html" from "../about.html"
                const linkPage = linkHref.split('/').pop();
                
                // Handle the case for the root index page
                const effectiveCurrentPage = currentPage === '' ? 'index.html' : currentPage;

                if (linkPage === effectiveCurrentPage) {
                    link.classList.add('active');
                }
            });

            // Inject the corrected HTML into the placeholder
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = tempDiv.innerHTML;
            }

            // --- Hamburger Menu Logic ---
            // This code runs *after* the header is loaded
            const hamburger = document.querySelector('.hamburger-menu');
            const navMenu = document.querySelector('.nav-menu');

            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                    // Optional: Prevent body scroll when menu is open
                    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
                });

                // Optional: Close menu when a link is clicked
                navMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        if (navMenu.classList.contains('active')) {
                            hamburger.classList.remove('active');
                            navMenu.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    });
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));

    

    // Load Footer
    fetch(basePath + 'footer.html')
        .then(response => response.ok ? response.text() : Promise.reject('footer.html not found'))
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const footerLinks = tempDiv.querySelectorAll('a');
            footerLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                    link.setAttribute('href', basePath + href);
                }
            });
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = tempDiv.innerHTML;
            }
        })
        .catch(error => console.error('Error loading footer:', error));

    // === Sticky Contact Button Animation ===
    (function() {
        const btn = document.getElementById('stickyContactBtn');
        if (!btn) return;

        // Configurable options
        const EXPAND_CLASS = '';
        const COLLAPSE_CLASS = 'collapsed';
        const expandTime = 5000; // ms
        const collapseTime = 3000; // ms
        const cycleDelay = 0; // ms between cycles

        let expanded = true;
        function toggleState() {
            expanded = !expanded;
            btn.classList.toggle(COLLAPSE_CLASS, !expanded);
        }

        function cycle() {
            toggleState();
            setTimeout(() => {
                toggleState();
                setTimeout(cycle, expanded ? collapseTime : expandTime);
            }, expanded ? collapseTime : expandTime);
        }

        // Start expanded, then collapse after 3s, then expand after 5s, repeat
        setTimeout(() => {
            btn.classList.add(COLLAPSE_CLASS);
            expanded = false;
            setTimeout(cycle, expandTime);
        }, collapseTime);
    })();
});