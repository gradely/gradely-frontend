<template>
  <div class="course-enroll-block rounded-20">
    <div class="title brand-primary font-weight-700 mgb-25">Includes...</div>

    <!-- OUTLINES -->
    <div class="outlines mgb-20">
      <div class="item">
        <div class="icon icon-graduation-cap-outline"></div>
        <div class="text">4 Weeks of live classes</div>
      </div>

      <div class="item">
        <div class="icon icon-graduation-cap-outline"></div>
        <div class="text">Up to 12 video lessons</div>
      </div>

      <div class="item">
        <div class="icon icon-graduation-cap-outline"></div>
        <div class="text">Final week project</div>
      </div>

      <div class="item">
        <div class="icon icon-graduation-cap-outline"></div>
        <div class="text">Demo Day & Prize</div>
      </div>
    </div>

    <!-- ENROLL BUTTON -->
    <button class="btn enroll-btn btn-accent w-100 mgt-5">ENROLL NOW</button>
  </div>
</template>

<script>
export default {
  name: "courseEnrollBlock",
};
</script>

<style lang="scss" scoped>
.course-enroll-block {
  background: darken($brand-inverse-light, 2%);
  padding: toRem(28) toRem(25);

  @include breakpoint-down(md) {
    padding: toRem(25) toRem(20);
  }

  .title {
    @include font-height(15.5, 27);

    @include breakpoint-down(md) {
      @include font-height(14.75, 25);
    }
  }

  .outlines {
    .item {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(20);

      .icon {
        margin-right: toRem(15);
        color: $brand-inverse;
        font-size: toRem(21);
      }

      .text {
        color: $color-text;
        font-size: toRem(14);

        @include breakpoint-down(md) {
          font-size: toRem(13.25);
        }
      }
    }
  }
}
</style>