<template>
  <div class="profile-wrapper">
    <div class="title-text color-text font-weight-700">
      {{ title }}
    </div>

    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "profileWrapper",

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-wrapper {
  margin-bottom: toRem(30);

  .title-text {
    @include font-height(16, 25);
    border-bottom: toRem(1) solid $border-grey;
    margin-bottom: toRem(20);
    padding-bottom: toRem(8);

    @include breakpoint-down(sm) {
      @include font-height(15, 22);
    }

    @include breakpoint-down(xs) {
      @include font-height(14, 21);
    }
  }
}
</style>
