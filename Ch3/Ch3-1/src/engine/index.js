"use strict";

import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";

//general utilities
import Renderable from "./renderable.js";


function init(htmlCanvasID){
    glSys.init(htmlCanvasID);
    vertexBuffer.init();
    shaderResources.init();
}

function clearCanvas(color){
    let gl=glSys.get();
    //mGL.clearColor(color); // WebGL
    gl.clearColor(color[0],color[1],color[2],color[3]); // WebGL
    gl.clear(gl.COLOR_BUFFER_BIT);  // WebGL
}


//exports
export{
    //Utility classes
    Renderable,
    
    //function
    init, clearCanvas
}



