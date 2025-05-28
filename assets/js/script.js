// selecting elements

const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");

// Speech Recognition Setup

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

// Speech Recognition start

recognition.onstart = function () {
    console.log("VR start");
}

// Speech Recognition end

recognition.onend = function () {
    console.log("VR stop");
}

// Weather setup....... //

function weather(location) {
    const weatherContent = document.querySelector(".temp").querySelectorAll("*");
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a3000df93c44a85630b3e59a17168a0a`;

    fetch(URL)
        .then((res) => {
            return res.json();
        })
        .then((data)=>{
            if(this.data != '404'){
                console.log("Weather data : ",data);  

                weatherContent[0].textContent = `Location : ${data.name}`
                weatherContent[1].textContent = `Country : ${data.sys.country}`
                weatherContent[2].textContent = `Weather Type : ${data.weather[0].main}`
                weatherContent[3].textContent = `Weather Description : ${data.weather[0].description}`
                weatherContent[4].src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                weatherContent[5].textContent = `Feels like : ${data.main.feels_like}`
                weatherContent[6].textContent = `Min Temperature : ${data.main.temp_min}`
                weatherContent[7].textContent = `Max Temperature : ${data.main.temp_max}`

                let weatherStatement = `Hare Krishna, the weather in ${data.name} is ${data.weather[0].description} and it feels like ${data.main.feels_like}`;
            } else{
                weatherContent[0].textContent = "Weather Info Not Found....";
            }
        })

}

// just for testing :-

// weather("gujarat");

// jarvis info setup

const setup = document.querySelector(".details");
setup.style.display = "none";

if(localStorage.getItem("jarvis_setup") == null){
    setup.style.display = "block";
    setup.querySelector("#submitBtn").addEventListener("click", userInfo);
}

// UserInfo Function
function userInfo(){
    const setupInfo = {
        name: setup.querySelectorAll("input")[0].value,
        location: setup.querySelectorAll("input")[1].value,
        instagram: setup.querySelectorAll("input")[2].value,
        github: setup.querySelectorAll("input")[3].value,
    }

    let testArr = [];

    setup.querySelectorAll("input").forEach((e)=>{
        testArr.push(e.value);
    })

    if(testArr.includes("")){
        speakOut("Enter all the details bangdu...");
    } else{
        localStorage.clear();
        localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
        setup.style.display = "none";
        weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
    }
}


// Speech Recognition on result

recognition.onresult = function (e) {
    console.log(e);

    let userData = localStorage.getItem("jarvis_setup")

    let currentIdx = e.resultIndex;

    let transcript = e.results[currentIdx][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(transcript);

    if (transcript.includes("hare krishna")) {
        speakOut("Jay Srila Prabhupada");
    }

    if (transcript.includes("open youtube")) {
        speakOut("opening youtube");
        window.open("https://www.youtube.com/");
    }

    if (transcript.includes("open google")) {
        speakOut("opening google");
        window.open("https://www.google.com/");
    }

    if (transcript.includes("open firebase")) {
        speakOut("opening firbase");
        window.open("https://console.firebase.google.com/");
    }

    if (transcript.includes("search for")) {
        speakOut("Here's the result");
        let input = transcript.toLowerCase().replace("search for", "").trim();
        // input.splice(0, 11)
        input = input.split(" ").join("+");
        // console.log(input);
        window.open(`https://www.google.com/search?q=${input}`)
    }

    if (transcript.includes("search in youtube")) {
        speakOut("Here's the result in youtube");
        let input = transcript.toLowerCase().replace("search in youtube", "").trim();
        input = input.split(" ").join("+");
        console.log(input);
        window.open(`https://www.youtube.com/search?q=${input}`)
    }

    if(transcript.includes("open github") || transcript.includes("open guitar")){
        speakOut("opening github");
        window.open("https://github.com/");
    }

    if(transcript.includes("open my github account") || transcript.includes("open my guitar account")){
        speakOut("opening your github account");
        window.open(`https://github.com/${JSON.parse(userData).github}`);
    }

    if(transcript.includes("open instagram")){
        speakOut("opening instagram");
        window.open(`https://www.instagram.com/`);
    }
    
    if(transcript.includes("open my instagram account")){
        speakOut("opening your instagram account");
        window.open(`https://www.instagram.com/${JSON.parse(userData).instagram}`);
    }

    if(transcript.includes("what's my name") || transcript.includes("what is my name") || transcript.includes("can you tell me my name")){
        speakOut(`your name is ${JSON.parse(userData).name}`);
    }

}

// vr continuous
// recognition.continuous = true;

startBtn.addEventListener("click", () => {
    recognition.start();
})

stopBtn.addEventListener("click", () => {
    recognition.stop();
})

// Jarvis speech...

function speakOut(message) {
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

speakBtn.addEventListener("click", () => {
    speakOut("Kaa hoo Abhishek babua ham jarvis bola thai");
})

window.onload = function () {
    speakOut("   ");
}