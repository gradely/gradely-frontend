<template>
  <div class="app-description">
    <!-- LEFT SECTION  -->
    <div class="left-section">
      <!-- CAROUSSEL  -->
      <app-description-carousel />

      <!-- OVERVIEW  -->
      <app-description-overview />
    </div>

    <!-- RIGHT SECTION  -->
    <div class="right-section">
      <additional-info />
    </div>
  </div>
</template>

<script>
import appDescriptionCarousel from "@/modules/dashboard/components/app-info-comps/app-description-carousel";
import appDescriptionOverview from "@/modules/dashboard/components/app-info-comps/app-description-overview";
import additionalInfo from "@/modules/dashboard/components/app-info-comps/additional-info";

export default {
  name: "appDescription",

  metaInfo: {
    title: "App Description",
  },

  components: {
    appDescriptionCarousel,
    appDescriptionOverview,
    additionalInfo,
  },
};
</script>

<style lang="scss" scoped>
.app-description {
  @include flex-row-between-wrap;
  align-items: flex-start;

  .left-section {
    width: 68%;
    padding-right: toRem(40);
    border-right: toRem(0.5) solid $border-grey;

    @include breakpoint-down(lg) {
      padding-right: toRem(30);
    }

    @include breakpoint-down(md) {
      width: 100%;
      padding-right: 0;
      border-right: 0;
    }
  }

  .right-section {
    width: 32%;
    padding-left: toRem(40);
    // border-left: toRem(0.5) solid $border-grey;

    @include breakpoint-down(lg) {
      padding-left: toRem(30);
    }

    @include breakpoint-down(md) {
      width: 100%;
      padding-left: 0;
    }
  }
}
</style>
