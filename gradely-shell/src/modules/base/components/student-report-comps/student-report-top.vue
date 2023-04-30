<template>
  <div class="student-report-top brand-navy-bg">
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
      <!-- TOP  -->
      <div class="top mgb-40">
        <!-- AVATAR -->
        <router-link
          :to="{ name: 'AssessmentParticipantReview' }"
          class="avatar pointer"
          title="Go Back"
        >
          <div class="icon icon-caret-left"></div>
        </router-link>

        <!-- TITLE  -->
        <div class="title-text white-text font-weight-600">
          Student Report:
          <span class="text-capitalize mgl-2">{{ assessment.term }}</span> Term
          -
          {{ getAssessmentTitle }}
        </div>
      </div>

      <!-- STUDENT ROW SELECTION  -->
      <div
        class="bottom-row position-relative smooth-transition"
        ref="studentRow"
        v-if="students.length"
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
  name: "studentReportTop",

  components: {
    studentInfoCard,
  },

  props: {
    assessment: {
      type: Object,
    },
    students: {
      type: Array,
    },
  },

  computed: {
    getAssessmentTitle() {
      return this.assessment?.homework?.title ?? "Homework title..";
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
.student-report-top {
  padding: toRem(34) 0 toRem(30);
  margin-bottom: toRem(40);

  @include breakpoint-down(xs) {
    padding: toRem(26) 0 toRem(20);
    margin-bottom: toRem(30);
  }

  .top {
    @include flex-row-start-nowrap;

    @include breakpoint-down(lg) {
      margin-bottom: toRem(33) !important;
    }

    @include breakpoint-down(xs) {
      margin-bottom: toRem(30) !important;
    }

    .avatar {
      @include square-shape(30);
      @include transition(0.4s);
      background: $white-text;
      margin-right: toRem(15);

      @include breakpoint-down(lg) {
        @include square-shape(25);
      }

      @include breakpoint-down(xs) {
        margin-right: toRem(12);
      }

      .icon {
        @include center-placement;
        @include transition(0.4s);
        font-size: toRem(17);
        margin-left: toRem(-0.5);
        color: $brand-navy;

        @include breakpoint-down(lg) {
          font-size: toRem(14);
        }
      }

      &:hover {
        background: $brand-accent;

        .icon {
          color: $white-text;
        }
      }
    }

    .title-text {
      font-size: toRem(16);

      @include breakpoint-down(xl) {
        font-size: toRem(14);
      }

      @include breakpoint-down(xs) {
        @include font-height(13, 20);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(12.5, 20);
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
    z-index: 99;

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
