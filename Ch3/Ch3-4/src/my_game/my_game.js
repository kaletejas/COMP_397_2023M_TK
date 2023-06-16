import * as engine from "../engine/index.js";
import * as glSys from "../engine/core/gl.js";
class MyGame {
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

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
        //get gl
        let gl=glSys.get();

        //Step D: Set up viewport
        gl.viewport(20,40, 600,300); // (x,y,w,h) => w and h are in pixels 
        //Set up scissor - ing
        gl.scissor(20,40, 600,300);
        gl.enable(gl.SCISSOR_TEST);
        engine.clearCanvas([0.8, 0.8, 0.8, 1]); //viewport is a little darker now
        gl.disable(gl.SCISSOR_TEST);

        //Step E: set up camera matrix
        let cameraCenter=vec2.fromValues(20,60); //center of the camera in the WC
        let wcSize = vec2.fromValues(20,10); 
        let cameraMatrix=mat4.create(); //I
        // we need to create I*S*T = S*T = S(sx,sy)*T(-cx,-cy)
        //Step E1: Scale
        mat4.scale(cameraMatrix,mat4.create(),vec3.fromValues(2.0/wcSize[0],2.0/wcSize[1],1.0));
        //Step E2: Translation  T(-cx,-cy)
        mat4.translate(cameraMatrix,cameraMatrix,vec3.fromValues(-cameraCenter[0],-cameraCenter[1],0));

        //Step F:  Center sq. 5x5
        this.mBlueSq.getXform().setPosition(20,60);
        this.mBlueSq.getXform().setRotationInRad(0.2);
        this.mBlueSq.getXform().setSize(5,5);
        this.mBlueSq.draw(cameraMatrix);

        //TODO: Step G:
        // Step G: Draw the center and the corner squares
        // center red square
        this.mRedSq.getXform().setPosition(20, 60);
        this.mRedSq.getXform().setSize(2, 2);
        this.mRedSq.draw(cameraMatrix);
        // top left
        this.mTLSq.getXform().setPosition(10, 65);
        this.mTLSq.draw(cameraMatrix);
        // top right
        this.mTRSq.getXform().setPosition(30, 65);
        this.mTRSq.draw(cameraMatrix);
        // bottom right
        this.mBRSq.getXform().setPosition(30, 55);
        this.mBRSq.draw(cameraMatrix);
        // bottom left
        this.mBLSq.getXform().setPosition(10, 55);
        this.mBLSq.draw(cameraMatrix);

    }

}

window.onload = function() {
    new MyGame('GLCanvas');
}
