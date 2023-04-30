<template>
  <div class="activity-column">
    <!-- TITLE TEXT  -->
    <div class="time-view color-text" v-if="false">
      1<span>h</span>:32<span>m</span>
    </div>
    <div class="title-text color-text" v-else>{{ activity.value }}</div>

    <!-- META TEXT  -->
    <div class="meta-text color-grey-dark">{{ activity.title }}</div>
  </div>
</template>

<script>
export default {
  name: "activityColumn",

  props: {
    activity: {
      type: Object,
      default: () => ({
        title: "Videos Watched",
        is_time: false,
        value: 0,
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-column {
  width: toRem(82);

  @include breakpoint-down(sm) {
    margin-bottom: toRem(14);
    width: toRem(78);

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .title-text,
  .time-view {
    @include font-height(21, 30);
    margin-bottom: toRem(4);

    @include breakpoint-down(lg) {
      @include font-height(20, 28);
      margin-bottom: toRem(2);
    }

    @include breakpoint-down(sm) {
      @include font-height(19, 26);
    }
  }

  .time-view {
    span {
      @include font-height(11, 14);
      color: $color-grey-dark !important;

      @include breakpoint-down(sm) {
        @include font-height(10.25, 14);
      }
    }
  }

  .meta-text {
    @include font-height(11, 14);

    @include breakpoint-down(xs) {
      @include font-height(10.75, 13);
    }
  }
}
</style>
