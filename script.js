(function () {
    'use strict';

    // ── Elements ──
    const splash = document.getElementById('splash');
    const audio = document.getElementById('bg-music');
    const volumeBtn = document.getElementById('volume-icon');
    const iconMuted = document.getElementById('icon-muted');
    const iconLow = document.getElementById('icon-low');
    const iconHigh = document.getElementById('icon-high');
    const countNum = document.getElementById('count-number');
    const canvas = document.getElementById('stars-canvas');
    
    // Tab switching elements
    const tabs = document.querySelectorAll('.menu-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    let isMuted = true; // Start muted as default until splash clicked
    let defaultVolume = 0.5;

    // ── Splash Screen (Session Initialization) ──
    if (splash) {
        splash.addEventListener('click', function () {
            splash.classList.add('hidden');

            // Play background music at default volume
            if (audio) {
                audio.volume = defaultVolume;
                isMuted = false;
                audio.play()
                    .then(() => updateIcon(defaultVolume * 100))
                    .catch(() => updateIcon(0));
            }

            // Remove from DOM after fade animation is finished
            setTimeout(function () {
                splash.remove();
            }, 850);
        });
    }

    // ── Dripping Blood Splash Screen Canvas Animation ──
    const bloodCanvas = document.getElementById('blood-canvas');
    if (bloodCanvas && splash) {
        const ctx = bloodCanvas.getContext('2d');
        let drops = [];
        const maxDrops = 75;

        function resizeBloodCanvas() {
            bloodCanvas.width = window.innerWidth;
            bloodCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeBloodCanvas);
        resizeBloodCanvas();

        // Initialize drops
        for (let i = 0; i < maxDrops; i++) {
            drops.push({
                x: Math.random() * bloodCanvas.width,
                y: Math.random() * -bloodCanvas.height, // start off-screen
                length: Math.random() * 15 + 5,
                width: Math.random() * 1.5 + 1,
                speed: Math.random() * 2 + 1.5, // slower, viscous speed
                opacity: Math.random() * 0.5 + 0.4
            });
        }

        function drawBlood() {
            if (!document.getElementById('blood-canvas')) return; // Stop animation loop once removed from DOM
            ctx.clearRect(0, 0, bloodCanvas.width, bloodCanvas.height);

            for (let i = 0; i < maxDrops; i++) {
                const d = drops[i];

                ctx.beginPath();
                ctx.moveTo(d.x, d.y - d.length);
                ctx.lineTo(d.x, d.y);
                ctx.strokeStyle = `rgba(178, 18, 36, ${d.opacity})`;
                ctx.lineWidth = d.width;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Draw rounded head to make it look like a droplet
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.width * 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(178, 18, 36, ${d.opacity})`;
                ctx.fill();

                // Move down
                d.y += d.speed;

                // Reset drop
                if (d.y > bloodCanvas.height + d.length) {
                    d.y = Math.random() * -50;
                    d.x = Math.random() * bloodCanvas.width;
                    d.speed = Math.random() * 2 + 1.5;
                }
            }
            requestAnimationFrame(drawBlood);
        }
        drawBlood();
    }

    // ── Volume Icon Updates ──
    function updateIcon(vol) {
        if (!iconMuted || !iconLow || !iconHigh) return;

        iconMuted.style.display = 'none';
        iconLow.style.display = 'none';
        iconHigh.style.display = 'none';

        if (vol === 0) {
            iconMuted.style.display = 'block';
        } else if (vol <= 50) {
            iconLow.style.display = 'block';
        } else {
            iconHigh.style.display = 'block';
        }
    }

    // ── Volume Control (Simple Toggle Mute/Unmute in Top Left) ──
    if (audio && volumeBtn) {
        // Set initial muted state until user enters
        audio.volume = 0;
        updateIcon(0);

        volumeBtn.addEventListener('click', function () {
            if (audio.paused || isMuted || audio.volume === 0) {
                // Unmute
                audio.volume = defaultVolume;
                isMuted = false;
                audio.play()
                    .then(() => {
                        updateIcon(defaultVolume * 100);
                    })
                    .catch(() => {
                        updateIcon(0);
                    });
            } else {
                // Mute
                audio.pause();
                isMuted = true;
                updateIcon(0);
            }
        });
    }

    // ── Twinkling Starfield Canvas Animation ──
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        const numStars = 120;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Initialize stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.0 + 0.4, // size of stars
                d: Math.random() * numStars, // twinkling phase offset
                speed: Math.random() * 0.15 + 0.03 // floating speed
            });
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ffffff';

            for (let i = 0; i < numStars; i++) {
                const s = stars[i];
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                
                // Twinkling effect using sine of phase offset
                ctx.globalAlpha = Math.abs(Math.sin(s.d));
                ctx.fill();

                // Move stars slowly upwards
                s.y -= s.speed;
                s.d += 0.008; // speed of twinkling

                // Wrap around when star floats off-screen
                if (s.y < 0) {
                    s.y = canvas.height;
                    s.x = Math.random() * canvas.width;
                }
            }
            ctx.globalAlpha = 1.0;
            requestAnimationFrame(drawStars);
        }
        drawStars();
    }

    // ── Tab Switching Logic ──
    if (tabs && tabContents) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetTabId = tab.getAttribute('data-tab');

                // Remove active classes
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(tc => tc.classList.remove('active'));

                // Add active classes
                tab.classList.add('active');
                const targetContent = document.getElementById(targetTabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // ── Dynamic Cursor Glow for Interactive Cards ──
    function updateCursorGlow(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
    }

    const interactiveElements = document.querySelectorAll('.xp-row, .contact-card, .profile-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', updateCursorGlow);
    });

    // ── View Counter ──
    if (countNum) {
        fetch('https://countapi.mileshilliard.com/api/v1/hit/8qtw_portfolio_views_counter')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data && typeof data.value === 'number') {
                    countNum.textContent = data.value;
                } else {
                    countNum.textContent = '0';
                }
            })
            .catch(function () {
                countNum.textContent = '—';
            });
    }

    // ── Service Worker Registration ──
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('./sw.js')
                .then(function (reg) {
                    console.log('Service Worker registered successfully with scope: ', reg.scope);
                })
                .catch(function (err) {
                    console.log('Service Worker registration failed: ', err);
                });
        });
    }

    // ── Mouse Cursor Particle Trail ──
    let lastX = 0;
    let lastY = 0;
    const minDistance = 8; // min pixels mouse must move to spawn a particle

    window.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;

        // Calculate Euclidean distance moved
        const dist = Math.hypot(x - lastX, y - lastY);

        if (dist > minDistance) {
            createParticle(x, y);
            lastX = x;
            lastY = y;
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Add size variation to make it look organic
        const size = Math.random() * 4 + 4; // 4px to 8px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        document.body.appendChild(particle);

        // Remove from DOM after CSS animation completes (600ms)
        setTimeout(function () {
            particle.remove();
        }, 600);
    }
})();
