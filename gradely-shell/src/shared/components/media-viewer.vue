<template>
  <div class="media-viewer smooth-animation h-100 w-100">
    <!-- TOP SECTION -->
    <div class="top-section w-100 black-text-bg">
      <div class="gradely-container mx-auto px-2 px-sm-3 px-md-4 px-xl-5">
        <div class="top-content">
          <!-- LEFT  -->
          <div class="left">
            <div class="avatar avatar-square brand-inverse-light-bg">
              <img
                v-if="user.image"
                v-lazy="user.image"
                class="avatar-img"
                :alt="$string.getStringInitials(user.full_name)"
              />

              <div
                class="avatar-text"
                :class="$color.getProfileBgColor(user.full_name)"
                v-else
              >
                {{ $string.getStringInitials(user.full_name) }}
              </div>
            </div>

            <div>
              <div class="top-text brand-inverse-light font-weight-600 mgb-2">
                {{ user.full_name }}
              </div>
              <div class="bottom-text color-grey-dark">
                {{ getDisplayDate }}
              </div>
            </div>
          </div>

          <!-- RIGHT  -->
          <div class="right">
            <!-- DOWNLOAD MEDIA ICON  -->
            <div
              class="icon icon-cloud-download download-icon"
              title="Download Media"
              @click="downloadMedia"
            ></div>

            <!-- SHARE MEDIA ICON  -->
            <!-- v-if="media.sharable" -->
            <template v-if="false">
              <div class="icon icon-share share-icon" title="Share Media"></div>
            </template>

            <!-- SEPARATOR  -->
            <div class="separator"></div>

            <!-- CLOSE ICON  -->
            <div
              class="icon icon-close close-icon"
              title="Close Preview"
              @click="$emit('closeTriggered')"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTTOM SECTION -->
    <div class="bottom-section w-100">
      <div
        class="
          gradely-container
          m-auto
          px-2 px-sm-3 px-md-4 px-xl-5
          w-100
          h-100
        "
      >
        <div
          class="bottom-content position-relative w-100 h-100 my-auto"
          :class="
            media.type === 'document'
              ? 'justify-content-start'
              : 'justify-content-center'
          "
        >
          <!-- MEDIA RENDERER -->
          <div class="media-renderer h-auto white-text w-100">
            <!-- LOADING STATE  -->
            <template v-if="loading">
              <div class="loader-icon icon-dotted-spinner animate"></div>
            </template>

            <!-- RESOURCE STATE -->
            <template v-else>
              <!-- IMAGE BLOCK -->
              <template v-if="media.type === 'image'">
                <img
                  v-lazy="media.resources[getCurrentImageIndex]"
                  alt=""
                  class="smooth-animation"
                />

                <!-- IMAGE NAVIGATION -->
                <template
                  name="image-navigation"
                  v-if="media.resources.length > 1"
                >
                  <div
                    class="nav left-nav"
                    title="Previous"
                    v-if="!checkIfFirstImageIndex"
                    @click="goToPrevImage"
                  >
                    <div class="wrapper position-relative w-100 h-100">
                      <div class="icon icon-caret-left"></div>
                    </div>
                  </div>

                  <div
                    class="nav right-nav"
                    title="Next"
                    v-if="!checkIfLastImageIndex"
                    @click="goToNextImage"
                  >
                    <div class="wrapper position-relative w-100 h-100">
                      <div class="icon icon-caret-right"></div>
                    </div>
                  </div>
                </template>
              </template>

              <!-- VIDEO BLOCK -->
              <template v-if="media.type === 'video'">
                <template v-if="is_popcorn">
                  <div class="popcorn-viewer h-100">
                    <iframe
                      :src="media.resources[0]"
                      allow="camera *; geolocation *; microphone *; autoplay *"
                      frame-id="my-ifram"
                      @load="onLoad"
                      name="my-frame"
                    />
                  </div>
                </template>

                <video
                  v-else
                  x-webkit-airplay="allow"
                  controls
                  playsinline
                  ref="videoPlayer"
                  @timeupdate="logVideoDuration"
                  :poster="
                    media.resources[0].thumbnails || media.thumbnails[0] || mxStaticImg('VideoPoster.png')
                  "
                  class="smooth-animation"
                >
                  <source :src="media.resources[0].filename || media.resources[0]" type="video/mp4" />
                </video>
              </template>

              <!-- DOCUMENT BLOCK -->
              <template v-if="media.type == 'document'">
                <template v-if="media.resources[0].extension === 'pdf'">
                  <div class="file-wrapper w-100 h-auto">
                    <div class="d-none">
                      <pdf
                        :src="media.resources[0].filename"
                        @num-pages="pageCount = $event"
                      ></pdf>
                    </div>

                    <div
                      class="mb-1 mb-md-2"
                      v-for="(_, index) in pageCount"
                      :key="index"
                    >
                      <pdf
                        :src="media.resources[0].filename"
                        :page="index + 1"
                      ></pdf>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div class="file-wrapper w-100 h-auto">
                    <VueDocPreview
                      :url="media.resources[0].filename"
                      type="office"
                    ></VueDocPreview>
                  </div>
                </template>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- style="display: inline-block; width: 100%; height: auto;max-height: 82vh;" -->
