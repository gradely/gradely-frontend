<template>
  <div class="user-video-card pointer smooth-transition" @click="viewVideo">
    <!-- LEFT  -->
    <div class="left">
      <div class="video position-relative rounded-8 overflow-hidden">
        <img v-lazy="video.thumbnail" alt="" />

        <div class="video-cover position-absolute w-100 h-100"></div>

        <!-- PLAY ICON  -->
        <div
          class="icon icon-play-bg brand-accent index-1"
          title="Play video"
        ></div>
      </div>

      <div class="video-info">
        <div class="title font-weight-700 brand-navy" :title="video.title">
          {{ $string.getTruncatedText(video.title, 32) }}
        </div>
        <div class="author-info color-grey-dark">
          By: <span class="text">{{ video.user.full_name }}</span> •
          {{ getDisplayDate }}
        </div>
      </div>
    </div>

    <!-- RIGHT  -->
    <div class="right position-relative">
      <div
        class="avatar pointer rounded-7 smooth-transition ignore"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="icon icon-ellipsis-h border-grey-dark ignore"></div>
      </div>

      <div
        class="
          dropdown
          rounded-5
          box-shadow-effect
          smooth-transition smooth-animation
          white-text-bg
          ignore
        "
        v-if="show_more_option"
      >
        <div class="item ignore" @click="togglePreviewer">
          <div class="icon-cover ignore">
            <div class="icon icon-eye ignore"></div>
          </div>
          <div class="ignore">Watch Video</div>
        </div>

        <div class="item ignore" @click="downloadVideo">
          <div class="icon-cover ignore">
            <div class="icon icon-download ignore"></div>
          </div>
          <div class="ignore">Download Video</div>
        </div>
      </div>
    </div>

    <portal to="gradely-modals">
      <transition name="fade" mode="out-in" v-if="show_previewer">
        <media-viewer
          :user="{
            image: video.user.image,
            full_name: video.user.full_name,
            date: video.created_at,
          }"
          :media="{
            resources: [video.filename],
            thumbnails: [video.thumbnail],
            sharable: true,
            type: 'video',
          }"
          @closeTriggered="togglePreviewer"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mediaViewer from "@/shared/components/media-viewer";

export default {
  name: "userVideoCard",

  components: {
    mediaViewer,
  },

  props: {
    video: {
      type: Object,
      default: () => ({
        id: 1,
        title: "Video title",
        extension: "mp4",
        created_at: "2021-09-23 08:34:09",
        filename: "",
        filetype: "",
        filesize: "",
        token: "",
        tag: "",
        thumbnail: "",
        user: {
          full_name: "Teacher name",
        },
      }),
    },
  },

  computed: {
    getDisplayDate() {
      return this.$date.formatDate(this.video.created_at).timeDifference();
    },
  },

  data: () => ({
    show_more_option: false,
    show_previewer: false,
    force_close: false,
  }),

  methods: {
    ...mapActions({
      downloadFromBucket: "aws/downloadFromBucket",
      resetDownloadStatus: "aws/resetDownloadStatus",
      downloadLogger: "aws/downloadLogger",
    }),

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    togglePreviewer() {
      this.show_previewer = !this.show_previewer;
    },

    viewVideo($event) {
      if (!$event.target.classList.contains("ignore")) this.togglePreviewer();
    },

    forceCloseViewer() {},

    downloadVideo() {
      this.downloadFromBucket({
        file_url: this.video?.filename,
        file_name: this.video?.title,
      }).then((url) => {
        let link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", this.video?.title);
        link.click();

        setTimeout(() => {
          this.resetDownloadStatus();
          this.downloadLogger(this.video?.token);
        }, 2000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-video-card {
  @include flex-row-between-nowrap;
  padding: toRem(10) toRem(6);
  border-bottom: toRem(1) solid rgba($border-grey, 0.4);

  &:hover {
    background: rgba($border-grey, 0.1);
    border-radius: toRem(4);
  }

  .left {
    @include flex-row-start-nowrap;
    width: 82%;

    @include breakpoint-custom-down(360) {
      width: 86%;
    }

    .video {
      @include rectangle-shape(110, 65);
      margin-right: toRem(10);

      @include breakpoint-down(xs) {
        @include rectangle-shape(90, 70);
      }

      @include breakpoint-custom-down(360) {
        @include rectangle-shape(75, 60);
        margin-right: toRem(8);
      }

      img {
        @include background-cover;
      }

      .video-cover {
        background: #000;
        opacity: 0.4;
      }

      .icon {
        @include center-placement;
        font-size: toRem(26);

        @include breakpoint-custom-down(360) {
          font-size: toRem(20);
        }
      }
    }

    .title {
      @include font-height(12.5, 16);
      padding-right: toRem(10);
      margin-bottom: toRem(3);

      @include breakpoint-down(xs) {
        @include font-height(12.25, 18);
      }
    }

    .author-info {
      @include font-height(11.75, 17);
      margin-bottom: toRem(4);

      @include breakpoint-down(xs) {
        @include font-height(11.5, 16.5);
      }
    }
  }

  .right {
    @include flex-row-end-nowrap;
    width: 18%;

    .avatar {
      @include square-shape(32);
      background: $color-white;

      @include breakpoint-down(lg) {
        @include square-shape(34);
      }

      .icon {
        @include center-placement;
        font-size: toRem(22);

        @include breakpoint-down(lg) {
          font-size: toRem(20);
        }
      }

      &:hover {
        background: lighten($brand-inverse-light, 5%);
      }
    }
  }
}
</style>
