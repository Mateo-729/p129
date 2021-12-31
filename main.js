song1="";
song2="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scrollLeftWrist=0;

function preload()
{
    song1=loadSound("music1.mp3");
    song2=loadSound("music2.mp3");
}
function setUp()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log('poseNet is initiated')
}
function gotPoses(results)
{
    if(results.length>0){
        console.log(results);
        scrollLeftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+" leftWristY="+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+" rightWristY="+rightWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill('red');
    stroke('red');
    if(scrollLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status==false)
        {
            song2.play();
            document.getElementById("song").innerHTML="playing- -Unstoppable"
        }
    }
}
function play()
{
    song.play();
    song.setVolume(0.3);
    song.rate(1);
}