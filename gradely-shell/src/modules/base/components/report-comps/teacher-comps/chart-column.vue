<template>
  <div class="chart-column h-100">
    <div class="position-relative">
      <div class="chart-wrapper">
        <mixin-doughnut-chart
          :chart-data="getDataCollection"
          :options="getOptions"
        />
      </div>

      <!-- CHART DETAIL  -->
      <div class="chart-detail" v-if="show_advanced_options">
        <div class="title text-center color-text font-weight-700">
          <!-- AVERAGE SCORE -->
          <template v-if="active_option === 'average'">
            <template v-if="$route.query.tour || isTourAssessment">
              57%
            </template>

            <template v-else> {{ average_score }}% </template>
          </template>

          <!-- MASTERY -->
          <template v-else>{{ mastery }}</template>
        </div>
        <div
          class="
            meta-title
            text-center
            color-grey-dark
            text-uppercase
            smooth-transition
          "
        >
          {{ active_option === "average" ? "Avg. Score" : "Mastery" }}
        </div>
      </div>
    </div>

    <div
      class="d-flex justify-content-center align-items-center mgt-20"
      v-if="!report"
    >
      <div class="rating">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="10"
          viewBox="0 0 21 10"
          fill="none"
        >
          <path
            d="M20.7879 0.5L15.043 6.10382L10.3939 0.5L5.74339 6.1053L0 0.5V9.40909H20.7879V0.5Z"
            :fill="getCrownFill"
          />
        </svg>
        <div class="row-2" :class="getRowLevel > 1 ? getRowFill : ''"></div>
        <div class="row-1" :class="getRowLevel > 0 ? getRowFill : ''"></div>
        <div class="row-0" :class="getRowFill"></div>
      </div>
      <div>
        <div class="gfont-19 font-weight-600 text-center border-grey-dark">
          <span :class="getScoreColor">{{ score }}</span> /
          <span class="brand-navy">{{ total }}</span>
        </div>
        <div class="gfont-12 color-ash mgt-8">Mastery points earned</div>
      </div>
    </div>

    <!-- PERFORMANCE TOGGLER  -->
    <div class="performance-toggler" v-if="show_control">
      <div
        class="option text-left"
        :class="active_option === 'average' ? 'active-option' : null"
      >
        AVG SCORE
      </div>

      <!-- TOGGER  -->
      <div class="toggler pointer rounded-20" @click="toggleOption">
        <div
          class="indicator brand-green-bg rounded-circle"
          :class="active_option === 'mastery' ? 'swipe-right' : null"
        ></div>
      </div>

      <div
        class="option text-right"
        :class="active_option === 'mastery' ? 'active-option' : null"
      >
        MASTERY
      </div>
    </div>

    <!-- CHART DESCRIPTION  -->
    <div class="chart-description mgt-20" v-if="show_total">
      <!-- DESCRIPTION  -->
      <div class="description color-grey-dark text-center mgb-5">
        STUDENTS IN CLASS
      </div>

      <!-- VALUE  -->
      <div class="value color-text text-center">
        {{ student_count ? student_count : 0 }}
        {{ student_count === 1 ? "Student" : "Students" }}
      </div>
    </div>
  </div>
</template>

<script>
import mixinDoughnutChart from "@/shared/mixins/mixin-doughnut-chart";

