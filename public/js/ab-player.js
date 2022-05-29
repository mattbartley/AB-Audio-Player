//Set up audio elements
var soundA = document.createElement("audio");
soundA.src = "./assets/before.wav";
soundA.preload = "auto";

var soundB = document.createElement("audio");
soundB.src = "./assets/after.wav";
soundB.preload = "auto";

//Get button elements
const aButton = document.getElementById("a__button");
const bButton = document.getElementById("b__button");
const playButton = document.getElementById("play__button");
const stopButton = document.getElementById("stop__button");

//Default loading state for each sound
var soundAReady = false;
var soundBReady = false;

//When audio can play through (loaded), run the function to enable buttons
soundA.oncanplaythrough = function () {
  soundAReady = true;
  audioIsReady();
};
soundB.oncanplaythrough = function () {
  soundBReady = true;
  audioIsReady();
};

// Check if both A & B are ready and enable the correct buttons
function audioIsReady() {
  if (soundAReady && soundBReady) {
    aButton.removeAttribute("disabled", "false");
    playButton.removeAttribute("disabled", "false");
  } else {
    console.log("not ready");
  }
}

//Play/Stop correct audio and toggle A/B and Play/Stop buttons
const playSoundA = () => {
  if (soundB.currentTime > 0) {
    soundA.currentTime = soundB.currentTime;
    soundA.play();
    soundB.pause();
    soundB.currentTime = 0;
  } else {
    soundA.play();
    soundB.pause();
  }
  aButton.setAttribute("disabled", "true");
  bButton.removeAttribute("disabled", "true");
  playButton.setAttribute("disabled", "true");
  stopButton.removeAttribute("disabled", "true");
};

const playSoundB = () => {
  if (soundA.currentTime > 0) {
    soundB.currentTime = soundA.currentTime;
    soundB.play();
    soundA.pause();
    soundA.currentTime = 0;
  } else {
    soundB.play();
  }
  bButton.setAttribute("disabled", "true");
  aButton.removeAttribute("disabled", "true");
  playButton.setAttribute("disabled", "true");
  stopButton.removeAttribute("disabled", "true");
};

const stopSounds = () => {
  soundA.pause();
  soundA.currentTime = 0;
  soundB.pause();
  soundB.currentTime = 0;
  aButton.removeAttribute("disabled", "true");
  bButton.removeAttribute("disabled", "true");
  playButton.removeAttribute("disabled", "true");
  stopButton.setAttribute("disabled", "true");
};
