"use strict";

import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";

class SimpleShader{
    constructor(vertexShaderPath, fragmentShaderPath) {
        //constructor(vertexShaderID, fragmentShaderID) {
        // instance variables
        // Convention: all instance variables: mVariables
        this.mCompiledShader = null;  // ref to compiled shader in webgl
        
        this.mVertexPositionRef = null; // ref to VertexPosition in
        this.mPixelColorRef = null;     // ref to pixelColor uniform in simple_fs.glsl
        this.mModelMatrixRef = null;    // ref to model matrix uniform


        let gl = glSys.get();
        // Step A: load and compile vertex and fragment shaders
        //this.mVertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
        //this.mFragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

        this.mVertexShader = loadAndCompileShaderFromFile(vertexShaderPath, gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShaderFromFile(fragmentShaderPath, gl.FRAGMENT_SHADER);


        // Step B: Create and link the shaders into a program.
        this.mCompiledShader = gl.createProgram();
        gl.attachShader(this.mCompiledShader, this.mVertexShader);
        gl.attachShader(this.mCompiledShader, this.mFragmentShader);
        gl.linkProgram(this.mCompiledShader);
        // Step C: check for error
        if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
            return null;
        }
        // Step D: Gets reference to aVertexPosition attribute in the shader
        this.mVertexPositionRef = gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");

        //Step E: get uniform location
        this.mPixelColorRef = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");

        this.mModelMatrixRef = gl.getUniformLocation(this.mCompiledShader, "uModelXformMatrix");
    }
    activate(pixelColor, trsMatrix){
        // Step A: access to the webgl context
        let gl = glSys.get();
        // Step B: identify the compiled shader to use
        gl.useProgram(this.mCompiledShader);
        // Step C: bind vertex buffer to attribute defined in vertex shader
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef,
            3,            // each element is a 3-float (x,y.z)
            gl.FLOAT,      // data type is FLOAT
            false,         // if the content is normalized vectors
            0,           // number of bytes to skip in between elements
            0);          // offsets to the first element
        gl.enableVertexAttribArray(this.mVertexPositionRef); 
        //load uniform (s) variables
        gl.uniform4fv(this.mPixelColorRef, pixelColor); 
        
        gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
    }
  

}

function loadAndCompileShader(id, shaderType) 
{
    let shaderSource = null, compiledShader = null;
    // Step A: Get the shader source from index.html
    let shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;
    let gl = glSys.get();
    // Step B: Create shader based on type: vertex or fragment
    compiledShader = gl.createShader(shaderType);
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are displayed.
    // This is useful for debugging the shaders.
    //debugger;
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A shader compiling error occurred: " +
                      gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}

function loadAndCompileShaderFromFile(filePath, shaderType) 
{
    let xmlReq, shaderSource = null, compiledShader = null;
    let gl = glSys.get();

    // Step A: Get the shader source from the give file
    xmlReq=new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        throw new Error("Failed to load shader: "
              + filePath
              + " [Hint: you cannot double click to run this project. "
              + "The index.html file must be loaded by a web-server.]");
        return null;
    }
    shaderSource = xmlReq.responseText;


    // Step A: Get the shader source from index.html
    //let shaderText = document.getElementById(id);
    //shaderSource = shaderText.firstChild.textContent;


    // Step B: Create shader based on type: vertex or fragment
    compiledShader = gl.createShader(shaderType);
    // Step C: Compile the created shader
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are displayed.
    // This is useful for debugging the shaders.
    //debugger;
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A shader compiling error occurred: " +
                      gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}

export default SimpleShader;
