<template>
  <div class="report-chart-block white-text-bg rounded-10">
    <!-- EMPTY REPORT OVERLAY -->
    <div class="score-overlay mgb-20" v-if="!assessment.computed">
      <div class="icon-wrapper mgb-20">
        <img
          v-lazy="mxStaticImg('empty-report-icon.png')"
          alt="empty"
          class="report-icon"
        />
      </div>

      <div class="gfont-13 text-center mgb-20">
        Assessment report is not ready. Grade the outstanding questions to to
        see full report.
      </div>
      <router-link
        :to="{
          name: 'AssessmentGradeReview',
          params: {
            assessment_id: $route.params.assessment_id,
            student_id: $route.params.student_id,
          },
        }"
      >
        <button class="btn btn-sm btn-accent mx-auto">Grade Questions</button>
      </router-link>
    </div>

    <div v-else>
      <single-chart-column :score="Math.round(assessment.score || 0)" />

      <!-- INTEGRITY BLOCK  -->
      <div
        class="integrity-block mgt-20 mgb-10 color-white-bg rounded-5 mx-auto"
        v-if="assessment.proctor"
      >
        <!-- INTEGRITY ICON  -->
        <div class="integrity-icon"></div>
        <div>
          <div class="top-text border-grey-dark">
            TEST INTEGRITY: <span class="color-text font-weight-600">95%</span>
          </div>
          <div class="bottom-text btn-link font-weight-600">Learn More</div>
        </div>
      </div>
      <!-- SCORE ANALYSIS  -->
      <div class="score-analysis mgt-25 mgb-20">
        <!-- CORRECT COLUMN  -->
        <div class="column">
          <div class="value">{{ assessment.correct || 0 }}</div>
          <div class="title">CORRECT</div>
        </div>

        <!-- INCORRECT COLUMN  -->
        <div class="column">
          <div class="value">{{ assessment.incorrect || 0 }}</div>
          <div class="title">INCORRECT</div>
        </div>

        <!-- SKIPPED COLUMN  -->
        <div class="column">
          <div class="value">{{ assessment.skipped || 0 }}</div>
          <div class="title">SKIPPED</div>
        </div>
      </div>
    </div>

    <!-- REPORT DETAILS  -->
    <div
      class="report-details mgt-30 mgb-25 w-100 smooth-transition"
      v-if="show_more"
    >
      <!-- DATE  -->
      <div class="item">
        <div class="title">Date</div>
        <div class="value">{{ getDisplayDate }}</div>
      </div>

      <!-- SUBJECT  -->
      <div class="item">
        <div class="title">Subject</div>
        <div class="value">{{ assessment.subject.name || "Subject name" }}</div>
      </div>

      <!-- SCORE  -->
      <div class="item">
        <div class="title">My Score</div>
        <div class="value" v-if="!assessment.computed">——</div>
        <div class="value" v-else>
          {{ Math.round(assessment.score || 0) }}/{{
            Math.round(assessment.maximum_score || 0)
          }}
        </div>
      </div>

      <!-- ASSESSMENT  -->
      <div class="item">
        <div class="title">Assessment Type</div>
        <div class="value text-capitalize">
          {{ assessment.assessment_type || "Homework" }}
        </div>
      </div>
    </div>

    <div class="toggler d-flex justify-content-center" @click="toggleshowMore">
      <div class="btn-link font-weight-600">
        Show {{ show_more ? "Less" : "More" }}
      </div>
    </div>
  </div>
</template>

<script>
import singleChartColumn from "@/modules/base/components/student-report-comps/single-chart-column";

export default {
  name: "reportChartBlock",

  components: {
    singleChartColumn,
  },

  props: {
    assessment: {
      type: Object,
    },
  },

  computed: {
    getDisplayDate() {
      // let date = this.document?.created_at.replace("T", " ").replace("Z", "");

      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.assessment?.datetime)
        .getAll();

      return `${d3} ${m4}, ${y1} ${h01}:${b2} ${a0}`;

      // return this.assessment?.datetime
      //   ? format(new Date(this.assessment?.datetime), "do MMM, yyyy hh:mm aaa")
      //   : "No date";
    },
  },

  data: () => ({
    show_more: false,
  }),

  methods: {
    toggleshowMore() {
      this.show_more = !this.show_more;
    },
  },
};
</script>

<style lang="scss" scoped>
.report-chart-block {
  box-shadow: 0 toRem(1) toRem(4) rgba($black-text, 0.15);
  padding: toRem(30) toRem(20);

  @include breakpoint-down(lg) {
    padding: toRem(30) toRem(17);
  }

  @include breakpoint-down(xs) {
    padding: toRem(26) toRem(14);
  }

  .integrity-block {
    @include flex-row-start-nowrap;
    padding: toRem(12) toRem(15);
    width: 85%;

    @include breakpoint-down(lg) {
      padding: toRem(12);
      width: 100%;
    }

    .top-text {
      @include font-height(12.25, 17);
      margin-bottom: toRem(6.5);

      @include breakpoint-down(lg) {
        @include font-height(11.75, 16);
        margin-bottom: toRem(4.5);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 16);
        margin-bottom: toRem(4);
      }
    }

    span {
      font-size: toRem(13);
      margin-left: toRem(5);

      @include breakpoint-down(lg) {
        font-size: toRem(12.65);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(12.5);
      }
    }

    .bottom-text {
      @include font-height(13, 17);

      @include breakpoint-down(lg) {
        @include font-height(12.5, 17);
      }
    }
  }

  .score-analysis {
    border-bottom: toRem(1) solid $border-grey;
    @include flex-row-between-nowrap;
    padding-bottom: toRem(18);

    @include breakpoint-down(xs) {
      padding-bottom: toRem(13);
    }

    .column {
      width: 33.33%;

      .value {
        @include font-height(16, 25);
        margin-bottom: toRem(3);
        color: $brand-navy;
        font-weight: 700;
        text-align: center;

        @include breakpoint-down(lg) {
          @include font-height(14, 23);
        }

        @include breakpoint-down(xs) {
          @include font-height(13.5, 21);
        }
      }

      .title {
        @include font-height(11.75, 17);
        color: $color-grey-dark;
        text-align: center;

        @include breakpoint-down(lg) {
          @include font-height(10.75, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.5, 16);
        }
      }

      &:nth-of-type(2) {
        border-left: toRem(1) solid $border-grey;
        border-right: toRem(1) solid $border-grey;
      }
    }
  }

  .report-details {
    .item {
      @include flex-row-between-wrap;
      @include font-height(12.75, 18);
      margin-bottom: toRem(16);
      color: $color-ash;

      @include breakpoint-down(lg) {
        @include font-height(12, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.5, 17);
      }

      .value {
        font-weight: 600;
        @include font-height(12.55, 18);
      }
    }
  }

  .toggler {
    .btn-link {
      @include font-height(12.75, 17);

      @include breakpoint-down(lg) {
        @include font-height(12, 18);
      }
    }
  }

  .score-overlay {
    width: 100%;
    background: #ffffff;

    .icon-wrapper {
      margin: auto;
      @include square-shape(70);
      background: $brand-navy;
      border-radius: 50%;
      position: relative;

      .report-icon {
        @include center-placement;
        @include square-shape(45);
      }
    }
  }
}
</style>
