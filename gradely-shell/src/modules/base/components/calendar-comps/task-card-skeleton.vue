<template>
  <div class="task-table-skeleton w-100 rounded-10 mgb-4">
    <div class="column column-one">
      <div class="info w-100">
        <div
          class="line-one rounded-3"
          :class="loading ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
        <div
          class="line-two rounded-3"
          :class="loading ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "taskCardSkeleton",

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.task-table-skeleton {
  background: rgba($white-text, 0.45);
  @include flex-row-start-nowrap;
  padding: toRem(10) toRem(12);

  @include breakpoint-down(xs) {
    padding: toRem(8);
  }

  .column {
    @include flex-row-start-nowrap;
    width: 70%;

    @include breakpoint-down(md) {
      width: 80%;
    }

    @include breakpoint-down(sm) {
      width: 90%;
    }

    @include breakpoint-down(xs) {
      width: 95%;
    }

    .line-one {
      height: toRem(20);
      width: 90%;
      margin-bottom: toRem(7);

      @include breakpoint-down(md) {
        height: toRem(16);
        width: 100%;
        margin-bottom: toRem(5);
      }

      @include breakpoint-down(xs) {
        height: toRem(15);
        margin-bottom: toRem(4);
      }
    }

    .line-two {
      height: toRem(15);
      width: 70%;

      @include breakpoint-down(md) {
        height: toRem(13);
        width: 80%;
      }

      @include breakpoint-down(xs) {
        height: toRem(12);
      }
    }
  }
}
</style>
