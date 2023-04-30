<template>
  <div class="audio-setup-test">
    <div class="setup-text color_ash">
      Check that your microphone is working.
    </div>

    <!-- SUCCESS REPORT -->
    <div v-if="isAudioFalse == ''" class="success-report">
      <div class="display-block rounded-5 overflow-hidden position-relative">
        <div class="top-title color_text font-weight-bold">Microphone</div>
        <!-- MICROPHONE SELECTIONS -->
        <select
          v-model="microphone_selection"
          class="microphone-selection form-control"
          disabled
        >
          <option value="Built in Microphone">Built in Microphone</option>
        </select>

        <!-- SOUND SIGNALS -->
        <div class="sound-row">
          <div
            v-if="stage === 'info'"
            class="sound-signals d-flex justify-content-start align-items-center flex-wrap voice-meter"
          >
            <div
              class="signal"
              v-for="(signal, index) in info_signal_bars"
              :key="index"
            ></div>
          </div>

          <div
            v-if="stage === 'record'"
            class="sound-signals d-flex justify-content-start align-items-center flex-wrap voice-meter"
          >
            <div
              class="signal"
              v-for="(signal, index) in signal_bars"
              :key="index"
              :class="signal.color"
            ></div>
          </div>

          <div
            v-if="stage === 'record'"
            class="sound-status color_grey_dark font-weight-bold"
          >
            Recording...
            <!-- {{ record_seconds }}s -->
          </div>
        </div>
        <!-- SOUND SIGNALS -->

        <!-- TEXT INFO -->
        <div class="text-info color_ash" v-if="stage === 'info'">
          Select your microphone and Click “Begin Audio Test” to record a
          message for some seconds.
          <!-- <br><br>Afterwards, the message will be played back to you. -->
        </div>

        <div class="text-info color_ash" v-if="stage === 'record'">
          Say something really loud for about 5 seconds
        </div>

        <div class="text-info color_ash" v-if="stage === 'message'">
          Click <strong>Test Audio</strong> to listen to your recorded test
          audio.
        </div>

        <!-- AUDIO CTA -->
        <div class="d-flex justify-content-center align-items-center">
          <div
            v-if="stage === 'info'"
            class="audio-cta text-uppercase font-weight-bold pointer"
            @click.prevent="recordNow"
          >
            Begin Audio Test
          </div>

          <div
            v-if="stage === 'message'"
            class="audio-cta text-uppercase font-weight-bold pointer"
          >
            <span v-if="isPlaingAudio" @click.prevent="stopAudio"
              >Stop Test Audio</span
            >
            <span v-else @click.prevent="playAudio"> Play Test Audio</span>
          </div>
        </div>
        <!-- AUDIO CTA -->

        <!-- AUDIO FEEDBACK  -->
        <div class="audio-feedback" v-if="stage === 'message'">
          <div id="audioPreviewContainer"></div>

          <div
            v-if="showAudioActions"
            class="feedback-text font-weight-bold color_ash"
          >
            Can you hear your voice?
          </div>
          <div
            v-if="showAudioActions"
            class="d-flex justify-content-start align-items-center"
          >
            <label for="no" class="radio-inline mr-3">
              <input type="radio" v-model="feedback" value="no" id="no" />
              <span class="label_title color_text font-14-5">No</span>
            </label>
            <label for="yes" class="radio-inline">
              <input type="radio" v-model="feedback" value="yes" id="yes" />
              <span class="label_title color_text font-14-5">Yes</span>
            </label>
          </div>
        </div>
        <!-- AUDIO FEEDBACK  -->
      </div>

      <!-- BUTTON -->
      <div
        v-if="shouldContinue"
        class="d-flex justify-content-center align-items-center flex-wrap"
      >
        <button
          v-if="feedback === 'yes'"
          @click="nextCheck"
          class="btn btn-md btn-accent brand_navy font-weight-bold"
        >
          Continue
        </button>
        <button
          v-if="feedback === 'no'"
          @click="tryAgain"
          class="btn btn-md btn-accent brand_navy font-weight-bold"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- ERROR REPORT -->
    <AudioErrorReport v-if="isAudioFalse"></AudioErrorReport>
  </div>
