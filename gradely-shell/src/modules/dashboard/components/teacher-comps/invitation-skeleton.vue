<template>
  <div class="invitation-skeleton rounded-3 mgb-5 pd-15 w-100">
    <div class="avatar avatar-sm-md mgr-10 skeleton-loader"></div>

    <div class="w-100">
      <div class="top rounded-5 skeleton-loader mgb-4"></div>
      <div class="bottom rounded-5 skeleton-loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "invitationSkeleton",
};
</script>

<style lang="scss" scoped>
.invitation-skeleton {
  background: rgba($color-white, 0.225);
  @include flex-row-start-nowrap;

  @include breakpoint-down(sm) {
    padding: toRem(12) !important;
  }

  .top {
    height: toRem(20);
    width: 50%;

    @include breakpoint-down(xs) {
      height: toRem(15);
      width: 65%;
    }
  }

  .bottom {
    height: toRem(15);
    width: 70%;

    @include breakpoint-down(xs) {
      height: toRem(10);
      width: 80%;
    }
  }
}
</style>
