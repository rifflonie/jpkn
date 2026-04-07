// scenes/scene6.js
import { changeScene } from '../main.js';
import { loadScene7 } from './scene7.js';

export function loadScene6(stage) {
    stage.innerHTML = `
        <style>
            /* WIPE OUT BROWSER DEFAULTS */
            body, html {
                margin: 0 !important;
                padding: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                overflow: hidden !important; 
                background-color: #000 !important; 
            }

            /* LOCK THE CONTAINER TO THE EDGES */
            .monitor-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #000;
                z-index: 9999;
                /* Preps the container to fade to white at the end */
                transition: background-color 0.5s ease-in; 
            }

            /* FORCE THE VIDEO TO CONTAIN ITSELF */
            .gimmick-video {
                width: 100%;
                height: 100%;
                max-width: 100vw;
                max-height: 100vh;
                object-fit: contain !important; 
                display: block;
                /* Hardware acceleration hint for smoother zooming */
                will-change: transform, filter; 
            }

            /* --- THE FAST & SMOOTH SWOOSH TRANSITION --- */
            @keyframes smoothSwoosh {
                0% { 
                    transform: scale(1); 
                    filter: brightness(1) blur(0px); 
                    opacity: 1; 
                }
                100% { 
                    /* Zooms cleanly into the center while fading to bright white */
                    transform: scale(4); 
                    filter: brightness(10) blur(4px); 
                    opacity: 0; 
                }
            }

            /* Class added by JavaScript to trigger the smooth transition */
            .trigger-smooth {
                /* 0.5 seconds, 'ease-in' makes it start gently and accelerate rapidly */
                animation: smoothSwoosh 0.5s ease-in forwards !important;
            }
            
            /* Turns the background white during the fade */
            .whiteout-bg {
                background-color: #ffffff !important;
            }
        </style>

        <div class="monitor-container" id="monitorContainer">
            <video id="gimmickVideo" class="gimmick-video" autoplay muted playsinline>
                <source src="assets/intro.mp4" type="video/mp4">
            </video>
            
            <div id="countdown" style="display: none;"></div>
        </div>
    `;

    let timeLeft = 30; 
    const countdownEl = document.getElementById('countdown');

    const timer = setInterval(() => {
        timeLeft--;
        
        if (countdownEl) {
            countdownEl.innerText = timeLeft;
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            executeTransition();
        }
    }, 300);

    function executeTransition() {
        const container = document.getElementById('monitorContainer');
        const video = document.getElementById('gimmickVideo'); // Grab the video instead of image
        
        // Trigger the smooth whiteout background and smooth video zoom
        container.classList.add('whiteout-bg');
        video.classList.add('trigger-smooth');
        
        // Wait exactly 0.5 seconds (the duration of our new fast animation)
        setTimeout(() => {
            // Re-enable scrolling for the next scene
            document.body.style.overflow = "auto";
            changeScene(loadScene7);
        }, 500); 
    }
}