"use strict";

//
import * as vertexBuffer from "./vertex_buffer.js";
//import * as simpleShader from "./shader_support.js";
import SimpleShader from "./simple_shader.js";

let mGL=null;
function getGL(){
    return mGL;
}

//the shader
let mShader = null;
let kSimple_VS="src/glsl_shaders/simple_vs.glsl";
let kWhite_FS="src/glsl_shaders/white_fs.glsl";
let kSimple_FS="src/glsl_shaders/simple_fs.glsl";
function createShader(){
    //mShader=new SimpleShader(kSimple_VS,kWhite_FS);
    mShader=new SimpleShader(kSimple_VS,kSimple_FS);
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
    //debugger;
    createShader();
}

function clearCanvas(color){
    //mGL.clearColor(color); // WebGL
    mGL.clearColor(color[0],color[1],color[2],color[3]); // WebGL
    mGL.clear(mGL.COLOR_BUFFER_BIT);  // WebGL
}

function drawSquare(color) {
    // Step A: Activate the shader
    //simpleShader.activate();
    mShader.activate(color);
    // Step B. draw with the above settings
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}



export {getGL, init, clearCanvas, drawSquare}