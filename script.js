(function () {
    'use strict';

    // ── Splash Screen ──────────────────────
    var splash = document.getElementById('splash');
    var audio = document.getElementById('bg-music');
    var slider = document.getElementById('volume-slider');

    if (splash) {
        splash.addEventListener('click', function () {
            splash.classList.add('hidden');

            // Start music at slider volume
            if (audio && slider) {
                audio.volume = parseInt(slider.value, 10) / 100;
                audio.play().catch(function () {});
            }

            // Remove from DOM after fade
            setTimeout(function () {
                splash.remove();
            }, 700);
        });
    }



    // ── Volume Control (MP3 music) ─────────
    var iconMuted = document.getElementById('icon-muted');
    var iconLow = document.getElementById('icon-low');
    var iconHigh = document.getElementById('icon-high');
    var volumeBtn = document.getElementById('volume-icon');
    var lastVolume = 50;

    function updateIcon(vol) {
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

    if (audio && slider) {
        // Show correct icon on load
        slider.value = 50;
        updateIcon(50);
        audio.volume = 0.5;

        // Slider → volume
        slider.addEventListener('input', function () {
            var vol = parseInt(this.value, 10);
            audio.volume = vol / 100;
            if (vol === 0) {
                audio.pause();
            } else if (audio.paused) {
                audio.play().catch(function () {});
            }
            if (vol > 0) lastVolume = vol;
            updateIcon(vol);
        });

        // Click icon → toggle mute
        if (volumeBtn) {
            volumeBtn.addEventListener('click', function () {
                if (audio.paused || audio.volume === 0) {
                    audio.volume = lastVolume / 100;
                    audio.play().catch(function () {});
                    slider.value = lastVolume;
                    updateIcon(lastVolume);
                } else {
                    lastVolume = parseInt(slider.value, 10) || 50;
                    audio.pause();
                    slider.value = 0;
                    updateIcon(0);
                }
            });
        }
    }

    // ── View Counter ───────────────────────
    var countNum = document.getElementById('count-number');
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

    // ── Service Worker Registration (PWA) ──
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
})();
