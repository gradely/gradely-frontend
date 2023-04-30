<template>
  <div class="empty-teacher-state">
    <img v-lazy="mxStaticImg('ClassBoard.png')" alt="" class="mgb-10" />

    <div>
      <div class="title font-weight-700 color-text text-center mgb-5">
        No Class yet?
      </div>

      <div class="sub-title text-center color-ash">
        You are not connected to a school yet, add a class below to fix this!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "emptyTeacherState",
};
</script>

<style lang="scss" scoped>
.empty-teacher-state {
  @include flex-column-center;
  padding: toRem(20);

  @include breakpoint-down(md) {
    @include flex-row-start-nowrap;
    padding: toRem(14);
  }

  @include breakpoint-down(xs) {
    padding: toRem(12.5);
  }

  img {
    @include square-shape(80);

    @include breakpoint-down(lg) {
      @include square-shape(60);
    }

    @include breakpoint-down(md) {
      margin-right: toRem(12);
      margin-bottom: 0 !important;
    }

    @include breakpoint-down(xs) {
      margin-right: toRem(10);
      @include square-shape(46);
    }
  }

  .title {
    @include font-height(14, 19);

    @include breakpoint-down(lg) {
      @include font-height(13, 19);
    }

    @include breakpoint-down(md) {
      @include font-height(13.5, 19);
      text-align: left !important;
      margin-bottom: toRem(2) !important;
    }

    @include breakpoint-down(xs) {
      @include font-height(12.5, 18);
    }
  }

  .sub-title {
    @include font-height(12.5, 20);
    width: 100%;

    @include breakpoint-down(lg) {
      @include font-height(11.5, 18);
      width: 98%;
    }

    @include breakpoint-down(md) {
      width: unset;
      @include font-height(12, 18);
      text-align: left !important;
    }

    @include breakpoint-down(xs) {
      @include font-height(11, 16);
    }
  }
}
</style>
