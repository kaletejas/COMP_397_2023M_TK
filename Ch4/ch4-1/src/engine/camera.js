"use strict";
import * as glSys from "./core/gl.js";
const eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY:1,
    eWidth:2,
    eHeight:3
});

class Camera {
    constructor(wcCenter, wcWidth, viewportArray){
        this.mWCCenter=wcCenter; //vec2
        this.mWCWidth=wcWidth;   //float
        this.mViewport=viewportArray; //[,y,w,h]

        //camera matrix
        this.mCameraMatrix=mat4.create();//I
        //bgColor
        this.mBGColor=[0.8, 0.8, 0.8, 1]; //[R,G,B,A], darker grey


    }

    getWCHeight() {
        let aspectRatio=this.mViewport[eViewport.eHeight]/ this.mViewport[eViewport.eWidth];
        //H/W = ar => H = ar*W
        return this.mWCWidth*aspectRatio;
    
    }
    //Setters / getters
    setWCCenter(xPos,yPos){
        this.mWCCenter[0]=xPos;
        this.mWCCenter[1]=yPos;
    }
    getWCCenter() { return this.mWCCenter; }
    setWCWidth(width) { this.mWCWidth = width; }
    getWCWidth() { return this.mWCWidth; }
    setViewport(viewportArray) { this.mViewport = viewportArray; }
    getViewport() { return this.mViewport; }
    setBackgroundColor(newColor) { this.mBGColor = newColor; }
    getBackgroundColor() { return this.mBGColor; }

    setViewAndCameraMatrix(){
        //gl
        let gl=glSys.get();

        //Step A: Set up viewport
        gl.viewport(
            this.mViewport[0],
            this.mViewport[1],
            this.mViewport[2],
            this.mViewport[3]
        ); // (x,y,w,h) => w and h are in pixels 
        //Set up scissor - ing
        gl.scissor(
            this.mViewport[0],
            this.mViewport[1],
            this.mViewport[2],
            this.mViewport[3]

        );

        gl.clearColor(
            this.mBGColor[0],
            this.mBGColor[1],
            this.mBGColor[2],
            this.mBGColor[3]
 
        );
            
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        //Step E: set up camera matrix
        let cameraCenter=this.getWCCenter(); //center of the camera in the WC
        
        // we need to create I*S*T = S*T = S(sx,sy)*T(-cx,-cy)
        //Step E1: Scale
        mat4.scale(this.mCameraMatrix,mat4.create(),vec3.fromValues(2.0/this.getWCWidth(),2.0/this.getWCHeight(),1.0));
        //Step E2: Translation  T(-cx,-cy)
        mat4.translate(this.mCameraMatrix,this.mCameraMatrix,vec3.fromValues(-cameraCenter[0],-cameraCenter[1],0));

    }

    getCameraMatrix () { return this.mCameraMatrix; }

}

export default Camera;