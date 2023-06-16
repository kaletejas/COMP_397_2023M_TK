import * as engine from "../engine/index.js";
//import { mat4 } from "../lib/gl-matrix.js";

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

        this.mWhiteSq.getXform().setPosition(-0.25,0.25);
        this.mWhiteSq.getXform().setRotationInRad(0.2);
        this.mWhiteSq.getXform().setScale(1.2,1.2);
        this.mWhiteSq.draw();

        this.mRedSq.getXform().setXPos(0.25);
        this.mRedSq.getXform().setYPos(-0.25);
        this.mRedSq.getXform().setRotationInDegrees(45.0);
        this.mRedSq.getXform().setWidth(0.4);
        this.mRedSq.getXform().setHeight(0.4);
        this.mRedSq.draw();




        //TODO: In 3.3 
        // . Finalize the Red square transform
        // . Play with different ordering of TRS (f.e. TSR, SRT, STR etc.) Do you understand what is going on?
        // . Modify your my_game_<your_initials) from Lab3 to draw 5 squeares applying differtncolors and different transforms
        //   . (f.e. Make a face with transformed squares)






        // Step C1: Draw the white square
        //this.mWhiteSq.draw(); //
        // Step C2: Draw the red square
        //this.mRedSq.draw(); //
    }
}

window.onload = function() {
    new MyGame('GLCanvas');
}
