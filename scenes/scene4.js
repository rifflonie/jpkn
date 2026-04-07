import {changeScene} from '../main.js';
import { loadScene5 } from './scene5.js';

export function loadScene4(stage) {
    stage.innerHTML = `
        <div id="matrix-container" style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; overflow: hidden; z-index: 100;">
            <canvas id="matrixCanvas" style="display: block;"></canvas>
        </div>

        <div class="security-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 105; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.6);">
            <div class="security-card">
                <div class="shield-icon">
                    <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#0055ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                </div>
                
                <h2>Wait! Are you human?</h2>
                <p>Please confirm to make a change.</p>

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
}
