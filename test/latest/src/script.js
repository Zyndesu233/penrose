document.addEventListener('DOMContentLoaded', function() {

    // --- Sticky Header Shadow (Optional: if you want shadow on scroll) ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'var(--shadow-soft)'; // Revert to initial or none
            }
        });
    }

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('#main-header nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });

        // Close mobile nav when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileNavToggle.classList.remove('active');
                }
            });
        });
    }


    // --- Lazy Loading for Content Rows ---
    const lazyLoadRows = document.querySelectorAll('.lazy-load');

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // 10% of the item is visible
        rootMargin: '0px 0px -50px 0px' // Trigger a bit before it's fully in view
    });

    lazyLoadRows.forEach(row => {
        lazyLoadObserver.observe(row);
    });


    // --- Testimonial Carousel ---
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.testimonial-slide');
        const prevButton = carousel.querySelector('.carousel-controls .prev');
        const nextButton = carousel.querySelector('.carousel-controls .next');
        let currentIndex = 0;
        let autoSlideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function startAutoSlide() {
            stopAutoSlide(); // Clear existing interval
            autoSlideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (slides.length > 0) {
            showSlide(currentIndex); // Show the first slide initially
            if (prevButton && nextButton) {
                prevButton.addEventListener('click', () => {
                    prevSlide();
                    startAutoSlide(); // Restart auto-slide on manual navigation
                });
                nextButton.addEventListener('click', () => {
                    nextSlide();
                    startAutoSlide(); // Restart auto-slide
                });
            }
            startAutoSlide(); // Start auto-sliding

            // Optional: Pause on hover
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
        }
    }

    // --- Update Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling for Nav Links (if not already handled by html scroll-behavior) ---
    // Note: CSS `scroll-behavior: smooth;` is generally preferred.
    // This is an alternative or fallback.
    /*
    const navLinks = document.querySelectorAll('#main-header nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    */

    // --- Add subtle hover effects to cards/buttons (already mostly CSS) ---
    // Example: Add a class on hover for more complex JS animations if needed
    // For now, CSS :hover is sufficient for the requested effects.

    // --- Micro-interactions (e.g., button press) ---
    // This can be achieved with CSS active states as well.
    // Example: .btn:active { transform: scale(0.98); }
    // No specific JS needed for simple cases based on current design.

});