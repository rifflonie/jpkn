// scenes/scene5.js
import { changeScene } from '../main.js';
import { loadScene6 } from './scene6.js';

export function loadScene5(stage) {
    stage.innerHTML = `
        <style>
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
    `;

    const slider = document.getElementById('captchaSlider');
    const piece = document.getElementById('puzzle-wrapper');
    const sliderContainer = document.getElementById('sliderContainer');
    
    // The thumb must hit ~63.7 to reach the 45% hole perfectly
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
        
    };
}
}
