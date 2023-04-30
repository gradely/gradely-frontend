<template>
  <div class="w-100 brand-primary assessment">
    <div class="img-main">
      <img src="../../assets/static/page_background.png" alt="Background Img" />
    </div>
    <div v-if="getIsAssesmentProcessing" class="overlay-main">
      <div
        class="
          image-cont
          d-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <span class="svg-main d-flex">
          <svg
            width="135"
            height="135"
            viewBox="0 0 135 135"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M67.447 58C72.97 58 77.447 53.523 77.447 48C77.447 42.477 72.97 38 67.447 38C61.924 38 57.447 42.477 57.447 48C57.447 53.523 61.924 58 67.447 58ZM76.895 67.447C76.895 72.97 81.372 77.447 86.895 77.447C92.417 77.447 96.895 72.97 96.895 67.447C96.895 61.924 92.417 57.447 86.895 57.447C81.372 57.447 76.895 61.924 76.895 67.447ZM67.447 76.895C61.924 76.895 57.447 81.372 57.447 86.895C57.447 92.417 61.924 96.895 67.447 96.895C72.97 96.895 77.447 92.417 77.447 86.895C77.447 81.372 72.97 76.895 67.447 76.895ZM58 67.447C58 61.924 53.523 57.447 48 57.447C42.477 57.447 38 61.924 38 67.447C38 72.97 42.477 77.447 48 77.447C53.523 77.447 58 72.97 58 67.447Z"
                fill="#11BDCF"
              />
              <path
                d="M28.1903 40.3098C34.8172 40.3098 40.1902 34.9358 40.1902 28.3098C40.1902 21.6818 34.8172 16.3098 28.1903 16.3098C21.5623 16.3098 16.1903 21.6818 16.1903 28.3098C16.1903 34.9358 21.5623 40.3098 28.1903 40.3098ZM58.9102 20.4848C63.5962 25.1718 71.1943 25.1718 75.8802 20.4848C80.5662 15.7988 80.5662 8.20076 75.8802 3.51476C71.1943 -1.17224 63.5962 -1.17224 58.9102 3.51476C54.2232 8.20076 54.2232 15.7988 58.9102 20.4848ZM94.6503 28.1898C94.6503 34.8168 100.02 40.1898 106.65 40.1898C113.276 40.1898 118.65 34.8168 118.65 28.1898C118.65 21.5618 113.276 16.1898 106.65 16.1898C100.02 16.1898 94.6503 21.5618 94.6503 28.1898ZM114.472 58.9098C109.786 63.5958 109.786 71.1938 114.472 75.8798C119.159 80.5658 126.757 80.5658 131.442 75.8798C136.129 71.1938 136.129 63.5958 131.442 58.9098C126.757 54.2228 119.159 54.2228 114.472 58.9098ZM106.768 94.6498C100.141 94.6498 94.7682 100.02 94.7682 106.65C94.7682 113.276 100.141 118.65 106.768 118.65C113.395 118.65 118.768 113.276 118.768 106.65C118.768 100.02 113.395 94.6498 106.768 94.6498ZM76.0482 114.472C71.3623 109.786 63.7642 109.786 59.0782 114.472C54.3922 119.159 54.3922 126.757 59.0782 131.442C63.7642 136.129 71.3623 136.129 76.0482 131.442C80.7352 126.757 80.7352 119.159 76.0482 114.472ZM40.3082 106.768C40.3082 100.141 34.9362 94.7678 28.3083 94.7678C21.6823 94.7678 16.3083 100.141 16.3083 106.768C16.3083 113.395 21.6823 118.768 28.3083 118.768C34.9362 118.768 40.3082 113.395 40.3082 106.768ZM20.4853 76.0478C25.1723 71.3618 25.1723 63.7638 20.4853 59.0778C15.7993 54.3918 8.20125 54.3918 3.51525 59.0778C-1.17175 63.7638 -1.17175 71.3618 3.51525 76.0478C8.20125 80.7348 15.7993 80.7348 20.4853 76.0478Z"
                fill="#F6515B"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="135" height="135" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span class="text">Analyzing your results</span>
      </div>
    </div>

    <submit-assessment-dialog
      v-if="confirm_submission"
      :time_left="getTimeLeft"
      :question_left="getSkippedCount"
      @closeTriggered="confirm_submission = false"
      @submit="handle_finish"
    />

    <submit-assessment-modal v-if="time_is_up" @okay="handle_finish" />

    <proctor-consent-modal
      v-if="isProctorConsentModalOpen || (isProctoredExam && !isProctorAllowed)"
      @continue="proctor = startProctor()"
      @cancel="handleCanceledPermission"
    />

    <homework-good
      :fill="getProcessingDetails.data.score"
      :tag="getAssesmentDetails.data.tag"
      :can_see_score="getAssesmentDetails.data.can_see_score"
      :total="getTotalAttempts"
      v-if="isHomeworkGood"
      @review="handle_review"
    />

    <homework-great
      :fill="getProcessingDetails.data.score"
      :can_see_score="getAssesmentDetails.data.can_see_score"
      :total="getTotalAttempts"
      :tag="getAssesmentDetails.data.tag"
      v-if="isHomeworkGreat"
      @review="handle_review"
    />
    <div
      v-if="getIsAssesmentFetching || (isProctoredExam && !isProctorAllowed)"
      class="loader-area"
    >
      <span class="icon-dotted-roller icon spinner animate"></span>
    </div>
    <div v-else class="mgt-50 assessment-main">
      <div class="main-header d-flex">
        <div class="top-header d-flex w-100">
          <div
            v-if="!getIsAssesmentFetching && getAssesmentDetails.data"
            class="bold-text"
          >
            {{
              getAssesmentDetails.data.title
                ? getAssesmentDetails.data.title
                : ""
            }}
          </div>
          <div
            v-if="getIsAssesmentFetching"
            class="bold-text loader-text skeleton-loader"
          ></div>

          <div class="left-section d-flex">
            <div class="timer-section">
              <span class="icon-alarm"></span>
              <span class="time">{{ minutes }}m : {{ seconds }}s</span>
            </div>

            <!-- show if its an exam -->
            <div
              v-if="
                getAssesmentDetails.data &&
                  Number(getAssesmentDetails.data.is_proctor) === 1
              "
              class="web-cam-microphone"
            >
              <button class="web-cam mgl-10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.52539 23.0358C2.52539 17.889 6.69764 13.7168 11.8444 13.7168C16.9911 13.7168 21.1634 17.889 21.1634 23.0358H2.52539Z"
                    fill="#113255"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.1638 9.31923C21.1638 14.4661 16.9915 18.6385 11.8446 18.6385C6.69775 18.6385 2.52539 14.4661 2.52539 9.31923C2.52539 4.17236 6.69775 0 11.8446 0C16.9915 0 21.1638 4.17236 21.1638 9.31923ZM16.5911 9.31921C16.5911 11.9405 14.4661 14.0654 11.8449 14.0654C9.22359 14.0654 7.09863 11.9405 7.09863 9.31921C7.09863 6.69795 9.22359 4.573 11.8449 4.573C14.4661 4.573 16.5911 6.69795 16.5911 9.31921Z"
                    fill="#113255"
                  />
                  <path
                    d="M11.8451 12.3596C13.5242 12.3596 14.8855 10.9984 14.8855 9.3192C14.8855 7.64004 13.5242 6.27881 11.8451 6.27881C10.1659 6.27881 8.80469 7.64004 8.80469 9.3192C8.80469 10.9984 10.1659 12.3596 11.8451 12.3596Z"
                    fill="#F6515B"
                  />
                </svg>
              </button>
              <button class="microphone mgl-10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5938 11.7188H7.10058C7.33744 14.2136 9.44419 16.1719 12 16.1719C14.5558 16.1719 16.6626 14.2136 16.8995 11.7188H13.4062V10.3125H16.9219V8.90625H13.4062V7.5H16.9219V6.09375H13.4062V4.6875H16.9162C16.7934 2.082 14.6354 0 12 0C9.36464 0 7.20661 2.082 7.08384 4.6875H10.5938V6.09375H7.07812V7.5H10.5938V8.90625H7.07812V10.3125H10.5938V11.7188Z"
                    fill="#F6515B"
                  />
                  <path
                    d="M18.3281 8.90625V11.25C18.3281 14.7394 15.4894 17.5781 12 17.5781C8.51062 17.5781 5.67188 14.7394 5.67188 11.25C5.67188 10.2446 5.67188 10.0049 5.67188 8.90625H4.26562V11.25C4.26562 15.2777 7.36045 18.5956 11.2969 18.9521V22.5938H8.48438V24H15.5156V22.5938H12.7031V18.9521C16.6396 18.5956 19.7344 15.2777 19.7344 11.25V8.90625H18.3281Z"
                    fill="#113255"
                  />
                </svg>
              </button>
            </div>
            <!--end -->
            <button
              :disabled="getIsAssesmentProcessing || isSubmit"
              class="finish-button mgl-10"
              @click="confirm_submission = true"
            >
              <span
                v-if="getIsAssesmentProcessing"
                class="
                  icon-dotted-roller
                  d-inline-block
                  mgr-5
                  font-17
                  mr-2
                  animate
                "
              ></span>
              <span class="text"> Finish </span>
            </button>
          </div>
        </div>
        <div class="mgt-25 progress-bar-wrapper">
          <progress-bar :fill="progressWidth" />
        </div>
      </div>
      <div
        v-if="!getIsAssesmentFetching && getAssesmentDetails.data"
        class="mgt-25 question-area"
      >
        <assesment-card
          @file_change="handle_file_change"
          :question="getAssesmentDetails.data.questions[currentQuestion]"
          :index="currentQuestion + 1"
          :selected="selected"
          @answer="handle_answer"
          @speak="handle_speech"
          @delete-file="handle_delete_file"
          :show_speech="
            getAssesmentDetails.data.subject.id === 2 ? true : false
          "
          :attempt="attempts[currentQuestion]"
          ref="assesment-card"
        />
      </div>
      <div v-else class="mgt-25 question-area">
        <assesment-card />
      </div>
    </div>
    <div
      v-if="!getIsAssesmentFetching"
      class="bottom-section w-100 brand_navy_bg index-1"
    >
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <!-- LEFT -->
            <div class="left d-flex justify-content-start align-items-center">
              <button @click="handle_back" class="back-btn">
                <span class="arrow"
                  ><svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM17 11H10.4142L12.7071 8.70711L11.2929 7.29289L6.58579 12L11.2929 16.7071L12.7071 15.2929L10.4142 13H17V11Z"
                      fill="#E5E5E5"
                    />
                  </svg>
                </span>
                <span class="text mgl-10">BACK</span>
              </button>
            </div>

            <!-- RIGHT -->
            <div class="right">
              <button
                class="btn btn-md btn-accent brand_navy"
                title="Finish"
                @click="handle_next"
                :disabled="getIsAssesmentProcessing || isSubmit"
              >
                <span
                  v-if="getIsAssesmentProcessing"
                  class="icon-dotted-roller mgr-5 font-17 mr-2 animate"
                ></span>
                <span v-if="getAssesmentDetails.data">
                  {{
                    currentQuestion + 1 >=
                    getAssesmentDetails.data.questions.length
                      ? "Finish"
                      : "Next"
                  }}
                </span>
                <span v-else>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="proctor-container"
      style="
        position: absolute;
        width: 320px;
        height: 240px;
        visibility: hidden;
        top: 0;
      "
    >
      <video
        id="proctor-video"
        width="320"
        height="240"
        preload
        autoplay
        loop
        muted
        style="position: absolute; top: 0; left: 0; border-radius: 4px"
      ></video>
      <canvas
        id="proctor-canvas"
        width="320"
        height="240"
        style="position: absolute; top: 0; left: 0"
      ></canvas>
    </div>
  </div>
