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
    transcript = transcript.toLowerCase();
    console.log(transcript);

    if(transcript.includes("hare krishna")){
        speakOut("Jay Srila Prabhupada");
    }

    if(transcript.includes("open youtube")){
        speakOut("opening youtube");
        window.open("https://www.youtube.com/");
    }

    if(transcript.includes("open google")){
        speakOut("opening google");
        window.open("https://www.google.com/");
    }

    if(transcript.includes("open firebase")){
        speakOut("opening firbase");
        window.open("https://console.firebase.google.com/");
    }

    if(transcript.includes("search for")){
        speakOut("Here's the result");
        let input = transcript.toLowerCase().replace("search for","").trim();
        // input.splice(0, 11)
        input = input.split(" ").join("+");
        console.log(input);
        window.open(`https://www.google.com/search?q=${input}`)
    }

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
    speakOut("Kaa hoo Abhishek babua ham jarvis bola thai");
})

window.onload = function(){
    speakOut("   ");
}