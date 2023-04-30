<template>
  <div class="position-relative smooth-transition">
    <div
      class="class-select-default position-relative w-100 mgb-20 rounded-5"
      v-for="(_, index) in state_count"
      :key="index"
    >
      <!-- BLOCK ONE  -->
      <div class="block-one h-auto w-100">
        <div
          class="line-one mgb-5 rounded-5"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
        <div
          class="line-two rounded-5"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
      </div>

      <!-- BLOCK TWO  -->
      <div
        class="block-two rounded-circle"
        :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>
    </div>

    <!-- EMPTY CONTENT STATE  -->
    <empty-content-state v-if="empty_state" title="No Class Found" mini />
  </div>
</template>

<script>
export default {
  name: "classSelectSkeleton",

  props: {
    empty_state: {
      type: Boolean,
      default: false,
    },
    loading_state: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    state_count: 4,
  }),
};
</script>

<style lang="scss" scoped>
.class-select-default {
  background: rgba(#fff, 0.6);
  @include flex-row-between-nowrap;

  .line-one {
    width: 50%;
    height: toRem(20);
  }

  .line-two {
    width: 30%;
    height: toRem(14);
  }

  .block-two {
    @include square-shape(30);
  }
}
</style>
