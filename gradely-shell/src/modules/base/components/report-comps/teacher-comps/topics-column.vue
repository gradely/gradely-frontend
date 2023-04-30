<template>
  <div class="topics-column">
    <!-- EXPAND ROW  -->
    <div
      class="expand-row d-flex justify-content-center align-items-center mgb-10"
    >
      <div
        class="left d-flex justify-content-end align-items-center"
        v-if="false"
      >
        <!-- EXCELLING  -->
        <div class="excelling mgr-4">
          <span class="text color-ash mgr-2">{{
            getExcellingList.length
          }}</span>
          <span class="icon icon-full-signal border-grey-dark"></span>
        </div>

        <!-- STRUGGLING  -->
        <div class="struggling">
          <span class="text color-ash mgr-2">{{
            getStrugglingList.length
          }}</span>
          <span class="icon icon-low-signal border-grey-dark"></span>
        </div>
      </div>

      <div class="right-topics" @click="toggleTopicExpansion" v-if="report">
        {{ !show_more ? "Expand topic list" : "Collapse topic list" }}
      </div>

      <div class="right" @click="toggleTopicExpansion" v-else>
        {{ !show_more ? "SHOW MORE" : "SHOW LESS" }}
      </div>
    </div>

    <!-- TOPIC REMOTE SECTION  -->
    <div
      class="smooth-animation"
      :class="!show_more ? 'topic-screen-section' : null"
    >
      <template v-if="isTopicAvailable">
        <!-- EXCELLING BLOCK -->
        <div class="topic-block" v-if="isExceling">
          <div class="title-top">
            <!-- AVATAR ICON  -->
            <div class="avatar" v-if="false">
              <div class="icon icon-full-signal"></div>
            </div>
            <div class="text">Best performed In</div>
          </div>

          <!-- TOPIC ROW  -->
          <div class="topic-row">
            <div
              class="topic-chip excelling-chip"
              v-for="(topic, index) in getExcellingList"
              :key="index"
            >
              {{ topic.topic }}
            </div>
          </div>
        </div>

        <!-- AVERAGE BLOCK -->
        <div class="topic-block" v-if="isAverage">
          <div class="title-top">
            <!-- AVATAR ICON  -->
            <div class="avatar" v-if="false">
              <div class="icon icon-low-signal"></div>
            </div>
            <div class="text">Average In</div>
          </div>

          <!-- TOPIC ROW  -->
          <div class="topic-row">
            <div
              class="topic-chip average-chip"
              v-for="(topic, index) in getAverageList"
              :key="index"
            >
              {{ topic.topic }}
            </div>
          </div>
        </div>

        <!-- STTRUGGLING BLOCK -->
        <div class="topic-block" v-if="isStruggling">
          <div class="title-top">
            <!-- AVATAR ICON  -->
            <div class="avatar" v-if="false">
              <div class="icon icon-low-signal"></div>
            </div>
            <div class="text">Struggling with</div>
          </div>

          <!-- TOPIC ROW  -->
          <div class="topic-row">
            <div
              class="topic-chip struggling-chip"
              v-for="(topic, index) in getStrugglingList"
              :key="index"
            >
              {{ topic.topic }}
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div v-if="loading">
          <div class="topic-block mgb-35">
            <div class="topic-row">
              <div class="empty-topic-chip"></div>
              <div class="empty-topic-chip"></div>
              <div class="empty-topic-chip"></div>
            </div>
          </div>

          <div class="topic-block">
            <div class="topic-row">
              <div class="empty-topic-chip"></div>
              <div class="empty-topic-chip"></div>
              <div class="empty-topic-chip"></div>
            </div>
          </div>
        </div>
        <div v-else>
          <!-- IMAGE BOX  -->
          <div class="empty-graph mgb-20">
            <img
              v-lazy="
                `${getAssetBaseURL(
                  'cloud',
                  'gradely'
                )}/image/upload/v1639028460/EmptyReport_z39bwc.svg`
              "
              alt=""
              class="h-100 w-100"
            />
          </div>
          <div class="gfont-13-5 text-center color-ash mgb-20">
            Topic perfomance data not available at the moment!
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "topicsColumn",

  props: {
    topic_performance: {
      type: Object,
      default() {
        return {
          excelling: [],
          average: [],
          struggling: [],
        };
      },
    },

    report: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isTopicAvailable() {
      return this.isExceling || this.isAverage || this.isStruggling;
    },

    isExceling() {
      return this.getExcellingList?.length;
    },

    isAverage() {
      return this.getAverageList?.length;
    },

    isStruggling() {
      return this.getStrugglingList?.length;
    },

    getExcellingList() {
      return this.topic_performance?.excelling?.filter((item) => item.topic);
    },

    getAverageList() {
      return this.topic_performance?.average?.filter((item) => item.topic);
    },

    getStrugglingList() {
      return this.topic_performance?.struggling?.filter((item) => item.topic);
    },
  },

  watch: {
    topic_performance: {
      handler() {
        // this.processTopicPerformance();
      },
      deep: true,
    },

    isTopicAvailable: {
      handler() {
        this.loading = false;
      },
      immediate: true,
    },
  },

  data: () => ({
    excelling_list: [],
    struggling_list: [],
    average_list: [],
    show_more: false,
    loading: true,
  }),

  mounted() {
    // this.processTopicPerformance();
  },

  methods: {
    processTopicPerformance() {
      this.struggling_list = [];
      this.average_list = [];
      this.excelling_list = [];

      this.topic_performance.map((topic) => {
        if (topic.level === "struggling") this.struggling_list.push(topic);
        if (topic.level === "average") this.average_list.push(topic);
        if (topic.level === "excelling") this.excelling_list.push(topic);
      });
    },

    toggleTopicExpansion() {
      this.show_more = !this.show_more;
    },
  },
};
</script>

