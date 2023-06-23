"use strict";
import * as core from "./core.js";

let mGLVertexBuffer = null;
function get(){
    return mGLVertexBuffer;
}

//  1     0
//  -------  
//  |     |
//  |     |
//  -------
//  3     2
//
// Triangles: 012  and 132 

let mVerticesOfSquare = [
     0.5,  0.5, 0.0,
    -0.5,  0.5, 0.0,
     0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
];

function init(){
    let gl=core.getGL();

    //A - create buffer
    mGLVertexBuffer=gl.createBuffer(); //WebGL

    //B - bind it and activate it
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);  //WebGL

    //C - load vertices
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);  //WebGL
}

function drawSquare() {
    // Step A: Activate the shader
    simpleShader.activate();
    // Step B. draw with the above settings
    //mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 5);
    mGL.drawArrays(mGL.TRIANGLE_FAN, 0, 5);
}

export {get, init}
