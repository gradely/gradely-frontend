<template>
  <div class="app-permission">
    <!-- LEFT SECTION  -->
    <div class="left-section">
      <div class="title-text color-text font-weight-600">App Permissions</div>

      <div class="description color-ash">
        Report Cards from Gradely has disclosed the following information
        regarding the collection and usage of your data. More detailed
        information can be found in the publisher's
        <a href="https://gradely.ng/privacy-policy" class="btn-link"
          >privacy policy</a
        >.
      </div>

      <!-- PERMISSION BLOCK  -->
      <permission-block />
    </div>

    <!-- RIGHT SECTION  -->
    <div class="right-section">
      <additional-info />
    </div>
  </div>
</template>

<script>
import permissionBlock from "@/modules/dashboard/components/app-info-comps/permission-block";
import additionalInfo from "@/modules/dashboard/components/app-info-comps/additional-info";

export default {
  name: "appPermission",

  metaInfo: {
    title: "App Permission",
  },

  components: {
    permissionBlock,
    additionalInfo,
  },
};
</script>

<style lang="scss" scoped>
.app-permission {
  @include flex-row-between-wrap;
  align-items: flex-start;

  .left-section {
    width: 68%;
    padding-right: toRem(40);
    // border-right: toRem(1) solid $border-grey;

    @include breakpoint-down(lg) {
      padding-right: toRem(25);
    }

    @include breakpoint-down(md) {
      width: 100%;
      padding-right: 0;
    }

    .title-text {
      @include font-height(19, 26);
      margin-bottom: toRem(20);

      @include breakpoint-down(xl) {
        @include font-height(18.25, 26);
        margin-bottom: toRem(12);
      }

      @include breakpoint-down(md) {
        @include font-height(18, 24);
      }

      @include breakpoint-down(sm) {
        @include font-height(16.5, 22);
      }

      @include breakpoint-down(xs) {
        @include font-height(15, 20);
      }
    }

    .description {
      @include font-height(14.5, 25);
      margin-bottom: toRem(30);

      @include breakpoint-down(xl) {
        @include font-height(14, 25);
        margin-bottom: toRem(25);
      }

      @include breakpoint-down(sm) {
        @include font-height(12.5, 21);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 20);
      }
    }
  }

  .right-section {
    width: 32%;
    padding-left: toRem(40);
    border-left: toRem(0.5) solid $border-grey;

    @include breakpoint-down(lg) {
      padding-left: toRem(25);
    }

    @include breakpoint-down(md) {
      width: 100%;
      padding-left: 0;
      border: 0;
    }
  }
}
</style>