</template>

<script>
import { mapActions } from "vuex";
import pdf from "vue-pdf";
import VueDocPreview from "vue-doc-preview";

export default {
  name: "mediaViewer",

  components: {
    pdf,
    VueDocPreview,
  },

  props: {
    user: {
      type: Object,
      default: () => ({
        image: "",
        full_name: "Richy Jones",
        date: "2021-10-03 18:27:00",
      }),
    },

    media: {
      type: Object,
      default: () => ({
        resources: [],
        image_current_index: 0,
        current_time: 0,
        thumbnails: [],
        sharable: true,
        token: null,
        type: "image", //video, document, image
        extension: "pdf", //docx, doc, ppt etc
      }),
    },
  },

  computed: {
    getDisplayDate() {
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.user?.date)
        .getAll();

      return this.user.date
        ? `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`
        : "No date";
    },

    getCurrentImageIndex() {
      return this.current_index || 0;
    },

    checkIfFirstImageIndex() {
      return this.getCurrentImageIndex === 0 ? true : false;
    },

    checkIfLastImageIndex() {
      return this.media.resources.length - 1 === this.getCurrentImageIndex
        ? true
        : false;
    },
  },

  data() {
    return {
      loading: true,
      is_popcorn: false,
      myIframe: null,

      pageCount: 1,
      currentPage: 1,
      current_index: this.media.image_current_index,
    };
  },

  mounted() {
    this.loadMedia();

    if (this.media.type === "video") {
      this.isPopCornVideoType();

      let refs = this.$refs;

      setTimeout(() => {
        refs.videoPlayer.currentTime = this.media?.current_time ?? 0;
      }, 1000);
    }
  },

  methods: {
    ...mapActions({
      downloadFromBucket: "aws/downloadFromBucket",
      resetDownloadStatus: "aws/resetDownloadStatus",
      downloadLogger: "aws/downloadLogger",
      logWatchedVideo: "dbFeeds/logWatchedVideo",
    }),

    loadMedia() {
      setTimeout(() => (this.loading = false), 1000);
    },

    goToNextImage() {
      this.current_index += 1;
    },

    goToPrevImage() {
      this.current_index -= 1;
    },

    onLoad(frame) {
      this.myIframe = frame.contentWindow;
    },

    logVideoDuration(e) {
      let log_time = 10, // push at every 10 sec
        current_time = Math.floor(e.target.currentTime),
        can_log_video = current_time % log_time === 0 && current_time > 1;

      if (can_log_video) {
        if (current_time !== Math.floor(e.target.duration)) {
          this.logWatchedVideo({
            id: this.media.token,
            data: {
              duration: current_time,
            },
            source: "feed",
          });
        }
      }
    },

    setupPopcorn() {
      this.$nextTick(() => {
        let popCorn = document.createElement("script");
        popCorn.setAttribute(
          "src",
          "http://popcornjs.org/code/dist/popcorn-complete.min.js"
        );
        popCorn.setAttribute("async", true);
        popCorn.setAttribute("defer", true);
        document.head.appendChild(popCorn);
      });
    },

    isPopCornVideoType() {
      let popcorn_video = false;

      if (typeof this.media?.resources[0] === 'string') {
        popcorn_video = this.media?.resources[0]?.includes("class.gradely.co/");

        if (popcorn_video) {
          this.is_popcorn = true;
          this.setupPopcorn();
      } else this.is_popcorn = false;
      }

     
    },

    downloadMedia() {
      let attachment = ["image", "video"].includes(this.media.type)
        ? this.media.resources[this.getCurrentImageIndex]
        : this.media.resources[this.getCurrentImageIndex].filename;

      let file_title = `gradely_resource_${this.$string.generateRandomString(
        14
      )}.${attachment.split(".").pop()}`;

      this.downloadFromBucket({
        file_url: attachment,
        file_name: file_title,
      }).then((url) => {
        let link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", file_title);
        link.click();

        setTimeout(() => {
          this.resetDownloadStatus();
          // this.downloadLogger(this.document?.token);
        }, 2000);
      });
    },
  },
};
</script>

