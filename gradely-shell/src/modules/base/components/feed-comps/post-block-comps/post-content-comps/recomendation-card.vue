<template>
  <div
    class="recomendation-card rounded-5 white-text-bg pointer smooth-transition"
    @click="determineCard"
  >
    <!-- IMAGE TOP -->
    <div class="image-top position-relative brand-inverse-light-bg rounded-5">
      <img v-lazy="getCardImage" alt="" />

      <!-- VIDEO COVER -->
      <template v-if="recomendation.type === 'video'">
        <div class="video-cover"></div>

        <!-- PLAY ICON -->
        <div
          class="play-icon rounded-circle brand-accent-light-bg pointer"
          title="Play"
        >
          <div class="position-relative w-100 h-100">
            <div class="icon icon-play brand-accent"></div>
          </div>
        </div>
      </template>

      <!-- COMPLETED STATUS -->
      <div class="completed-status" v-if="recomendation.is_done">
        <div class="position-relative w-100 h-100">
          <img v-lazy="mxStaticImg('Completed.png', 'base')" alt="Completed" />
        </div>
      </div>
    </div>

    <!-- INTRO TEXT -->
    <div class="intro-text font-weight-700 text-uppercase">
      {{ recomendation.type === "video" ? "Video Lesson" : "Practice" }}
    </div>

    <!-- TITLE TEXT -->
    <div class="title-text font-weight-700 brand-navy" :title="getCardTitle">
      {{ getCardTitle }}
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_catchup_modal">
        <start-catchup-modal
          :detail="recomendation"
          @closeTriggered="toggleCatchupModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";

export default {
  name: "recomendationCard",

  components: {
    startCatchupModal: () =>
      import(
        /* webpackChunkName: 'startCatchupModal'*/ "@/modules/base/modals/feeds/start-catchup-modal"
      ),
  },

  props: {
    recomendation: {
      type: Object,
    },
  },

  computed: {
    getCardType() {},

    getCardImage() {
      if (this.recomendation.type === "video")
        return this.loadVideoImage(this.recomendation?.image);
      else if (this.recomendation.type === "single")
        return this.recomendation.topic?.image;
      else if (this.recomendation.type === "mix")
        return this.recomendation.topic[0]?.image;
    },

    getCardTitle() {
      if (this.recomendation.type === "video") return this.recomendation?.title;
      else if (this.recomendation.type === "single")
        return this.recomendation.topic?.topic;
      else if (this.recomendation.type === "mix")
        return this.recomendation.topic[0]?.topic;
    },
  },

  data: () => ({
    show_catchup_modal: false,
  }),

  methods: {
    loadVideoImage(src) {
      return {
        src,
        error: require("@/modules/base/assets/static/VideoTutor.png"),
      };
    },

    determineCard() {
      if (this.recomendation.is_done) {
        this.pushAlert("This recomendation has been completed", "warning");
      } else if (this.recomendation.type == "video") {
        location.href = EXTERNAL_URL(
          "catchup",
          `watch-video/${this.$route.params.id}?video_token=${this.recomendation.token}&type=daily`
        );
      } else this.toggleCatchupModal();
    },

    toggleCatchupModal() {
      this.show_catchup_modal = !this.show_catchup_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.recomendation-card {
  @include rectangle-shape(150, 202);
  margin: auto toRem(5);
  padding: toRem(5);

  @include breakpoint-down(sm) {
    @include rectangle-shape(145, 195);
    margin: auto toRem(4);
  }

  @include breakpoint-down(xs) {
    @include rectangle-shape(140, 185);
  }

  .image-top {
    @include square-shape(140);
    margin-bottom: toRem(10);

    @include breakpoint-down(sm) {
      @include square-shape(135);
    }

    @include breakpoint-down(xs) {
      @include square-shape(130);
    }

    img {
      @include background-cover;
    }

    .video-cover {
      @include full-width-height;
      background: $black-text;
      opacity: 0.5;
    }

    .play-icon {
      @include center-placement;
      @include square-shape(32);

      .icon {
        @include center-placement;
        font-size: toRem(14.5);
        margin-top: toRem(1);
        margin-left: toRem(1);
      }
    }

    .completed-status {
      position: absolute;
      @include full-width-height;
      background: rgba($brand-navy, 0.6);

      img {
        @include background-cover;
        z-index: 9;
      }
    }
  }

  .intro-text {
    @include font-height(9.25, 14);
    margin-bottom: toRem(3);
    color: #959595;

    @include breakpoint-down(sm) {
      @include font-height(9, 13);
    }
  }

  .title-text {
    @include font-height(12.5, 18);
    @include text-truncate;
    white-space: nowrap;

    @include breakpoint-down(md) {
      @include font-height(12, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(11.5, 16);
    }
  }
}
</style>