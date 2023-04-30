<template>
  <div class="student-performance-row pointer" @click="goToStudentProfile">
    <!-- LEFT SECTION -->
    <div class="left-section">
      <!-- CHILD'S IMAGE -->
      <div class="avatar avatar-square mgr-10 border">
        <img
          v-lazy="student.student.image"
          :alt="$string.getStringInitials(student.student.name)"
          class="avatar-img"
          v-if="isServerImage"
        />

        <div
          class="avatar-text gfont-11"
          :class="$color.getProfileBgColor(student.student.name)"
          v-else
        >
          {{ $string.getStringInitials(student.student.name) }}
        </div>
      </div>

      <!-- CHILD'S NAME -->
      <div class="child-name color-text">{{ student.student.name }}</div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="right-section">
      <!-- MASTERY -->
      <div class="mastery mgr-10">
        <div class="mastery-value mgb-2 font-weight-700">
          {{ student.performance.score }}/{{ student.performance.total }}
        </div>
        <div class="mastery-percent border-grey-dark">
          {{ getMasteryPercent }}% Mastery
        </div>
      </div>

      <!-- PERFORMANCE -->
      <div
        class="performance"
        :class="[
          getIconColor,
          getIconColor === 'border-grey-dark'
            ? 'border-grey-light-bg'
            : `${getIconColor}-light-bg`,
        ]"
      >
        <div class="icon" :class="getTrendingIcon"></div>
        <div class="text mgl-4" v-if="student.performance.improvement > 0">
          {{ student.performance.improvement }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentPerformanceRow",

  props: {
    student: Object,
  },

  computed: {
    getTrendingIcon() {
      if (+this.student?.performance?.improvement === 0)
        return "icon-git-commit";
      return `icon-trending-${this.student?.performance?.direction}`;
    },

    getIconColor() {
      if (+this.student?.performance?.improvement === 0)
        return "border-grey-dark";

      return this.student?.performance?.direction === "up"
        ? "brand-green"
        : "brand-red";
    },

    isServerImage() {
      return this.student?.student?.image.startsWith("http");
    },

    getMasteryPercent() {
      return Math.round(
        (this.student?.performance?.score / this.student?.performance?.total) *
          100
      );
    },
  },

  methods: {
    goToStudentProfile() {
      this.$router.push({
        name: "StudentProfile",
        params: {
          id: this.$route.params.id,
          student_id: this.student.student.id,
        },
        query: { name: this.student.student.name },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.student-performance-row {
  @include flex-row-between-nowrap;
  padding: toRem(10) toRem(4);
  border-bottom: toRem(1) solid $brand-inverse-light;

  &:hover {
    border-bottom: toRem(1) solid $brand-accent-light;
  }

  .left-section {
    @include flex-row-start-nowrap;

    .child-name {
      @include font-height(12.35, 16);
    }
  }

  .right-section {
    @include flex-row-end-nowrap;
    align-items: flex-start;

    .mastery {

      .mastery-value {
        @include font-height(12, 16);
        text-align: right;
      }

      .mastery-percent {
        @include font-height(10.85, 15);
      }
    }

    .performance {
      @include flex-row-end-nowrap;
      padding: toRem(2) toRem(4);
      border-radius: toRem(4);
      width: max-content;

      .icon {
        font-size: toRem(15.5);
      }

      .text {
        font-size: toRem(12);

        @include breakpoint-down(lg) {
          font-size: toRem(11);
        }
      }
    }
  }
}
</style>