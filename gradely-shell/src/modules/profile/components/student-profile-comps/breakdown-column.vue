<template>
  <div class="breakdown-column w-100 smooth-animation">
    <!-- TOPIC IMAGE  -->
    <div class="topic-img avatar rounded-5 overflow-hidden">
      <img
        v-lazy="topic.image ? topic.image : mxStaticImg('TopicImg.png')"
        alt=""
        class="avatar-img"
      />
    </div>

    <!-- INFO BLOCK  -->
    <div class="info w-100">
      <div class="top mgb-4">
        <div class="topic-title color-ash pdr-8">
          {{ topic.topic }}
        </div>

        <div class="breakdown-data">
          <!-- PERCENT  -->
          <div class="percent color-grey-dark mgr-8">
            {{ topic.topic_progress.score }}%
          </div>

          <!-- IMPROVEMENTS  -->
          <div class="improvement" :class="getIconColor">
            <div class="icon" :class="getTrendingIcon"></div>
            <div class="text">{{ topic.topic_progress.improvement }}</div>
          </div>
        </div>
      </div>

      <!-- BREAKDOEN PROGRESS  -->
      <div class="progress-bar position-relative w-100 rounded-10">
        <div
          class="progress position-absolute h-100"
          :class="
            $color.getProgressBarColor(topic.topic_progress.score) + '-bg'
          "
          :style="'width:' + topic.topic_progress.score + '%'"
          role="progress"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "breakdownColumn",

  props: {
    topic: Object,
    default: () => ({
      topic: "Quadratic Qquations",
      image: "",
      topic_progress: {
        score: 0,
        improvement: 2,
        direction: "up",
      },
    }),
  },

  computed: {
    getTrendingIcon() {
      if (+this.topic?.topic_progress?.improvement === 0)
        return "icon-git-commit";
      return `icon-trending-${this.topic?.topic_progress?.direction}`;
    },

    getIconColor() {
      if (+this.topic?.topic_progress?.improvement === 0)
        return "border-grey-dark";

      return this.topic?.topic_progress?.direction === "up"
        ? "brand-green"
        : "brand-red";
    },
  },
};
</script>

<style lang="scss" scoped>
.breakdown-column {
  @include flex-row-start-nowrap;
  margin-bottom: toRem(25);

  .topic-img {
    @include square-shape(32);
    margin-right: toRem(10);

    @include breakpoint-down(xs) {
      margin-right: toRem(8);
    }
  }

  .info {
    .top {
      @include flex-row-between-nowrap;

      .topic-title {
        @include font-height(11.5, 15);

        @include breakpoint-down(lg) {
          @include font-height(11, 14);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.75, 14);
        }
      }
    }

    .breakdown-data {
      @include flex-row-end-nowrap;

      .percent {
        @include font-height(11.5, 15);

        @include breakpoint-down(lg) {
          @include font-height(11, 14);
        }
      }

      .improvement {
        @include flex-row-end-nowrap;

        .icon {
          margin-right: toRem(4);
        }

        .text {
          font-size: toRem(12);

          @include breakpoint-down(lg) {
            font-size: toRem(11);
          }
        }
      }
    }

    .progress-bar {
      background: $brand-inverse-light;
      height: toRem(6.5);

      @include breakpoint-down(md) {
        height: toRem(6);
      }
    }
  }
}
</style>
