"use strict";
import SimpleShader from "../simple_shader.js";

let kSimple_VS="src/glsl_shaders/simple_vs.glsl";
let kWhite_FS="src/glsl_shaders/white_fs.glsl";
let kSimple_FS="src/glsl_shaders/simple_fs.glsl";

let mConstColorShader = null;

function createShaders(){
    mConstColorShader=new SimpleShader(kSimple_VS,kSimple_FS);
}

function init(){
    createShaders();
}

function getConstColorShader(){
    return mConstColorShader;
}

export { init, getConstColorShader }