</template>

<script>
// EXTERNAL_URL
import { APP_BASE_URL } from "@/env";
import Speech from "speak-tts";
import { mapActions, mapGetters } from "vuex";
import progressBar from "@/components/global-comps/progress-bar";
import assesmentCard from "@/components/global-comps/assesment-card";
import submitAssessmentDialog from "@/components/global-comps/submit-assessment-dialog";
import submitAssessmentModal from "@/components/global-comps/submit-assessment-modal";

// proctor scripts
import "@/scripts/proctor/tracking-new";
import "@/scripts/proctor/face-min";
import "@/scripts/proctor/eye-min";
import "@/scripts/proctor/mouth-min";
import "@/scripts/proctor/setup-new";

export default {
  name: "assessment",

  components: {
    progressBar,
    assesmentCard,
    submitAssessmentDialog,
    submitAssessmentModal,
    HomeworkGood: () =>
      import(
        /* webpackChunkName: 'assessment' */ "@/components/global-comps/homework-good.vue"
      ),
    HomeworkGreat: () =>
      import(
        /* webpackChunkName: 'assessment' */ "@/components/global-comps/homework-great.vue"
      ),
    ProctorConsentModal: () =>
      import(
        /* webpackChunkName: 'assessment' */ "@/components/global-comps/proctoring-initial-modal.vue"
      ),
  },

  data() {
    return {
      confirm_submission: false,
      time_is_up: false,

      currentQuestion: 0,
      fullDuration: 0,
      minutes: 0,
      seconds: 0,
      currentQuestionTime: 0,
      file_uploading: false,
      attempts: [],
      selected: "",
      eventName: "",
      isSubmit: false,
      isHomeworkGood: false,
      isHomeworkGreat: false,
      assessmentId: null,
      isProctorAllowed: false,
      isProctoredExam: false,
      isProctorConsentModalOpen: false,
      integrity: 100,
      proctorImages: [],

      // test
      camera_selection: [],
      constraints: {
        audio: false,
        video: {
          width: 1280,
          height: 720,
        },
      },
      camera: "",
      cloudinary_data: {},
      isCameraFalse: "",
      shouldContinue: false,
      video: "",
      error_msg: "",
      proctor: null,
      proctorInitCount: 1,
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
          fps: 40,
        },
      },
      // test
    };
  },

  methods: {
    ...mapActions([
      "startHomeworkAction",
      "assesmentProcessAction",
      "uploadFile",
      "postProctorResult",
      "clickLogger",
      "deleteFile",
      "toastAction",
    ]),

    handle_review() {
      let environment = process.env.NODE_ENV;

      let can_see_answer = this.getAssesmentDetails?.data?.can_see_answer;

      let cant_see_path = `/assessment/completed/${
        JSON.parse(localStorage.getItem("authUser"))?.id
      }`;

      let location_path = `/assessment-review/${
        JSON.parse(localStorage.getItem("authUser"))?.id
      }/${this.getAssesmentDetails?.data?.id}?title=${
        this.getAssesmentDetails?.data?.title
      }`;

      let origin =
        environment === "development" ? "http://localhost:8093" : APP_BASE_URL;

      let path = can_see_answer ? location_path : cant_see_path;

      // let url = EXTERNAL_URL(location_path);
      // location.href = environment === "development" ? url.dev : url.prod;
      location.href = origin + path;
    },

    handle_next() {
      if (this.file_uploading) {
        return;
      }
      if (
        this.currentQuestion + 1 >=
        this.getAssesmentDetails?.data?.questions?.length
      ) {
        this.confirm_submission = true;
        return;
        this.isSubmit = true;
        this.isProctoredExam ? this.proctor_report() : null;

        this["assesmentProcessAction"]({
          attempts: this.attempts.filter(
            (element) => element.selected.length > 0
          ),
          quiz_id: this.getAssesmentDetails?.data?.quiz?.id,
        });
        return;
      }
      this.selected = "";
      this.currentQuestion = this.currentQuestion + 1;
      this.selected = this.attempts[this.currentQuestion]?.selected;
    },

    handle_back() {
      if (this.file_uploading) {
        return;
      }
      if (this.currentQuestion === 0) return;
      this.selected = "";
      this.currentQuestion = this.currentQuestion - 1;
      this.selected = this.attempts[this.currentQuestion]?.selected;
    },

    handle_speech() {
      this.clickLogger({
        user_id: JSON.parse(localStorage.getItem("authUser"))?.id,
        page_name: "assesment",
        action_name: "read to me",
        url: window.location.origin,
      });

      speechSynthesis.cancel();
      let replace = (str) => {
        return str.replace(/<[^>]+>/g, "").replace(/\&nbsp;/g, "");
      };
      const speech = new Speech();
      const currentQuestionDetails = this.getAssesmentDetails.data.questions[
        this.currentQuestion
      ];

      let text;
      switch (currentQuestionDetails.type) {
        case "multiple":
          text = `${replace(currentQuestionDetails.question)} !.!
          ;Option  A !.! -  ${replace(currentQuestionDetails.option_a)} !.!;
          ;Option  B !.! - ${replace(currentQuestionDetails.option_b)} !.!;
          ;Option  C !.! - ${replace(currentQuestionDetails.option_c)} !.!;
          ;Option  D !.! - ${replace(currentQuestionDetails.option_d)} !.!;
 `;
          break;
        case "bool":
          text = `${replace(currentQuestionDetails.question)} !.!
          ;${true} !.!;
           ;or !.!;
          ;${false} !.!;
 `;
          break;
        case "short":
          text = `${replace(currentQuestionDetails.question)} !.!
 `;
          break;
        case "essay":
          text = `${replace(currentQuestionDetails.question)} !.!
 `;
          break;

        default:
          break;
      }

      speech
        .speak({
          text,
          queue: false,
          listeners: {},
        })
        .catch((e) => {
          console.error("An error occurred :", e);
        });
    },

    handle_delete_file() {
      this.deleteFile(this.attempts[this.currentQuestion]?.answer_attachment);
      this.attempts[this.currentQuestion].answer_attachment = "";
    },

    async proctor_report() {
      this.proctor.stop();
      await this.postProctorResult(this.proctorImages);
    },

    handle_finish() {
      this.time_is_up = false;
      this.confirm_submission = false;
      this.isProctoredExam ? this.proctor_report() : null;
      this.isSubmit = true;
      this.assesmentProcessAction({
        attempts: this.attempts.filter(
          (element) => element.selected.length > 0
        ),
        quiz_id: this.getAssesmentDetails?.data?.quiz?.id,
      });
    },

    handle_answer(e) {
      this.selected = e.answer;
      this.attempts.forEach((question) => {
        if (question?.question === e.id) {
          question.selected = e.answer;
        }
      });
    },

    startProctor(fn) {
      this.isProctoredExam = true;
      this.isProctorAllowed = true;
      this.isProctorConsentModalOpen = false;
      this.handle_time();
      // the function to start proctor

      const defaultOpts = {
        scores: {
          noFace: -3,
          multiFace: -10,
          ambientNoise: -2,
        },
        audio: {
          fps: 2,
          sensitivity: 70,
        },
        video: {
          fps: 20,
        },
      };

      return new window.Proctor({
        detectionLapse: 10,

        scores: Object.assign(
          {},
          {
            noFace: -3,
            multiFace: -10,
            ambientNoise: -2,
            integrityScore: this.integrity || 100,
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
            recordingDuration: 10000,
          },
          defaultOpts.audio
        ),

        video: Object.assign(
          {},
          {
            element: "proctor-video",
            canvas: "proctor-canvas",
            fps: 20,
            streamWidth: 600, //320,
            streamHeight: 450, //340,
            ignoreTrack: false, // set to true during exam
            takeInitialSnapshot: true,
          },
          defaultOpts.video
        ),

        handleOutdatedBrowser: () => {
          console.error(
            "Browser version is outdated and not suitable to run proctor."
          );
          this.$parent.in_view = "OutdatedBrowser";
        },

        handleAudioUpload: async (data64) => {
          const formData = new FormData();
          formData.append("file", data64);
          await this.uploadFile({
            folder: "exams/proctor",
            data: formData,
          });
        },

        handleSnapshotUpload: async (data64, eventName) => {
          this.eventName = eventName;
          const formData = new FormData();
          formData.append("file", data64);

          await this.uploadFile({
            folder: "upload-file/files",
            data: formData,
          });
        },

        onNoFaceTracked: () => {
          // console.log("no face");
        },

        onMultiFaceTracked: () => {
          // console.log("multi");
        },

        onAmbientNoiseDetection: (pitch, meter) => {
          console.log("Proctor: Ambient noise detected");
        },

        onCamPermissionDenied: (e) => {
          console.warn("Proctor (Perms): Webcam needed for this test");
        },

        onMicPermissionDenied: () => {
          console.warn("Proctor (Perms): Microphone needed for this test");
        },

        onCamNotDetected: (e) => {
          console.warn("Proctor: This device does not have a webcam");
        },

        onMicNotDetected: () => {
          console.warn("Proctor: This device does not have a microphone");
        },

        proctorReady: () => {
          "function" == typeof fn && fn();
        },

        feedback: (e) => {
          // console.log(e);
          this.integrity = e?.integrityScore;
        },

        onOutsideBrowserTabClick: (focused, n) => {
          this.integrity = this.integrity - 2;
        },

        showLogs: false,
      });
    },

    handleCanceledPermission() {
      console.log("Canceled Permission");
      // window.location = `${window.location.origin}/`;
    },

    initSpeech() {
      const speech = new Speech();
      speech
        .init({
          volume: 0.5,
          lang: "en-GB",
          rate: 0.8,
          pitch: 1,
          //'voice':'Google UK English Male',
          splitSentences: false,
          listeners: {
            // onvoiceschanged: (voices) => {}
          },
        })

        .catch((e) => {
          console.error("An error occured while initializing : ", e);
        });

      if (!speech.hasBrowserSupport()) {
        alert(
          "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !"
        );
      }
    },

    takeSnapshots() {
      if (this.isSubmit) return;
      let assessmentId = this.getAssesmentDetails?.data?.id;
      let assessmentIndex = this.currentQuestion;
      // // STORE TEMPORARILY
      localStorage.setItem("assessment_id", assessmentId);
      localStorage.setItem(
        "assessment_token",
        `${assessmentIndex}-${this.fullDuration}${
          this.isProctoredExam ? `-${this.integrity}` : ""
        }`
      );

      localStorage.setItem("assessment_log", JSON.stringify(this.attempts));
      localStorage.setItem(
        "assessment_details",
        JSON.stringify(this.getAssesmentDetails)
      );

      this.isProctoredExam && this.isProctorAllowed
        ? localStorage.setItem(
            "proctor_media_url",
            JSON.stringify(this.proctorImages)
          )
        : null;
    },

    getSnapshots() {
      let assesmentId = localStorage.getItem("assessment_id");
      let rawToken = localStorage.getItem("assessment_token");
      let proctorFiles = JSON.parse(localStorage.getItem("proctor_media_url"));
      let token = rawToken?.split("-");
      let selections = JSON.parse(localStorage.getItem("assessment_log"));

      assesmentId ? (this.assessmentId = Number(assesmentId)) : null;
      selections ? (this.attempts = selections) : null;
      proctorFiles ? (this.proctorImages = proctorFiles) : null;
      if (token) {
        this.fullDuration = Number(token[1]);
        this.currentQuestion = Number(token[0]);
        this.integrity = Number(token[2]);
        this.selected = this.attempts[this.currentQuestion]?.selected;
      }

      localStorage.removeItem("assessment_id");
      localStorage.removeItem("assessment_token");
      localStorage.removeItem("assessment_log");
      localStorage.removeItem("proctor_media_url");
    },

    handle_time() {
      if (this.fullDuration > 0) {
        setInterval(() => {
          if (this.isSubmit) {
            return;
          }
          if (this.fullDuration > 0) {
            this.fullDuration = this.fullDuration - 1;
          }
        }, 1000);
      }
    },

    initProctor() {
      this.isProctoredExam = true;
      this.isProctorConsentModalOpen = true;
    },
    async handle_file_change(e) {
      this.file_uploading = true;
      const formData = new FormData();

      const lengthOfFowardSlash =
        this.attempts[this.currentQuestion]?.answer_attachment?.split("/")
          ?.length - 1;

      const lengthOfDots =
        this.attempts[this.currentQuestion]?.answer_attachment[
          lengthOfFowardSlash
        ]?.split(".")?.length - 1;

      formData.append("file", e.target.files[0]);
      const additional = this.attempts[this.currentQuestion]?.answer_attachment
        ? {
            overide: true,
            newName: this.attempts[this.currentQuestion]?.answer_attachment
              .split("/")
              [lengthOfFowardSlash]?.split(".")[lengthOfDots],
          }
        : {}?.length;
      await this.uploadFile({
        folder: "files/student-assesment",
        base: "0",
        data: formData,
        ...additional,
      });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    this.startHomeworkAction({
      homework_id: id,
      student_id: this.$route.query.student_id,
    });

    this.initSpeech();
    this.getSnapshots();
  },

  computed: {
    ...mapGetters([
      "getIsAssesmentFetching",
      "getAssesmentDetails",
      "getIsAssesmentProcessing",
      "getProcessingDetails",
      "getUploadData",
    ]),

    getTimeLeft() {
      return `${this.minutes} minutes, ${this.seconds} seconds`;
    },

    getSkippedCount() {
      if (!this.attempts) return 0;

      return this.attempts.filter((element) => !element?.selected)?.length;
    },

    getTotalAttempts() {
      return this.attempts && this.attempts?.length ? this.attempts.length : 0;
    },

    progressWidth() {
      if (
        this.currentQuestion + 1 >=
        this.getAssesmentDetails?.data?.questions?.length
      ) {
        return 100;
      }
      if (this.getAssesmentDetails?.data?.questions?.length) {
        return (
          (100 / this.getAssesmentDetails?.data?.questions?.length) *
            this.currentQuestion +
          2
        );
      } else return 10;
    },
  },

  watch: {
    getAssesmentDetails() {
      console.log("Assessment Details", this.getAssesmentDetails);

      if (
        this.getAssesmentDetails?.code !== 200 ||
        this.getAssesmentDetails?.name !== "success"
      ) {
        // window.location = `${window.location.origin}/`;
      } else if (this.getAssesmentDetails?.message === "Homework Submitted") {
        this.handle_review();
      }

      if (
        Number(this.getAssesmentDetails?.data?.id) !==
          Number(this.assessmentId) ||
        !this.assessmentId
      ) {
        this.currentQuestion = 0;
        this.fullDuration = Number(
          this.getAssesmentDetails?.data?.duration ||
            this.getAssesmentDetails?.data?.questionsDuration
        );
        this.attempts = this.getAssesmentDetails?.data?.questions.map(
          (item) => {
            const answer =
              item.type === "essay" && Number(item.file_upload) === 1
                ? { answer_attachment: "" }
                : {};
            return {
              question: item?.id,
              selected: "",
              ...answer,
            };
          }
        );
      } else {
        this.fullDuration
          ? (this.fullDuration = this.fullDuration - 1)
          : (this.fullDuration = Number(
              this.getAssesmentDetails?.data?.duration ||
                this.getAssesmentDetails?.data?.questionsDuration
            ));

        this.attempts
          ? null
          : (this.attempts = this.getAssesmentDetails?.data?.questions.map(
              (item) => {
                return {
                  question: item?.id,
                  selected: "",
                  // ...answer
                };
              }
            ));
        if (this.attempts.length && this.currentQuestion) {
          this.selected = this.attempts[this.currentQuestion]?.selected;
        }
      }
      // start time if its proctor els wait for permittion
      Number(this.getAssesmentDetails?.data.is_proctor) === 1
        ? this.initProctor()
        : this.handle_time();
      // timer

      this.minutes = Math.floor(this.fullDuration / 60);
      this.seconds = this.fullDuration - this.minutes * 60;
    },

    currentQuestion() {
      speechSynthesis.cancel();
    },

    getProcessingDetails() {
      if (
        this.getProcessingDetails?.data &&
        (this.getProcessingDetails?.code === 200 ||
          this.getProcessingDetails?.name === "success")
      ) {
        if (this.getProcessingDetails?.data?.computed == 0) {
          this.handle_review();
        } else if (this.getProcessingDetails?.data.score > 60) {
          this.isHomeworkGreat = true;
        } else {
          this.isHomeworkGood = true;
        }
      } else {
        this.toastAction({
          toastData: {
            toastOpen: true,
            toastText: this.getProcessingDetails?.message,
            toastState: "error",
            showBtn: true,
          },
          timeout: 3000,
        });
      }
    },

    fullDuration(nextValue, prevValue) {
      if (
        (this.isProctoredExam && !this.isProctorAllowed) ||
        !this.getAssesmentDetails?.data
      ) {
        return;
      }
      if (Number(nextValue) <= 0) {
        this.seconds = 0;
        this.confirm_submission = false;
        this.time_is_up = true;
        return;
        this.handle_finish();
        return;
      }

      this.minutes = Math.floor(this.fullDuration / 60);
      this.seconds = this.fullDuration - this.minutes * 60;
    },

    getUploadData() {
      if (
        this.getUploadData?.code === 200 &&
        this.getUploadData?.name === "success"
      ) {
        if (this.file_uploading) {
          this.$refs["assesment-card"].$refs["input-file"].value = "";
          this.file_uploading = false;
          this.attempts.forEach((question, index) => {
            if (index === this.currentQuestion) {
              question.answer_attachment = this.getUploadData?.data?.ObjectURL;
            }
          });
          return;
        }
        const urlExtArr = this.getUploadData?.data?.ObjectURL.split(".");
        const ext = urlExtArr[urlExtArr.length - 1];
        // this.proctorImages.push(this.getUploadData?.data?.ObjectURL);
        this.proctorImages.push({
          assessment_id:
            this.getAssesmentDetails?.data?.id || this.$route.params.id,
          integrity: this.integrity,
          file_type: ["png", "jpg", "jpeg"].includes(ext) ? "image" : "audio",
          name: ["png", "jpg", "jpeg"].includes(ext)
            ? this.eventName
            : "ambient noise",
          extension: ext,
          url: this.getUploadData?.data?.ObjectURL,
          raw: this.getUploadData?.data,
          size: "unknown",
        });
      }
    },
  },

  created() {
    window.addEventListener("beforeunload", this.takeSnapshots);
  },

  updated() {
    window?.MathJax?.typeset();
  },

  beforeDestroy() {
    // if (this.isProctoredExam)
    // if (!this.proctor_stopped) this.stopProctorAndGetFeedback();
    window.removeEventListener("beforeunload", () => {});
  },
};
</script>