<style lang="scss" scooped>
.media-viewer {
  background: rgba(#000000, 0.96) !important;
  @include transition(0.5s);
  @include fixed-display-area;
  overflow: auto !important;
  z-index: 2500;
  height: 100vh;

  .top-section {
    border-bottom: toRem(0.35) solid rgba($brand-inverse-light, 0.15);
    padding: toRem(12) 0;

    .top-content {
      @include flex-row-between-nowrap;

      .left {
        @include flex-row-start-nowrap;
        .avatar {
          @include square-shape(37);
          margin-right: toRem(10);

          @include breakpoint-down(xs) {
            @include square-shape(32);
            margin-right: toRem(6);
          }
        }

        .top-text {
          @include font-height(12, 18);

          @include breakpoint-down(md) {
            @include font-height(11.75, 17);
            margin-bottom: 0 !important;
          }

          @include breakpoint-down(xs) {
            @include font-height(11, 17);
          }
        }

        .bottom-text {
          @include font-height(11, 16);

          @include breakpoint-down(xs) {
            @include font-height(11, 16);
          }
        }
      }

      .right {
        @include flex-row-end-nowrap;

        .icon {
          color: $brand-inverse-light;
          margin: 0 toRem(9);
          cursor: pointer;

          @include breakpoint-down(xs) {
            margin: 0 toRem(7.5);
          }
        }

        .download-icon {
          font-size: toRem(24);

          @include breakpoint-down(md) {
            font-size: toRem(21);
          }

          @include breakpoint-down(xs) {
            font-size: toRem(20.5);
          }
        }

        .share-icon {
          font-size: toRem(16.5);

          @include breakpoint-down(md) {
            font-size: toRem(14.5);
          }

          @include breakpoint-down(xs) {
            font-size: toRem(13.75);
          }
        }

        .separator {
          background: rgba($brand-inverse-light, 0.6);
          height: toRem(23);
          width: toRem(0.5);
          margin: 0 toRem(11);

          @include breakpoint-down(xs) {
            margin: 0 toRem(7);
          }
        }

        .close-icon {
          font-size: toRem(15);
          margin-right: 0;

          @include breakpoint-down(md) {
            font-size: toRem(14);
          }
        }
      }
    }
  }

  .bottom-section {
    height: 90vh;
    overflow: auto;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .bottom-content {
      @include flex-column-center;
      padding: toRem(10) 0;

      .media-renderer {
        @include flex-column-center;
        height: 100%;

        img,
        video {
          height: auto;
          width: auto;
          max-height: 70vh;
          max-width: 100%;
        }

        .popcorn-viewer {
          min-height: toRem(430);
          height: auto;
          min-width: toRem(650);
          width: auto;

          iframe {
            width: 100%;
            height: 100%;
          }

          @include breakpoint-down(md) {
            min-width: toRem(540);
            min-height: toRem(380);
          }

          @include breakpoint-down(sm) {
            min-width: toRem(480);
            min-height: toRem(320);
          }

          @include breakpoint-custom-down(502) {
            min-width: toRem(400);
            min-height: toRem(260);
          }

          @include breakpoint-down(xs) {
            min-width: toRem(320);
            min-height: toRem(220);
          }
        }

        .file-wrapper {
          padding: auto;
          margin: auto;
          overflow: hidden;
          -ms-overflow-style: none;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }

      .nav {
        border: toRem(0.5) solid rgba($color-white, 0.45);
        @include transition(0.4s);
        @include square-shape(33);
        border-radius: 50%;
        @include center-y;
        cursor: pointer;
        z-index: 1;

        @include breakpoint-down(md) {
          background: rgba($color-white, 0.75);
        }

        &:hover {
          background: rgba($color-white, 0.25);
        }

        .icon {
          @include center-placement;
          font-size: toRem(12);
          color: rgba($color-white, 0.6);

          @include breakpoint-down(md) {
            color: $brand-navy;
            font-size: toRem(15);
          }
        }
      }

      .left-nav {
        left: 0;

        @include breakpoint-down(sm) {
          .icon {
            margin-left: toRem(-1);
            margin-top: toRem(1);
          }
        }
      }

      .right-nav {
        right: 0;

        @include breakpoint-down(sm) {
          .icon {
            margin-right: toRem(-2);
            margin-top: toRem(1);
          }
        }
      }
    }
  }

  .loader-icon {
    color: rgba($color-grey-dark, 0.75);
    font-size: toRem(40);
    margin-top: toRem(-20);

    @include breakpoint-down(sm) {
      font-size: toRem(45);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(40);
    }
  }
}
</style>
