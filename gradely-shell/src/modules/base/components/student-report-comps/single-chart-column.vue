<template>
  <div class="chart-column h-100">
    <div class="position-relative">
      <div class="chart-wrapper">
        <mixin-doughnut-chart :chart-data="datacollection" :options="options" />
      </div>

      <!-- CHART DETAIL  -->
      <div class="chart-detail">
        <div class="title text-center color-text font-weight-700">
          {{ this.score }} <span v-if="score != '__'">%</span>
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
          {{ chart_label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinDoughnutChart from "@/shared/mixins/mixin-doughnut-chart";

export default {
  name: "singleChartColumn",

  components: {
    mixinDoughnutChart,
  },

  props: {
    score: {
      type: [Number, String],
      default: 0,
    },

    chart_label: {
      type: String,
      default: "Score",
    },
  },

  data: () => ({
    datacollection: {},
    options: {},
  }),

  watch: {
    score: {
      handler() {
        this.fillData();
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
        labels: ["% Score", "No Data"],
        datasets: [
          {
            label: "Student Score",
            data: this.calculateChartData(),
            backgroundColor: [this.processScoreColor()],
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
      return this.score && this.score != "__"
        ? [this.score, 100 - this.score]
        : [0, 100];
    },

    processScoreColor() {
      let color_scheme = ["#24AE5F", "#FAA017", "#F6515B"];
      if (this.score == "__") return "#d7ebee";
      if (this.score > 75) return color_scheme[0];
      else if (this.score > 45 && this.score < 75) return color_scheme[1];
      else return color_scheme[2];
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
      @include font-height(24, 32);

      @include breakpoint-down(lg) {
        @include font-height(23, 30);
      }

      @include breakpoint-down(xs) {
        @include font-height(22, 30);
      }
    }

    .meta-title {
      @include font-height(11.5, 16);
      margin-top: toRem(5);

      @include breakpoint-down(lg) {
        @include font-height(10, 14);
      }
    }
  }
}
</style>
