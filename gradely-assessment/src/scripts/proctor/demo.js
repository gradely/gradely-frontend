// ts-check

const selectElement = (sel, each = false) => {
  const dummyElement = document.createElement("span");
  return each
    ? document.querySelectorAll(sel) || [dummyElement]
    : document.querySelector(sel) || dummyElement;
};

let proctor;
let proctorInitCount = 1;

let previewElement = selectElement(".preview");

let defaultOpts = {
  scores: {
    noFace: -3,
    multiFace: -10,
    ambientNoise: -2
  },
  audio: {
    fps: 2,
    sensitivity: 90
  },
  video: {
    fps: 40
  }
};

const settingNames = {
  AUDIO_FPS: "audio.fps",
  AUDIO_SENSITIVITY: "audio.sensitivity",
  VIDEO_FPS: "video.fps"
};

const updateOptions = (setting, value) => {
  if (proctorInitCount >= 5) {
    return alert("You need to reload this page to continue live test.");
  }

  stopProctorAndGetFeedback();

  switch (setting) {
    case settingNames.AUDIO_FPS:
      defaultOpts.audio.fps = value;
      break;
    case settingNames.AUDIO_SENSITIVITY:
      defaultOpts.audio.sensitivity = value;
      break;
    case settingNames.VIDEO_FPS:
      defaultOpts.video.fps = value;
      break;
  }

  setTimeout(() => {
    proctor = startProctor();
    proctorInitCount += 1;
  }, 1000);
};

selectElement(
  '[data-update="' + settingNames.AUDIO_FPS + '"]'
).addEventListener("change", (e) => {
  updateOptions(settingNames.AUDIO_FPS, Number(e.target.value));
});
selectElement(
  '[data-update="' + settingNames.AUDIO_SENSITIVITY + '"]'
).addEventListener("change", (e) => {
  updateOptions(settingNames.AUDIO_SENSITIVITY, Number(e.target.value));
});
selectElement(
  '[data-update="' + settingNames.VIDEO_FPS + '"]'
).addEventListener("change", (e) => {
  updateOptions(settingNames.VIDEO_FPS, Number(e.target.value));
});

const previewAudio = (data64) => {
  const a = document.createElement("a");
  const audio = document.createElement("audio");
  const audioSource = document.createElement("source");
  const playPauseButton = document.createElement("span");

  a.className = "audio";
  playPauseButton.className = "play-pause-button";
  audioSource.type = "audio/wav";
  audioSource.src = data64;

  audio.appendChild(audioSource);
  a.appendChild(audio);
  a.appendChild(playPauseButton);
  previewElement.prepend(a);

  console.log("Preview Audio function");

  a.addEventListener("click", (e) => {
    audio.play();
  });
};

const previewPhoto = (data64, eventName) => {
  const a = document.createElement("a");
  const img = document.createElement("img");
  const label = document.createElement("span");

  console.log("Preview Photo");

  img.src = data64;

  if (eventName !== "multiFace") {
    label.className = "label";
    label.innerHTML = eventName;
  }

  a.appendChild(img);
  a.appendChild(label);
  previewElement.prepend(a);
};

const startProctor = (fn) => {
  return new Proctor({
    detectionLapse: 10, // detection lapse (seconds)

    scores: Object.assign(
      {},
      {
        noFace: -3,
        multiFace: -10,
        ambientNoise: -2,
        integrityScore: 100
      },
      defaultOpts.scores
    ),

    data: {},

    audio: Object.assign(
      {},
      {
        fps: 2,
        sensitivity: 95, // from 0 - 100
        ignoreRecording: false,
        recordingDuration: 5000
      },
      defaultOpts.audio
    ),

    video: Object.assign(
      {},
      {
        element: "proctor-video",
        canvas: "proctor-canvas",
        fps: 20,
        streamWidth: 320, //320,
        streamHeight: 240, //240,
        ignoreTrack: false,
        takeInitialSnapshot: true
      },
      defaultOpts.video
    ),

    handleOutdatedBrowser: () => {
      // Show the modal here..
      alert("Browser version is outdated and not suitable to run proctor.");
    },

    handleSnapshotUpload: (data64, eventName) => {
      // Push to server here..
      previewPhoto(data64, eventName);
    },

    handleAudioUpload: (data64) => {
      // Push Audio to server here.

      previewAudio(data64);
    },

    onNoFaceTracked: () => {
      // This function is not being called.

      console.log("Proctor: No face detected");
    },

    // on multi face detected
    onMultiFaceTracked: () => {
      console.log("Proctor: Multiple faces detected");
    },

    // Integrity score deduction can be applied here
    onAmbientNoiseDetection: (pitch, meter) => {
      console.log("Proctor: Ambient noise detected");
    },

    onMicPermissionDenied: () => {
      console.warn("Proctor (Perms): Microphone needed for this test");
    },

    onCamPermissionDenied: () => {
      console.warn("Proctor (Perms): Webcam needed for this test");
    },

    onCamNotDetected: () => {
      console.warn("Proctor: This device does not have a webcam");
    },

    onMicNotDetected: () => {
      console.warn("Proctor: This device does not have a microphone");
    },

    proctorReady: () => {
      console.log("Proctor is ready.");
      "function" == typeof fn && fn();
    },

    feedback: (e) => {
      const audioMeter = selectElement(".vol-meter .bar");

      if (!e.audio || !e.audio.meter) {
        return;
      }

      if (e.audio.meter) {
        audioMeter.style.width = e.audio.meter.volume * 500 * 1.4 + "px";

        if (e.audio.meter.checkClipping()) {
          audioMeter.style.backgroundColor = "red";
        } else {
          audioMeter.style.backgroundColor = "green";
        }
      }

      selectElement('[data-update="' + settingNames.AUDIO_FPS + '"]').value =
        e.audio.fps;
      selectElement(
        '[data-update="' + settingNames.AUDIO_SENSITIVITY + '"]'
      ).value = e.audio.sensitivity;
      selectElement('[data-update="' + settingNames.VIDEO_FPS + '"]').value =
        e.video.fps;

      selectElement(".--video-width").innerHTML = e.video.width;
      selectElement(".--video-height").innerHTML = e.video.height;

      selectElement(".--integrity-score").innerHTML = `${e.integrityScore}%`;
      selectElement(".--ambient-noise-n").innerHTML = e.audio.counter.noise;
      selectElement(".--no-face-n").innerHTML = e.video.counter.noFace;
      selectElement(".--multi-face-n").innerHTML = e.video.counter.multiFace;
    },

    onOutsideBrowserTabClick: (focused, n) => {
      console.log(`Tab focus: ${focused}, Unfocused times: ${n}`);

      if (focused && n === 2) {
        alert(
          "You have now clicked outside of your test window 2 times. This will impact your test score."
        );
      }
    },

    showLogs: true
  });
};

const stopProctorAndGetFeedback = () => {
  proctor.stop();
  const feedback = proctor.getFeedback();
  // console.log(feedback);
  previewElement.innerHTML = "";
  delete proctor;
};

proctor = startProctor(() => {
  selectElement(".--stop-proctor").addEventListener("click", (e) => {
    e.preventDefault();
    const b = confirm(
      "This will require a page reload to restart Proctor. Continue??"
    );
    if (b) {
      stopProctorAndGetFeedback();
    }
  });

  console.log("Starting proctor...");
});
