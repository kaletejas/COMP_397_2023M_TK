"use strict";

import * as glSys from "./core/gl.js";
import * as shaderResources from "./core/shader_resources.js";

class Renderable{
    constructor(){
        this.mShader=shaderResources.getConstColorShader();
        this.mColor=[1,1,1,1]; //white

    }

    draw(trsMatrix){
        let gl=glSys.get();
        this.mShader.activate(this.mColor,trsMatrix);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);        
    }

    getColor(){ return this.mColor; }
    setColor(color){
        this.mColor=color; 
    }
}

export default Renderable;
