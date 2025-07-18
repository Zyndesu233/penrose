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

    // --- Intersection Observer Options ---
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px', // margin around root. Values are similar to css property.
        threshold: 0.1 // percentage of target's visibility the observer must cross
    };

    // --- JS-Driven Lazy Loading using Intersection Observer ---
    const lazyLoadTargets = document.querySelectorAll('.lazy-load');

    const lazyLoadCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;

                console.log(`Lazy loading: ${targetElement.tagName} - ${targetElement.dataset.src || targetElement.dataset.iconName || targetElement.dataset.logoName || 'Element'}`); // Log which element is loading

                // Handle IMG tags specifically
                if (targetElement.tagName === 'IMG' && targetElement.dataset.src) {
                    targetElement.src = targetElement.dataset.src;
                    targetElement.removeAttribute('data-src'); // Clean up
                }
                // Add logic here for other elements if needed:
                // e.g., loading background images for divs:
                // if (targetElement.classList.contains('some-background-div') && targetElement.dataset.bgSrc) {
                //    targetElement.style.backgroundImage = `url(${targetElement.dataset.bgSrc})`;
                // }
                // e.g., initializing a widget or loading content via fetch for a div placeholder

                targetElement.classList.add('loaded'); // Mark as loaded (triggers CSS opacity change)
                targetElement.classList.remove('lazy-load'); // Remove observer target class

                // Stop observing the loaded element
                observer.unobserve(targetElement);
            }
        });
    };

    if ('IntersectionObserver' in window && lazyLoadTargets.length > 0) {
        const lazyLoadObserver = new IntersectionObserver(lazyLoadCallback, observerOptions);
        lazyLoadTargets.forEach(target => {
            lazyLoadObserver.observe(target);
        });
    } else {
        // Fallback for browsers without IntersectionObserver or if no targets
        console.warn("IntersectionObserver not supported or no .lazy-load elements found. Loading all elements immediately.");
        lazyLoadTargets.forEach(target => {
             // Immediately load the content as a fallback
             if (target.tagName === 'IMG' && target.dataset.src) {
                 target.src = target.dataset.src;
                 target.removeAttribute('data-src');
             }
             target.classList.add('loaded');
             target.classList.remove('lazy-load');
        });
    }


    // --- Intersection Observer for Animations (Separate Observer) ---
    const animatedElements = document.querySelectorAll('.animated');

    const animationCallback = (entries, observer) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation class is already on the element,
                // it will play automatically when opacity changes or based on keyframes.
                // We just need to ensure the element is observed.
                // console.log("Animating:", entry.target); // Optional log
                observer.unobserve(entry.target); // Stop observing after animation should have triggered
            }
        });
    };

    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        // Use slightly different threshold? Maybe trigger animation sooner? Optional.
        const animationObserver = new IntersectionObserver(animationCallback, { threshold: 0.15 /* Example: trigger slightly earlier */ });
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for animations
        console.warn("IntersectionObserver not supported or no .animated elements found. Animations might not trigger on scroll.");
        animatedElements.forEach(element => {
            element.style.opacity = '1'; // Make visible if animations depend on observer setting opacity
        });
    }


    // --- Smooth Scrolling (Optional) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute && hrefAttribute.length > 1 && hrefAttribute.startsWith('#')) {
                try {
                    const targetElement = document.querySelector(hrefAttribute);
                    if (targetElement) {
                        e.preventDefault(); // Prevent default jump only if target exists
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                         console.log(`Smooth scroll target "${hrefAttribute}" not found.`);
                    }
                } catch (error) {
                    console.error(`Error finding or scrolling to ${hrefAttribute}:`, error);
                }
            } else {
                 // Allow default behavior for external links or simple "#" links
                 console.log(`Anchor default behavior for: ${hrefAttribute}`);
            }
        });
    });

}); // End DOMContentLoaded