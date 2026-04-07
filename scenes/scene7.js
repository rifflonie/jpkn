// scenes/scene7.js

export function loadScene7(stage) {
    // 1. EXPLICITLY DELETE THE PUZZLE AND SLIDER
    const puzzleWrapper = document.getElementById('puzzle-wrapper');
    if (puzzleWrapper) puzzleWrapper.remove(); // Deletes the puzzle piece
    
    const sliderContainer = document.getElementById('sliderContainer');
    if (sliderContainer) sliderContainer.remove(); // Deletes the slider
    
    const captchaArea = document.querySelector('.captcha-img-area');
    if (captchaArea) captchaArea.remove(); // Deletes the old background box

    // 2. Clear anything else left in the stage
    stage.innerHTML = '';

    // 3. Load your pure JTDI scene
    stage.innerHTML = `
        <div class="final-stage">
            <div class="white-out"></div>
            
            <div class="logo-container">
                <img src="assets/jtdi.png" id="newLogo" class="hero-logo" alt="New Brand Identity">
                <div class="reveal-line"></div>
            </div>

            <div class="ambient-glow"></div>
            
            <div class="brand-name"></div>
        </div>
    `;

    // Trigger the entrance animations
    setTimeout(() => {
        const newLogo = document.getElementById('newLogo');
        const brandName = document.querySelector('.brand-name');
        
        if (newLogo) newLogo.classList.add('active');
        if (brandName) brandName.classList.add('active');
    }, 100);
}
