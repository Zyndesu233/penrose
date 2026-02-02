document.addEventListener('DOMContentLoaded', () => {
            
            // --- CONSTANTS & DOM ---
            const overlay = document.querySelector('#intro-overlay');
            const landingPage = document.querySelector('#content-in-index');
            const toast = document.querySelector('#pref-toast');
            
            const PREF_SKIP_INTRO = 'pref_skip_intro';
            const PREF_HIDE_TOAST = 'pref_hide_toast';

            // --- 1. INITIALIZATION CHECK ---
            
            // If user previously clicked "Disable intro"
            if (localStorage.getItem(PREF_SKIP_INTRO) === 'true') {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                landingPage.style.opacity = 1;
                landingPage.style.transform = 'scale(1)';
                return; // Exit script, no animation, no toast
            }

            // --- 2. TOAST LOGIC ---

            function showToast() {
                // Only show if user hasn't ticked "Don't show this again"
                if (localStorage.getItem(PREF_HIDE_TOAST) !== 'true') {
                    toast.classList.add('show');
                }
            }

            window.hideToast = () => {
                toast.classList.remove('show');
            }

            // Button: Disable Intro
            document.getElementById('btn-stop-anim').addEventListener('click', () => {
                localStorage.setItem(PREF_SKIP_INTRO, 'true');
                // We update the button text to confirm, then close
                const btn = document.getElementById('btn-stop-anim');
                btn.textContent = "Saved! Intro disabled.";
                btn.style.background = "#22c55e"; // Green success
                setTimeout(hideToast, 1200);
            });

            // Checkbox: Don't show toast
            document.getElementById('chk-no-toast').addEventListener('change', (e) => {
                if(e.target.checked) {
                    localStorage.setItem(PREF_HIDE_TOAST, 'true');
                } else {
                    localStorage.removeItem(PREF_HIDE_TOAST);
                }
            });


            // --- 3. ANIMATION SETUP ---
            
            function wrapLetters(element) {
                const processNode = (node) => {
                    if (node.nodeType === 3) { 
                        let text = node.textContent.replace(/\s+/g, ' ');
                        if (node === element.firstChild) text = text.trimStart();
                        if (node === element.lastChild) text = text.trimEnd();
                        if (!text) return; 
                        const frag = document.createDocumentFragment();
                        [...text].forEach(char => {
                            const span = document.createElement('span');
                            span.className = 'letter';
                            span.textContent = char === ' ' ? '\u00A0' : char;
                            frag.appendChild(span);
                        });
                        node.replaceWith(frag);
                    } else if (node.nodeType === 1 && node.tagName !== 'BR') {
                        Array.from(node.childNodes).forEach(processNode);
                    }
                };
                processNode(element);
            }
            wrapLetters(document.querySelector('.primary-msg'));
            wrapLetters(document.querySelector('.secondary-msg'));

            document.querySelector('.msg-container').style.opacity = 1;

            // --- 4. TIMELINE ---
            const tl = anime.timeline({ autoplay: true });

            tl
            // A. Primary Text
            .add({
                targets: '.primary-msg .letter:not(.keyword .letter)',
                translateY: ["1.1em", 0], translateZ: 0, opacity: [0, 1],
                easing: "easeOutExpo", duration: 1200, delay: anime.stagger(30)
            })
            // B. Keyword 3D Effect
            .add({
                targets: '.keyword .letter',
                rotateX: [90, 0], opacity: [0, 1], translateY: [50, 0],
                color: ['#ffffff', 'transparent'],
                easing: "easeOutBack(1.4)", duration: 1400, delay: anime.stagger(45)
            }, "-=1000")
            // C. Secondary Text
            .add({
                targets: '.secondary-msg .letter',
                translateY: ["20px", 0], opacity: [0, 1],
                easing: "easeOutQuad", duration: 1000, delay: anime.stagger(10)
            }, "-=800")
            // D. Hold
            .add({ duration: 1800 })
            // E. Reveal Dashboard
            .add({
                targets: '#intro-overlay', translateY: '-100%',
                duration: 1000, easing: 'easeInOutQuart',
                update: function(anim) {
                    if(anim.progress > 10) {
                        landingPage.style.opacity = (anim.progress - 10) / 90;
                        landingPage.style.transform = `scale(${0.95 + (0.05 * (anim.progress/100))})`;
                    }
                },
                complete: function() {
                    overlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    landingPage.style.opacity = 1;
                    landingPage.style.transform = 'scale(1)';
                    
                    // >> TRIGGER TOAST NOW <<
                    showToast();
                }
            });

            // --- 5. SKIP LOGIC ---
            function skipIntro() {
                if (tl.completed) return;
                tl.pause();
                anime({
                    targets: '#intro-overlay', opacity: 0, duration: 400, easing: 'linear',
                    complete: function() {
                        overlay.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        landingPage.style.opacity = 1;
                        landingPage.style.transform = 'scale(1)';
                        
                        // >> TRIGGER TOAST NOW (Even if skipped) <<
                        showToast();
                    }
                });
            }
            document.body.addEventListener('dblclick', skipIntro);
        });