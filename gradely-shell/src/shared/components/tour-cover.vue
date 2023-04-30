<template>
  <div class="tour-cover"></div>
</template>

<script>
export default {
  name: "tourCover",
};
</script>

<style lang="scss" scoped>
.tour-cover {
  @include transition(0.5s);
  @include stretch-area;
  position: fixed;
  overflow: auto !important;
  z-index: 2999;
  background: rgba(#000000, 0.825) !important;
}
</style>