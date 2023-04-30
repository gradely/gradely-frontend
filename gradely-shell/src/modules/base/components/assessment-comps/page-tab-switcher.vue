<template>
  <div class="d-flex justify-content-center">
    <div class="page-tab-switcher rounded-15 white-text-bg smooth-animation">
      <router-link
        :to="{ name: tab.route }"
        class="tab"
        :class="{ 'active-tab': tab.route === currentRoute }"
        v-for="(tab, index) in tabs"
        :key="index"
      >
        {{ tab.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageTabSwitcher",

  props: {
    tabs: {
      type: Array,
    },
  },

  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },

  data: () => ({}),

  methods: {},
};
</script>

<style lang="scss" scoped>
.page-tab-switcher {
  @include flex-row-center-nowrap;
  margin: toRem(10) 0 toRem(21);
  padding: toRem(5);
  width: max-content;

  @include breakpoint-down(lg) {
    margin: toRem(10) 0 toRem(15);
  }

  @include breakpoint-down(xs) {
    border-radius: toRem(18) !important;
    padding: toRem(4.5);
  }

  .tab {
    @include font-height(13, 18);
    @include transition(0.2s);
    padding: toRem(6) toRem(26);
    border-radius: toRem(15);
    color: $border-grey-dark;
    width: max-content;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: rgba($brand-accent-light, 0.5);
    }

    @include breakpoint-down(xl) {
      padding: toRem(6) toRem(20);
    }

    @include breakpoint-down(xs) {
      padding: toRem(6) toRem(18);
      @include font-height(12.75, 16);
    }
  }

  .active-tab {
    background: $brand-inverse-light;
    @include font-height(12, 18);
    color: $brand-navy;
    font-weight: 700;
  }
}
</style>
