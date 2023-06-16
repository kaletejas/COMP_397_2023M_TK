import * as engine from "../engine/index.js";

class MyGame {
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

        //Step B: Create renderable objects
        //create a white square
        this.mWhiteSq=new engine.Renderable();
        this.mWhiteSq.setColor([1,1,1,1]);

        //create a red square
        this.mRedSq=new engine.Renderable();
        this.mRedSq.setColor([1,0,0,1]);

        // Step C: Clear the canvas
        engine.clearCanvas([0, 0.8, 0, 1]);
        // Step C1: Draw the white square
        this.mWhiteSq.draw(); //
        // Step C2: Draw the red square
        this.mRedSq.draw(); //
    }
}

window.onload = function() {
    new MyGame('GLCanvas');
}
