"use strict";

//
import * as vertexBuffer from "./vertex_buffer.js";
//import * as simpleShader from "./shader_support.js";
import SimpleShader from "./simple_shader.js";

let mGL=null;
function getGL(){
    return mGL;
}

let mShader = null;
function createShader(){
    mShader=new SimpleShader("VertexShader","FragmentShader");
}

function initWebGL(htmlCanvasID){
    let canvas=document.getElementById(htmlCanvasID);
    mGL=canvas.getContext("webgl2");  // WebGL

    if(mGL === null){
        document.write("<br><b>WebGL not available!</b>");
        return;
    }

      

}

function init(htmlCanvasID){
    initWebGL(htmlCanvasID);
    vertexBuffer.init(); // function defined in the vertex_buffer.js
    debugger;
    createShader();
}

function clearCanvas(color){
    //mGL.clearColor(color); // WebGL
    mGL.clearColor(color[0],color[1],color[2],color[3]); // WebGL
    mGL.clear(mGL.COLOR_BUFFER_BIT);  // WebGL
}

function drawSquare() {
    // Step A: Activate the shader
    //simpleShader.activate();
    mShader.activate();
    // Step B. draw with the above settings
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}


export {getGL, init, clearCanvas, drawSquare}