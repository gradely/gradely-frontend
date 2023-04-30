<template>
  <div>
    Test
    <div
      class="proctor-container"
      style="position: absolute; width: 320px; height: 240px; top:0"
    >
      <customInput />
      <!-- <img src="" ref="hello" alt="" />
      <video
        id="proctor-video"
        width="320"
        height="240"
        preload
        autoplay
        loop
        muted
        style="position: absolute; top: 0; left: 0; border-radius: 4px;"
      ></video>
      <canvas
        id="proctor-canvas"
        width="320"
        height="240"
        style="position: absolute; top: 0; left: 0"
      ></canvas> -->
      <button style="position :absolute;bottom:0" @click="startProctor">
        Hi
      </button>
    </div>
  </div>
</template>
<script>
//Facial tracking
import "@/scripts/proctor/tracking-new";
import "@/scripts/proctor/face-min";
import "@/scripts/proctor/eye-min";
import "@/scripts/proctor/mouth-min";
import "@/scripts/proctor/setup-new";
import customInput from "../components/text-input.vue";

// // Audio tracking

// import "../../scripts/proctor/demo";

import { mapActions } from "vuex";

export default {
  name: "TestProctor",

  data() {
    return {
      proctor_object: {},
      proctor: {},

      defaultOpts: {
        scores: {
          noFace: -3,
          multiFace: -10,
          ambientNoise: -2
        },
        audio: {
          fps: 2,
          sensitivity: 95
        },
        video: {
          fps: 20
        }
      },
      proctor_stopped: false,
      integrity_score: 100,
      proctorInitCount: 1
    };
  },
  components: { customInput },

  methods: {
    ...mapActions(["uploadFile"]),
    // startProctor(fn) {
    //   /* eslint-disable */
    //   return new window.Proctor({
    //     detectionLapse: 20, // detection lapse (seconds)
    //     scores: Object.assign(
    //       {},
    //       {
    //         noFace: -3,
    //         multiFace: -10,
    //         ambientNoise: -2,
    //         integrityScore: 100
    //       },
    //       this.defaultOpts.scores
    //     ),

    //     data: {},

    //     video: Object.assign(
    //       {},
    //       {
    //         element: "proctor-video",
    //         canvas: "proctor-canvas",
    //         fps: 20,
    //         streamWidth: 600, //320,
    //         streamHeight: 450, //340,
    //         ignoreTrack: false,
    //         takeInitialSnapshot: true
    //       },
    //       this.defaultOpts.video
    //     ),

    //     audio: Object.assign(
    //       {},
    //       {
    //         fps: 2,
    //         sensitivity: 95, // from 0 - 100
    //         ignoreRecording: false,
    //         recordingDuration: 10000 // 10 secs
    //       },
    //       this.defaultOpts.audio
    //     ),

    //     handleOutdatedBrowser: () => {
    //       console.error(
    //         "Browser version is outdated and not suitable to run proctor."
    //       );
    //     },

    //     onNoFaceTracked: () => {
    //       console.log("no face");
    //       // this.shouldContinue = false;
    //     },
    //     handleSnapshotUpload: (data64, eventName) => {
    //       /* eslint-disable */
    //       // var binaryData = [];
    //       // binaryData.push(data64);
    //       // this.$refs.hello.src = URL.createObjectURL(
    //       //   window.URL.createObjectURL(new Blob(binaryData))
    //       // );
    //       // console.log(`SnapShot ${data64}`);
    //       const formData = new FormData();
    //       formData.append("file", data64);
    //       this.uploadFile({
    //         folder: "exams/proctor",
    //         data: formData
    //       });
    //     },
    //     handleAudioUpload: (data64) => {
    //       // Push Audio to server here.

    //       console.log(data64);
    //     },
    //     // on multi face detected
    //     onMultiFaceTracked: () => {
    //       console.log("multi");
    //     },
    //     onAmbientNoiseDetection: (pitch, meter) => {
    //       console.log("Proctor: Ambient noise detected");
    //     },

    //     onCamPermissionDenied: (e) => {
    //       console.warn("Proctor (Perms): Webcam needed for this test");
    //       console.log(e);
    //       if (e !== undefined) this.isCameraFalse = true;
    //     },
    //     onMicPermissionDenied: () => {
    //       console.warn("Proctor (Perms): Microphone needed for this test");
    //     },
    //     onCamNotDetected: (e) => {
    //       console.warn("Proctor: This device does not have a webcam");
    //       console.log(e);
    //       this.isCameraFalse = true;
    //     },
    //     onMicNotDetected: () => {
    //       console.warn("Proctor: This device does not have a microphone");
    //     },

    //     proctorReady: () => {
    //       "function" == typeof fn && fn();
    //     },

    //     feedback: (e) => {
    //       console.log(e);
    //     },

    //     onOutsideBrowserTabClick: (focused, n) => {
    //       // console.log(`Tab focus: ${focused}, Unfocused times: ${n}`);
    //       if (focused && n === 1) {
    //         alert(
    //           "You have now clicked outside of your test window. This will impact your test score."
    //         );
    //       }
    //     },

    //     showLogs: false
    //   });
    // }
    startProctor(fn) {
      const defaultOpts = {
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
          fps: 20
        }
      };
      return new window.Proctor({
        detectionLapse: 5, // detection lapse (seconds)

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
            recordingDuration: 10000
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
        },

        handleAudioUpload: (data64) => {
          // Push Audio to server here.
          // console.log("no mic");
        },

        onNoFaceTracked: () => {
          // This function is not being called.
          // console.log("Proctor: No face detected");
        },

        // on multi face detected
        onMultiFaceTracked: () => {
          // console.log("Proctor: Multiple faces detected");
        },

        // Integrity score deduction can be applied here
        onAmbientNoiseDetection: (pitch, meter) => {
          // console.log("Proctor: Ambient noise detected");
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
          // console.log(e);
        },

        onOutsideBrowserTabClick: (focused, n) => {
          if (focused && n === 1) {
            alert(
              "You have now clicked outside of your test window 2 times. This will impact your test score."
            );
          }
        },

        showLogs: true
      });
    }

    // startProctor(fn) {
    //   // /* eslint-disable */
    //   this.proctor_object = new window.Proctor();

    //   return new window.Proctor({
    //     detectionLapse: 20, // detection lapse (seconds)
    //     scores: Object.assign(
    //       {},
    //       {
    //         noFace: -3,
    //         multiFace: -10,
    //         ambientNoise: -2,
    //         integrityScore: 100
    //       },
    //       this.defaultOpts?.scores
    //     ),

    //     data: {},

    //     video: Object.assign(
    //       {},
    //       {
    //         element: "proctor-video",
    //         canvas: "proctor-canvas",
    //         fps: 20,
    //         streamWidth: 600, //320,
    //         streamHeight: 450, //340,
    //         ignoreTrack: false,
    //         takeInitialSnapshot: true
    //       },
    //       this.defaultOpts?.video
    //     ),

    //     audio: Object.assign(
    //       {},
    //       {
    //         fps: 2,
    //         sensitivity: 95, // from 0 - 100
    //         ignoreRecording: false,
    //         recordingDuration: 10000 // 10 secs
    //       },
    //       this.defaultOpts?.audio
    //     ),

    //     handleOutdatedBrowser: () => {
    //       console.error(
    //         "Browser version is outdated and not suitable to run proctor."
    //       );
    //     },

    //     handleSnapshotUpload: (data64, eventName) => {
    //       console.log("llo");
    //     },

    //     handleAudioUpload: (data64) => {
    //       /* eslint-disable */
    //       // console.log(data64);
    //       console.log("Audio Uploads");
    //     },

    //     onNoFaceTracked: () => {},

    //     // Integrity score deduction can be applied here
    //     onAmbientNoiseDetection: (pitch, meter) => {
    //       console.log("Proctor: Ambient noise detected");
    //     },

    //     onMicPermissionDenied: (e) => {
    //       console.warn("Proctor (Perms): Microphone needed for this test");
    //     },

    //     onMicNotDetected: () => {
    //       console.warn("Proctor: This device does not have a microphone");
    //     },

    //     // on multi face detected
    //     onMultiFaceTracked: () => {
    //       console.log("Proctor: Multiple faces detected");
    //     },

    //     onCamPermissionDenied: (e) => {
    //       console.warn("Proctor (Perms): Webcam needed for this test");
    //     },

    //     onCamNotDetected: (e) => {
    //       console.warn("Proctor: This device does not have a webcam");
    //     },

    //     proctorReady: () => {
    //       // console.log('Proctor is ready.');
    //       "function" == typeof fn && fn();
    //     },

    //     feedback: (e) => {
    //       console.log(e);
    //     },

    //     onOutsideBrowserTabClick: (focused, n) => {
    //       console.log(`Tab focus: ${focused}, Unfocused times: ${n}`);
    //       if (focused && n === 2) {
    //         alert(
    //           "You have now clicked outside of your test window 2 times. This will impact your test score."
    //         );
    //       }
    //     },

    //     showLogs: false
    //   });
    // }
  },
  mounted() {
    // this.proctor = this.startProctor();
  }
};
</script>
