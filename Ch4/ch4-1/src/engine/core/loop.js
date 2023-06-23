"use sctrict";
const kUPS = 60;
const kMPF = 1000 / kUPS; //~16.6667 ms

//time keeping
let mPrevTime;
let mLagTime;

//loop state
let mLoopRunning = false;
let mCurrentScene = null;
let mFrameID = -1;

function loopOnce(){
    if(mLoopRunning){
        //Step A: set up the next call
        mFrameID = requestAnimationFrame(loopOnce);
        //Step B: draw
        mCurrentScene.draw(); 
        //Step C: compute elapsed time
        let currentTime= performance.now();
        let elaplsedTime =currentTime - mPrevTime;
        mPrevTime = currentTime;

        mLagTime += elaplsedTime;

        //Setp D: catch up the lag time
        while ((mLagTime >= kMPF) && mLoopRunning){
            mCurrentScene.update();
            mLagTime -= kMPF;
        }

    }//mLoopRunning

   
}

 //Scene API:
// s.init()
// s.draw()
// s.update()

function start(scene){
    if(mLoopRunning){
        throw new Error("Loop alreqady running!");

    }
    mCurrentScene=scene;
    mCurrentScene.init();
    mPrevTime=performance.now();
    mLagTime=0.0;
    mLoopRunning=true;
    mFrameID = requestAnimationFrame(loopOnce);

}

function stop(){
    mLoopRunning=false;
    cancelAnimationFrame(mFrameID);

}

export {start, stop}
