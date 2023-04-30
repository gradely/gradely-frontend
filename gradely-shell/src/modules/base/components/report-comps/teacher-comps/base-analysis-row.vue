<template>
  <div class="base-analysis-row">
    <!-- STRUGGLING  -->
    <div class="analytic-column">
      <div class="avatar brand-tonic-bg"></div>

      <!-- CONTENT  -->
      <div class="content">
        <div class="count">{{ struggling_count }} Students</div>
        <div class="meta-data">Less than 50%</div>
      </div>
    </div>

    <!-- AVERAGE  -->
    <div class="analytic-column">
      <div class="avatar brand-accent-bg"></div>

      <!-- CONTENT  -->
      <div class="content">
        <div class="count">{{ average_count }} Students</div>
        <div class="meta-data">More than 50%</div>
      </div>
    </div>

    <!-- EXCELLING  -->
    <div class="analytic-column">
      <div class="avatar" style="background: #24ae5f"></div>

      <!-- CONTENT  -->
      <div class="content">
        <div class="count">{{ excelling_count }} Students</div>
        <div class="meta-data">More than 75%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseAnalysisRow",

  props: {
    excelling_count: {
      type: Number,
      default: 0,
    },
    average_count: {
      type: Number,
      default: 0,
    },
    struggling_count: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.base-analysis-row {
  @include flex-row-around-nowrap;
  align-items: flex-start;
  border-top: toRem(1) solid rgba($border-grey, 0.9);
  padding: toRem(16) toRem(15);

  @include breakpoint-down(xs) {
    padding: toRem(14) toRem(10);
  }

  .analytic-column {
    @include flex-row-start-wrap;
    align-items: flex-start;

    @include breakpoint-custom-down(365) {
      margin: toRem(-3) toRem(10);
    }

    .avatar {
      @include square-shape(13);
      margin-right: toRem(10);
      margin-top: toRem(2);

      @include breakpoint-down(xs) {
        margin-right: toRem(8);
        @include square-shape(12);
        margin-top: toRem(3);
        margin-bottom: toRem(6);
      }
    }

    .count {
      @include font-height(13, 19);
      margin-bottom: toRem(2);
      color: $color-text;

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
      }
    }

    .meta-data {
      @include font-height(11.5, 15);
      color: $color-grey-dark;

      @include breakpoint-down(xs) {
        @include font-height(10.5, 15);
      }
    }
  }
}
</style>
