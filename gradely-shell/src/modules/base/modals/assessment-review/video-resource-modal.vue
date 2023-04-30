<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-sm-md-avg' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header position-relative brand-navy-bg">
        <div class="video-wrapper position-relative">
          <video
            :poster="getVideoThumbnail"
            class="index-1"
            x-webkit-airplay="allow"
            :key="getVideoURL"
            id="videoPlayer"
            controlslist="nodownload"
            @ended="ended"
            @click="checkIfPlaying"
          >
            <source :src="getVideoURL" type="video/mp4" />
            Your Browser does not support the video tag
          </video>

          <template v-if="show_play_btn">
            <!-- OVERLAY -->
            <div class="overlay index-9"></div>

            <!-- PLAY ICON -->
            <div
              class="icon icon-play-bg brand-accent index-99 pointer"
              title="Play video"
              @click="play"
            ></div>
          </template>
        </div>

        <!-- INDICATOR -->
        <div class="video-indicator brand-red-light-bg">
          <div class="icon icon-video-card brand-tonic"></div>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- TOPIC AREA -->
        <div class="topic-area mgt-15 mgb-22">
          <div class="title-text brand-red font-weight-700 mgb-1">
            VIDEO LESSON
          </div>
          <div class="topic-text brand-navy font-weight-700 mgb-11">
            {{ resource.title }}
          </div>

          <div class="options">
            <div class="column mgr-20">
              <div class="icon icon-clock"></div>
              <div class="text">{{ getDuration }}m</div>
            </div>

            <div class="column">
              <div class="icon icon-briefcase"></div>
              <div class="text">{{ $string.getCapitalizeText(getClass) }}</div>
            </div>
          </div>
        </div>

        <!-- RECOMMENDATION ROW -->
        <div class="recommendation-row mgb-12">
          <div class="text border-grey-dark mgb-6">RECOMMENDED FOR</div>

          <div class="data-row">
            <div class="children">
              <div
                class="child avatar rounded-10 brand-inverse-light-bg"
                v-for="(child, index) in students"
                :key="index"
                :title="`${child.firstname} ${child.lastname}`"
              >
                <img
                  v-if="child.image"
                  :src="child.image"
                  class="avatar-img"
                  :alt="`${child.firstname} ${child.lastname}`"
                />

                <div
                  class="avatar-text white-text gfont-11"
                  :class="
                    $color.getProfileBgColor(
                      `${child.firstname} ${child.lastname}`
                    )
                  "
                  v-else
                >
                  {{
                    $string.getStringInitials(
                      `${child.firstname} ${child.lastname}`
                    )
                  }}
                </div>
              </div>
            </div>

            <!-- RECOMMEND BUTTON -->
            <button
              class="btn recommend-btn"
              :class="resource.is_recommended && 'recommend-btn-active'"
              @click="$emit('shareResource')"
            >
              <div
                class="icon"
                :class="resource.is_recommended ? 'icon-accept' : 'icon-share'"
              ></div>
              <div class="text">
                {{ resource.is_recommended ? "Shared" : "Share" }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "videoResourceModal",

  components: {
    modalCover,
  },

  props: {
    resource: Object,
    students: Array,
  },

  computed: {
    getDuration() {
      let duration = this.resource?.duration ?? "5:30";
      return duration.includes(":") ? duration : `${duration}:00`;
    },

    getClass() {
      return this.resource?.class?.class_name ?? "Primary 1";
    },

    getVideoThumbnail() {
      return (
        this.resource?.reference?.thumbnail ??
        `${this.getAssetBaseURL(
          "cloud",
          "richy-jones"
        )}/image/upload/v1651006816/Rectangle_12957.png`
      );
    },

    getVideoURL() {
      return this.resource?.reference?.url;
    },
  },

  data: () => ({
    show_play_btn: true,
    player: {},
    isPlaying: false,
  }),

  methods: {
    play() {
      let videoObj = document.getElementById("videoPlayer");

      if (videoObj.paused) {
        this.isPlaying = true;
        videoObj.play();
        videoObj.controls = true;
        this.show_play_btn = false;
      }
    },

    checkIfPlaying() {
      let videoObj = document.getElementById("videoPlayer");

      if (this.isPlaying) {
        this.isPlaying = false;
        videoObj.pause();
        videoObj.controls = false;
        this.show_play_btn = true;
      }
    },

    ended() {
      console.log("Ended");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  padding: 0;

  .video-wrapper {
    padding: toRem(14) 0;
    height: toRem(280);

    video {
      width: 100%;
      height: 100%;
    }

    .overlay {
      @include full-width-height;
      top: 0;
      left: 0;
      background: rgba($black-text, 0.35);
    }

    .icon {
      font-size: toRem(45);
      @include center-placement;
    }
  }

  .video-indicator {
    position: absolute;
    @include square-shape(48);
    border-radius: 50%;
    z-index: 99;
    left: toRem(22);
    bottom: toRem(-25);

    .icon {
      @include center-placement;
      font-size: toRem(21);
    }
  }
}

.modal-cover-body {
  padding: toRem(22) toRem(20) toRem(5);

  .topic-area {
    .title-text {
      @include font-height(12, 16);
    }

    .topic-text {
      @include font-height(16, 28);
    }

    .options {
      @include flex-row-start-nowrap;

      .column {
        @include flex-row-start-nowrap;

        .icon {
          color: $brand-inverse;
          font-size: toRem(18.45);
          margin-right: toRem(11);
        }

        .text {
          font-size: toRem(13.75);
          color: $color-grey-dark;
        }
      }
    }
  }

  .recommendation-row {
    .text {
      @include font-height(12, 16);
    }

    .data-row {
      @include flex-row-between-nowrap;

      .children {
        @include flex-row-start-nowrap;

        .child {
          margin: 0 toRem(2.25);

          &:first-of-type {
            margin-left: 0;
          }

          &:last-of-type {
            margin-right: 0;
          }
        }
      }

      .recommend-btn {
        background: $brand-accent-light;
        border: toRem(1) solid $brand-accent;
        padding: toRem(10.5) toRem(20.75);
        color: $color-text;

        .icon {
          font-size: toRem(15.5);
          margin-right: toRem(10);
        }

        .text {
          font-size: toRem(11.25);
        }

        &-active {
          background: rgba($brand-green-light, 0.75);
          border: toRem(1) solid darken($brand-green, 10%);
          color: darken($brand-green, 10%);

          .icon {
            font-size: toRem(19);
            margin-right: toRem(6);
          }
        }
      }
    }
  }
}
</style>