</template>

<script>
// IMPORT JS files for Proctor
// https://www.youtube.com/watch?v=YrLzTgdJ-Kg

import "@/scripts/proctor/setup-new.js";

export default {
  name: "AudioSetupTest",

  components: {
    AudioErrorReport: () =>
      import(
        /* webpackChunkName: "AudioErrorReport" */
        "@/components/parentsComps/proctorSetup/AudioErrorReport"
      ),
  },

  watch: {
    feedback(val) {
      if (val.length > 0) this.shouldContinue = true;
    },
    screenWidth() {
      this.setBars();
    },
  },
  data() {
    return {
      microphone_selection: "Built in Microphone",
      feedback: "",
      signal_bars: 0,
      info_signal_bars: 0,
      stage: "info", //info, record, feedack
      pitch: 0,
      signalBarsCount: 0,
      clipping: false,
      isAudioFalse: "",
      isPlaingAudio: false,
      showAudioActions: false,
      shouldContinue: false,
      proctor: {},
      proctorInitCount: 1,
      screenWidth: window.innerWidth,
      defaultOpts: {
        scores: {
          noFace: -3,
          multiFace: -10,
          ambientNoise: -2,
        },
        audio: {
          fps: 2,
          sensitivity: 90,
        },
        video: {
          fps: 20,
        },
      },
      record_seconds: 0,
    };
  },

  mounted() {
    this.proctor = this.startProctor();

    this.setBars();

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  methods: {
    nextCheck() {
      this.stopProctorAndGetFeedback();
      this.$parent.current = 2;
      this.$parent.in_view = "ProctorGuidelines";
    },
    onResize() {
      this.screenWidth = window.innerWidth;
    },
    tryAgain() {
      this.stage = "record";
      this.feedback = "";
      this.proctor.beginAudioTracking();
    },
    setBars() {
      // 35 audio bars for mobile
      if (this.screenWidth <= 360) {
        this.signalBarsCount = 33;
        this.info_signal_bars = 33;
      } else if (this.screenWidth >= 360 && this.screenWidth <= 425) {
        this.signalBarsCount = 35;
        this.info_signal_bars = 35;
      } else {
        // tablets and desktop
        this.signalBarsCount = 52;
        this.info_signal_bars = 52;
      }

      this.signal_bars = Array(this.signalBarsCount).fill({
        status: false,
        color: "brand_grey_bg",
      });
    },
    recordNow() {
      this.stage = "record";
      this.proctor.beginAudioTracking();
    },
    previewAudio(data64) {
      this.stage = "message";

      const a = document.createElement("a");
      const audio = document.createElement("audio");
      const audioSource = document.createElement("source");
      // const playPauseButton = document.createElement('span');

      a.className = "audio";
      // playPauseButton.className = 'play-pause-button';
      audioSource.type = "audio/wav";
      audioSource.src = data64;

      audio.appendChild(audioSource);
      a.appendChild(audio);
      // a.appendChild(playPauseButton);
      audio.id = "testAudio";

      setTimeout(() => {
        if (document.getElementById("audioPreviewContainer")) {
          document.getElementById("audioPreviewContainer").appendChild(a);
          this.showAudioActions = true;
        }
      }, 500);

      a.addEventListener("click", () => {
        audio.play();
      });

      audio.addEventListener("ended", () => {
        // https://flaviocopes.com/html-video-tag/
        this.isPlaingAudio = false;
      });
    },
    playAudio() {
      this.isPlaingAudio = true;
      document.getElementById("testAudio").play();
    },
    stopAudio() {
      this.isPlaingAudio = false;
      document.getElementById("testAudio").pause();
    },
    startProctor(fn) {
      // /* eslint-disable */
      return new window.Proctor({
        detectionLapse: 1, // detection lapse (seconds)

        showLogs: true,

        type: "audio",

        scores: Object.assign(
          {},
          {
            noFace: -3,
            multiFace: -10,
            ambientNoise: -2,
            integrityScore: 100,
          },
          this.defaultOpts.scores
        ),

        data: {},

        audio: Object.assign(
          {},
          {
            fps: 2,
            sensitivity: 95, // from 0 - 100
            ignoreRecording: false,
            recordingDuration: 10000, // 10 secs
          },
          this.defaultOpts.audio
        ),

        handleOutdatedBrowser: () => {
          alert("Browser version is outdated and not suitable to run proctor.");
          this.isAudioFalse = true;
        },

        handleAudioUpload: (data64) => {
          /* eslint-disable */
          this.previewAudio(data64);
        },

        // Integrity score deduction can be applied here
        onAmbientNoiseDetection: (pitch, meter) => {
          // console.log("Proctor: Ambient noise detected");
        },

        onMicPermissionDenied: (e) => {
          // console.warn("Proctor (Perms): Microphone needed for this test");
          if (e !== undefined) this.isAudioFalse = true;
        },

        onMicNotDetected: () => {
          // console.warn("Proctor: This device does not have a microphone");
          this.isAudioFalse = true;
        },

        proctorReady: () => {
          // console.log("Proctor is ready.");
          "function" == typeof fn && fn();
        },

        feedback: (e) => {
          if (!e.audio || !e.audio.meter) {
            return;
          }

          this.pitch = Math.floor(e.audio.pitch);

          //  console.log(e.audio.pitch)
          this.clipping = e.audio.clipping;

          let signal;

          // Get audio volumne
          // multiple by 50 * 1.4
          // Convert the answer to 2 DP
          // Multiply the 2 DP answer by 100
          // Divide by number of audio bar which is 32 in the UI.

          if (e.audio.meter.volume) {
            signal = Math.floor(
              Math.floor((e.audio.meter.volume * 50 * 1.4).toFixed(2) * 100) /
                this.signalBarsCount
            );

            // signal = this.pitch;
            this.signal_bars = this.signal_bars.map((sig, index) => {
              return {
                status: index <= signal ? true : true,
                color:
                  index <= signal
                    ? signal >= Math.floor(0.75 * this.signalBarsCount) &&
                      index >= Math.floor(0.75 * this.signalBarsCount)
                      ? "brand_tonic_bg"
                      : "brand_green_bg"
                    : "",
              };
            });

            if (signal >= Math.floor(0.75 * this.signalBarsCount)) {
              // 75 % of the bars.
              this.clipping = true;
              this.signal_bars.map((sig, index) => {
                return {
                  status: true,
                  color: "brand_tonic_bg",
                };
              });
            }
          }
        },

        onOutsideBrowserTabClick: (focused, n) => {
          // console.log(`Tab focus: ${focused}, Unfocused times: ${n}`);
          /* if (focused && n === 2) {
                        alert(
                            'You have now clicked outside of your test window 2 times. This will impact your test score.'
                        );
                    } */
        },
      });
    },

    stopProctorAndGetFeedback() {
      this.proctor.stop();
      const feedback = this.proctor.getFeedback();
      // console.log(feedback);
      delete this.proctor;
    },
  },
};
</script>

<style lang="scss">
.audio-setup-test {
  .setup-text {
    font-size: 14px;
    line-height: 165%;
    margin-bottom: 15px;
  }

  .display-block {
    padding: 18px 20px;
    background: #f0efef;
    width: 100%;
    height: auto;
    margin-bottom: 30px;
  }

  .top-title {
    font-size: 15px;
    line-height: 165%;
    margin-bottom: 5px;
  }

  .microphone-selection {
    width: 60%;
    margin-bottom: 20px;
  }

  .sound-row {
    margin-bottom: 20px;

    .signal {
      @include equal_min_edge(8);
      background: $border_grey;
      border-radius: 3px;
      margin-right: 1.5px;
    }

    .sound-status {
      margin-top: 4px;
      font-size: 13px;
      line-height: 16px;
    }
  }

  .text-info {
    margin-bottom: 21px;
    font-size: 14px;
    line-height: 165%;
  }

  .audio-cta {
    font-size: 12px;
    line-height: 16px;
    color: darken($brand_accent, 5%);
    transition: all 0.3s ease-in-out;

    &:hover {
      color: $brand_primary;
    }
  }

  .audio-feedback {
    .feedback-text {
      font-size: 15px;
      line-height: 32px;
    }
  }
}
</style>
