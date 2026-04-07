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
                    <div id="puzzle-piece" class="puzzle-piece"></div>
                </div>

                <div class="slider-container" id="sliderContainer">
                    <span class="slider-text">Slide to complete the puzzle</span>
                    <input type="range" id="captchaSlider" min="0" max="100" value="0">
                </div>

                <div id="sliderThumb" class="slider-thumb">
                    <span class="material-symbols-outlined"</span>
                </div>
            </div>
        </div>
    `;

    const slider = document.getElementById('captchaSlider');
    const piece = document.getElementById('puzzle-piece');
    const sliderContainer = document.getElementById('sliderContainer');
    const targetPos = 70; 
    const tolerance = 3;  

    slider.oninput = function() {
        const val = this.value;
        const movePercentage = val * 0.8; 
        piece.style.left = movePercentage + "%";
    };

    slider.onchange = function() {
        const val = parseInt(this.value);
        const movePercentage = val * 0.8; 
        
        if (Math.abs(movePercentage - targetPos) <= tolerance) {
            // 1. Snap piece to the perfect spot
            piece.style.left = targetPos + "%";
            
            // 3. TURN SLIDER GREEN 
            slider.classList.add('success-slider');
            sliderContainer.classList.add('success-bg');
            
            slider.disabled = true;
            
            setTimeout(() => {
                changeScene(loadScene6);
            }, 1000); 
            
        } else {
            // Reset on fail
            this.value = 0;
            piece.style.left = "0%";
            piece.style.setProperty('filter', 'drop-shadow(0px 0px 4px rgba(255, 255, 255, 1)) drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.8))', 'important');
            slider.classList.remove('success-slider');
            sliderContainer.classList.remove('success-bg');
        }
    };
}
