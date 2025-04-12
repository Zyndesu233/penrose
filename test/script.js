document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;
    const fontSizeButtons = document.querySelectorAll('.font-size-switch button');
    const readMoreBtn = document.getElementById('read-more-btn');
    const reportNoteContent = document.getElementById('report-note-content');
    const copyrightYear = document.getElementById('copyright-year');
    const animatedDivs = document.querySelectorAll('.home-page .content-div.animated:not(.initial-animation)');
    const logoContainer = document.querySelector('.logo-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const initialVisibleLogos = 3;
    let scrollAmount = 0;
    let logoWidth = 0; // Will calculate later

    // --- Theme Persistence ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeCheckbox.checked = true;
        }
    }

    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Font Size Persistence ---
    const currentFontSize = localStorage.getItem('fontSize');
    if (currentFontSize) {
        body.setAttribute('data-font-size', currentFontSize);
        updateFontSizeButtons(currentFontSize);
    } else {
         updateFontSizeButtons('medium'); // Default
    }

    fontSizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const size = button.id.replace('font-', '');
            body.setAttribute('data-font-size', size);
            localStorage.setItem('fontSize', size);
            updateFontSizeButtons(size);
        });
    });

    function updateFontSizeButtons(activeSize) {
        fontSizeButtons.forEach(btn => {
            if (btn.id === `font-${activeSize}`) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // --- Read More / Collapse ---
    if (readMoreBtn && reportNoteContent) {
        const collapsiblePart = reportNoteContent.querySelector('.collapsible-content');

        // Check if collapsible content exists before adding listener
        if (collapsiblePart) {
             // Initially hide the collapsible content completely if JS is enabled
            collapsiblePart.style.display = 'none';
            collapsiblePart.style.maxHeight = null; // Remove max-height used for CSS only

            readMoreBtn.addEventListener('click', () => {
                reportNoteContent.classList.toggle('expanded');
                if (reportNoteContent.classList.contains('expanded')) {
                    readMoreBtn.textContent = 'Collapse';
                    collapsiblePart.style.display = 'block'; // Show content before expanding
                    // Trigger reflow to ensure transition works
                    void collapsiblePart.offsetWidth;
                    collapsiblePart.style.maxHeight = collapsiblePart.scrollHeight + "px"; // Expand
                } else {
                    readMoreBtn.textContent = 'Read More';
                    collapsiblePart.style.maxHeight = "0"; // Collapse
                     // Hide after transition ends
                    collapsiblePart.addEventListener('transitionend', () => {
                         if (!reportNoteContent.classList.contains('expanded')) {
                            collapsiblePart.style.display = 'none';
                         }
                    }, { once: true });
                }
            });
        } else {
            // If no collapsible content, hide the button
            readMoreBtn.style.display = 'none';
        }
    }


    // --- Copyright Year ---
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // --- Scroll Animation (Lazy Loading) ---
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
            // Optional: Add class removal if element scrolls out of view
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    animatedDivs.forEach(div => {
        scrollObserver.observe(div);
    });

    // --- Logo Scroller ---
    if (logoContainer && leftArrow && rightArrow) {
        const logos = logoContainer.querySelectorAll('img');

        function calculateLayout() {
             if (logos.length > 0) {
                const firstLogo = logos[0];
                 // Ensure image is loaded or has dimensions
                 if (firstLogo.offsetWidth > 0) {
                    const logoStyle = window.getComputedStyle(firstLogo);
                    const marginRight = parseInt(logoStyle.marginRight, 10) || 0;
                    logoWidth = firstLogo.offsetWidth + marginRight; // Width + margin

                    // Set initial transform if needed
                    logoContainer.style.transform = `translateX(0px)`;
                    scrollAmount = 0; // Reset scroll amount on resize
                    checkArrows();
                } else {
                    // If image not loaded yet, try again shortly
                    setTimeout(calculateLayout, 100);
                }
             }
        }

        function checkArrows() {
             if (!logoWidth) return; // Don't check if width not calculated

            const maxScroll = (logos.length - initialVisibleLogos) * logoWidth;
             // Disable left arrow if at the beginning
             leftArrow.disabled = scrollAmount >= 0;
             // Disable right arrow if at the end or not enough logos to scroll
             rightArrow.disabled = scrollAmount <= -maxScroll || logos.length <= initialVisibleLogos;

             // Add visual cue for disabled state (optional)
             leftArrow.style.opacity = leftArrow.disabled ? 0.5 : 1;
             rightArrow.style.opacity = rightArrow.disabled ? 0.5 : 1;
             leftArrow.style.cursor = leftArrow.disabled ? 'default' : 'pointer';
             rightArrow.style.cursor = rightArrow.disabled ? 'default' : 'pointer';
        }


        leftArrow.addEventListener('click', () => {
            if (leftArrow.disabled) return;
            scrollAmount += logoWidth * initialVisibleLogos; // Scroll by number of visible logos
            scrollAmount = Math.min(scrollAmount, 0); // Don't scroll past the beginning
            logoContainer.style.transform = `translateX(${scrollAmount}px)`;
            checkArrows();
        });

        rightArrow.addEventListener('click', () => {
            if (rightArrow.disabled) return;
            const maxScroll = (logos.length - initialVisibleLogos) * logoWidth;
            scrollAmount -= logoWidth * initialVisibleLogos; // Scroll by number of visible logos
            scrollAmount = Math.max(scrollAmount, -maxScroll); // Don't scroll past the end
            logoContainer.style.transform = `translateX(${scrollAmount}px)`;
            checkArrows();
        });

        // Calculate layout initially and on window resize
        calculateLayout();
        window.addEventListener('resize', calculateLayout);

        // Handle case where images load after initial calculation
        Array.from(logos).forEach(img => {
             img.addEventListener('load', calculateLayout);
        });
    }

});