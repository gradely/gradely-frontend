<template>
  <div class="review-wrapper">
    <div class="header">
      <!-- TITLE TEXT  -->
      <div class="title-text color-text font-weight-700">
        {{ title_text }}
      </div>

      <!-- DESCRIPTION  -->
      <div class="description color-ash">
        {{ description }}
      </div>
    </div>

    <!-- DYNAMIC CONTENT DISPLAY  -->
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "reviewWrapper",

  props: {
    title_text: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.review-wrapper {
  margin-bottom: toRem(30);

  .header {
    margin-bottom: toRem(20);

    @include breakpoint-down(xs) {
      margin-bottom: toRem(15);
    }

    .title-text {
      @include font-height(17.45, 28);

      @include breakpoint-down(sm) {
        @include font-height(16.5, 26);
      }

      @include breakpoint-down(xs) {
        @include font-height(15.5, 25);
      }

      @include breakpoint-custom-down(360) {
        @include font-height(15, 25);
      }
    }

    .description {
      @include font-height(12.75, 18);

      @include breakpoint-down(sm) {
        @include font-height(12, 17);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.75, 16);
      }
    }
  }
}
</style>
