# AB-Audio-Player
<div id="top"></div>

  <p align="center">
    A HTML/CSS/Javascript-only audio player that allows you to toggle between two versions of the same audio file - with NO dependencies.
What's it for? One pratical reason is the side-by-side comparison of different audio mixes/production processes.
    <br />
  </p>
</div>

<h3 align="center"><a href="https://mattbartley.github.io/AB-Audio-Player/" target="_blank">VIEW DEMO 🎵</h3>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

### Zero-Dependencies

Built with only HTML, CSS, and Javascript.

### Getting Started

1. Simply add audio files to the assets folder (HTML supports MP3, WAV, and OGG). The files must have the same duration to work correctly.
2. Update index.html player__wrapper div's attributes 'data-audio-a' and 'data-audio-b' with the location/filenames for each player. Example for two players:
   ```html
   <div class="player__wrapper"
        data-audio-a="./assets/sound1-a.mp3"
        data-audio-b="./assets/sound1-b.mp3"
   >
   <div class="player__wrapper"
        data-audio-a="./assets/sound2-a.mp3"
        data-audio-b="./assets/sound2-b.mp3"
   >
   ```
3. There are some caveats with different browsers handling how the audio file is preloaded, muted, etc. Test thoroughly for production use.

<p align="right">(<a href="#top">back to top</a>)</p>

### License

Distributed under the MIT License. See `LICENSE.txt` for more information.
If you do use it, let me know - I'd love to see it in action!

<p align="right">(<a href="#top">back to top</a>)</p>

