const video = document.getElementById('video')

async function detection () {
    try{
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    await faceapi.nets.faceExpressionNet.loadFromUri('/models')
    console.log("traine dun");
    }
    catch (err){
        console.error();
        console.log("something in the training stage");
    } 
    const stream =  await navigator.mediaDevices.getUserMedia(
        {audio : false,
        video : true}
    );
    video.srcObject = stream;
}

detection();

video.addEventListener('play' , () => {
  const canvas = faceapi.createCanvasFromMedia(video)

   //document.body.append(canvas)
   //const displaySize = { width: video.width, height: video.height }
   //faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, 
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    ///let value =  JSON.parse(detections);
    if(detections.length == 1){
        let res = 'angry' ; 
        let compeareval = detections[0].expressions.angry
        if (detections[0].expressions.sad > compeareval) { res = 'sad';}
        if (detections[0].expressions.surprised > compeareval) { res = 'surprised';}
        if (detections[0].expressions.happy > compeareval){res = 'happy';}
        if (detections[0].expressions.neutral > compeareval){ res = 'neutral';}
        console.log(faceapi.FaceExpressionNet);
        console.log(res);
        //console.log(detections);
    }
  }, 100)
  //length
});