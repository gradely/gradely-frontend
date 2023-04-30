<template>
  <div
    class="
      class-performance-block
      white-text-bg
      rounded-10
      mgb-30
      overflow-hidden
      smooth-animation
      position-relative
      border
    "
  >
    <!-- TOP  -->
    <div class="top">
      <div class="title-text color-text font-weight-700 mgb-25">
        CLASS PERFORMANCE
      </div>

      <template v-if="isEmptyState">
        <empty-performance-state />
      </template>

      <!-- BASE DATA  -->
      <div class="base-data" v-if="!isEmptyState">
        <!-- LEFT COLUMN  -->
        <div class="left">
          <chart-column
            :student_performance="performance.student_performance"
            :student_count="performance.student_count"
            report
          />
        </div>

        <!-- RIGHT COLUMN  -->
        <div class="right">
          <topics-column
            :topic_performance="performance.topic_performance"
            report
          />
        </div>
      </div>
    </div>

    <!-- BOTTOM  -->
    <div class="bottom" v-if="!isEmptyState">
      <base-analysis-row
        :excelling_count="performance.student_performance.excelling"
        :average_count="performance.student_performance.average"
        :struggling_count="performance.student_performance.struggling"
      />
    </div>
  </div>
</template>

<script>
import baseAnalysisRow from "@/modules/base/components/report-comps/teacher-comps/base-analysis-row";
import chartColumn from "@/modules/base/components/report-comps/teacher-comps/chart-column";
import topicsColumn from "@/modules/base/components/report-comps/teacher-comps/topics-column";
import emptyPerformanceState from "@/modules/base/components/report-comps/teacher-comps/empty-performance-state";

export default {
  name: "classPerformanceBlock",

  components: {
    baseAnalysisRow,
    chartColumn,
    topicsColumn,
    emptyPerformanceState,
  },

  props: {
    performance: {
      type: Object,
      default() {
        return {
          student_count: 0,
          topic_performance: {
            excelling: [],
            average: [],
            struggling: [],
          },
          student_performance: {
            excelling: 0,
            average: 0,
            struggling: 0,
          },
        };
      },
    },

    student_count: {
      type: Object,
      default: () => ({
        average: 0,
        excellence: 0,
        struggling: 0,
        studentsCount: 0,
      }),
    },
    topic_performance: {
      type: Array,
      default: () => [
        {
          level: "excellence",
          topic: "Long division",
        },
      ],
    },
  },

  computed: {
    isEmptyState() {
      return (
        !this.performance ||
        (!this.performance?.student_performance.average &&
          !this.performance?.student_performance.excelling &&
          !this.performance?.student_performance.struggling)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.class-performance-block {
  box-shadow: 0 toRem(1) toRem(4) rgba($black-text, 0.15);
  position: relative;

  @include breakpoint-down(sm) {
    border-radius: toRem(5);
  }

  .top {
    padding: toRem(20);

    @include breakpoint-down(sm) {
      padding: toRem(18) toRem(15);
    }

    .title-text {
      @include font-height(13.5, 18);
      letter-spacing: 0.01em;

      @include breakpoint-down(lg) {
        @include font-height(14, 18);
      }

      @include breakpoint-down(sm) {
        @include font-height(13.5, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(13, 16);
      }
    }

    .base-data {
      @include flex-row-between-nowrap;
      align-items: flex-start;

      @include breakpoint-down(md) {
        @include flex-column-start-start;
      }

      .left {
        width: 40%;

        @include breakpoint-down(lg) {
          width: 44%;
        }

        @include breakpoint-down(md) {
          width: 100%;
          margin-bottom: toRem(30);
        }
      }

      .right {
        width: 59%;

        @include breakpoint-down(lg) {
          width: 55%;
        }

        @include breakpoint-down(md) {
          width: 100%;
        }
      }
    }
  }
}
</style>
