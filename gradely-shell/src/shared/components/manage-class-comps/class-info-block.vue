<template>
  <div class="class-info-block">
    <!-- CHILD IMAGE -->
    <div class="avatar">
      <div class="avatar-text" :class="$color.generateRandomColors()">
        <div class="icon icon-graduation-cap white-text"></div>
      </div>
    </div>

    <!-- CLASS NAME -->
    <div
      class="class-name text-center brand-navy font-weight-700 text-capitalize"
    >
      {{ $route.params.name }}
    </div>

    <div class="class-code text-center">
      <span class="color-grey-dark text-uppercase">{{
        class_detail.class_code
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "classInfoBlock",

  props: {
    class_detail: {
      type: Object,
      default: () => ({
        class_code: "bhc/2020/1234",
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.class-info-block {
  @include flex-column-center;
  justify-content: flex-start;
  margin-bottom: toRem(30);

  .avatar {
    @include square-shape(128);
    margin-bottom: toRem(15);
    border-radius: toRem(20);

    @include breakpoint-down(xl) {
      @include square-shape(120);
    }

    @include breakpoint-down(md) {
      @include square-shape(100);
    }

    .avatar-text {
      font-size: toRem(58);
    }
  }

  .class-name {
    @include font-height(17, 24);
    margin-bottom: toRem(6);

    @include breakpoint-down(xl) {
      @include font-height(15, 22);
    }

    @include breakpoint-down(md) {
      @include font-height(14, 20);
    }

    @include breakpoint-down(sm) {
      @include font-height(13, 18);
    }
  }

  .class-code {
    @include font-height(13.5, 18);

    @include breakpoint-down(xl) {
      @include font-height(12.5, 18);
    }

    @include breakpoint-down(lg) {
      @include font-height(12, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(11, 17);
    }
  }
}
</style>
