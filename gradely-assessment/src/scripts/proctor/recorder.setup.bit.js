proctor.prototype.prepareRecorder = function () {
  var pc = this;

  pc.recorderReady = false;

  this.recorder = new Recorder({
    monitorGain: parseInt(0, 10),
    numberOfChannels: parseInt(1, 10),
    wavBitDepth: parseInt(16, 10),
    encoderPath: 'js/waveWorker.min.js',
  });

  this.recorder.addEventListener('start', function (e) {
    if (pc.stopped === true) return;
    pc.log('Proctor: Recorder is started');
  });
  this.recorder.addEventListener('stop', function (e) {
    pc.log('Proctor: Recorder is stopped');
  });
  this.recorder.addEventListener('pause', function (e) {
    pc.log('Proctor: Recorder is paused');
  });
  this.recorder.addEventListener('resume', function (e) {
    pc.log('Proctor: Recorder is resuming');
  });
  this.recorder.addEventListener('streamError', function (e) {
    pc.log('Proctor: Error encountered: ' + e.error.name);
  });
  this.recorder.addEventListener('streamReady', function (e) {
    (pc.recorderReady = true), pc.setProctorReady();
    pc.log('Proctor: Audio stream is ready');
  });
  this.recorder.addEventListener('dataAvailable', function (e) {
    if (pc.stopped === true) return;
    var dataBlob = new Blob([e.detail], { type: 'audio/wav' });
    var reader = new window.FileReader();
    reader.readAsDataURL(dataBlob);
    reader.onloadend = function () {
      var base64data = reader.result;
      pc.opts.handleAudioUpload(base64data);
    };
  });

  this.recorder.initStream();
};
