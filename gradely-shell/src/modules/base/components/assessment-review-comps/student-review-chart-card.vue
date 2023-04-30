<template>
  <div class="review-chart-card white-text-bg rounded-10">
    <div class="score-overlay" v-if="!isReportReady">
      <div class="icon-wrapper mgb-20">
        <img
          v-lazy="mxStaticImg('empty-report-icon.png')"
          alt="empty"
          class="report-icon"
        />
      </div>

      <div class="gfont-13 text-center mgb-20">
        Assessment report is not ready. Full report will be available as soon as
        all questions are graded
      </div>
      <router-link :to="{ path: '/assessment/completed/' + $route.params.id }">
        <button class="btn btn-sm btn-accent mx-auto">Assessments</button>
      </router-link>
    </div>

    <div v-else>
      <single-chart-column
        :score="seeScore ? summary.actualScore || 0 : '__'"
        chart_label="You Scored"
      />

      <!-- CHART INFO  -->
      <div class="chart-info">
        <div class="column">
          <div class="value">{{ seeScore ? summary.correct || 0 : "__" }}</div>
          <div class="title">CORRECT</div>
        </div>

        <div class="column">
          <div class="value">{{ seeScore ? summary.failed || 0 : "__" }}</div>
          <div class="title">INCORRECT</div>
        </div>

        <div class="column">
          <div class="value">{{ seeScore ? summary.skipped || 0 : "__" }}</div>
          <div class="title">SKIPPED</div>
        </div>
      </div>
    </div>

    <!-- MORE ASSESSMENT INFO -->
    <div class="assessment-info smooth-transition" v-if="show_more">
      <div class="info-row">
        <div class="title">Date</div>
        <div class="value">{{ getDisplayDate }}</div>
      </div>

      <div class="info-row">
        <div class="title">Subject</div>
        <div class="value">{{ summary.subject }}</div>
      </div>

      <div class="info-row">
        <div class="title">Total Questions</div>
        <div class="value">{{ summary.total_questions }}</div>
      </div>

      <div class="info-row">
        <div class="title">Assessment Type</div>
        <div class="value text-capitalize">{{ summary.type }}</div>
      </div>
    </div>

    <div class="show-more-link mgt-23">
      <div
        class="btn-link font-weight-600 smooth-transition"
        @click="toggleMore"
      >
        Show {{ show_more ? "Less" : "More" }}
      </div>
    </div>
  </div>
</template>

<script>
import singleChartColumn from "@/modules/base/components/student-report-comps/single-chart-column";

export default {
  name: "studentReviewChartCard",

  components: {
    singleChartColumn,
  },

  props: {
    summary: {
      type: Object,
      default: () => ({
        correct: 0,
        failed: 0,
        skipped: 0,
        actualScore: 0,
        computed: false,
      }),
    },
  },

  computed: {
    getDisplayDate() {
      let { d3, m4, y1 } = this.$date
        .formatDate(this.summary?.submit_at)
        .getAll();

      return `${d3} ${m4}, ${y1}`;
    },

    isReportReady() {
      return this.summary?.computed;
    },

    seeScore() {
      return this.summary?.can_see_score || this.getAuthType != "student"
        ? true
        : false;
    },
  },

  data: () => ({
    text_addon: "More",
    show_more: false,
  }),

  methods: {
    toggleMore() {
      this.show_more = !this.show_more;
    },
  },
};
</script>

<style lang="scss" scoped>
.review-chart-card {
  box-shadow: 0 toRem(1) toRem(4) rgba($black-text, 0.15);
  padding: toRem(35) toRem(25);

  @include breakpoint-down(lg) {
    padding: toRem(28) toRem(12);
  }

  @include breakpoint-custom-down(870) {
    padding: toRem(20);
  }

  @include breakpoint-down(md) {
    padding: toRem(28) toRem(30);
  }

  @include breakpoint-down(xs) {
    padding: toRem(20);
  }

  @include breakpoint-custom-down(460) {
    padding: toRem(20) toRem(13);
  }

  .chart-info {
    border-top: toRem(1) solid rgba($border-grey, 0.75);
    border-bottom: toRem(1) solid rgba($border-grey, 0.75);
    @include flex-row-center-nowrap;
    padding: toRem(15) 0;
    margin-top: toRem(40);

    .column {
      padding: 0 toRem(15);

      @include breakpoint-down(lg) {
        padding: 0 toRem(10);
      }

      @include breakpoint-down(md) {
        padding: 0 toRem(30);
      }

      @include breakpoint-down(sm) {
        padding: 0 toRem(20);
      }

      @include breakpoint-down(xs) {
        padding: 0 toRem(15);
      }

      &:first-of-type {
        border-right: toRem(1) solid rgba($border-grey, 0.75);
      }

      &:last-of-type {
        border-left: toRem(1) solid rgba($border-grey, 0.75);
      }

      .value {
        @include font-height(18, 29);
        margin-bottom: toRem(2);
        color: $brand-navy;
        text-align: center;
        font-weight: 700;

        @include breakpoint-down(lg) {
          @include font-height(16, 26);
        }

        @include breakpoint-down(md) {
          @include font-height(18, 29);
        }

        @include breakpoint-down(sm) {
          @include font-height(16.5, 29);
        }

        @include breakpoint-down(xs) {
          @include font-height(16, 28);
        }
      }

      .title {
        @include font-height(12, 16);
        color: $color-grey-dark;
        text-align: center;

        @include breakpoint-down(lg) {
          @include font-height(11, 15);
        }

        @include breakpoint-down(md) {
          @include font-height(12, 18);
        }

        @include breakpoint-down(xs) {
          @include font-height(11.75, 18);
        }
      }
    }
  }

  .assessment-info {
    margin: toRem(20) 0;

    .info-row {
      @include flex-row-between-wrap;
      @include font-height(12.75, 17);
      margin-bottom: toRem(15);
      color: $color-ash;

      @include breakpoint-down(xs) {
        @include font-height(12.5, 18);
      }

      &:last-of-type {
        margin-bottom: 0;
      }

      .title {
        text-align: left;
      }

      .value {
        @include font-height(12.5, 18);
        font-weight: 600;
        text-align: right;

        @include breakpoint-down(xs) {
          @include font-height(12, 17);
        }
      }
    }
  }

  .show-more-link {
    @include flex-row-center-nowrap;

    .btn-link {
      @include font-height(13, 18);

      @include breakpoint-down(xs) {
        @include font-height(12.5, 17);
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
