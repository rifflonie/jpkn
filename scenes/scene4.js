import {changeScene} from '../main.js';
import { loadScene5 } from './scene5.js';

export function loadScene4(stage) {
    stage.innerHTML = `
        <div id="matrix-container" style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; overflow: hidden; z-index: 100;">
            <canvas id="matrixCanvas" style="display: block;"></canvas>
        </div>

        <div class="security-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 105; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.6);">
            
            <div class="security-card" style="padding-top: 0px; padding-bottom: 30px; padding-left: 20px; padding-right: 20px; display: flex; flex-direction: column; align-items: center; text-align: center; width: 650px; flex-shrink: 0;">
                
                <div class="shield-icon" style="margin-top: -100px; margin-bottom: -120px;">
                    <img src="assets/yb.PNG" alt="YB" style="width: 450px; height: 450px; object-fit: contain;">
                </div>
                
                <h2 style="margin-top: 0; margin-bottom: 5px; line-height: 1.2; position: relative; z-index: 10;">Wait! Are you<br>YB Datuk James Ratib?</h2>
                <p style="margin-top: 5px; margin-bottom: 35px;">Please confirm to make a change.</p>

                <button id="verifyBtn" class="next-btn">Confirm</button>
            </div>
        </div>
    `;

    // ========================
    // MATRIX ANIMATION CODE 
    // ========================
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]";
    const fontSize = 30;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).fill(1);
    const colors = ["#0e851c"];

    function draw() {
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = 'bold ' + fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = ctx.fillStyle;

            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            ctx.shadowBlur = 0;

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    // Start the Matrix loop
    const matrixInterval = setInterval(draw, 30);


    // ==========================================
    // BUTTON CLICK LOGIC
    // ==========================================
    const btn = document.getElementById('verifyBtn');

    btn.onclick = () => {
        clearInterval(matrixInterval);
        
        // Instantly transition to Scene 5
        changeScene(loadScene5);
    };

   // ==========================================
    // UPGRADED RESPONSIVE SCALING (Fits Landscape too!)
    // ==========================================
    function scaleToFit() {
        // Change '.security-card' to '.captcha-container' when putting this in scene5.js!
        const container = document.querySelector('.security-card'); 
        if (!container) return;

        // 1. Get the screen's actual width and height
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // 2. Estimate the size of your box + a little breathing room (margin)
        const expectedWidth = 700; // 650px box + 50px buffer
        const expectedHeight = 750; // Roughly the height of your elements

        // 3. See how much we need to shrink to fit the width, AND to fit the height
        const scaleX = screenWidth / expectedWidth;
        const scaleY = screenHeight / expectedHeight;

        // 4. THE MAGIC: Pick the smallest scale factor. 
        // If height is super short (landscape), it will use scaleY to shrink it enough!
        const scaleFactor = Math.min(scaleX, scaleY);

        // 5. Apply the zoom (never zoom past 100%)
        const finalScale = Math.min(scaleFactor, 1);

        container.style.transform = `scale(${finalScale})`;
        container.style.transformOrigin = 'center center'; 
    }

    scaleToFit();
    window.addEventListener('resize', scaleToFit);
}
