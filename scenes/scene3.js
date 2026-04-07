import {changeScene} from '../main.js';
import { loadScene4} from './scene4.js';

export function loadScene3(stage) {
    stage.innerHTML = `
        <div id="matrix-container" style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; margin: 0; padding: 0; overflow: hidden; z-index: 100;">
            
            <canvas id="matrixCanvas" style="display: block;"></canvas>
            
            <div id="error-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0; z-index: 101; pointer-events: none; display: flex; justify-content: center; align-items: center;">
                <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 30px rgba(255, 0, 0, 0.9)) drop-shadow(0 0 10px #ff0000);">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="14" stroke-width="2"></line>
                    <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2"></line>
                </svg>
            </div>
            
        </div>
    `;

    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix Characters (Katakana + Latin + Numbers)
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]";
    const fontSize = 30;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: columns }).fill(1);
    //Colours
    const colors = ["#11a522"];

    function draw() {
        // Crucial: Make sure the shadow is OFF before drawing the black background fade
        ctx.shadowBlur = 0;
        
        // Semi-transparent black rectangle to create the "trail" effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 1. ADDED 'bold' to the font settings!
        ctx.font = 'bold ' + fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            // Pick the color
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            
            // 2. TURN ON THE GLOW MAGIC
            ctx.shadowBlur = 10;                // Size of the neon glow
            ctx.shadowColor = ctx.fillStyle;    // Makes the glow match your green color

            // Draw the letter
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            // 3. TURN OFF THE GLOW immediately after stamping the letter
            ctx.shadowBlur = 0;

            // Reset drop to top randomly after it hits bottom
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    const matrixInterval = setInterval(draw, 30);

    // After 2 seconds, flash the Error Overlay
    setTimeout(() => {
        const errorMsg = document.getElementById('error-overlay');
        errorMsg.style.opacity = "1";
        
        // Simple flicker effect
        let flicker = setInterval(() => {
            errorMsg.style.visibility = (errorMsg.style.visibility === 'hidden' ? 'visible' : 'hidden');
        }, 250);
        
        // After .. seconds, move to the Security Check
        setTimeout(() => {
            clearInterval(matrixInterval);
            clearInterval(flicker);
            changeScene(loadScene4);
        }, 2500); //error symbol
    }, 2500); // matrix rain
}