<style lang="scss" scoped>
.assessment {
  .overlay-main {
    position: fixed;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #113255c2;
    color: #fff;
    .svg-main {
      animation: spin 1.5s infinite linear;
    }
    .text {
      font-size: 1.4rem;
      line-height: 29px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #dbf5f8;
      margin-top: 2rem;
    }
  }
  .img-main {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }
  background-size: cover;
  background-color: #f3f3f3;
  position: fixed;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  flex-direction: column;
  .assessment-main {
    max-width: toRem(763);
    margin: 0 auto;
    margin-bottom: 5rem;
  }
  .main-header {
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    flex-direction: column;
    @include breakpoint-custom-down(800) {
      margin: 1rem;
    }
    .top-header {
      align-items: center;
      justify-content: space-between;
      @include breakpoint-custom-down(580) {
        flex-direction: column;
        align-items: center;
      }
      .bold-text {
        font-weight: bold;
        font-size: 21px;
        line-height: 29px;
        color: #113255;
      }
      .loader-text {
        padding: 1rem 4rem;
        border-radius: 20px;
      }
      .left-section {
        @include breakpoint-custom-down(580) {
          margin-top: 1rem;
        }
        @include breakpoint-custom-down(320) {
          flex-direction: column;
        }
        .timer-section {
          background: #fceacf;
          padding: 8px 22px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: bold;
          font-size: 16px;
          color: #353535;
          .time {
            margin-left: 10px;
          }
        }
        align-items: center;
        justify-content: space-between;
        .finish-button {
          font-size: 12px;
          font-weight: bold;
          color: #353535;
          padding: 10px 22px;
          text-transform: uppercase;
          border: 1px solid #959595;
          border-radius: 30px;
        }
        .finish-button:hover {
          color: #959595;
          border: 1px solid 353535;
        }
      }
    }
  }
}

