<template>
  <div
    class="select-view-card rounded-8 smooth-transition pointer ignore"
    @click="$emit('removeSelection', detail.id)"
  >
    <div class="text color-ash ignore">{{ detail.name }}</div>

    <div class="icon-decline color-ash ignore"></div>
  </div>
</template>

<script>
export default {
  name: "selectViewCard",

  props: {
    index: Number,
    detail: Object,
  },
};
</script>

<style lang="scss" scoped>
.select-view-card {
  @include flex-row-center-nowrap;
  border: 1px solid #e5e5e5;
  padding: toRem(5) toRem(9);
  margin-right: toRem(8);
  margin-bottom: toRem(8);
  width: max-content;

  &:hover {
    background: $brand-red-light;
  }

  .text {
    font-size: toRem(12);
    margin-right: toRem(7.5);

    @include breakpoint-down(xs) {
      font-size: toRem(11.5);
    }
  }

  .icon-decline {
    font-size: toRem(16);
    position: relative;
    top: toRem(1);
  }
}
</style>
