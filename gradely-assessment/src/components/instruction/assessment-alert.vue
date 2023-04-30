<template>
  <div
    v-if="getAuthToken"
    class="
      assessment-alert
      rounded-15
      border-brand-accent
      brand-accent-light-bg
    "
  >
    <div class="icon icon-info brand-accent"></div>

    <div class="text color-text">
      {{
        assessment.can_start
          ? "Click the start button to begin your examination"
          : "You will be able to take your exam as soon as the admin starts it"
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: "assessmentAlert",

  props: {
    assessment: Object,
    default: {
      can_start: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.assessment-alert {
  @include flex-row-start-nowrap;
  padding: toRem(14) toRem(15);
  margin-bottom: toRem(25);

  @include breakpoint-down(lg) {
    margin-bottom: toRem(20);
  }

  @include breakpoint-down(sm) {
    padding: toRem(12) toRem(13);
  }

  @include breakpoint-down(xs) {
    padding: toRem(10) toRem(12);
  }

  .icon {
    margin-right: toRem(10);
    font-size: toRem(22);

    @include breakpoint-down(sm) {
      font-size: toRem(18);
      margin-right: toRem(7);
    }
  }

  .text {
    font-size: toRem(14.75);

    @include breakpoint-down(lg) {
      font-size: toRem(14);
    }

    @include breakpoint-down(md) {
      font-size: toRem(13.5);
    }

    @include breakpoint-down(sm) {
      font-size: toRem(13);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(12.75);
    }
  }
}
</style>