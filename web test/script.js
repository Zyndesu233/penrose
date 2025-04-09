document.addEventListener('DOMContentLoaded', () => {
    // --- Dark/Light Mode Toggle ---
    const modeToggleButton = document.getElementById('mode-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    modeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme); // Save preference
    });

    // --- Update Copyright Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animated');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // When element comes into view
                if (entry.isIntersecting) {
                    // The animation class is already set in CSS,
                    // we just need to ensure it's visible or add an active class if needed.
                    // For this setup, the animation starts automatically when the
                    // 'animated' class is present and the element scrolls into view.
                    // No extra class needed here, but you *could* add one like 'animate-active'
                    // and trigger animations based on that if more control is needed.
                    // entry.target.classList.add('animate-active');

                    // Optional: Stop observing after animation triggered once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
            // rootMargin: '0px 0px -50px 0px' // Optional: adjust trigger point
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // You could simply make elements visible or skip animations
        animatedElements.forEach(element => {
            element.style.opacity = '1'; // Make visible immediately
        });
        console.warn("IntersectionObserver not supported, animations might not trigger on scroll.");
    }

    // --- Simple Hero Construction Animation Trigger (Example) ---
    // You might want more complex JS logic for a sophisticated animation,
    // but the CSS handles the basic example provided.
    // If needed, you could trigger classes or manipulate elements here.
    const heroAnimation = document.querySelector('.construction-schedule-anim');
    if (heroAnimation) {
        // Example: Add a class after a delay to ensure elements are ready
        setTimeout(() => {
            heroAnimation.classList.add('animation-started'); // Add a class if needed by more complex JS/CSS
        }, 300); // Small delay
    }

    // --- Smooth Scrolling (Optional) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's an internal link and not just '#'
            if (hrefAttribute && hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                 e.preventDefault(); // Prevent default jump
                 document.querySelector(hrefAttribute).scrollIntoView({
                     behavior: 'smooth'
                 });
            } else if (hrefAttribute === '#index' || hrefAttribute === '#demo' || hrefAttribute === '#signin') {
                // These might link to other pages or specific sections not yet created.
                // Allow default behavior or handle navigation differently if needed.
                console.log(`Navigation placeholder for: ${hrefAttribute}`);
                // If these are actual page links, remove the preventDefault() for them.
                // e.preventDefault(); // Keep this commented out if they are actual page links.
            }
        });
    });

}); // End DOMContentLoaded