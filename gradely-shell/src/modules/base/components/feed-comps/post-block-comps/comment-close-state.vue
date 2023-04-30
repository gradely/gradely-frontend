<template>
  <div
    class="comment-close-state color-grey-dark w-100 smooth-transition"
    @click="$emit('switchState')"
  >
    <div class="text">Write your comment</div>

    <!-- ATTACH  -->
    <div class="avatar pointer">
      <div class="icon icon-paper-clip border-grey-dark"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentCloseState",
};
</script>

<style lang="scss" scoped>
.comment-close-state {
  @include flex-row-between-nowrap;
  padding: toRem(7) toRem(10);
  cursor: text;

  @include breakpoint-down(xs) {
    padding: toRem(6) toRem(8);
  }

  .text {
    @include font-height(12.75, 17);

    @include breakpoint-down(sm) {
      @include font-height(12.5, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(12, 17);
    }
  }

  .avatar {
    @include square-shape(22);

    .icon {
      @include center-placement;
      font-size: toRem(18);

      @include breakpoint-down(xs) {
        font-size: toRem(18);
      }
    }
  }
}
</style>
