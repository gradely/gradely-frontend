<template>
  <div class="content-layout gradely-container px-0 px-sm-3 px-md-3 mx-auto">
    <div class="row mx-auto w-100">
      <div
        class="col-12 col-sm-10 content-wrapper mx-auto"
        :class="extend_width ? 'col-md-8' : 'col-md-7'"
      >
        <div class="content-block white-text-bg rounded-12 w-100">
          <!-- DYNAMIC CONTENT  -->
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contentContainerLayout",

  props: {
    extend_width: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.content-layout {
  @include flex-column-center;
  justify-content: flex-start;
  padding-top: toRem(100);
  height: 100%;

  @include breakpoint-down(sm) {
    padding-top: toRem(80);
  }

  .content-wrapper {
    .content-block {
      box-shadow: 0 0 toRem(3) rgba($black-text, 0.15);
      padding: toRem(40) toRem(35) toRem(50);
      margin-bottom: toRem(50);

      @include breakpoint-custom-down(890) {
        padding: toRem(35) toRem(20) toRem(46);
      }

      @include breakpoint-down(sm) {
        padding: toRem(35) toRem(40) toRem(46);
      }

      @include breakpoint-down(xs) {
        padding: toRem(35) toRem(15) toRem(46);
      }

      @include breakpoint-custom-down(380) {
        padding: toRem(35) toRem(15) toRem(46);
      }
    }
  }
}
</style>
