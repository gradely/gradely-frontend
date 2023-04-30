<template>
  <div class="sidebar-skeleton">
    <div class="weekly-skeleton skeleton-loader mgt-20"></div>
    <div class="weekly-skeleton skeleton-loader"></div>
    <div class="weekly-skeleton skeleton-loader"></div>
    <div class="weekly-skeleton skeleton-loader mgb-10"></div>
  </div>
</template>

<script>
export default {
  name: "sidebarSkeleton",
};
</script>

<style lang="scss" scoped>
.sidebar-skeleton {
  padding: 20px;

  .weekly-skeleton {
    height: 50px;
    margin-bottom: 12px;
    position: relative;
    overflow: hidden !important;
    border-radius: 5px;
  }

  .skeleton-loader {
    background: rgba($border-grey-light, 0.35);
  }

  .skeleton-loader::after {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );

    animation: loading 0.9s infinite;
  }
}
</style>
