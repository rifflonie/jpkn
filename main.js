import { loadScene1 } from './scenes/scene1.js';

const stage = document.getElementById('stage');
export function changeScene(sceneInitFunction) {
    // Clear the current HTML inside the stage
    stage.innerHTML = ''; 
    
    // Run the next scene and pass the stage to it
    sceneInitFunction(stage);
}

// Start the show with Scene 1
loadScene1(stage);
