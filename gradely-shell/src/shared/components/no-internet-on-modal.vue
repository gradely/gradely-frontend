<template>
  <div class="no-internet-on-modal w-100 position-absolute in">
    <img :src="mxStaticImg('LowCoverage.png')" alt="" />

    <div class="description text-center color-grey-dark mgt-15">
      <div class="mgb-7">No internet connection found.</div>
      <div>Check your connection or try again</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noModalIntenet",
};
</script>

<style lang="scss" scoped>
.no-internet-on-modal {
  @include flex-column-center;
  padding: toRem(40);
  top: 0;
  left: 0;

  img {
    width: toRem(70);
    height: auto;

    @include breakpoint-down(sm) {
      width: toRem(60);
    }
  }

  .description {
    @include font-height(13.5, 15);
    text-align: center;

    @include breakpoint-down(lg) {
      @include font-height(13, 15);
    }

    @include breakpoint-down(sm) {
      @include font-height(12.25, 15);
    }
  }
}
</style>
