// scenes/scene7.js

export function loadScene7(stage) {
    stage.innerHTML = `
        <div class="final-stage">
            <div class="white-out"></div>
            
            <div class="logo-container">
                <img src="assets/jtdi.png" id="newLogo" class="hero-logo" alt="New Brand Identity">
                <div class="reveal-line"></div>
            </div>

            <div class="ambient-glow"></div>
        </div>
    `;

    // Trigger the entrance animations
    setTimeout(() => {
        document.getElementById('newLogo').classList.add('active');
        document.querySelector('.brand-name').classList.add('active');
    }, 100);
}