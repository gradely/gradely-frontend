var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH = 500;
var HEIGHT = 50;
var rafID = null;

window.onload = function () {
  // grab our canvas
  canvasContext = document.getElementById('meter').getContext('2d');

  // monkeypatch Web Audio
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  // grab an audio context
  audioContext = new AudioContext();

  // Attempt to get audio input
  try {
    // monkeypatch getUserMedia
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // ask for an audio input
    navigator.getUserMedia(
      {
        audio: {
          mandatory: {
            googEchoCancellation: 'false',
            googAutoGainControl: 'false',
            googNoiseSuppression: 'false',
            googHighpassFilter: 'false',
          },
          optional: [],
        },
      },
      gotStream,
      didntGetStream,
    );
  } catch (e) {
    alert('getUserMedia threw exception :' + e);
  }
};

function didntGetStream() {
  alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
  // Create an AudioNode from the stream.
  mediaStreamSource = audioContext.createMediaStreamSource(stream);

  // Create a new volume meter and connect it.
  meter = createAudioMeter(audioContext);
  mediaStreamSource.connect(meter);

  // kick off the visual updating
  drawLoop();
}

function drawLoop(time) {
  // clear the background
  canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

  // check if we're currently clipping
  if (meter.checkClipping()) canvasContext.fillStyle = 'red';
  else canvasContext.fillStyle = 'green';

  // draw a bar based on the current volume
  canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);

  // set up the next visual callback
  rafID = window.requestAnimationFrame(drawLoop);
}
