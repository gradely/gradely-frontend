<template>
  <div class="position-relative">
    <div
      class="schedule-default-card"
      v-for="(_, index) in state_count"
      :key="index"
    >
      <div
        class="line-top mgb-4 rounded-5"
        :class="loading ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>
      <div
        class="line-bottom rounded-5"
        :class="loading ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>
    </div>

    <!-- EMPTY CONTENT STATE  -->
    <empty-content-state title="No Schedule Found" mini />
  </div>
</template>

<script>
export default {
  name: "scheduleDefault",

  props: {
    loading: {
      type: Boolean,
      default: true,
    },

    empty_state: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    state_count: 5,
  }),
};
</script>

<style lang="scss" scoped>
.schedule-default-card {
  margin-bottom: toRem(13);

  .line-top {
    height: toRem(18);
    width: 85%;

    @include breakpoint-down(md) {
      width: 100%;
    }
  }

  .line-bottom {
    height: toRem(14);
    width: 50%;

    @include breakpoint-down(md) {
      width: 70%;
    }
  }
}
</style>
