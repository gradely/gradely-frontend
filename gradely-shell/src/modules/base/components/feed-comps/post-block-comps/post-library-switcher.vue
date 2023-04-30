<template>
  <div class="wrapper-cover d-flex justify-content-center">
    <div class="post-library-switcher rounded-15 white-text-bg">
      <router-link
        :to="'/feed/' + $route.params.id + '/?view=feed#tabSwitcher'"
        class="switcher mgr-3"
        :class="routeQuery === 'feed' ? 'active-state' : null"
        >Class Feed</router-link
      >

      <router-link
        :to="'/feed/' + $route.params.id + '/?view=library#tabSwitcher'"
        class="switcher mgl-3"
        :class="routeQuery === 'library' ? 'active-state' : null"
        >Class Library</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "postLibrarySwitcher",

  computed: {
    routeQuery() {
      return this.$route?.query?.view || "feed";
    },
  },
};
</script>

<style lang="scss" scoped>
.post-library-switcher {
  @include flex-row-center-nowrap;
  margin-bottom: toRem(15);
  width: max-content;
  padding: toRem(5);

  @include breakpoint-down(xs) {
    border-radius: toRem(18) !important;
    margin-bottom: toRem(12.5);
    padding: toRem(4.5);
  }

  .switcher {
    @include font-height(12.5, 18);
    padding: toRem(6) toRem(24);
    @include transition(0.4s);
    border-radius: toRem(15);
    color: $color-grey-dark;
    text-align: center;
    width: max-content;

    @include breakpoint-down(xs) {
      @include font-height(12.25, 18);
      padding: toRem(7) toRem(25);
    }

    &:hover {
      background: rgba($brand-accent-light, 0.5);
    }
  }

  .active-state {
    background: $brand-inverse-light;
    @include font-height(12, 18);
    color: $brand-navy;
    font-weight: 700;
  }
}
</style>
