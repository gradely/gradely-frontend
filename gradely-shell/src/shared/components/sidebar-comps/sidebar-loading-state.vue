<template>
  <div
    class="sidebar-loading-state position-relative rounded-5 overflow-hidden w-100 smooth-transition"
  >
    <div class="top rounded-3 mgb-5 skeleton-loader"></div>
    <div class="bottom rounded-3 skeleton-loader"></div>
  </div>
</template>

<script>
export default {
  name: "sidebarLoadingState",
};
</script>

<style lang="scss" scoped>
.sidebar-loading-state {
  padding: toRem(12) toRem(5) toRem(12) toRem(15);
  background: rgba($white-text, 0.35);

  .top {
    width: 50%;
    height: toRem(20);
  }

  .bottom {
    width: 75%;
    height: toRem(15);
  }
}
</style>
