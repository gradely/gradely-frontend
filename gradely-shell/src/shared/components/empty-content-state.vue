<template>
  <div class="empty-content">
    <img
      v-lazy="
        image
          ? image
          : `${getAssetBaseURL(
              'cloud',
              'gradely'
            )}/image/upload/v1639028997/Empty_xful2j.svg`
      "
      alt=""
      class="mgb-5"
      :class="{ 'mini-img': mini }"
    />

    <div
      class="text-title font-weight-600 brand-navy mgb-12"
      :class="{ 'mini-text': mini }"
    >
      {{ title }}
    </div>

    <div class="text-content color-ash text-center">
      {{ content }}
    </div>

    <!-- EXTRA CTA TEXT -->
    <template v-if="extra_content.has_cta">
      <div
        class="extra-cta-text text-content color-ash text-center"
        v-if="extra_content.show_extra_text"
      >
        To fix this, click on "<span class="font-weight-600">{{
          extra_content.btn_text
        }}</span
        >" button below!
      </div>

      <div class="d-flex justify-content-center mgt-20">
        <button class="btn btn-accent" @click="$emit('buttonClicked')">
          {{ extra_content.btn_text }}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "emptyContentState",

  props: {
    image: String,
    title: String,
    content: String,
    mini: {
      type: Boolean,
      default: false,
    },
    extra_content: {
      type: Object,
      default: () => ({
        has_cta: false,
        show_extra_text: true,
        btn_text: "Add content",
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-content {
  @include full-width-height;
  @include stretch-area;
  @include flex-column-center;
  background: rgba($white-text, 0.15);
  mix-blend-mode: blur((25px));

  img {
    @include square-shape(190);

    @include breakpoint-down(lg) {
      @include square-shape(170);
      margin-bottom: toRem(5) !important;
    }

    @include breakpoint-down(sm) {
      margin-top: toRem(-30);
    }

    @include breakpoint-down(xs) {
      margin-bottom: toRem(-2) !important;
      @include square-shape(160);
    }
  }

  .mini-img {
    @include square-shape(140);
    margin-left: toRem(-25);
  }

  .text-title {
    @include font-height(17, 26);

    @include breakpoint-down(lg) {
      @include font-height(15.75, 22);
    }
  }

  .mini-text {
    font-size: toRem(12.5);
    position: relative;
    top: toRem(-15);
  }

  .text-content {
    @include font-height(13.75, 24);
    width: 40%;

    @include breakpoint-down(xl) {
      @include font-height(13.25, 24);
    }

    @include breakpoint-down(lg) {
      width: 75%;
    }

    @include breakpoint-down(sm) {
      width: 85%;
    }
  }

  .btn {
    font-size: toRem(10.5);
    padding: toRem(13) toRem(32);

    @include breakpoint-down(lg) {
      font-size: toRem(10);
    }

    @include breakpoint-down(xs) {
      margin-top: 0 !important;
    }
  }
}
</style>
