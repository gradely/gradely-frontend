<template>
  <div class="error-page">
    <img v-lazy="mxStaticImg('404.svg', 'static')" alt="" class="error-bg" />

    <div class="error-overlay-bg position-absolute"></div>

    <div class="container mgt-50 px-3 px-sm-1 position-relative index-1">
      <!-- GRADELY LOG0 -->
      <div class="gradely-logo position-relative mgb-65">
        <img
          :src="mxStaticImg('Gradely.svg')"
          alt=""
          class="position-absolute w-100 h-100"
        />
      </div>

      <!-- BOTTOM ROW -->
      <div class="bottom-row">
        <div class="error-title-text brand-red font-weight-bold mgb-15">
          404
        </div>

        <div class="title-text font-weight-bold color-text mgb-20">
          What am I doing here?
        </div>

        <div class="row">
          <div class="col-12 col-md-5">
            <div class="meta-text mgb-25">
              Trust me, that’s the same thing we are wondering.
            </div>

            <div class="meta-text">
              While we figure that out though, kindly return to where you are
              coming from.
            </div>
          </div>
        </div>

        <!-- GO BACK BUTTON  -->
        <button class="btn btn-md btn-accent mgt-45" @click="$router.go(-1)">
          <span
            class="icon icon-arrow-left mgr-5 position-relative font-weight-600 gfont-15"
          ></span>
          GO BACK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",

  metaInfo: {
    title: "Page not found",
  },
};
</script>

<style lang="scss" scoped>
.error-page {
  @include fixed-display-area;

  .error-bg {
    @include background-cover;
  }

  .error-overlay-bg {
    @include stretch-area;
    opacity: 0.8;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 80%
    );
  }

  .gradely-logo {
    @include rectangle-shape(140, 50);
  }

  .error-title-text {
    @include font-height(145, 197);
    letter-spacing: 0.05em;

    @include breakpoint-down(sm) {
      @include font-height(135, 185);
    }
  }

  .title-text {
    @include font-height(30, 44);
    letter-spacing: 0.05em;

    @include breakpoint-down(sm) {
      @include font-height(25, 40);
    }
  }

  .meta-text {
    @include font-height(17, 25);
    letter-spacing: 0.045em;
    color: $brand-black;
    font-weight: 500;

    @include breakpoint-down(sm) {
      @include font-height(15.5, 20);
    }
  }
}
</style>
