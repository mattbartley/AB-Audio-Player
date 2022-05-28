var soundA = new Howl({
  src: ["./assets/before.wav"],
  autoplay: false,
  loop: true,
  volume: 1,
});
var soundB = new Howl({
  src: ["./assets/after.wav"],
  autoplay: false,
  loop: true,
  volume: 1,
});

const aButton = document.getElementById("a__button");
const bButton = document.getElementById("b__button");
const playButton = document.getElementById("play__button");
const stopButton = document.getElementById("stop__button");

const playSoundA = () => {
  soundB.stop();
  soundA.play();
  aButton.setAttribute("disabled", "disabled");
  bButton.removeAttribute("disabled", "disabled");
  playButton.setAttribute("disabled", "disabled");
  stopButton.removeAttribute("disabled", "disabled");
};

const playSoundB = () => {
  soundA.stop();
  soundB.play();
  bButton.setAttribute("disabled", "disabled");
  aButton.removeAttribute("disabled", "disabled");
  playButton.setAttribute("disabled", "disabled");
  stopButton.removeAttribute("disabled", "disabled");
};

const stopSounds = () => {
  soundA.stop();
  soundB.stop();
  aButton.removeAttribute("disabled", "disabled");
  bButton.removeAttribute("disabled", "disabled");
  playButton.removeAttribute("disabled", "disabled");
  stopButton.setAttribute("disabled", "disabled");
};
