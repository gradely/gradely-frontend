<template>
  <div class="course-outlines rounded-7 border-border-grey">
    <!-- TITLE -->
    <div class="title brand-primary font-weight-600 mgb-22">
      {{ course.title }}
    </div>

    <div class="item" v-for="(outline, index) in course.items" :key="index">
      <div class="icon icon-check-circle"></div>
      <div class="text">{{ outline }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "courseOutlines",

  props: {
    course: Object,
  },
};
</script>

<style lang="scss" scoped>
.course-outlines {
  padding: toRem(30) toRem(25);
  margin-bottom: toRem(20);

  @include breakpoint-down(md) {
    margin-bottom: toRem(30);
  }

  @include breakpoint-down(sm) {
    padding: toRem(20) toRem(16);
  }

  .title {
    @include font-height(15.25, 19);

    @include breakpoint-down(lg) {
      @include font-height(15, 19);
    }

    @include breakpoint-down(sm) {
      @include font-height(14, 18);
    }
  }

  .item {
    @include flex-row-start-nowrap;
    margin-bottom: toRem(23);

    .icon {
      margin-right: toRem(15);
      color: $brand-inverse;
      font-size: toRem(19);

      @include breakpoint-down(sm) {
        margin-right: toRem(13);
      }
    }

    .text {
      @include font-height(14, 20.5);
      color: $color-text;

      @include breakpoint-down(lg) {
        @include font-height(13.5, 20);
      }

      @include breakpoint-down(sm) {
        @include font-height(13.25, 20);
      }
    }
  }
}
</style>