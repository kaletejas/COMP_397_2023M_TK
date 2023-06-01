"use strict";

let myGL = null;
function getGL(){
    return myGL;
}

function initWebGL(htmlCanvasID){
    let canvas = document.getElementById(htmlCanvasID);
    myGL = canvas.getContext("webgl2");

    if(myGL === null){
        document.write("<br><br> WEBGL not available!")
        return;
    }
    myGL.clearColor(0.3,0.5,0.8,1.0);
}

function clearCanvas(){
    myGL.clear(myGL.COLOR_BUFFER_BIT);
}

window.onload = function(){
    initWebGL("GLCanvas");
    clearCanvas();
}