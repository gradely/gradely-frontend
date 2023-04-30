<template>
  <div class="position-relative d-flex justify-content-start w-100 h-auto">
    <div class="spacer"></div>

    <div
      class="
        post-video-player
        w-100
        h-auto
        post-content-area
        position-relative
        overflow-hidden
        padded-area
        pdt-0
        pdb-0
      "
    >
      <div class="video-wrapper w-100 h-auto overflow-hidden rounded-5">
        <!-- EXPAND ICON -->
        <div
          class="expand position-absolute rounded-7 pointer smooth-animation"
          title="Expand"
          @click="pauseAndTogglePreview"
        >
          <div class="wrapper position-relative w-100 h-100">
            <div class="icon icon-maximize-arrow"></div>
          </div>
        </div>

        <!-- :data-poster="mxStaticImg('VideoPoster.png')" -->
        <video
          @click="pausePlayingVideo"
          no-control
          x-webkit-airplay="allow"
          playsinline
          ref="player"
          id="videoPlayer"
          @timeupdate="logVideoDuration"
          preload="none"
          poster="poster"
          :style="
            'background-color: skyblue; background-size: contain; background-position: center; background-repeat: repeat-x; background-image:url(' +
            loadVideoThumbnail +
            ')'
          "
        >
          <source :src="video[0].name" type="video/mp4" />
        </video>

        <!-- OVERLAY WRAPPER WITH PLAY ICON -->
        <div
          class="overlay-wrapper position-absolute index-1"
          v-if="show_video_cover"
        >
          <div class="position-relative w-100 h-100">
            <div
              class="icon icon-play-bg brand-accent index-9 pointer"
              @click="playPausedVideo"
            ></div>
          </div>
        </div>
      </div>

      <!-- CONTENT DETAILS  -->
      <div class="content-details pdt-0 pdb-12" v-if="false">
        <div class="text color-text">
          Video {{ video[0].type === "post" ? "discussion" : "lesson" }}
        </div>

        <template>
          <div class="bullet"></div>
          <div
            class="text link link-underline pointer smooth-transition"
            @click="togglePostView"
            title="View post audience"
          >
            9 Views
          </div>
        </template>
      </div>

      <!-- MODALS -->
      <portal to="gradely-modals">
        <transition name="fade" v-if="show_post_view_modal">
          <post-views-modal @closeTriggered="togglePostView" />
        </transition>

        <transition name="fade" v-if="show_previewer">
          <media-viewer
            :user="{
              image: post.user.image,
              full_name: post.user.name || post.user.full_name,
              date: post.created_at,
            }"
            :media="{
              resources: [video[0].name],
              thumbnails: [video[0].thumbnail],
              sharable: true,
              token: video[0].token,
              current_time: this.current_time,
              type: 'video',
            }"
            @closeTriggered="togglePreviewer"
          />
        </transition>
      </portal>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import posterImg from "@/shared/assets/static/VideoPoster.png";

export default {
  name: "postVideoPlayer",

  components: {
    postViewsModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/base/modals/feeds/post-views-modal"
      ),
    mediaViewer: () =>
      import(
        /* webpackChunkName: "mediaViewer" */ "@/shared/components/media-viewer"
      ),
  },

  props: {
    post: {
      type: Object,
    },

    video: {
      type: Array,
    },
  },

  computed: {
    loadVideoThumbnail() {
      return this.video[0]?.thumbnail ?? this.poster;
    },
  },

  watch: {
    video: {
      handler(value) {
        // console.log(value);
      },
      immediate: true,
      deep: true,
    },
  },

  data: () => ({
    poster: posterImg,
    video_data: null,
    playing: false,
    paused: true,
    seeking: false,
    current_time: 0,
    is_popcorn: false,

    player: "",
    show_video_cover: true,
    show_post_view_modal: false,
    show_previewer: false,
  }),

  methods: {
    ...mapActions({ logWatchedVideo: "dbFeeds/logWatchedVideo" }),

    togglePostView() {
      this.show_post_view_modal = !this.show_post_view_modal;
    },

    playPausedVideo() {
      let videoObj = this.$refs.player;
      let is_popcorn = this.video[0]?.name?.includes("class.gradely.co/");

      if (is_popcorn) {
        this.togglePreviewer();
      } else {
        if (videoObj.paused) {
          videoObj.play();
          videoObj.controls = true;
          this.show_video_cover = false;
        }
      }
    },

    pausePlayingVideo() {
      let videoObj = this.$refs.player;

      if (!videoObj.paused) {
        videoObj.pause();
        videoObj.removeAttribute("controls");
        this.show_video_cover = true;
      }
    },

    togglePreviewer() {
      this.show_previewer = !this.show_previewer;
    },

    pauseAndTogglePreview() {
      this.$refs.player.pause();
      this.togglePreviewer();
    },

    logVideoDuration() {
      let log_time = 10,
        current_time = Math.floor(this.$refs?.player?.currentTime) ?? 0,
        can_log_video = current_time % log_time === 0 && current_time > 1;

      if (can_log_video) {
        this.current_time = this.$refs?.player?.currentTime;

        if (current_time !== Math.floor(this.$refs.player.duration)) {
          this.logWatchedVideo({
            id: this.post?.attachments
              ? this.post?.attachments[0]?.token
              : this.post?.reference?.token,
            data: {
              duration: current_time,
            },
            source: "feed",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post-video-player {
  padding-top: toRem(-15) !important;

  @include breakpoint-down(xs) {
    padding-left: toRem(6) !important;
    padding-right: toRem(6) !important;
  }

  .video-wrapper {
    position: relative;

    @include breakpoint-down(xs) {
      border-radius: 0 !important;
    }

    .expand {
      background: rgba($brand-accent, 0.9);
      @include square-shape(25);
      right: toRem(8.5);
      top: toRem(8.5);
      display: none;
      z-index: 99;
      transition: all 0.5s ease-in-out;

      .icon {
        @include center-placement;
        font-size: toRem(17);
        color: $color-white;
        font-weight: 600;
      }

      &:hover {
        background: rgba($brand-accent, 0.85);
      }
    }

    video {
      position: relative;
      width: 100%;
      min-height: toRem(60);
      height: auto;
      max-height: toRem(450);
    }

    &:hover {
      .expand {
        display: unset;
      }
    }

    .overlay-wrapper {
      height: 97% !important;
      background: rgba(#333, 0.35);
      @include stretch-area;

      .icon {
        @include center-placement;
        font-size: toRem(55);

        @include breakpoint-down(sm) {
          font-size: toRem(45);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(40);
        }
      }
    }
  }

  .content-details {
    @include flex-row-start-nowrap;
  }
}
</style>
