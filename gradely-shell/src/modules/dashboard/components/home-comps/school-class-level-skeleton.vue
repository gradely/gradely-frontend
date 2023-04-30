<template>
  <div class="school-class-level-skeleton w-100 rounded-5 overflow-hidden">
    <!-- TOP ACCORDION  -->
    <div class="top-accordion w-100 skeleton-loader"></div>

    <!-- BOTTOM ACCORDION  -->
    <div class="bottom-accordion">
      <div
        class="class-arm rounded-5"
        v-for="(_, index) in 2"
        :key="index"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolClassLevelSkeleton",
};
</script>

<style lang="scss" scoped>
.school-class-level-skeleton {
  .top-accordion {
    height: 50px;
    background: rgba($white-text, 0.5);
  }

  .bottom-accordion {
    @include flex-row-start-nowrap;
    border: toRem(1) solid rgba($border-grey, 0.5);
    padding: toRem(15) 0 toRem(25) toRem(20);

    .class-arm {
      background: rgba($white-text, 0.5);
      @include rectangle-shape(194, 160);
      margin-right: toRem(15);

      @include breakpoint-down(lg) {
        @include rectangle-shape(180, 150);
      }
    }
  }
}
</style>
