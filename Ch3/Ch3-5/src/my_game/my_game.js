import * as engine from "../engine/index.js";
import * as glSys from "../engine/core/gl.js";
class MyGame {
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);  

        //Step B: Set up Camera ; 3-5

        this.mCamera=new engine.Camera(
            vec2.fromValues(20, 60),   // center of the WC
            20,                        // width of WC
            [20, 40, 600, 300]         // viewport:orgX, orgY, W, H

        );


        //Step B: Create renderable objects
        //create a blue square
        this.mBlueSq=new engine.Renderable();
        this.mBlueSq.setColor([0.25,0.25,0.95,1]);

        //create a red square
        this.mRedSq=new engine.Renderable();
        this.mRedSq.setColor([1,0.25,0.25,1]);
        //Create TL, TR, BL, BR squares
        this.mTLSq=new engine.Renderable();
        this.mTLSq.setColor([0.9,0.1,.1,1]); //red

        this.mTRSq=new engine.Renderable();
        this.mTRSq.setColor([0.1,0.9,.1,1]); //green

        this.mBLSq=new engine.Renderable();
        this.mBLSq.setColor([0.1,0.1,.9,1]); //blue

        this.mBRSq=new engine.Renderable();
        this.mBRSq.setColor([0.1,0.1,.1,1]); //black


        // Step C: Clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1]);

        this.mCamera.setViewAndCameraMatrix();
       

        //Step F:  Center sq. 5x5
        this.mBlueSq.getXform().setPosition(20,60);
        this.mBlueSq.getXform().setRotationInRad(0.2);
        this.mBlueSq.getXform().setSize(5,5);
        this.mBlueSq.draw(this.mCamera);

        //TODO: Step G:
        // Step G: Draw the center and the corner squares
        // center red square
        this.mRedSq.getXform().setPosition(20, 60);
        this.mRedSq.getXform().setSize(2, 2);
        this.mRedSq.draw(this.mCamera);
        // top left
        this.mTLSq.getXform().setPosition(10, 65);
        this.mTLSq.draw(this.mCamera);
        // top right
        this.mTRSq.getXform().setPosition(30, 65);
        this.mTRSq.draw(this.mCamera);
        // bottom right
        this.mBRSq.getXform().setPosition(30, 55);
        this.mBRSq.draw(this.mCamera);
        // bottom left
        this.mBLSq.getXform().setPosition(10, 55);
        this.mBLSq.draw(this.mCamera);

    }

}

window.onload = function() {
    new MyGame('GLCanvas');
}
