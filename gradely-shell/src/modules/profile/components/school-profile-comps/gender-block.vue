<template>
  <div class="gender-block">
    <div class="title-text color-grey-dark">GENDER</div>

    <!-- GENDER ROW  -->
    <div class="gender-row">
      <!-- GENDER STAT  -->
      <div class="gender-stat">
        <!-- FEMALE  -->
        <div class="stat mgb-12">
          <div class="key brand-inverse-bg"></div>
          <div>
            <div class="title color-text">Female</div>
            <div class="value color-grey-dark">
              {{ demographics.gender.female }}%
            </div>
          </div>
        </div>

        <!-- MALE  -->
        <div class="stat">
          <div class="key brand-primary-bg"></div>
          <div>
            <div class="title color-text">Male</div>
            <div class="value color-grey-dark">
              {{ demographics.gender.male }}%
            </div>
          </div>
        </div>
      </div>

      <!-- GENDER CHART  -->
      <div class="gender-chart">
        <mixin-doughnut-chart :chart-data="datacollection" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
import mixinDoughnutChart from "@/shared/mixins/mixin-doughnut-chart";

export default {
  name: "genderBlock",

  components: {
    mixinDoughnutChart,
  },

  props: {
    demographics: {
      type: Object,
      default: () => ({
        gender: {},
      }),
    },
  },

  data: () => ({
    datacollection: {},
    options: {},
  }),

  watch: {
    "demographics.gender": {
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
        labels: ["% Female", "% Male"],
        datasets: [
          {
            label: "Gender",
            data: [
              this.demographics.gender.female,
              this.demographics.gender.male,
            ],
            backgroundColor: ["#11BDCF", "#2A4F77"],
            hoverBackgroundColor: "#c3e6ec",
            borderWidth: 0,
          },
        ],
      };

      this.options = {
        cutoutPercentage: 70,
        aspectRatio: 1,
        legend: {
          display: false,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.gender-block {
  @include breakpoint-down(sm) {
    margin-bottom: toRem(30);
  }

  .title-text {
    @include font-height(12.5, 18);
    margin-bottom: toRem(20);

    @include breakpoint-down(xs) {
      @include font-height(11, 16);
    }
  }

  .gender-row {
    @include flex-row-start-nowrap;

    .gender-stat {
      margin-right: toRem(25);

      @include breakpoint-down(xs) {
        margin-right: toRem(18);
      }

      .stat {
        @include flex-row-start-nowrap;
        align-items: flex-start;

        .key {
          @include square-shape(13);
          margin-right: toRem(10);
          margin-top: toRem(2);
          border-radius: 50%;

          @include breakpoint-down(xs) {
            @include square-shape(11);
          }
        }

        .title {
          @include font-height(12.5, 16);

          @include breakpoint-down(xs) {
            @include font-height(11, 14);
          }
        }

        .value {
          @include font-height(12.25, 17);

          @include breakpoint-down(xs) {
            @include font-height(12, 17);
          }
        }
      }
    }

    .gender-chart {
      position: relative;
      @include square-shape(96);

      @include breakpoint-down(xs) {
        @include square-shape(80);
      }
    }
  }
}
</style>
