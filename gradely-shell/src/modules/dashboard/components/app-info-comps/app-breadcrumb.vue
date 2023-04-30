<template>
  <div class="app-breadcrumb">
    <router-link :to="{ name: 'DashboardAppStore' }">
      <div class="app-home color-grey-dark smooth-transition">Apps</div>
    </router-link>

    <div class="icon icon-caret-right border-grey-dark"></div>

    <div class="current-app brand-accent">Report Card</div>
  </div>
</template>

<script>
export default {
  name: "appBreadcrumb",
};
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  @include flex-row-start-nowrap;
  @include font-height(14, 19);
  margin-bottom: toRem(42);

  @include breakpoint-down(xl) {
    @include font-height(13, 18);
    margin-bottom: toRem(40);
  }

  @include breakpoint-down(md) {
    @include font-height(12.75, 18);
    margin-bottom: toRem(35);
  }

  @include breakpoint-down(xs) {
    margin-bottom: toRem(30);
  }

  .app-home {
    &:hover {
      color: $brand-inverse !important;
    }
  }

  .icon {
    margin: 0 toRem(10);
    font-size: toRem(11);
    position: relative;
    top: toRem(2);

    @include breakpoint-down(xl) {
      margin: 0 toRem(8);
      font-size: toRem(10);
      top: toRem(1);
    }
  }
}
</style>
