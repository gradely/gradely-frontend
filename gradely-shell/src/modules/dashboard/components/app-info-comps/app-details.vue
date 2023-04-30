<template>
  <div class="app-details white-text-bg w-100">
    <div
      class="gradely-container px-2 px-sm-3 px-md-5 px-lg-4 px-xl-5 mx-auto w-100"
    >
      <!-- APP BREADCRUMB  -->
      <app-breadcrumb />

      <!-- APP BASE INFO  -->
      <app-base-info />

      <!-- APP NAVIGATION  -->
      <app-navigation />
    </div>
  </div>
</template>

<script>
import appBreadcrumb from "@/modules/dashboard/components/app-info-comps/app-breadcrumb";
import appBaseInfo from "@/modules/dashboard/components/app-info-comps/app-base-info";
import appNavigation from "@/modules/dashboard/components/app-info-comps/app-navigation";

export default {
  name: "appDetails",

  components: {
    appBreadcrumb,
    appBaseInfo,
    appNavigation,
  },
};
</script>

<style lang="scss" scoped>
.app-details {
  position: relative;
  @include stretch-area;
  padding-top: toRem(25);
  top: toRem(70);

  @include breakpoint-down(xl) {
    top: toRem(62);
  }

  @include breakpoint-down(md) {
    top: toRem(58);
  }

  @include breakpoint-down(xs) {
    top: toRem(52);
  }
}
</style>
