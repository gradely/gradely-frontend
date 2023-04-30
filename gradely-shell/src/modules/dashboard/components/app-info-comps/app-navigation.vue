<template>
  <div class="app-navigation">
    <!-- DESCRIPTION  -->
    <router-link
      :to="{ name: 'DashboardAppDescription' }"
      class="tab"
      :class="isActiveRoute === 'DashboardAppDescription' ? 'active-tab' : null"
      >Description</router-link
    >

    <!-- SUPPORT  -->
    <router-link
      :to="{ name: 'DashboardAppSupport' }"
      class="tab"
      :class="isActiveRoute === 'DashboardAppSupport' ? 'active-tab' : null"
      >Support</router-link
    >

    <!-- PERMISSIONS  -->
    <router-link
      :to="{ name: 'DashboardAppPermissions' }"
      class="tab"
      :class="isActiveRoute === 'DashboardAppPermissions' ? 'active-tab' : null"
      >Permissions</router-link
    >
  </div>
</template>

<script>
export default {
  name: "appNavigation",

  computed: {
    isActiveRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-navigation {
  margin-top: toRem(44);
  @include flex-row-start-nowrap;

  .tab {
    color: $border-grey-dark;
    @include font-height(13.25, 18);
    @include transition(0.4s);
    padding: toRem(4) toRem(8);
    margin-right: toRem(20);

    @include breakpoint-down(xl) {
      @include font-height(12.5, 17);
    }

    @include breakpoint-down(md) {
      margin-right: toRem(15);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.25, 17);
      margin-right: toRem(12);
    }

    &:hover {
      color: $color-text;
    }
  }

  .active-tab {
    color: $color-text;
    border-bottom: toRem(4) solid $brand-accent;

    @include breakpoint-down(xs) {
      border-bottom: toRem(2) solid $brand-accent;
    }
  }
}
</style>
