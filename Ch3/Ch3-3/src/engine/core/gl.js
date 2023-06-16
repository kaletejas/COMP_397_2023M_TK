"use strict";
let mCanvas=null;
let mGL=null;
function get(){ return mGL; }

function init(htmlCanvasID){
    mCanvas=document.getElementById(htmlCanvasID);
    if(mCanvas === null){
        throw new Error("Engine init [" + htmlCanvasID + "] element not fond!");
    }

    mGL=mCanvas.getContext("webgl2");  // WebGL

    if(mGL === null){
        document.write("<br><b>WebGL 2 not available!</b>");
        return;
    }
}

export {get, init}
