<template>
  <div class="video-preview position-relative overflow-hidden rounded-10">
    <img v-lazy="mxStaticImg('VideoPoster.png')" alt="" />

    <!-- PLAY ICON  -->
    <div class="play-icon smooth-transition">
      <div class="icon icon-play-bg brand-accent-light"></div>
    </div>

    <!-- LOADING ICON  -->
    <div
      class="loading-icon smooth-transition"
      v-if="attachment.status !== 'completed'"
    >
      <div class="icon icon-dotted-spinner color-white animate"></div>
    </div>

    <!-- CLOSE TRIGGER -->
    <div
      class="close-trigger rounded-circle overflow-hidden pointer black-text-bg smooth-transition"
      title="Remove attachment"
      @click="$bus.$emit('removeUploadedFile', attachment)"
    >
      <div class="position-relative w-100 h-100">
        <div class="icon icon-close white-text"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoPreview",

  props: {
    attachment: Object,
  },
};
</script>

<style lang="scss" scoped>
.video-preview {
  @include rectangle-shape(120, 90);
  margin: toRem(5);

  img {
    @include background-cover;
  }

  .loading-icon,
  .play-icon {
    @include center-placement;
    .icon {
      font-size: toRem(25);
    }
  }

  .loading-icon {
    .icon {
      font-size: toRem(34);
    }
  }

  .close-trigger {
    @include square-shape(22);
    position: absolute;
    right: toRem(5);
    top: toRem(5);

    .icon {
      @include center-placement;
      font-size: toRem(11.25);
    }

    &:hover {
      background: $brand-tonic !important;
    }
  }
}
</style>
