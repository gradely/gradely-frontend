<template>
  <div class="layout-app-base">
    <!-- NAV BUILD  -->
    <nav-build :account_type="account_type" />

    <!-- GRADELY APP CONTAINER  -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import navBuild from "@/shared/components/nav-build";

export default {
  name: "layoutAppBase",

  components: {
    navBuild,
  },

  data: () => ({
    account_type: null,
  }),

  mounted() {
    this.account_type = this.getAuthType;
  },
};
</script>

<style></style>
