<template>
  <div
    class="post-container-block rounded-10 mgb-10 smooth-animation"
    v-if="recomendations.length && !getDiagnosticContent.length"
  >
    <img
      v-lazy="mxStaticImg('RecomendationPanel.png', 'base')"
      class="rounded-10"
    />

    <!-- CONTENT BLOCK -->
    <div class="content-block w-100 h-auto index-1 border">
      <!-- BLOCK DETAIL ROW -->
      <div class="block-detail-row w-100 mgb-22">
        <!-- GLORIA AVATAR -->
        <div class="avatar">
          <img v-lazy="mxStaticImg('Gloria.png', 'base')" alt="Gloria" />
        </div>

        <!-- COMMENT INDICATOR -->
        <div class="comment-indicator">
          <div class="indicator indicator-one"></div>
          <div class="indicator indicator-two"></div>
        </div>

        <!-- COMMENT BOX -->
        <div class="comment-box white-text-bg w-100">
          <!-- TOP -->
          <div class="top">
            <div class="name font-weight-600 color-text">Ria</div>
            <div class="dot rounded-circle"></div>
            <div class="time color-grey-dark">2 hrs ago</div>
          </div>

          <!-- BOTTOM -->
          <div class="bottom color-grey-dark">
            <vue-typed-js
              :strings="[
                ' Complete your daily recommendation to earn up to 1,200 mastery points, to unlock more fun resources.',
              ]"
              :loop="false"
              :showCursor="false"
            >
              <span class="typing"></span>
            </vue-typed-js>
          </div>
        </div>
      </div>

      <!-- RECOMENDATION ROW -->
      <div class="recomendation-row w-100">
        <recomendation-card
          v-for="(recomendation, index) in recomendations"
          :key="index"
          :recomendation="recomendation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "postRecommendationBlock",

  components: {
    recomendationCard: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/recomendation-card"
      ),
  },

  computed: {
    ...mapGetters({ getDiagnosticContent: "dbFeeds/getDiagnosticContent" }),
  },

  data: () => ({
    recomendations: [],
  }),

  created() {
    this.$bus.$on("modeUpdated", () => this.loadRecommendations());
  },

  mounted() {
    setTimeout(() => this.loadRecommendations(), 2200);
  },

  methods: {
    ...mapActions({
      getRecomendationContent: "dbFeeds/getRecomendationContent",
    }),

    loadRecommendations() {
      this.getRecomendationContent(this.$route.params.id)
        .then((response) => {
          this.recomendations = response?.data ?? [];
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.post-container-block {
  img {
    @include background-cover;
    @include full-width-height;
  }

  .content-block {
    @include flex-column-center;
    padding: toRem(22) 0 toRem(28);
    position: relative;

    @include breakpoint-down(sm) {
      padding: toRem(16) 0 toRem(10);
    }

    .block-detail-row {
      @include flex-row-start-nowrap;
      align-items: flex-start;
      padding: 0 toRem(18);

      @include breakpoint-down(lg) {
        padding: 0 toRem(12);
      }

      @include breakpoint-down(md) {
        padding: 0 toRem(10);
      }

      @include breakpoint-down(xs) {
        padding: 0 toRem(7);
      }

      .avatar {
        @include square-shape(66);
        border-radius: toRem(20);

        @include breakpoint-down(sm) {
          @include square-shape(60);
        }

        @include breakpoint-down(xs) {
          @include square-shape(52);
        }
      }

      .comment-indicator {
        margin: 0 toRem(30);
        position: relative;

        @include breakpoint-down(xs) {
          margin: 0 toRem(20);
        }

        .indicator {
          background: lighten($color-white, 5%);
          border-radius: 50%;
          position: absolute;
          overflow: hidden;

          &-one {
            @include square-shape(15);
            top: toRem(29);
            left: toRem(-20);

            @include breakpoint-down(sm) {
              @include square-shape(14);
              top: toRem(17);
              left: toRem(-22);
            }

            @include breakpoint-down(xs) {
              @include square-shape(12);
              top: toRem(17);
              left: toRem(-16);
            }
          }

          &-two {
            @include square-shape(20);
            top: toRem(40);

            @include breakpoint-down(sm) {
              @include square-shape(17);
              top: toRem(32);
            }

            @include breakpoint-down(xs) {
              @include square-shape(14);
            }
          }
        }
      }

      .comment-box {
        box-shadow: 0 toRem(10) toRem(40) rgba($black-text, 0.15);
        padding: toRem(15) toRem(20);
        border-radius: toRem(25);
        margin-top: toRem(4);

        @include breakpoint-down(sm) {
          padding: toRem(14) toRem(16);
          border-radius: toRem(20);
        }

        .top {
          @include flex-row-start-nowrap;
          margin-bottom: toRem(7);

          @include breakpoint-down(sm) {
            margin-bottom: toRem(4);
          }

          .name {
            font-size: toRem(12.75);

            @include breakpoint-down(sm) {
              font-size: toRem(12.5);
            }

            @include breakpoint-down(xs) {
              font-size: toRem(12);
            }
          }

          .dot {
            background: $border-grey-dark;
            @include square-shape(5);
            margin: 0 toRem(7);
          }

          .time {
            font-size: toRem(12.65);

            @include breakpoint-down(sm) {
              font-size: toRem(12.25);
            }

            @include breakpoint-down(xs) {
              font-size: toRem(11.75);
            }
          }
        }

        .bottom {
          @include font-height(13, 20);

          @include breakpoint-down(sm) {
            @include font-height(12.25, 18.5);
          }

          @include breakpoint-down(xs) {
            @include font-height(12, 18.25);
          }
        }
      }
    }

    .recomendation-row {
      position: relative;
      @include flex-row-start-nowrap;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: transparent;
        width: 0;
      }
    }
  }
}
</style>
