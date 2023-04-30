<template>
  <div class="student-table-skeleton w-100 rounded-10 mgb-4">
    <div class="column column-one">
      <div
        class="avatar"
        :class="loading ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>

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
  name: "studentTableSkeleton",

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.student-table-skeleton {
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

    .avatar {
      margin-right: toRem(10);
      @include square-shape(48);

      @include breakpoint-down(md) {
        margin-right: toRem(8);
        @include square-shape(42);
      }

      @include breakpoint-down(sm) {
        @include square-shape(40);
      }

      @include breakpoint-down(xs) {
        @include square-shape(38);
      }
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
