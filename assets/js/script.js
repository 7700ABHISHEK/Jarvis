// selecting elements

const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

// Speech Recognition Setup

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

// Speech Recognition start

recognition.onstart = function(){
    console.log("VR start");
}

// Speech Recognition end

recognition.onend = function(){
    console.log("VR stop");
}

// Speech Recognition on result

recognition.onresult = function(e){
    console.log(e);

    let currentIdx = e.resultIndex;

    let transcript = e.results[currentIdx][0].transcript;
    console.log(transcript);

    speakOut(transcript);
}

// vr continuous
// recognition.continuous = true;

startBtn.addEventListener("click", ()=>{
    recognition.start();
})

stopBtn.addEventListener("click", ()=>{
    recognition.stop();
})

// Jarvis speech...

function speakOut(message){
    const speech = new SpeechSynthesisUtterance();
    // For Different voices
    const voices = speechSynthesis.getVoices();

    // we are getting voices from clg in index
    // console.log(voices);

    speech.voice = voices[12]; // thats what we are passing in it....
    // speech.lang = "hi-in";
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}

speakBtn.addEventListener("click", ()=>{
    speakOut("...Hare Krsna, Abhishek it's me jarvis");
})

window.onload = function(){
    speakOut("   ");
}