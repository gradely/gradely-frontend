<template>
  <div class="d-flex justify-content-center">
    <div class="onboading-tab-switcher rounded-18 white-text-bg border">
      <router-link
        :to="{
          name: tab.route,
          query: { page: $route.query.page ? $route.query.page : null },
        }"
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
  name: "onboardingTabRow",

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
</style>
