document.addEventListener('DOMContentLoaded', () => {
            
            // --- CONSTANTS & DOM ---
            const overlay = document.querySelector('#intro-overlay');
            const landingPage = document.querySelector('#content-in-index');
            const toast = document.querySelector('#pref-toast');
            const counterSpan = document.getElementById('counter-span');
            
            const PREF_SKIP_INTRO = 'pref_skip_intro';
            const PREF_HIDE_TOAST = 'pref_hide_toast';

            // --- 1. INITIALIZATION CHECK ---
            if (localStorage.getItem(PREF_SKIP_INTRO) === 'true') {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                landingPage.style.opacity = 1;
                landingPage.style.transform = 'scale(1)';
                return;
            }

            // --- 2. TOAST LOGIC ---
            function showToast() {
                if (localStorage.getItem(PREF_HIDE_TOAST) !== 'true') {
                    toast.classList.add('show');
                }
            }
            window.hideToast = () => toast.classList.remove('show');
            
            document.getElementById('btn-stop-anim').addEventListener('click', () => {
                localStorage.setItem(PREF_SKIP_INTRO, 'true');
                const btn = document.getElementById('btn-stop-anim');
                btn.textContent = "Saved! Intro disabled.";
                btn.style.background = "#22c55e";
                setTimeout(hideToast, 1200);
            });

            document.getElementById('chk-no-toast').addEventListener('change', (e) => {
                if(e.target.checked) localStorage.setItem(PREF_HIDE_TOAST, 'true');
                else localStorage.removeItem(PREF_HIDE_TOAST);
            });

            // --- 3. TEXT WRAPPING & PREP ---
            function wrapLetters(element) {
                const processNode = (node) => {
                    // Skip the counter span entirely so we don't break the number logic
                    if (node.id === 'counter-span') return;

                    if (node.nodeType === 3) { 
                        let text = node.textContent.replace(/\s+/g, ' ');
                        if (node === element.firstChild) text = text.trimStart();
                        if (node === element.lastChild) text = text.trimEnd();
                        if (!text) return; 
                        const frag = document.createDocumentFragment();
                        [...text].forEach(char => {
                            const span = document.createElement('span');
                            span.className = 'letter';
                            // Apply keyword class to inner letters if parent has it
                            if(element.classList.contains('keyword-gradient')) {
                                span.classList.add('keyword-gradient');
                            }
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

            // Wrap primary parts (excluding the counter ID)
            wrapLetters(document.querySelector('.primary-msg'));
            wrapLetters(document.querySelector('.secondary-msg'));
            // Specifically wrap "dashboard" text which is in a separate span now
            wrapLetters(document.getElementById('dashboard-text'));

            document.querySelector('.msg-container').style.opacity = 1;

            // --- 4. ANIMATION TIMELINE ---
            const tl = anime.timeline({ autoplay: true });

            // Create a proxy object to hold the number value for animation
            var counterObj = { val: 99 };

            tl
            // A. "Real time progress in"
            .add({
                targets: '.primary-msg > .letter', // Direct children letters only (exclude keyword container logic)
                translateY: ["1.1em", 0], translateZ: 0, opacity: [0, 1],
                easing: "easeOutExpo", duration: 800, delay: anime.stagger(10)
            })
            
            // B. "1 dashboard" ENTRANCE + COUNTDOWN
            // We start this 1000ms before previous ends
            .add({
                targets: ['#dashboard-text .letter', '#counter-span'],
                translateY: ["100%", 0],
                opacity: [0, 1],
                easing: "easeOutExpo", // Matches text slide
                duration: 1200,
                delay: anime.stagger(10) // Stagger letters
            }, "-=1000")

            // C. THE COUNTDOWN (Run in parallel with entrance)
            // Starts same time as Step B (using timeline offset)
            .add({
                targets: counterObj,
                val: [99, 1], // From 99 to 1
                round: 1, // Integers only
                easing: 'easeOutExpo', // Exponential Decay (Fast start, slow end)
                duration: 2000, // 2 Seconds total
                update: function() {
                    counterSpan.innerHTML = counterObj.val;
                }
            }, "-=1200") // Sync with the entrance above

            // D. Secondary Text
            .add({
                targets: '.secondary-msg .letter',
                translateY: ["20px", 0], opacity: [0, 1],
                easing: "easeOutQuad", duration: 1000, delay: anime.stagger(10)
            }, "-=1500") // Overlap significantly
            
            // E. Hold
            .add({ duration: 800 })
            
            // F. Reveal
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
                        showToast();
                    }
                });
            }
            document.body.addEventListener('dblclick', skipIntro);
        });