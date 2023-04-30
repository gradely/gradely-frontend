navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia(
  { audio: true },
  function (stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();

    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Connect it to the destination to hear yourself (or any other node for processing!)
    // mediaStreamSource.connect( audioContext.destination );
  },
  function (e) {},
);
