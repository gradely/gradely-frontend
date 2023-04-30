<template>
  <div class="age-block">
    <div class="title-text color-grey-dark">AGE</div>

    <div class="age-row" v-for="(range, index) in age_range" :key="index">
      <div class="top color-text">{{ range.range }}</div>
      <div class="bottom">
        <!-- PROGRESS  -->
        <div class="progress rounded0-5 position-relative overflow-hidden">
          <div
            class="progress-bar position-absolute h-100 brand-primary-bg smooth-transition"
            :style="'width:' + range.value + '%'"
          ></div>
        </div>

        <!-- PERCENT  -->
        <div class="percent brand-primary">{{ range.value }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ageBlock",

  props: {
    demographics: {
      type: Object,
      default: () => ({
        age: {},
      }),
    },
  },

  watch: {
    "demographics.age": {
      handler() {
        this.processAgeRange();
      },
      deep: true,
    },
  },

  data: () => ({
    age_range: [],
  }),

  mounted() {
    this.processAgeRange();
  },

  methods: {
    processAgeRange() {
      for (const range in this.demographics.age) {
        this.age_range.push({ range, value: this.demographics.age[range] });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.age-block {
  .title-text {
    @include font-height(12.5, 18);
    margin-bottom: toRem(20);

    @include breakpoint-down(xs) {
      @include font-height(11, 16);
    }
  }

  .age-row {
    margin-bottom: toRem(20);

    .top {
      @include font-height(12.5, 17);
      margin-bottom: toRem(1);

      @include breakpoint-down(xs) {
        @include font-height(10.5, 16);
      }
    }

    .bottom {
      @include flex-row-start-nowrap;
      width: toRem(130);

      @include breakpoint-down(xs) {
        width: toRem(120);
      }

      .progress {
        width: 90%;
        height: toRem(6);
        background: darken($brand-inverse-light, 7%);

        .progress-bar {
          top: 0;
          left: 0;
        }
      }

      .percent {
        @include font-height(11.75, 17);
        margin-left: toRem(5);

        @include breakpoint-down(xs) {
          @include font-height(10.5, 16);
        }
      }
    }
  }
}
</style>
