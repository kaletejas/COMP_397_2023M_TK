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

        let trsMatrix=mat4.create();  //I
        mat4.translate(trsMatrix,trsMatrix,vec3.fromValues(-0.25,0.25,0.0));
        mat4.rotateZ(trsMatrix,trsMatrix,0.2);
        mat4.scale(trsMatrix,trsMatrix,vec3.fromValues(1.2,1.2,1));
        //mat4.rotateZ(trsMatrix,trsMatrix,Math.PI/2.0);
        //mat4.scale(trsMatrix,trsMatrix,vec3.fromValues(1.2,0.6,1));

        this.mWhiteSq.draw(trsMatrix);

        //TODO: 
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
