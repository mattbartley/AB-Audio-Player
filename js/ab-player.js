let players = document.querySelectorAll('.player__wrapper');

initializePlayers(players);

function initializePlayers(players) {
  players.forEach((player) => {
    //Set up audio elements
    var soundA = document.createElement('audio');
    //Set audio A src here
    soundA.src = player.getAttribute('data-audio-a');
    soundA.preload = 'auto';
    soundA.setAttribute('hidden', 'true');
    document.body.append(soundA);

    var soundB = document.createElement('audio');
    //Set audio B src here
    soundB.src = player.getAttribute('data-audio-b');
    soundB.preload = 'auto';
    soundB.setAttribute('hidden', 'true');
    document.body.append(soundB);

    //Get button elements
    const aButton = player.querySelector('.a__button');
    const bButton = player.querySelector('.b__button');
    const playButton = player.querySelector('.play__button');
    const stopButton = player.querySelector('.stop__button');
    const progressBar = player.querySelector('.progress__bar');
    const progressFill = player.querySelector('.progress__fill');

    const playIcon = '<i class="fa-solid fa-play"></i>';
    const pauseIcon = '<i class="fa-solid fa-pause"></i>';
    const stopIcon = '<i class="fa-solid fa-stop"></i>';

    //Check for mobile to enable audio playback without waiting for download status.
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      playButton.disabled = false;
    }

    //Default loading state for each sound
    var soundAReady = false;
    var soundBReady = false;

    //When audio can play through (loaded), run the function to enable buttons
    //The canplaythrough event will fire every time the audio switches, so the !soundA/BReady prevents additional checks
    soundA.oncanplaythrough = function () {
      if (!soundAReady) {
        soundAReady = true;
        audioIsReady();
      }
    };
    soundB.oncanplaythrough = function () {
      if (!soundBReady) {
        soundBReady = true;
        audioIsReady();
      }
    };

    // Check if both A & B are ready and enable the correct buttons
    function audioIsReady() {
      if (soundAReady && soundBReady) {
        console.log('...audio loaded!');
        aButton.disabled = false;
        playButton.disabled = false;
      } else {
        console.log('Audio loading...');
      }
    }

    const progress = player.querySelector('.progress');
    // Listen for click on entire progress bar div (to allow skipping ahead)
    progress.addEventListener('click', function (event) {
      // Get X coordinate of click in div
      var rect = this.getBoundingClientRect();
      // Convert click position to percentage value
      var percentage = (event.clientX - rect.left) / this.offsetWidth;
      // Seek to the percentage converted to seconds
      soundA.currentTime = percentage * soundA.duration;
      soundB.currentTime = percentage * soundB.duration;
    });

    //Play/Stop correct audio and toggle A/B, Play/Pause, and Stop buttons
    function playPause() {
      if (soundA.paused & soundB.paused) {
        let soundATime = soundA.currentTime;
        let soundBTime = soundB.currentTime;
        if (soundATime >= soundBTime) {
          soundA.play();
          bButton.disabled = false;
          aButton.disabled = true;
          playButton.innerHTML = pauseIcon;
        } else {
          soundB.play();
          bButton.disabled = true;
          aButton.disabled = false;
          playButton.innerHTML = pauseIcon;
        }
        stopButton.disabled = false;
      } else {
        playButton.innerHTML = playIcon;
        soundA.pause();
        soundB.pause();
      }
    }

    aButton.addEventListener('click', (e) => {
      pauseAll();
      playButton.innerHTML = pauseIcon;
      aButton.disabled = true;
      bButton.disabled = false;
      stopButton.disabled = false;
      if (soundB.currentTime > 0) {
        soundA.currentTime = soundB.currentTime;
        soundA.play();
        soundB.pause();
      } else {
        soundA.play();
        soundB.pause();
      }
    });

    bButton.addEventListener('click', (e) => {
      pauseAll();
      playButton.innerHTML = pauseIcon;
      bButton.disabled = true;
      aButton.disabled = false;

      stopButton.disabled = false;
      if (soundA.currentTime > 0) {
        soundB.currentTime = soundA.currentTime;
        soundB.play();
        soundA.pause();
      } else {
        soundB.play();
      }
    });

    playButton.addEventListener('click', (e) => {
      let allAudio = document.querySelectorAll('audio');
      let allButtons = document.querySelectorAll('.play__button');
      for (let i = 0; i < allAudio.length; i++) {
        if (allAudio[i] !== soundA && allAudio[i] !== soundB) {
          allAudio[i].pause();
        }
      }
      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] !== playButton) {
          allButtons[i].innerHTML = playIcon;
        }
      }
      playPause();
    });

    stopButton.addEventListener('click', (e) => {
      stopSounds();
    });

    soundA.addEventListener('playing', (e) => {
      console.log('playing a');
      progressFill.style.width =
        ((soundA.currentTime / soundA.duration) * 100 || 0) + '%';
      requestAnimationFrame(stepA);
    });

    soundB.addEventListener('playing', (e) => {
      console.log('playing b');
      progressFill.style.width =
        ((soundB.currentTime / soundB.duration) * 100 || 0) + '%';
      requestAnimationFrame(stepB);
    });

    const stopSounds = () => {
      playButton.innerHTML = playIcon;
      aButton.disabled = false;
      bButton.disabled = true;
      playButton.disabled = false;
      stopButton.disabled = true;
      soundA.pause();
      soundA.currentTime = 0;
      soundB.pause();
      soundB.currentTime = 0;
    };

    function pauseAll() {
      let allAudio = document.querySelectorAll('audio');
      allAudio.forEach((audio) => {
        audio.pause();
      });
      document.querySelectorAll('.play__button').forEach((button) => {
        button.innerHTML = playIcon;
      });
    }

    //Frame animations for progress bar fill - converts to CSS percentage
    function stepA() {
      progressFill.style.width =
        ((soundA.currentTime / soundA.duration) * 100 || 0) + '%';
      requestAnimationFrame(stepA);
    }
    function stepB() {
      progressFill.style.width =
        ((soundB.currentTime / soundB.duration) * 100 || 0) + '%';
      requestAnimationFrame(stepB);
    }
  });
}