<style lang="scss" scoped>
.topics-column {
  .expand-row {
    display: none !important;

    @include breakpoint-down(md) {
      display: flex !important;
    }
    .left {
      margin-right: toRem(5);
      span {
        font-size: toRem(14);
        @include breakpoint-down(sm) {
          @include font-height(13, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(12.5, 17);
        }
      }
    }

    .right {
      width: 100%;
      text-align: center;
      padding: toRem(12) 0;
      border-top: 1px solid $border-grey;
      @include font-height(12, 16);
      @include breakpoint-down(sm) {
        @include font-height(11, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(10, 17);
      }
      color: $color-grey-dark;
      cursor: pointer;
      transition: ease-in-out color 0.25s;
      &:hover {
        color: $brand-inverse;
      }
    }

    .right-topics {
      text-align: center;
      @include font-height(13, 16);
      @include breakpoint-down(sm) {
        @include font-height(12, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 17);
      }
      color: $brand-accent;
      text-decoration: underline;
      cursor: pointer;
      transition: ease-in-out color 0.25s;
      &:hover {
        color: $brand-inverse;
        text-decoration: none;
      }
    }
  }

  .topic-block {
    margin-bottom: toRem(10);

    &:last-of-type {
      margin-bottom: 0;
    }

    .title-top {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(6);

      .avatar {
        @include square-shape(26);
        margin-right: toRem(2);

        .icon {
          @include center-placement;
          font-size: toRem(15);
          color: $border-grey-dark;
        }
      }

      .text {
        @include font-height(11, 15);
        text-transform: uppercase;
        color: $color-grey-dark;
        letter-spacing: 0.02em;

        @include breakpoint-down(xs) {
          @include font-height(11.25, 15);
        }
      }
    }

    .topic-row {
      @include flex-row-start-wrap;

      .topic-chip {
        @include font-height(11.5, 15);
        padding: toRem(9) toRem(20);
        border-radius: toRem(25);
        margin-right: toRem(8);
        margin-bottom: toRem(8);
        color: $color-ash;

        @include breakpoint-down(xl) {
          @include font-height(11.25, 14);
          padding: toRem(9.5) toRem(18);
          margin-right: toRem(6.5);
          margin-bottom: toRem(6.5);
        }
      }

      .empty-topic-chip {
        background: $border-grey-light;
        border-radius: toRem(25);
        margin-right: toRem(10);
        margin-bottom: toRem(10);
        height: toRem(36);
        width: 46%;
      }
    }
  }

  .topic-screen-section {
    @include breakpoint-down(md) {
      display: none;
    }
  }

  .excelling-chip {
    background: rgba(96, 210, 176, 0.25);
  }

  .average-chip {
    background: #e5e5e5;
  }

  .struggling-chip {
    background: rgba(254, 116, 125, 0.25);
  }

  .empty-graph {
    @include rectangle-shape(180, 150);
    margin: auto;
  }
}
</style>
