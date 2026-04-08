// scenes/scene5.js
import { changeScene } from '../main.js';
import { loadScene6 } from './scene6.js';

export function loadScene5(stage) {
    stage.innerHTML = `
        <style>
            /* --- NEW: PERFECT BLACK BACKGROUND WRAPPER --- */
            .black-bg-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: #000000; /* Pure Black */
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            /* Makes the draggable thumb turn bright green with a glow */
            #captchaSlider.success-slider::-webkit-slider-thumb {
                background-color: #14b314 !important;
                box-shadow: 0 0 10px #00ff00 !important;
            }
            #captchaSlider.success-slider::-moz-range-thumb {
                background-color: #00ff00 !important;
                box-shadow: 0 0 10px #00ff00 !important;
            }
            /* Makes the track background soft green */
            .slider-container.success-bg {
                background: #eaffea !important;
                border-color: #00ff00 !important;
            }
        </style>

        <div class="black-bg-wrapper">
            <div class="captcha-container">
                <div class="captcha-box">
                    <div class="captcha-img-area">
                        <img src="assets/jpkn-distortion.png" class="main-img" alt="puzzle-bg">
                        <div class="puzzle-gap"></div>
                        <div id="puzzle-wrapper" class="puzzle-wrapper">
                            <div class="puzzle-piece"></div>
                        </div>
                    </div>

                    <div class="slider-container" id="sliderContainer">
                        <span class="slider-text">Slide to complete the puzzle</span>
                        <input type="range" id="captchaSlider" min="0" max="100" value="0">
                    </div>

                    <div id="sliderThumb" class="slider-thumb">
                        <span class="material-symbols-outlined"></span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const slider = document.getElementById('captchaSlider');
    const piece = document.getElementById('puzzle-wrapper');
    const sliderContainer = document.getElementById('sliderContainer');
    const targetPos = 63.7; 
    const tolerance = 3;  

    slider.oninput = function() {
        const val = this.value; 
        
        // 1. Calculate the EXACT pixel position of the thumb (Track is 620px wide)
        const thumbPx = (val / 100) * 620; 
        
        // 2. Move the piece with the exact offset to keep it centered
        piece.style.left = (thumbPx - 80) + "px"; 
    };

    slider.onchange = function() {
        const val = parseFloat(this.value);
        
        if (Math.abs(val - targetPos) <= tolerance) {
            // SUCCESS
            slider.value = targetPos; 
            
            // Snap piece perfectly into the 45% hole (315px)
            piece.style.left = "315px"; 
            
            // TURN SLIDER GREEN 
            slider.classList.add('success-slider');
            sliderContainer.classList.add('success-bg');
            slider.disabled = true;
            
            setTimeout(() => {
                changeScene(loadScene6);
            }, 1000); 
        } 
    };

   // ==========================================
    // UPGRADED RESPONSIVE SCALING (Fits Landscape too!)
    // ==========================================
    function scaleToFit() {
        const container = document.querySelector('.captcha-container'); 
        if (!container) return;

        // 1. Get the screen's actual width and height
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // 2. Estimate the size of your box + a little breathing room (margin)
        const expectedWidth = 700; // Adjust this if your puzzle box is wider
        const expectedHeight = 750; // Adjust this if your puzzle box is taller

        // 3. See how much we need to shrink to fit the width, AND to fit the height
        const scaleX = screenWidth / expectedWidth;
        const scaleY = screenHeight / expectedHeight;

        // 4. THE MAGIC: Pick the smallest scale factor. 
        const scaleFactor = Math.min(scaleX, scaleY);

        // 5. Apply the zoom (never zoom past 100%)
        const finalScale = Math.min(scaleFactor, 1);

        container.style.transform = `scale(${finalScale})`;
        container.style.transformOrigin = 'center center'; 
    }

    scaleToFit();
    window.addEventListener('resize', scaleToFit);
}
