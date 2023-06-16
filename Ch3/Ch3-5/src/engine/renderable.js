"use strict";

import * as glSys from "./core/gl.js";
import * as shaderResources from "./core/shader_resources.js";
import Camera from "./camera.js";
import Transform from "./transform.js";

class Renderable{
    constructor(){
        this.mShader=shaderResources.getConstColorShader();
        this.mColor=[1,1,1,1]; //white
        this.mXform = new Transform();

    }

    getXform(){ return this.mXform; }

    draw(camera){
        let gl=glSys.get();
        this.mShader.activate(this.mColor,this.mXform.getTRSMatrix(), camera.getCameraMatrix());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);        
    }

    getColor(){ return this.mColor; }
    setColor(color){
        this.mColor=color; 
    }
}

export default Renderable;