.bottom-section {
  padding: 10px 0px;
  position: fixed;
  bottom: 0px;
  background-color: #113255 !important;

  @include breakpoint-down(md) {
    padding: 8px 4px;
  }

  @include breakpoint-down(sm) {
    padding: 7px 2px;
  }

  .left {
    span {
      @include breakpoint-down(md) {
        font-size: 16px !important;
      }

      @include breakpoint-down(xs) {
        font-size: 14px !important;
      }

      &:hover {
        color: lighten($brand_red, 8%) !important;
      }
    }

    .avatar.pointer {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .separator {
      width: 0.8px;
      height: 40px;
      background: $border_grey;
      margin: 0px 15px;

      @include breakpoint-down(md) {
        height: 24px;
        margin: 0px 10px;
      }

      @include breakpoint-down(xs) {
        height: 20px;
        margin: 0px 8px;
      }
    }
  }
  .right {
    .btn {
      @include breakpoint-down(md) {
        padding: 8px 19px !important;
        font-size: 10px;
      }

      @include breakpoint-down(xs) {
        padding: 7px 18px !important;
        font-size: 9px;
      }
    }
  }
}
.back-btn {
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .arrow {
    display: flex;
  }
  .text {
    font-size: 12px !important;
  }
}
.finish-button {
  @include breakpoint-custom-down(320) {
    margin-left: 0px !important;
  }
}
.microphone,
.finish-button {
  @include breakpoint-custom-down(320) {
    margin-top: 1rem;
  }
}
.loader-area {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 3rem;
  width: 100%;
  height: 100%;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
