<template>
  <div class="grade-top-selection position-relative brand-navy-bg">
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
      <!-- TOP  -->
      <div class="top">
        <!-- TITLE  -->
        <div class="title-text white-text font-weight-600 mgb-8">
          REVIEW GRADES
        </div>

        <div class="meta-text brand-inverse-light">
          Select a student to view their responses to each questions fo the
          assessment.
        </div>
      </div>

      <!-- STUDENT ROW SELECTION  -->
      <div
        class="bottom-row position-relative smooth-transition"
        ref="studentRow"
      >
        <student-info-card
          v-for="(student, index) in students"
          :key="index"
          :student="student"
        />
      </div>

      <!-- NAVIGATIONS  -->
      <div class="position-relative w-100" v-if="students.length > 4">
        <!-- NAV LEFT  -->
        <div
          class="nav nav-left"
          title="Previous"
          @click="scrollStudentRow(-150)"
        >
          <div class="wrapper position-relative w-100 h-100">
            <div class="icon icon-caret-left"></div>
          </div>
        </div>

        <!-- NAV RIGHT  -->
        <div class="nav nav-right" title="Next" @click="scrollStudentRow(+150)">
          <div class="wrapper position-relative w-100 h-100">
            <div class="icon icon-caret-right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import studentInfoCard from "@/modules/base/components/student-report-comps/student-info-card";

export default {
  name: "gradeTopSelection",

  components: {
    studentInfoCard,
  },

  props: {
    students: {
      type: Array,
    },
  },

  methods: {
    scrollStudentRow(scroll_value) {
      let student_row = this.$refs.studentRow;
      student_row.scrollLeft += scroll_value;
      student_row.scrollBehaviour = "smooth";
    },
  },
};
</script>

<style lang="scss" scoped>
.grade-top-selection {
  margin-bottom: toRem(40);
  margin-top: toRem(63);
  padding: toRem(25) 0;

  @include breakpoint-down(sm) {
    margin-bottom: toRem(30);
    padding: toRem(20) 0;
  }

  @include breakpoint-down(xs) {
    margin-top: toRem(58);
  }

  .top {
    margin-bottom: toRem(24);

    .title-text {
      @include font-height(13.5, 19);
      letter-spacing: 0.03em;

      @include breakpoint-down(sm) {
        @include font-height(12, 17);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(12.5, 20);
      }
    }

    .meta-text {
      @include font-height(12.25, 18);

      @include breakpoint-down(sm) {
        @include font-height(11.25, 17);
      }
    }
  }

  .bottom-row {
    @include flex-row-start-nowrap;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .nav {
    @include square-shape(27);
    @include transition(0.4s);
    background: $white-text;
    border-radius: 50%;
    @include center-y;
    top: toRem(-30);
    cursor: pointer;
    z-index: 1;

    @include breakpoint-down(md) {
      display: none;
    }

    .icon {
      @include center-placement;
      @include transition(0.4s);
      font-size: toRem(13);
      margin-top: toRem(1);
    }

    &:hover {
      background: $brand-accent;
      .icon {
        color: $white-text !important;
      }
    }
  }

  .nav-left {
    left: toRem(-16);
    .icon {
      margin-left: toRem(-1);
    }
  }

  .nav-right {
    right: toRem(-16);
    .icon {
      margin-right: toRem(-1.5);
    }
  }
}
</style>
