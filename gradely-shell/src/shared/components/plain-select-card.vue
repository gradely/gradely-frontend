<template>
  <div
    class="plain-select-card box-shadow-effect"
    @click="$emit('selected', index)"
  >
    <!-- LABEL  -->
    <div class="label" :class="$color.getProfileBgColor(item.name)"></div>

    <div class="text">{{ item.name }}</div>

    <!-- SELECTED  -->
    <div class="avatar" v-if="item.selected">
      <div class="icon icon-accept"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "plainSelectCard",

  props: {
    index: Number,
    item: Object,
  },
};
</script>

<style lang="scss" scoped>
.plain-select-card {
  @include flex-row-between-nowrap;
  @include transition(0.3s);
  position: relative;
  padding: toRem(12) toRem(14);
  margin-bottom: toRem(5);
  border-radius: toRem(5);
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background: $brand-inverse-light;
  }

  .label {
    position: absolute;
    height: 100%;
    width: toRem(4);
    left: 0;
    top: 0;
  }

  .text {
    @include font-height(13, 18);
    color: $color-text;
    text-transform: capitalize;

    @include breakpoint-down(sm) {
      @include font-height(12.25, 17);
    }
  }

  .avatar {
    @include square-shape(20);
    background: $brand-inverse;

    .icon {
      @include center-placement;
      font-size: toRem(16);
      color: $white-text;
    }
  }
}
</style>
