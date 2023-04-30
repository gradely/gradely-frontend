<template>
  <div
    class="no-internet-block post-block post-container-block smooth-transition"
  >
    <img :src="mxStaticImg('NoInternet.png')" alt="" />

    <!-- TITLE TEXT -->
    <div class="title-text text-center font-weight-700">Whoops!</div>

    <!-- DESCRIPTION -->
    <div class="description text-center color-grey-dark">
      <div class="mgb-7">No internet connection found.</div>
      <div>Check your connection or try again</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noInternetBlock",
};
</script>

<style lang="scss" scoped>
.no-internet-block {
  @include flex-column-center;
  justify-content: flex-start;
  padding: toRem(50) toRem(40);

  @include breakpoint-down(md) {
    margin-bottom: toRem(25);
  }

  img {
    width: toRem(220);
    height: auto;

    @include breakpoint-down(sm) {
      width: toRem(180);
    }
  }

  .title-text {
    @include font-height(17.5, 28);
    letter-spacing: 0.06em;
    margin-top: toRem(5);
    color: #4465aa;

    @include breakpoint-down(sm) {
      @include font-height(16, 28);
    }
  }

  .description {
    @include font-height(13.5, 15);
    margin-top: toRem(12);
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
