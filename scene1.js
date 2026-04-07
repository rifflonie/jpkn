// scenes/scene1.js
import { changeScene } from '../main.js';
import { loadScene3 } from './scene3.js';

export function loadScene1(stage) {
    stage.innerHTML = `
        <div class="it-container">
            <div class="grid-overlay"></div>
            <div class="logo-wrapper" id="logoWrap">
                <img src="./assets/jpkn.png" id="oldLogo" class="glow-logo" alt="JPKN Logo">
            </div>
        </div>
    `;

    const logo = document.getElementById('oldLogo');
    const wrapper = document.getElementById('logoWrap');

    setTimeout(() => {
        if (logo && wrapper) {
            // 1. Shake the screen
            stage.classList.add('impact-shake');
            
            // 2. Run the custom script that cuts the image into pieces
            shatterRealImage(logo, wrapper);

            // 3. Move to next scene after the glass falls (1.5s)
            setTimeout(() => {
                stage.classList.remove('impact-shake');
                changeScene(loadScene3);
            }, 1500);
        }
    }, 5000);
}

/* --- THE TRUE IMAGE SHATTER FUNCTION --- */
function shatterRealImage(imgElement, wrapper) {
    // 1. Get the exact size and position of your logo on the screen
    const rect = imgElement.getBoundingClientRect();
    const startX = imgElement.offsetLeft;
    const startY = imgElement.offsetTop;
    
    // 2. Hide the original image immediately (so we only see the cut pieces)
    imgElement.style.opacity = "0";

    // 3. Decide how many pieces (6x6 grid = 36 squares = 72 triangles)
    const cols = 6;
    const rows = 6;
    const shardWidth = rect.width / cols;
    const shardHeight = rect.height / rows;

    // 4. Create the puzzle pieces
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Create a top triangle and a bottom triangle for every square
            createShard(wrapper, imgElement.src, rect, startX, startY, shardWidth, shardHeight, row, col, cols, rows, true);
            createShard(wrapper, imgElement.src, rect, startX, startY, shardWidth, shardHeight, row, col, cols, rows, false);
        }
    }
}

function createShard(wrapper, imgSrc, rect, startX, startY, shardWidth, shardHeight, row, col, cols, rows, isTop) {
    const shard = document.createElement('div');
    shard.classList.add('glass-shard');

    // Make the piece slightly larger (+1px) to prevent invisible gaps before breaking
    shard.style.width = Math.ceil(shardWidth) + 1 + 'px'; 
    shard.style.height = Math.ceil(shardHeight) + 1 + 'px';
    shard.style.left = startX + (col * shardWidth) + 'px';
    shard.style.top = startY + (row * shardHeight) + 'px';

    // Apply your logo as the background for this specific tiny piece
    shard.style.backgroundImage = `url(${imgSrc})`;
    shard.style.backgroundSize = `${rect.width}px ${rect.height}px`;
    shard.style.backgroundPosition = `-${col * shardWidth}px -${row * shardHeight}px`;

    // Cut it into a sharp triangle
    if (isTop) {
        shard.style.clipPath = 'polygon(0 0, 100% 0, 0 100%)';
    } else {
        shard.style.clipPath = 'polygon(100% 100%, 0 100%, 100% 0)';
    }

    wrapper.appendChild(shard);

    // Calculate explosion physics (Push outward from the center)
    const centerX = cols / 2;
    const centerY = rows / 2;
    const dirX = col - centerX;
    const dirY = row - centerY;

    // 1. X and Y movement (Left/Right, Up/Down)
    const randomX = dirX * (Math.random() * 80 + 30) + (Math.random() * 60 - 30);
    const randomY = dirY * (Math.random() * 80 + 30) + (Math.random() * 200 + 50); 
    
    // 2. THE 3D MOVEMENT: Move forward toward the camera (positive Z)
    const randomZ = Math.random() * 600 + 200; // Pushes pieces 200px to 800px closer to the screen
    
    // 3. 3D TUMBLING: Spin wildly on all 3 axes
    const rotX = (Math.random() - 0.5) * 720; // Tumbling forward/backward
    const rotY = (Math.random() - 0.5) * 720; // Spinning left/right
    const rotZ = (Math.random() - 0.5) * 360; // Standard clockwise rotation

    // Wait .. milliseconds to let the pieces assemble, then explode them!
    setTimeout(() => {
        shard.style.transform = `translate3d(${randomX}px, ${randomY}px, ${randomZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
        shard.style.opacity = '0';
    }, 30);
}