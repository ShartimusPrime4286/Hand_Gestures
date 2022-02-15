hand_gesture=" "
Webcam.set({
    width:350,
    height:260,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="result_image" src="'+data_uri+'">';
    });
}
console.log("ml5 version: ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ugfr7xrSB/model.json',modelloaded);
function modelloaded(){
    console.log('model loaded');
}
function speak(){
    var synth= window.speechSynthesis;
    speak_data1="the hand gesture is"+hand_gesture;
    var utterthis= new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterthis);
}
function predict(){
    img=document.getElementById("result_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_1").innerHTML=results[0].label;
        document.getElementById("result_2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Best"){
            document.getElementById("hand_gesture").innerHTML="&#128077;";
        }
        if(results[0].label=="Victory"){
            document.getElementById("hand_gesture").innerHTML="&#9996;";
        }
        if(results[0].label=="Amazing"){
            document.getElementById("hand_gesture").innerHTML="&#128076;";
        }
    }
}