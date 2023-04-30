<template>
  <div
    class="
      student-report-card
      table-body
      rounded-5
      color-white-bg
      smooth-transition
    "
  >
    <!-- COLUMN ONE  -->
    <div class="column-one">
      <!-- COUNTER  -->
      <div class="counter avatar">
        <div class="avatar-text bg-transparent color-grey-dark">
          {{ index }}
        </div>
      </div>

      <div
        class="user-image avatar avatar-square"
        :class="
          student.student.image.startsWith('http')
            ? 'border-brand-inverse'
            : null
        "
      >
        <img
          v-lazy="student.student.image"
          :alt="$string.getStringInitials(student.student.name)"
          class="avatar-img"
          v-if="student.student.image.startsWith('http')"
        />

        <div
          class="avatar-text"
          v-else
          :class="$color.getProfileBgColor(student.student.name)"
        >
          {{ $string.getStringInitials(student.student.name) }}
        </div>
      </div>

      <div class="content">
        <div class="name brand-navy mgb-3 text-capitalize">
          {{ student.student.name }}
        </div>
        <div class="code color-grey-dark text-uppercase">
          {{ student.student.code }}
        </div>
      </div>
    </div>

    <!-- COLUMN TWO  -->
    <div
      class="column-two font-weight-600"
      :class="$color.getProgressBarColor(student.performance.average)"
    >
      {{ student.performance.average ? student.performance.average : 0 }}%
    </div>

    <!-- COLUMN THREE  -->
    <div class="column-three">
      <!-- VALUE  -->
      <div class="value">
        <div
          class="data-set font-weight-600 mgb-1"
          :class="$color.getProgressBarColor(getMasteryPercent)"
        >
          {{ student.performance.score }}/{{ student.performance.total }}
        </div>
        <div class="meta-data border-grey-dark">
          {{ getMasteryPercent }}% Mastery
        </div>
      </div>

      <!-- TREND  -->
      <div
        class="trend rounded-5"
        v-if="student.performance.direction && student.performance.improvement"
        :class="getDirectionStyle"
      >
        <div
          class="icon mgr-5 font-weight-800"
          :class="
            student.performance.direction === 'up'
              ? 'icon-trending-up'
              : 'icon-trending-down'
          "
        ></div>
        <div class="count font-weight-500">
          {{ student.performance.improvement }}
        </div>
      </div>

      <!-- EMPTY TREND  -->
      <div class="empty-trend rounded-5 direction-neutral" v-else>
        <div class="icon icon-git-commit font-weight-800"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentReportCard",

  props: {
    index: Number,
    student: {
      type: Object,
      default() {
        return {
          student: {},
          performance: {},
        };
      },
    },
  },

  computed: {
    getMasteryPercent() {
      let score = this.student?.performance?.score;
      let total = this.student?.performance?.total;
      if (!total) return 0;
      return Math.round((score / total) * 100);
    },

    getDirectionStyle() {
      if (!this.student?.performance?.direction) return "direction-neutral";
      return this.student?.performance?.direction === "up"
        ? "direction-up"
        : "direction-down";
    },
  },
};
</script>

<style lang="scss" scoped>
.student-report-card {
  margin-bottom: toRem(3.5);
  padding: toRem(13) toRem(10);

  @include breakpoint-down(sm) {
    padding: toRem(12) toRem(8);
  }

  @include breakpoint-down(xs) {
    padding: toRem(12) toRem(3);
  }

  .column-one {
    @include flex-row-start-nowrap;
    .counter {
      @include square-shape(30);
      margin-right: toRem(12);
      .avatar-text {
        font-size: toRem(12);
      }

      @include breakpoint-down(lg) {
        @include square-shape(26);
        margin-right: toRem(8);

        .avatar-text {
          font-size: toRem(10.5);
        }
      }

      @include breakpoint-down(sm) {
        @include square-shape(24);
        margin-right: toRem(5);
      }

      @include breakpoint-down(xs) {
        @include square-shape(22);
        margin-right: toRem(1);
      }
    }

    .user-image {
      @include square-shape(38);
      margin-right: toRem(14);

      @include breakpoint-down(lg) {
        @include square-shape(35);
        margin-right: toRem(12);
      }

      @include breakpoint-down(sm) {
        @include square-shape(32);
        margin-right: toRem(8);
      }

      @include breakpoint-down(xs) {
        @include square-shape(30);
        margin-right: toRem(6);
      }
    }

    .name {
      @include font-height(12.75, 18);

      @include breakpoint-down(sm) {
        @include font-height(12.5, 15);
        margin-bottom: toRem(2.5) !important;
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 15);
        margin-bottom: toRem(2.5) !important;
      }
    }

    .code {
      @include font-height(11.75, 16);

      @include breakpoint-down(lg) {
        @include font-height(11, 15);
      }

      @include breakpoint-down(sm) {
        @include font-height(10.5, 14);
      }
    }
  }

  .column-two {
    @include font-height(12.5, 24);

    @include breakpoint-down(xs) {
      @include font-height(12, 22);
    }
  }

  .column-three {
    @include flex-row-start-nowrap;
    align-items: flex-start;

    @include breakpoint-custom-down(380) {
      display: none;
    }

    .value {
      margin-right: toRem(10);
      .data-set {
        @include font-height(12.5, 19);
      }

      @include breakpoint-down(lg) {
        margin-right: toRem(6);
      }

      .meta-data {
        @include font-height(11, 14);

        @include breakpoint-down(lg) {
          @include font-height(10.5, 13);
        }

        @include breakpoint-custom-down(380) {
          @include font-height(10.25, 13);
          white-space: nowrap;
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .trend {
      @include flex-row-start-nowrap;
      padding: toRem(6);

      @include breakpoint-down(xs) {
        display: none;
      }

      .icon {
        @include font-height(12, 16);

        @include breakpoint-down(lg) {
          @include font-height(11, 15);
        }
      }

      .count {
        @include font-height(11.25, 16);

        @include breakpoint-down(lg) {
          @include font-height(11, 15);
        }
      }
    }

    .empty-trend {
      position: relative;
      @include rectangle-shape(28, 26);

      .icon {
        @include center-placement;
        font-size: toRem(16);
      }
    }
  }
}

.direction-up {
  background: #e4fbef;
  color: #24ae5f;
}

.direction-down {
  background: #ffdcde;
  color: #f6515b;
}

.direction-neutral {
  background: #e5e5e5;
  color: #757575;
}
</style>
