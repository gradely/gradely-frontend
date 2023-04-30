<template>
  <div class="video-card mgb-10 rounded-5">
    <!-- LEFT  -->
    <div class="left">
      <div class="video rounded-5 position-relative overflow-hidden">
        <img v-lazy="video.thumbnail" alt="" />

        <div class="video-cover position-absolute w-100 h-100"></div>

        <!-- PLAY ICON  -->
        <div
          class="icon icon-play-bg brand-accent pointer index-1"
          title="Play video"
          @click="togglePreviewer"
        ></div>
      </div>

      <div class="video-info">
        <div
          class="title font-weight-700 brand-navy pdr-10"
          :title="video.title"
        >
          {{ $string.getTruncatedText(video.title, 40) }}
        </div>

        <div class="author-info color-grey-dark">
          By: {{ video.user.first_name }} {{ video.user.last_name }}
        </div>

        <div class="meta-data color-grey-dark">
          {{ video.subject_name }}
          <span class="px-1" v-if="video.subject_name">•</span>
          {{ getDisplayDate }}
        </div>
      </div>
    </div>

    <!-- RIGHT  -->
    <div class="right position-relative">
      <div
        class="avatar rounded-7 pointer smooth-transition"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="icon icon-ellipsis-h border-grey-dark"></div>
      </div>

      <div
        class="
          dropdown
          rounded-5
          box-shadow-effect
          smooth-transition smooth-animation
          white-text-bg
        "
        v-if="show_more_option"
      >
        <div class="item" @click="togglePreviewer">Watch Video</div>
        <div class="item" @click="downloadVideo">Download Video</div>
        <div class="item" @click="toggleDeleteFile">Delete Video</div>
      </div>
    </div>

    <portal to="gradely-modals">
      <transition name="fade" mode="out-in" v-if="show_previewer">
        <media-viewer
          :user="{
            image: video.user.image,
            full_name: `${video.user.first_name} ${video.user.last_name}`,
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

      <transition name="fade" mode="out-in" v-if="delete_file_modal">
        <delete-library-file
          :token="video.token"
          @closeTriggered="toggleDeleteFile"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mediaViewer from "@/shared/components/media-viewer";
import deleteLibraryFile from "@/modules/base/modals/feeds/delete-library-file";

export default {
  name: "videoCard",

  components: {
    mediaViewer,
    deleteLibraryFile,
  },

  props: {
    video: Object,
  },

  data: () => ({
    show_more_option: false,
    show_previewer: false,

    delete_file_modal: false,
  }),

  computed: {
    getDisplayDate() {
      return this.$date.formatDate(this.video.created_at).timeDifference();
    },
  },

  methods: {
    ...mapActions({
      downloadFromBucket: "aws/downloadFromBucket",
      resetDownloadStatus: "aws/resetDownloadStatus",
      downloadLogger: "aws/downloadLogger",
    }),

    togglePreviewer() {
      this.show_previewer = !this.show_previewer;
    },

    toggleDeleteFile() {
      this.delete_file_modal = !this.delete_file_modal;
    },

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

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
.video-card {
  @include flex-row-between-nowrap;
  align-items: flex-start;
  background: $white-text;
  padding: toRem(10);

  .left {
    @include flex-row-start-nowrap;
    align-items: flex-start;

    .video {
      @include rectangle-shape(170, 100);
      margin-right: toRem(15);

      @include breakpoint-down(lg) {
        @include rectangle-shape(140, 90);
        margin-right: toRem(8);
      }

      @include breakpoint-down(sm) {
        @include rectangle-shape(120, 90);
      }

      @include breakpoint-down(xs) {
        @include rectangle-shape(100, 80);
        margin-right: toRem(8);
      }

      @include breakpoint-custom-down(360) {
        @include rectangle-shape(80, 70);
        margin-right: toRem(6);
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
        font-size: toRem(32);

        @include breakpoint-down(lg) {
          font-size: toRem(28);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(25);
        }

        @include breakpoint-custom-down(360) {
          font-size: toRem(22);
        }
      }
    }

    .title {
      @include font-height(13.25, 19);
      margin: toRem(10) 0 toRem(12);

      @include breakpoint-down(lg) {
        @include font-height(13, 18);
        margin: toRem(8) 0 toRem(10);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
        margin: toRem(4) 0 toRem(9);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(11.65, 16);
        margin: toRem(4) 0 toRem(10);
        font-weight: 500 !important;
      }
    }

    .author-info {
      @include font-height(12.25, 17);
      margin-bottom: toRem(4);

      @include breakpoint-down(lg) {
        @include font-height(12, 17);
        margin-bottom: toRem(2);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 17);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(10.5, 16);
      }
    }

    .meta-data {
      @include font-height(11.5, 17);

      @include breakpoint-down(lg) {
        @include font-height(11.75, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 17);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(10.5, 16);
      }
    }
  }

  .right {
    .avatar {
      @include square-shape(32);
      background: $color-white;

      &:hover {
        background: rgba($brand-inverse-light, 0.75);
      }

      @include breakpoint-down(lg) {
        @include square-shape(30);
      }

      .icon {
        @include center-placement;
        font-size: toRem(22);

        @include breakpoint-down(lg) {
          font-size: toRem(19);
        }
      }

      &:hover {
        background: lighten($brand-inverse-light, 5%);
      }
    }
  }
}
</style>
