<template>
  <div
    class="
      class-select-card
      rounded-5
      white-text-bg
      mgb-5
      box-shadow-effect
      position-relative
      overflow-hidden
      pointer
      smooth-animation
    "
    @click="$emit('classSelected', Number(class_data.class_id))"
  >
    <!-- LABEL  -->
    <div
      class="label position-absolute top-0 h-100"
      :class="$color.generateRandomColors()"
    ></div>

    <div class="class-name color-text">
      {{ class_data.class_name }}
    </div>

    <div class="avatar brand-inverse-bg" v-if="isActive">
      <div class="icon icon-correct white-text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "classSelectCard",

  props: {
    index: Number,
    class_data: Object,
  },

  computed: {
    isActive() {
      return this.$route.params.id == this.class_data.class_id ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.class-select-card {
  padding: toRem(14) toRem(10) toRem(14) toRem(20);
  @include flex-row-between-nowrap;

  @include breakpoint-down(sm) {
    padding: toRem(13) toRem(10) toRem(13) toRem(15);
  }

  &:hover {
    transform: scale(1.02);
  }

  .label {
    left: 0;
    width: toRem(4);
    background: $brand-accent;

    @include breakpoint-down(sm) {
      width: toRem(4);
    }
  }

  .class-name {
    @include font-height(12.5, 18);

    @include breakpoint-down(sm) {
      @include font-height(12.25, 17);
      padding-right: toRem(10);
    }

    @include breakpoint-down(xs) {
      @include font-height(12, 17);
    }
  }

  .avatar {
    @include square-shape(21);

    @include breakpoint-down(sm) {
      @include square-shape(18);
    }

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
