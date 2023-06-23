//ch4-1
import * as loop from "../engine/core/loop.js";
import * as engine from "../engine/index.js";

class MyGame {
    constructor() {
        this.mWhiteSq = null;
        this.mRedSq = null;
        this.mCamera = null;
    }
    init(){

        // Step A: Initialize the game engine
        //engine.init(htmlCanvasID);  

        //Step B: Set up Camera ; 3-5

        this.mCamera=new engine.Camera(
            vec2.fromValues(20, 60),   // center of the WC
            20,                        // width of WC
            [20, 40, 600, 300]         // viewport:orgX, orgY, W, H

        );

        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);


        //Step B: Create renderable objects
        //create a blue square
        this.mWhiteSq=new engine.Renderable();
        this.mWhiteSq.setColor([1,1,1,1]);

        //create a red square
        this.mRedSq=new engine.Renderable();
        this.mRedSq.setColor([1,0, 0, 1]); 
  
        //Step C:  Center sq. 5x5
        this.mWhiteSq.getXform().setPosition(20,60);
        this.mWhiteSq.getXform().setRotationInRad(0.2);
        this.mWhiteSq.getXform().setSize(5,5);

        
        // Step D: Draw the center and the corner squares
        // center red square
        this.mRedSq.getXform().setPosition(20, 60);
        this.mRedSq.getXform().setSize(2, 2);
       
    }
    draw(){
            // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        // Step  B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
        // Step  C: Activate the white shader to draw
        this.mWhiteSq.draw(this.mCamera);
        // Step  D: Activate the red shader to draw
        this.mRedSq.draw(this.mCamera);
    }

    update(){
        //debugger;
        // Simple game: move the white square and pulse the red
        let whiteXform = this.mWhiteSq.getXform();
        let deltaX = 0.05;
        // Step A: Rotate the white square
        // if Right => move
        if(engine.input.isKeyPressed(engine.input.keys.D))
        {
            //debugger;
            //console.log("D - Right" );
            if (whiteXform.getXPos() > 30) // the right-bound of the window
                whiteXform.setPosition(10, 60);
            whiteXform.incXPosBy(deltaX);
        }

        if(engine.input.isKeyClicked(engine.input.keys.W)){
            //console.log("W - Up");

            whiteXform.incRotationByDegree(1);
        }

        let redXform = this.mRedSq.getXform();
        // Step B: pulse the red square
        if(engine.input.isKeyPressed(engine.input.keys.S)){
            //console.log("S -South");

            if (redXform.getWidth() > 5)
                redXform.setSize(2, 2);
            redXform.incSizeBy(0.05);        
        }
    }

}

window.onload = function() {
    engine.init("GLCanvas")
    let myGame=new MyGame();
    //start the game
    loop.start(myGame);
}
