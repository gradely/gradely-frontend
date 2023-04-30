<template>
  <div
    class="avatar-card avatar overflow-hidden smooth-transition pointer"
    :class="card_type === 'junior' ? 'rounded-circle' : 'rounded-10'"
    @click="$emit('click')"
  >
    <img
      v-lazy="
        isServerImage ? avatar.image : mxStaticImg(avatar.name, 'onboarding')
      "
      alt="avatar"
    />

    <!-- SELECTED OVERLAY  -->
    <template v-if="avatar.selected">
      <div class="selected-overlay position-absolute w-100 h-100"></div>

      <!-- SELECTED  -->
      <div class="selected-marker avatar index-1">
        <div class="position-absolute w-100 h-100">
          <div class="icon icon-accept"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "avatarCard",

  props: {
    avatar: {
      type: Object,
      default: () => ({
        id: 1,
        name: "One.png",
        selected: false,
      }),
    },

    card_type: {
      typs: String,
      required: true,
    },
  },

  computed: {
    isServerImage() {
      return (
        this.avatar?.name?.startsWith("http") ||
        this.avatar?.image?.startsWith("http")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-card {
  border: toRem(1) solid rgba(#e5e5e5, 0.6);
  @include square-shape(120);
  @include flex-column-center;
  margin: toRem(7);

  img {
    height: 100%;
    width: max-content;
  }

  @include breakpoint-down(md) {
    @include square-shape(100);
  }

  @include breakpoint-down(xs) {
    @include square-shape(90);
    margin: toRem(4.5);
  }

  @include breakpoint-custom-down(355) {
    @include square-shape(80);
    margin: toRem(4);
  }

  @include breakpoint-custom-down(316) {
    @include square-shape(75);
    margin: toRem(3);
  }

  .selected-overlay {
    background: $white-text;
    opacity: 0.45;
  }

  .selected-marker {
    @include square-shape(40);
    @include center-placement;
    background: rgba($black-text, 0.95);
    border: toRem(2) solid $brand-inverse;

    @include breakpoint-down(xs) {
      @include square-shape(30);
    }

    .icon {
      @include center-placement;
      font-size: toRem(18);
      color: $brand-inverse;
    }
  }

  &:hover {
    border: toRem(1) solid $brand-inverse;
    box-shadow: 0 0 toRem(1) rgba($black-text, 0.1);
  }
}
</style>
