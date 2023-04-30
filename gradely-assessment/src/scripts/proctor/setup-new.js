const RecordRTC = require("./RecordRTC");

((win, doc) => {
  "use strict";
  function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
    var processor = audioContext.createScriptProcessor(512);
    processor.onaudioprocess = volumeAudioProcess;
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = clipLevel || 0.98;
    processor.averaging = averaging || 0.95;
    processor.clipLag = clipLag || 750;

    // this will have no effect, since we don't copy the input to the output,
    // but works around a current Chrome bug.
    processor.connect(audioContext.destination);

    processor.checkClipping = function() {
      if (!this.clipping) return false;
      if (this.lastClip + this.clipLag < window.performance.now())
        this.clipping = false;
      return this.clipping;
    };

    processor.shutdown = function() {
      this.disconnect();
      this.onaudioprocess = null;
    };

    return processor;
  }

  function volumeAudioProcess(event) {
    var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
    var sum = 0;
    var x;

    // Do a root-mean-square on the samples: sum up the squares...
    for (var i = 0; i < bufLength; i++) {
      x = buf[i];
      if (Math.abs(x) >= this.clipLevel) {
        this.clipping = true;
        this.lastClip = window.performance.now();
      }
      sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms = Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume * this.averaging);
  }

  let defaults, proctor;

  defaults = {
    detectionLapse: 10, // lapse between general detections (audio, face)
    /**
     * @summary Score descriptions
     */
    scores: {
      noFace: 0,
      multiFace: 0,
      ambientNoise: 0,
      integrityScore: 100
    },

    data: {
      noFaceN: 0,
      multiFaceN: 0,
      ambientNoiseN: 0,
      integrityScore: 100
    },

    audio: {
      fps: 30,
      /**
       * Audio sensitivity to trigger recording
       */
      sensitivity: 4,
      /**
       * @summary Ignore Recording
       */
      ignoreRecording: false,
      /**
       * Duration of audio recoding (Measured in ms)
       */
      recordingDuration: 5000
    },

    video: {
      /**
       * @summary Video id or class
       */
      element: "#proctor-canvas",
      /**
       * @summary Canvas id or class
       */
      canvas: "#proctor-canvas",
      /**
       * Video operational frames per second
       */
      fps: 30,
      streamWidth: 800, //320,
      streamHeight: 350, //240,
      /**
       * @summary Ignore Tracking
       */
      ignoreTrack: false,
      /**
       * Take snaphot on proctor intialization and face tracked
       * @type boolean
       */
      takeInitialSnapshot: false
    },
    /**
     * No face was detected
     * @type function
     */
    onNoFaceTracked: function(feedback) {},
    /**
     * Perform a function on multi face tracked
     * @type function
     */
    onMultiFaceTracked: function(feedback) {},
    /**
     * @summary Do something with the snapshot taken (upload|display...) Data is in base64
     * @type function
     * @param data64 {Object} Image file in base64
     */
    handleSnapshotUpload: function(data64, eventName) {},
    /**
     * Ambient noise detection
     */
    onAmbientNoiseDetection: function(feedback, pitch, meter) {},
    /**
     * @summary This plugin is on the bleeding edge of tech. Gracefully handle exceptions
     */
    handleOutdatedBrowser: function() {},
    /**
     * Microphone permission denied
     */
    onMicPermissionDenied: function() {},
    /**
     * Webcam permission denied
     */
    onCamPermissionDenied: function() {},
    /**
     * No webcam found on user device
     */
    onCamNotDetected: function() {},
    /**
     * No Microphone found on user device
     */
    onMicNotDetected: function() {},
    /**
     * Proctor ready
     */
    proctorReady: function() {},
    /**
     * When outside a browser is clicked
     */
    onOutsideBrowserTabClick: function(n) {},

    showLogs: false
  };

  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    navigator.enumerateDevices = function(callback) {
      navigator.mediaDevices.enumerateDevices().then(callback);
    };
  }

  let MediaDevices = [];
  let isHTTPs = location.protocol === "https:";
  let canEnumerate = false;

  if (
    typeof MediaStreamTrack !== "undefined" &&
    "getSources" in MediaStreamTrack
  ) {
    canEnumerate = true;
  } else if (
    navigator.mediaDevices &&
    !!navigator.mediaDevices.enumerateDevices
  ) {
    canEnumerate = true;
  }

  let hasMicrophone = false;
  let hasSpeakers = false;
  let hasWebcam = false;

  let isMicrophoneAlreadyCaptured = false;
  let isWebcamAlreadyCaptured = false;

  function checkDeviceSupport(callback) {
    if (!canEnumerate) {
      return;
    }

    if (
      !navigator.enumerateDevices &&
      window.MediaStreamTrack &&
      window.MediaStreamTrack.getSources
    ) {
      navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(
        window.MediaStreamTrack
      );
    }

    if (!navigator.enumerateDevices && navigator.enumerateDevices) {
      navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
    }

    if (!navigator.enumerateDevices) {
      if (callback) {
        callback();
      }
      return;
    }

    MediaDevices = [];
    navigator.enumerateDevices(function(devices) {
      devices.forEach(function(_device) {
        let device = {};
        for (let d in _device) {
          device[d] = _device[d];
        }

        if (device.kind === "audio") {
          device.kind = "audioinput";
        }

        if (device.kind === "video") {
          device.kind = "videoinput";
        }

        let skip;

        MediaDevices.forEach(function(d) {
          if (d.id === device.id && d.kind === device.kind) {
            skip = true;
          }
        });

        if (skip) {
          return;
        }

        if (!device.deviceId) {
          device.deviceId = device.id;
        }

        if (!device.id) {
          device.id = device.deviceId;
        }

        if (!device.label) {
          device.label = "Please invoke getUserMedia once.";
          if (!isHTTPs) {
            device.label =
              "HTTPs is required to get label of this " +
              device.kind +
              " device.";
          }
        } else {
          if (device.kind === "videoinput" && !isWebcamAlreadyCaptured) {
            isWebcamAlreadyCaptured = true;
          }

          if (device.kind === "audioinput" && !isMicrophoneAlreadyCaptured) {
            isMicrophoneAlreadyCaptured = true;
          }
        }

        if (device.kind === "audioinput") {
          hasMicrophone = true;
        }

        if (device.kind === "audiooutput") {
          hasSpeakers = true;
        }

        if (device.kind === "videoinput") {
          hasWebcam = true;
        }

        // there is no 'videoouput' in the spec.
        MediaDevices.push(device);
      });

      if (callback) {
        callback();
      }
    });
  }

  function limitFPS(fn, fps) {
    let requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / fps);
      };

    let then = new Date().getTime();

    fps = fps || 30;
    let interval = 1000 / fps;

    return (function loop(time) {
      let Af = requestAnimationFrame(loop);

      let now = new Date().getTime();
      let delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);

        fn();
      }

      return Af;
    })(0);
  }

  function isMergeableObject(val) {
    let nonNullObject = val && typeof val === "object";

    return (
      nonNullObject &&
      Object.prototype.toString.call(val) !== "[object RegExp]" &&
      Object.prototype.toString.call(val) !== "[object Date]"
    );
  }

  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }

  function cloneIfNecessary(value, optionsArgument) {
    let clone = optionsArgument && optionsArgument.clone === true;
    return clone && isMergeableObject(value)
      ? deepmerge(emptyTarget(value), value, optionsArgument)
      : value;
  }

  function defaultArrayMerge(target, source, optionsArgument) {
    let destination = target.slice();
    source.forEach(function(e, i) {
      if (typeof destination[i] === "undefined") {
        destination[i] = cloneIfNecessary(e, optionsArgument);
      } else if (isMergeableObject(e)) {
        destination[i] = deepmerge(target[i], e, optionsArgument);
      } else if (target.indexOf(e) === -1) {
        destination.push(cloneIfNecessary(e, optionsArgument));
      }
    });
    return destination;
  }

  function mergeObject(target, source, optionsArgument) {
    let destination = {};
    if (isMergeableObject(target)) {
      Object.keys(target).forEach(function(key) {
        destination[key] = cloneIfNecessary(target[key], optionsArgument);
      });
    }
    Object.keys(source).forEach(function(key) {
      if (!isMergeableObject(source[key]) || !target[key]) {
        destination[key] = cloneIfNecessary(source[key], optionsArgument);
      } else {
        destination[key] = deepmerge(target[key], source[key], optionsArgument);
      }
    });
    return destination;
  }

  function deepmerge(target, source, optionsArgument) {
    let array = Array.isArray(source);
    let options = optionsArgument || {
      arrayMerge: defaultArrayMerge
    };
    let arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
      return Array.isArray(target)
        ? arrayMerge(target, source, optionsArgument)
        : cloneIfNecessary(source, optionsArgument);
    } else {
      return mergeObject(target, source, optionsArgument);
    }
  }

  deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
      throw new Error(
        "first argument should be an array with at least two elements"
      );
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
      return deepmerge(prev, next, optionsArgument);
    });
  };

  const checkTabFocus = (function() {
    var stateKey,
      eventKey,
      keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
      };

    for (stateKey in keys) {
      if (stateKey in document) {
        eventKey = keys[stateKey];
        break;
      }
    }

    return function(c) {
      if (c) {
        document.addEventListener(eventKey, c);
        //document.addEventListener("blur", c);
        //document.addEventListener("focus", c);
      }

      return !document[stateKey];
    };
  })();

  proctor = function(options) {
    // Initialize proctor and begin instance
    const opts = (this.opts = deepmerge.all([defaults, options]));

    // take initial snapshot if set
    this.initialSnap = !!opts.video.takeInitialSnapshot;

    this.video = doc.getElementById(this.opts.video.element);
    this.canvas = doc.getElementById(this.opts.video.canvas);

    if ((!this.video || !this.canvas) && !this.opts.video.ignoreTrack) {
      return console.error("Proctor: Video or Canvas not found");
    }

    return this.init();
  };

  proctor.prototype.log = function(log) {
    if (this.opts.showLogs) {
      console.log(log);
    }
  };

  proctor.prototype.init = function() {
    let pc = this;

    pc.stopped = false;

    checkDeviceSupport(function() {
      // log device has no cam
      if (!hasWebcam) {
        pc.opts.onCamNotDetected();
        pc.log("Proctor: Webcam not found");
      }

      // log device has no mic
      if (!hasMicrophone) {
        pc.opts.onMicNotDetected();
        pc.log("Proctor: Microphone not found");
      }

      // log cam permission not granted
      if (!isWebcamAlreadyCaptured && !pc.opts.video.ignoreTrack) {
        pc.opts.onCamPermissionDenied();
      }

      // log mic permission not granted
      if (!isMicrophoneAlreadyCaptured && !pc.opts.audio.ignoreRecording) {
        pc.opts.onMicPermissionDenied();
      }

      if (!hasWebcam || !hasMicrophone) {
        return;
      }

      /* handle browser support for tracker and recorder */
      if (
        (!pc.opts.audio.ignoreRecording && !navigator.getUserMedia) ||
        (!pc.opts.audio.ignoreRecording && !true)
      ) {
        return pc.opts.handleOutdatedBrowser();
      }

      // request webcam and mic permissions
      const allowVideoTrack =
        !isWebcamAlreadyCaptured && !pc.opts.video.ignoreTrack;
      const allowAudioTrack =
        !isMicrophoneAlreadyCaptured && !pc.opts.audio.ignoreRecording;

      if (allowVideoTrack || allowAudioTrack)
        return navigator.getUserMedia(
          {
            audio: true,
            video: true
          },
          function(stream) {
            pc.proctor();
          },
          function(e) {}
        );

      pc.proctor();
    });

    return {
      stop: function() {
        pc.stopped = true;

        if (pc.tracker) {
          pc.tracker.stop();
        }

        let stream = pc.video.srcObject;
        let tracks = stream && stream.getTracks();

        if (tracks) {
          tracks.forEach(function(track) {
            track.stop();
          });
        }

        pc.video.srcObject = null;

        // stop audio recorder
        if (pc.audioRecorder) {
          pc.audioRecorder.clear();
          pc.audioRecorder.stop();
        }

        // stop audio loop fps
        window.cancelAnimationFrame(pc.audioLoop);

        // clear all timing intervals
        clearInterval(pc.timerIntervals);

        // Clear all timers on page
        // (function(w){w = w || window; let i = w.setInterval(function(){},10); while(i>=0) { w.clearInterval(i--); }})(window);
        pc.audioContext.close();
        pc.audioContext = null;
      },
      getFeedback: function() {
        return pc.feedback;
      }
    };
  };

  proctor.prototype.proctor = function() {
    let pc = this;

    if (!this.opts.video.ignoreTrack) {
      this.beginTrack();
    }

    // Browser/Tab focus checks
    this.tabIsFocused = true;
    this.tabUnfocusedN = 0;

    // Computations
    this.integrityScore =
      this.opts.data.integrityScore || this.opts.scores.integrityScore;
    this.ambientNoiseN = this.opts.data.ambientNoiseN || 0;
    this.noFaceN = this.opts.data.noFaceN || 0;
    this.multiFaceN = this.opts.data.multiFaceN || 0;
    this.noiseDetect = this.noFaceDetect = this.multiFaceDetect = false;

    // Timer computations for audio tracking
    this.ambientNoiseT = this.noFaceT = this.multiFaceT = 0;

    // Timers
    this.timerAnT = this.timerNfT = this.timerMfT = 0;

    // Timing Intervals
    this.timerIntervals = setInterval(function() {
      pc.timerAnT += 1;
      pc.timerNfT += 1;
      pc.timerMfT += 1;
    }, 1000);

    // Data feedback for creating visuals etc.
    this.feedback = {
      integrityScore: this.integrityScore,

      /** Audio Visuals */
      audio: {
        fps: this.opts.audio.fps,
        sensitivity: this.opts.audio.sensitivity,
        pitch: null,
        meter: null,
        counter: {
          noise: this.ambientNoiseN
        }
      },

      video: {
        fps: this.opts.video.fps,
        width: this.opts.video.streamWidth,
        height: this.opts.video.streamHeight,
        counter: {
          noFace: this.noFaceN,
          multiFace: this.multiFaceN
        }
      }
    };

    this.beginAudioTracking();
    this.opts.feedback(this.feedback);
    this.checkTabFocus();
  };

  proctor.prototype.beginTrack = function() {
    let pc = this;
    let context = (pc.context = pc.canvas.getContext("2d"));

    let tracker = new tracking.ObjectTracker(["face"]);
    // tracker.setInitialScale(3); // 4
    tracker.setInitialScale(6); // 4
    // tracker.setStepSize(1.4); // 2
    tracker.setStepSize(2.8); // 2
    // tracker.setEdgesDensity(0.1); // 0.1
    tracker.setEdgesDensity(0.2); // 0.1
    tracker.setFPS(pc.opts.video.fps);
    // console.log(this.video);

    pc.tracker = tracking.track(this.video, tracker, {
      camera: true
    });

    tracker.on("track", function(event) {
      context.clearRect(0, 0, pc.canvas.width, pc.canvas.height);

      if (!pc.trackerReady) {
        pc.trackerReady = true;
        pc.setProctorReady();
        pc.log("Proctor: Tracker is ready");
      }

      if (event.data.length === 0) {
        // nothing was tracked
        let timer_diff = pc.timerNfT - pc.noFaceT;

        if (timer_diff >= pc.opts.detectionLapse) {
          pc.noFaceDetect = false;
          pc.noFaceT = pc.timerNfT = 0;
        }

        if (timer_diff >= pc.opts.detectionLapse && !pc.noFaceDetect) {
          // no face timer recalculation
          pc.noFaceT = pc.timerNfT = 0;

          // Integrity score
          pc.noFaceN += 1;
          pc.feedback.video.counter.noFace = pc.noFaceN;
          pc.integrityScore -= -pc.opts.scores.noFace;
          pc.feedback.integrityScore = pc.integrityScore;

          pc.takeSnapShot("noFace");
          pc.opts.onNoFaceTracked(pc.feedback);

          pc.noFaceDetect = true;

          pc.opts.feedback(pc.feedback);
        }
      } else {
        event.data.forEach(function(rect) {
          pc.onFaceTracked(rect);
        });

        let timer_diff = pc.timerMfT - pc.multiFaceT;

        if (timer_diff >= pc.opts.detectionLapse) {
          pc.multiFaceDetect = false;
          pc.multiFaceT = pc.timerMfT = 0;
        }

        if (
          event.data.length > 1 &&
          timer_diff <= pc.opts.detectionLapse &&
          !pc.multiFaceDetect
        ) {
          // multi timer recalculation
          pc.multiFaceT = pc.timerMfT = 0;

          // Integrity score
          pc.multiFaceN += 1;
          pc.feedback.video.counter.multiFace = pc.multiFaceN;
          pc.integrityScore -= -pc.opts.scores.multiFace;
          pc.feedback.integrityScore = pc.integrityScore;

          pc.takeSnapShot("multiFace");
          pc.opts.onMultiFaceTracked(pc.feedback);

          pc.multiFaceDetect = true;

          pc.opts.feedback(pc.feedback);
        }

        // reset no face counters if one or more faces detected
        // noFace counters should start over again checking for another 1min(default)
        if (event.data.length >= 1) {
          pc.noFaceDetect = false;
          pc.noFaceT = pc.timerNfT = 0;
        }
      }

      if (pc.initialSnap) {
        setTimeout(() => {
          pc.takeSnapShot("initial");
        }, 2000);

        pc.initialSnap = false;
      }
    });
  };

  proctor.prototype.onFaceTracked = function(rect) {
    if (this.stopped === true) {
      return;
    }

    this.context.strokeStyle = "rgba(255, 255, 255, .8)";
    this.context.font = "11px Helvetica";
    this.context.fillStyle = "#fff";

    this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    this.context.fillText(
      "x: " + rect.x + "px",
      rect.x + rect.width + 5,
      rect.y + 11
    );
    this.context.fillText(
      "y: " + rect.y + "px",
      rect.x + rect.width + 5,
      rect.y + 22
    );
  };

  proctor.prototype.takeSnapShot = function(eventName) {
    if (this.stopped === true) {
      return;
    }

    this.context.drawImage(
      this.video,
      0,
      0,
      this.opts.video.streamWidth,
      this.opts.video.streamHeight
    );
    this.opts.handleSnapshotUpload(
      this.canvas.toDataURL("image/jpeg", 1),
      eventName
    );
  };

  proctor.prototype.beginAudioTracking = function() {
    let pc = this;

    pc.audioContext = null;
    pc.meter = null;
    pc.mediaStreamSource;

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // grab an audio context
    pc.audioContext = new AudioContext();
    pc.audioInput = null;
    pc.realAudioInput = null;
    pc.inputPoint = null;
    pc.isRecording = false;
    pc.audioRecorder = null;
    pc.analyserContext = null;
    pc.recIndex = 0;

    function drawLoop(time) {
      if (pc.stopped === true) return;

      let pitch = pc.meter.volume * 100;

      // Update feedback
      pc.feedback.audio.pitch = pitch;
      pc.feedback.audio.meter = pc.meter;

      let timer_diff = pc.timerAnT - pc.ambientNoiseT;

      if (timer_diff >= pc.opts.detectionLapse) {
        pc.noiseDetect = false;
        pc.ambientNoiseT = pc.timerAnT = 0;
      }

      if (
        pitch >= 100 - pc.opts.audio.sensitivity &&
        timer_diff <= pc.opts.detectionLapse &&
        !pc.noiseDetect
      ) {
        // ambient timer recalculation
        pc.ambientNoiseT = pc.timerAnT = 0;

        // Integrity score
        pc.ambientNoiseN += 1;
        pc.feedback.audio.counter.noise = pc.ambientNoiseN;
        pc.integrityScore -= -pc.opts.scores.ambientNoise;
        pc.feedback.integrityScore = pc.integrityScore;

        // Call ambient noise detected function
        pc.opts.onAmbientNoiseDetection(pc.feedback, pitch, pc.meter);

        // Start recording noise
        // Stop recording after 5 seconds
        if (pc.audioRecorder && !pc.isRecording) {
          pc.isRecording = true;
          pc.audioRecorder.clear();
          pc.audioRecorder.record();

          pc.log("Proctor: Recording started");

          setTimeout(function() {
            pc.isRecording = false;
            pc.audioRecorder.stop();
            pc.log("Proctor: Recording stopped");
            pc.audioRecorder.getBuffers(function(buffers) {
              pc.gotBuffers(buffers);
            });
          }, pc.opts.audio.recordingDuration);
        }

        if (pc.recordRTC && !pc.isRecording) {
          pc.isRecording = true;
          pc.recordRTC.startRecording();

          setTimeout(function() {
            pc.isRecording = false;
            pc.recordRTC.stopRecording(function(audioURL) {
              let recordedBlob = pc.recordRTC.getBlob();
              let reader = new window.FileReader();

              reader.readAsDataURL(recordedBlob);
              reader.onloadend = function() {
                let base64data = reader.result;
                pc.opts.handleAudioUpload(base64data);
              };
            });
            pc.log("Proctor: Recording stopped");
          }, pc.opts.audio.recordingDuration);
        }

        pc.noiseDetect = true;
      }

      pc.opts.feedback(pc.feedback);
    }

    try {
      // ask for an audio input
      navigator.getUserMedia(
        {
          audio: {
            mandatory: {
              echoCancellation: false,
              googAutoGainControl: false,
              googNoiseSuppression: false,
              googHighpassFilter: false
            },
            optional: [
              {
                googAudioMirroring: false
              }
            ]
          }
        },
        function(stream) {
          pc.log("Proctor: Listening");
          // Create an AudioNode from the stream.
          pc.mediaStreamSource = pc.audioContext.createMediaStreamSource(
            stream
          );

          // Create a new volume meter and connect it.
          pc.meter = createAudioMeter(pc.audioContext);
          pc.mediaStreamSource.connect(pc.meter);

          // kick off the audio updating/measures
          pc.audioLoop = limitFPS(function() {
            drawLoop();
          }, pc.opts.audio.fps);

          // If using inbuilt recorder
          // !pc.opts.audio.ignoreRecording && pc.prepareRecorder2(stream);
          if (!pc.opts.audio.ignoreRecording) {
            pc.prepareRecorder3(stream);
          }
        },
        function(e) {}
      );
    } catch (e) {
      pc.log("Proctor: getUserMedia threw exception :" + e);
    }
  };

  proctor.prototype.prepareRecorder2 = function(stream) {
    this.inputPoint = this.audioContext.createGain();

    this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
    this.audioInput = this.realAudioInput;
    this.audioInput.connect(this.inputPoint);

    // this.audioInput = convertToMono( input );

    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 2048;
    this.inputPoint.connect(this.analyserNode);

    this.audioRecorder = new Recorder(this.inputPoint);

    this.zeroGain = this.audioContext.createGain();
    this.zeroGain.gain.value = 0.0;
    this.inputPoint.connect(this.zeroGain);
    this.zeroGain.connect(this.audioContext.destination);
  };

  proctor.prototype.prepareRecorder3 = function(stream) {
    this.recordRTC = RecordRTC(stream);
  };

  proctor.prototype.gotBuffers = function(buffers) {
    let pc = this;

    pc.audioRecorder.exportMonoWAV(function(blob) {
      let dataBlob = blob;
      let reader = new window.FileReader();

      reader.readAsDataURL(dataBlob);
      reader.onloadend = function() {
        let base64data = reader.result;
        pc.opts.handleAudioUpload(base64data);
      };
    });
  };

  proctor.prototype.checkTabFocus = function() {
    checkTabFocus(() => {
      const isFocused = checkTabFocus();

      if (!isFocused) {
        this.tabUnfocusedN += 1;
      }

      this.opts.onOutsideBrowserTabClick(isFocused, this.tabUnfocusedN);
    });
  };

  proctor.prototype.setProctorReady = function() {
    let proctor = false;
    let pc = this;

    // check if mic/recorder is not ignored and ready
    proctor = !pc.opts.audio.ignoreRecording && pc.recorderReady ? true : false;

    // check if camera/tracker is not ignored and ready
    proctor = !pc.opts.video.ignoreTrack && pc.trackerReady ? true : false;

    if (!proctor || pc.proctorReady === true) {
      return;
    }

    // Default on proctor ready state
    if (proctor) {
      pc.opts.proctorReady();
      pc.log("Proctor: Ready");
    }

    pc.proctorReady = true;
  };

  win.Proctor = proctor;
})(window, document);
