<template>
  <div class="layout-app-base">
    <!-- NAV BUILD -->
    <nav-sub-build />

    <!-- GRADELY APP CONTAINER  -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import navSubBuild from "@/shared/components/nav-sub-build";

export default {
  name: "layoutAppSubBase",

  components: {
    navSubBuild,
  },
};
</script>

<style></style>
