<template>
  <div
    class="empty-performance-state smooth-transition position-relative index-9"
  >
    <!-- IMAGE BOX  -->
    <div class="img-box mgb-20">
      <img
        v-lazy="
          `${getAssetBaseURL(
            'cloud',
            'gradely'
          )}/image/upload/v1639028460/EmptyReport_z39bwc.svg`
        "
        alt=""
        class="h-100 w-100"
      />
    </div>

    <div class="text-title font-weight-700 brand-navy mgb-15 text-center">
      Nothing to report yet
    </div>

    <div
      class="text-content text-center color-ash mgb-30"
      v-if="student_report"
    >
      We couldn’t generate a report on this subject, as there are no enough data
      to use. To fix this, take more assessment on the subject.
    </div>

    <div class="text-content text-center color-ash mgb-30" v-else>
      We couldn’t generate a report on your class, as there are no enough data
      to use. To fix this, assign more assessment to your students take.
    </div>

    <div class="d-flex-justify-content-center" v-if="false">
      <button class="btn btn-accent">Create Assessment</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "emptyPerformanceState",

  props: {
    student_report: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-performance-state {
  @include flex-column-center;
  @include full-width-height;
  @include stretch-area;
  background: rgba($white-text, 0.8);
  mix-blend-mode: blur((25px));

  .text-title {
    @include font-height(16, 22);

    @include breakpoint-down(lg) {
      @include font-height(15, 21);
    }
  }

  .text-content {
    @include font-height(12.75, 22);
    width: 45%;

    @include breakpoint-down(lg) {
      width: 58%;
      @include font-height(12.25, 20);
    }

    @include breakpoint-down(xs) {
      width: 90%;
    }
  }
}
</style>
