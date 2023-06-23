"use strict";
class Transform{
    constructor(){
        //PRS, => TRS
        this.mPosition=vec2.fromValues(0,0);
        this.mRotationInRad = 0.0; //in radians
        this.mScale=vec2.fromValues(1,1); 

    }

    //Getters and Setters
    //Position
    getPosition() { return this.mPosition; }
    setPosition(xPos, yPos) {
        this.setXPos(xPos); 
        this.setYPos(yPos); 
    }

    setXPos(xPos) { this.mPosition[0]=xPos; }
    setYPos(yPos) { this.mPosition[1]=yPos; }
    getXPos() { return this.mPosition[0]; }
    getYPos() { return this.mPosition[1]; }
    incXPosBy(delta) { this.mPosition[0] += delta; }
    incYPosBy(delta) { this.mPosition[1] += delta; }


    //Rotation
    getRotationInRad() {  return this.mRotationInRad; }
    setRotationInRad(rotInRads){
        this.mRotationInRad=rotInRads;
        while(this.mRotationInRad > (2*Math.PI)){
            this.mRotationInRad -= (2*Math.PI);
        }
    }
    //in degrees
    getRotationInDegrees() { return this.mRotationInRad * 180.0 / Math.PI; }
    setRotationInDegrees(rotInDegs) {
        this.setRotationInRad(rotInDegs / 180.0 * Math.PI);
    }
    incRotationByRad(deltaRad){
        this.setRotationInRad(this.mRotationInRad + deltaRad);
    }
    incRotationByDegree(deltaDegrees){
        //debugger;
        this.incRotationByRad(deltaDegrees/180.0 * Math.PI);

    }

    //Scale/Size
    getScale() { return this.mScale; }
    getSize() { return this.mScale; }
    setScale(width, height){
        this.mScale[0]=width;
        this.mScale[1]=height;
    }
    setSize(width, height){
        this.mScale[0]=width;
        this.mScale[1]=height;
    }
    setWidth(width) { this.mScale[0]=width; }
    setHeight(height) { this.mScale[1]= height; }
    getWidth() { return this.mScale[0]; }
    getHeight() { return this.mScale[1]; }

    incWidthBy(delta) { this.mScale[0] += delta; }
    incHeightBy(delta) { this.mScale[1] += delta; }
    incSizeBy(delta) { 
        this.incWidthBy(delta); 
        this.incHeightBy(delta); 
    }

    //3.3 - TRSMatrix
    getTRSMatrix(){ 
        let trsMatrix=mat4.create();  //I
        mat4.translate(trsMatrix,trsMatrix,vec3.fromValues(this.getXPos(),this.getYPos(),0.0)); //T
        mat4.rotateZ(trsMatrix,trsMatrix,this.getRotationInRad()); //R
        mat4.scale(trsMatrix,trsMatrix,vec3.fromValues(this.getWidth(),this.getHeight(),1));    //S
        return trsMatrix;
    }



}

export default Transform;