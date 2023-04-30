<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-md-lg' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-capitalize">
          Exam Proctor Report
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- TOP SECTION  -->
        <div class="top-section">
          <!-- LEFT SECTION  -->
          <div class="left-section">
            <!-- STUDENT NAME  -->
            <div class="report-row">
              <div class="title">Student Name:</div>
              <div class="value">Adebowale Mariam</div>
            </div>

            <!-- exam date  -->
            <div class="report-row">
              <div class="title">Exam date:</div>
              <div class="value">10 Aug, 2020 11:08:43 PM</div>
            </div>

            <!-- STUDENT PICTURE  -->
            <div class="report-row">
              <div class="title">Student picture:</div>
              <div class="img-block position-relative pointer" title="Preview">
                <img v-lazy="mxStaticImg('SampleOne.jpg', 'base')" alt="" />
              </div>
            </div>

            <!-- VIDEO RECORDING  -->
            <div class="report-row">
              <div class="title">Video recording:</div>

              <!-- VIDEO BLOCK  -->
              <div class="wrapper">
                <div class="video-block w-100">
                  <div class="overlay"></div>
                  <img
                    v-lazy="mxStaticImg('RewardBanner.png', 'base')"
                    alt=""
                  />

                  <!-- PLAY ICON  -->
                  <div
                    class="icon icon-play-bg brand-accent index-9 pointer"
                    title="Play video"
                  ></div>
                </div>

                <!-- DOWNLOAD VIDEO LINK  -->
                <div
                  class="download-link pointer border-grey-dark"
                  title="Download video"
                >
                  <div class="text link-underline">Download Video</div>
                  <div class="icon icon-download"></div>
                </div>
              </div>
            </div>

            <!-- AUDIO RECORDING  -->
            <div class="report-row">
              <div class="title">Audio recording:</div>

              <!-- VIDEO BLOCK  -->
              <div class="wrapper">
                <div
                  class="audio-block w-100 border-border-grey rounded-5 pd-5"
                >
                  <div class="avatar avatar-square brand-inverse-bg">
                    <div class="icon icon-play brand-navy"></div>
                  </div>

                  <div>
                    <div class="title-text color-text">
                      adebowale_10o82020.mp3
                    </div>
                    <div class="meta-text color-grey-dark">4.32mb</div>
                  </div>
                </div>

                <!-- DOWNLOAD AUDIO LINK  -->
                <div
                  class="download-link pointer border-grey-dark"
                  title="Download audio"
                >
                  <div class="text link-underline">Download Audio</div>
                  <div class="icon icon-download"></div>
                </div>
              </div>
            </div>

            <!-- WEBSITES VISITED -->
            <div class="report-row">
              <div class="title">Websites Visited:</div>

              <!-- VIDEO BLOCK  -->
              <div class="wrapper">
                <div class="website-block w-100">
                  <div class="icon icon-play"></div>
                  <div class="link">
                    https://www.dropbox.com/scl/fi/b0gszxtbkywiapd91ca2z/UPDATED-GRADELY...
                  </div>
                </div>

                <div class="website-block w-100">
                  <div class="icon icon-play"></div>
                  <div class="link">
                    https://www.dropbox.com/scl/fi/b0gszxtbkywiapd91ca2z/UPDATED-GRADELY...
                  </div>
                </div>

                <div class="website-block w-100">
                  <div class="icon icon-play"></div>
                  <div class="link">
                    https://www.dropbox.com/scl/fi/b0gszxtbkywiapd91ca2z/UPDATED-GRADELY...
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT SECTION  -->
          <div class="right-section color-white-bg rounded-5">
            <!-- INTEGRITY TEXT  -->
            <div class="integrity-text text-center">
              <span class="border-grey-dark">Test Integrity:</span>
              <span class="color-text font-weight-600">&nbsp; 97%</span>
            </div>

            <!-- TITLE TEXT  -->
            <div class="title-text color-ash font-weight-600">
              How is this calculated?
            </div>

            <div class="item">
              <div class="bullet"></div>
              <div class="text">
                Only one person was detecteded in the room during the exam
                period.
              </div>
            </div>

            <div class="item">
              <div class="bullet"></div>
              <div class="text">
                No additional sound or voice besides the student’s
              </div>
            </div>

            <div class="item">
              <div class="bullet"></div>
              <div class="text">
                The picture of the student in the video has a 99% match with the
                student’s picture.
              </div>
            </div>

            <!-- HELP ROW  -->
            <div class="help-row mgt-20">
              <div class="icon icon-flag border-grey-dark"></div>
              <div class="text">
                Have an issue with our report?
                <span class="btn-link" @click="$emit('showReportErrorModal')"
                  >Tell us</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM SECTION  -->
        <div class="bottom-section">
          <!-- REJECT  -->
          <div class="custom-btn" @click="$emit('showRejectModal')">
            <div class="icon icon-empty-trash"></div>
            <div class="text">Reject</div>
          </div>

          <!-- REPORT  -->
          <div class="custom-btn" @click="$emit('showReportStudentModal')">
            <div class="icon icon-status-indicator"></div>
            <div class="text">Report Student</div>
          </div>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "proctorReportModal",

  components: {
    modalCover,
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  .top-section {
    @include flex-row-between-wrap;
    align-items: flex-start;
  }

  .left-section {
    width: 59%;

    @include breakpoint-down(md) {
      width: 100%;
    }

    .report-row {
      @include font-height(11.5, 17);
      @include flex-row-start-wrap;
      align-items: flex-start;
      margin-bottom: toRem(15);

      .title {
        color: $color-ash;
        font-weight: 600;
        width: 35%;

        @include breakpoint-down(xs) {
          margin-bottom: toRem(4);
          width: 100%;
        }
      }

      .value {
        color: $color-text;

        @include breakpoint-down(xs) {
          width: 100%;
        }
      }

      .wrapper {
        position: relative;
        width: 65%;

        @include breakpoint-down(xs) {
          width: 100%;
        }
      }

      .img-block,
      .video-block {
        position: relative;
        height: toRem(130);
        width: 65%;

        @include breakpoint-down(xs) {
          width: 100%;
        }

        img {
          @include background-cover;
        }
      }

      .video-block {
        .overlay {
          background: rgba($black-text, 0.45);
          @include stretch-area;
          position: absolute;
          z-index: 1;
        }

        .icon {
          @include center-placement;
          font-size: toRem(40);
          z-index: 99;
        }
      }

      .audio-block {
        @include flex-row-start-nowrap;

        .avatar {
          @include square-shape(40);
          margin-right: toRem(8);

          .icon {
            @include center-placement;
            font-size: toRem(16);
          }
        }

        .title-text {
          @include font-height(11.5, 16);
          margin-bottom: toRem(2);
        }

        .meta-text {
          @include font-height(10.75, 15);
        }
      }

      .website-block {
        @include flex-row-start-nowrap;
        margin-bottom: toRem(15);

        .icon {
          margin-right: toRem(8);
          color: $brand-accent;
          font-size: toRem(13);
        }

        .link {
          @include transition(0.4s);
          font-size: toRem(11);
          color: $color-ash;
          cursor: pointer;
          word-break: break-all;

          &:hover {
            text-decoration: underline;
            color: $brand-accent;
          }
        }
      }

      .download-link {
        @include flex-row-start-nowrap;
        margin-top: toRem(10);
        width: max-content;
        @include transition(0.4s);

        &:hover {
          color: $brand-accent !important;
        }

        .text {
          margin-right: toRem(10);
          font-size: toRem(11);
        }
        .icon {
          font-size: toRem(15);
        }
      }
    }
  }

  .right-section {
    width: 38%;
    padding: toRem(15);

    @include breakpoint-down(md) {
      width: 100%;
    }

    .integrity-text {
      @include font-height(12.5, 18);
      margin-bottom: toRem(20);
    }

    .title-text {
      @include font-height(11.75, 17);
      margin-bottom: toRem(15);
    }

    .item {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(10);
      align-items: flex-start;

      .bullet {
        background: $border-grey-dark;
        @include square-shape(8);
        margin-right: toRem(8);
        margin-top: toRem(4);
        border-radius: 50%;
      }

      .text {
        @include font-height(11.25, 17);
        letter-spacing: 0.02em;
        color: $color-text;
      }
    }

    .help-row {
      @include flex-row-start-nowrap;

      .icon {
        margin-right: toRem(4);
        font-size: toRem(13);
      }

      .text {
        @include font-height(11, 17);
      }
    }
  }

  .bottom-section {
    border-top: toRem(1) solid $border-grey;
    @include flex-row-start-nowrap;
    padding-top: toRem(15);
    margin-top: toRem(25);
    margin-bottom: toRem(5);

    .custom-btn {
      border: toRem(1) solid $border-grey;
      padding: toRem(9) toRem(18);
      @include flex-row-start-nowrap;
      @include transition(0.3s);
      border-radius: toRem(30);
      margin-right: toRem(20);
      width: max-content;
      cursor: pointer;

      @include breakpoint-down(xs) {
        margin-right: toRem(10);
      }

      &:hover {
        border: toRem(1) solid $brand-inverse;
      }

      .icon {
        color: $color-grey-dark;
        margin-right: toRem(8);
        font-size: toRem(14);

        @include breakpoint-down(xs) {
          font-size: toRem(12);
        }
      }

      .text {
        font-size: toRem(11.5);
        color: $color-ash;

        @include breakpoint-down(xs) {
          font-size: toRem(11);
        }
      }
    }
  }
}
</style>