export default {
  name: "chartColumn",

  components: {
    mixinDoughnutChart,
  },

  props: {
    report: {
      type: Boolean,
      default: false,
    },

    student_count: {
      type: [Number, Object],
      default: 0,
    },

    student_performance: {
      type: Object,
      default: () => {},
    },

    show_advanced_options: {
      type: Boolean,
      default: false,
    },

    show_total: {
      type: Boolean,
      default: true,
    },

    show_control: {
      type: Boolean,
      default: false,
    },

    average_score: {
      type: Number,
      default: 0,
    },

    percent_average: {
      type: Number,
      default: 0,
    },

    mastery: {
      type: String,
      default: "0/10",
    },

    score: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    isTourAssessment() {
      let tour_titles = [
        "Gradely Tour",
        "Gradely Tour Session",
        "Gradely Class Tour",
        "Class Tour",
        "Gradely LMS Tour",
      ];

      return tour_titles.includes(this.$route.query?.title) ? true : false;
    },

    getPercentScore() {
      if (this.total === 0) return 0;
      return Math.round((this.score / this.total) * 100);
    },

    getCrownFill() {
      return this.getPercentScore === 100 ? "#00e29f" : "#c5c5c5";
    },

    getRowLevel() {
      let progress = this.getPercentScore;
      if (progress <= 45) return 0;
      else if (progress > 45 && progress <= 75) return 1;
      else if (progress < 100) return 2;
      return 3;
    },

    getRowFill() {
      let progress = this.getPercentScore;
      if (progress <= 45) return "brand-red-bg";
      else if (progress > 45 && progress <= 75) return "brand-accent-bg";
      else return "brand-green-bg";
    },

    getScoreColor() {
      let progress = this.getPercentScore;
      if (progress <= 45) return "brand-red";
      else if (progress > 45 && progress <= 75) return "brand-accent";
      else return "brand-green";
    },

    getOptions() {
      return {
        cutoutPercentage: 74.5,
        aspectRatio: 1,
        legend: {
          display: false,
        },
      };
    },

    getChartData() {
      let average_score = Number(this.average_score);
      let rem = 100 - average_score;
      let excelling, average, struggling;

      if (!this.report) return [average_score, rem];

      if (this.$route?.query?.tour || this.isTourAssessment) {
        excelling = 40;
        average = 20;
        struggling = 40;
      } else {
        excelling = this.student_performance?.excelling ?? 0;
        average = this.student_performance?.average ?? 0;
        struggling = this.student_performance?.struggling ?? 0;
      }

      let total = excelling + average + struggling;
      if (!total) return [0, 0, 100];

      return [
        this.getPercent(excelling, total),
        this.getPercent(average, total),
        this.getPercent(struggling, total),
      ];
    },

    getLabels() {
      return this.report
        ? ["% Excelling", "% Average", "% Struggling"]
        : ["% Average", "% More"];
    },

    getBgColors() {
      let excelling, average, struggling;

      if (this.$route?.query?.tour || this.isTourAssessment) {
        excelling = 40;
        average = 20;
        struggling = 40;
      } else {
        excelling = this.student_performance?.excelling ?? 0;
        average = this.student_performance?.average ?? 0;
        struggling = this.student_performance?.struggling ?? 0;
      }

      let total = excelling + average + struggling;

      return total
        ? ["#00e29f", "#faa017", "#fe747d"]
        : [this.$color.getProgressColor(Number(this.average_score)), "#DDF1FA"];
    },

    getDataCollection() {
      return {
        labels: this.getLabels,
        datasets: [
          {
            label: "Class Performance",
            data: this.getChartData,
            backgroundColor: this.getBgColors,
            hoverBackgroundColor: "#c3e6ec",
            borderWidth: 0,
          },
        ],
      };
    },
  },

  data: () => ({
    datacollection: {},
    options: {},

    active_option: "average",
  }),

  watch: {
    student_count: {
      handler() {
        // this.fillData();
      },
      deep: true,
    },
  },

  mounted() {
    this.fillData();
  },

  methods: {
    fillData() {
      this.datacollection = {
        labels: ["% Excelling", "% Average", "% Struggling", "No Data"],
        datasets: [
          {
            label: "Class Performance",
            data: this.calculateChartData(),
            backgroundColor: ["#24AE5F", "#FAA017", "#F6515B"],
            hoverBackgroundColor: "#c3e6ec",
            borderWidth: 0,
          },
        ],
      };

      this.options = {
        cutoutPercentage: 74.5,
        aspectRatio: 1,
        legend: {
          display: false,
        },
      };
    },

    calculateChartData() {
      let total_student = this.student_count.studentsCount;
      let green = this.student_count.excellence;
      let yellow = this.student_count.average;
      let red = this.student_count.struggling;

      if (total_student)
        return [
          this.getPercent(red, total_student),
          this.getPercent(yellow, total_student),
          this.getPercent(green, total_student),
          this.getPercent(0, total_student),
        ];
      else return [0, 0, 0, 100];
    },

    getPercent(value, total) {
      return Math.round((value * 100) / total);
    },

    toggleOption() {
      if (this.active_option === "average") this.active_option = "mastery";
      else this.active_option = "average";
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-column {
  @include flex-column-center;

  .chart-wrapper {
    @include square-shape(235);

    @include breakpoint-down(xl) {
      @include square-shape(220);
    }

    @include breakpoint-down(lg) {
      @include square-shape(190);
    }

    @include breakpoint-down(md) {
      @include square-shape(210);
    }
  }

  .chart-detail {
    @include center-placement;

    .title {
      @include font-height(26, 32);

      @include breakpoint-down(lg) {
        @include font-height(23, 30);
      }

      @include breakpoint-down(xs) {
        @include font-height(22, 30);
      }
    }

    .meta-title {
      @include font-height(10, 15);

      @include breakpoint-down(lg) {
        @include font-height(9, 14);
      }
    }
  }

  .performance-toggler {
    @include flex-row-between-nowrap;
    margin-top: toRem(15);

    .option {
      @include font-height(11.5, 16);
      @include transition(0.3s);
      color: $border-grey-dark;

      @include breakpoint-down(lg) {
        @include font-height(10.25, 15);
      }

      @include breakpoint-down(xs) {
        @include font-height(10, 15);
      }
    }

    .active-option {
      font-weight: 700;
      color: $color-text;
    }

    .toggler {
      position: relative;
      background: $brand-green-light;
      border: toRem(1) solid $brand-green;
      padding: toRem(2);
      margin: 0 toRem(15);
      width: toRem(36);
      height: toRem(21);

      @include breakpoint-down(lg) {
        width: toRem(34.5);
        height: toRem(19);
      }

      .indicator {
        @include center-y;
        @include square-shape(15.5);
        @include transition(0.3s);

        @include breakpoint-down(lg) {
          @include square-shape(14.5);
        }
      }

      .swipe-right {
        right: toRem(2);
      }
    }
  }

  .chart-description {
    width: toRem(250);

    @include breakpoint-down(xl) {
      width: toRem(220);
    }

    @include breakpoint-down(lg) {
      width: toRem(190);
    }

    .description {
      @include font-height(10.9, 16);
      letter-spacing: 0.02em;

      @include breakpoint-down(xs) {
        @include font-height(11, 15);
      }
    }

    .value {
      @include font-height(14, 20);

      @include breakpoint-down(xl) {
        @include font-height(13.5, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(13.25, 18);
      }
    }
  }
}

.rating {
  width: 20.79px;
  position: relative;
  top: -5px;
  margin-right: toRem(15);

  .row-2 {
    height: 12px;
    width: 100%;
    background: #c5c5c5;
    margin: -4px 0 2px 0;
  }

  .row-1 {
    height: 19px;
    width: 100%;
    background: #c5c5c5;
  }

  .row-0 {
    height: 3px;
    width: 100%;
    background: #c5c5c5;
    margin-top: 2px;
  }
}
</style>
