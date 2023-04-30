<template>
  <div
    class="mode-select-card rounded-5 color-white-bg mgb-10 pointer smooth-transition"
    @click="$emit('modeSelected', mode_index)"
  >
    <div class="mode-info">
      <!-- CHILD AVATAR  -->
      <div
        class="avatar"
        :class="
          mode_index === 0 ? ' brand-red-light-bg' : ' brand-accent-light-bg'
        "
      >
        <img v-lazy="mxStaticImg(mode.image)" alt="" class="" />
      </div>

      <div>
        <div class="mode-name brand-navy mgb-1 font-weight-700">
          {{ mode.name }}
        </div>

        <div class="mode-text color-grey-dark">
          {{ mode.description }}
        </div>
      </div>
    </div>

    <div
      class="avatar smooth-transition"
      :class="mode.selected ? 'brand-inverse-bg' : 'border-border-grey'"
    >
      <div
        class="icon icon-correct white-text smooth-transition"
        v-if="mode.selected"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modeSelectCard",

  props: {
    mode_index: Number,

    mode: {
      type: Object,
      default: () => ({
        image: "Path.svg",
        name: "Practice Mode",
        description: "Practice with Gradely Questions",
        selected: "false",
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.mode-select-card {
  padding: toRem(11) toRem(14);
  @include flex-row-between-nowrap;

  @include breakpoint-down(xs) {
    padding: toRem(11) toRem(10);
  }

  .mode-info {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(38);
      margin-right: toRem(10);

      @include breakpoint-down(xs) {
        @include square-shape(33);
        margin-right: toRem(6);
      }

      img {
        @include center-placement;
        @include square-shape(26);

        @include breakpoint-down(xs) {
          @include square-shape(23);
        }
      }
    }
  }

  .mode-name {
    @include font-height(12.5, 18);
    margin-bottom: toRem(3);

    @include breakpoint-down(xs) {
      @include font-height(11, 17);
    }
  }

  .mode-text {
    @include font-height(11, 16);
    letter-spacing: 0.01em;

    @include breakpoint-down(xs) {
      @include font-height(11, 14);
    }

    @include breakpoint-custom-down(340) {
      @include font-height(10.5, 13);
    }
  }

  .avatar {
    @include square-shape(22);

    .icon {
      @include center-placement;
      font-size: toRem(10);

      @include breakpoint-down(sm) {
        font-size: toRem(8);
      }
    }
  }
}
</style>
