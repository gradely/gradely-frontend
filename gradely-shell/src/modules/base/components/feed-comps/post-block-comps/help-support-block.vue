<template>
  <div class="help-text color-ash">
    Need more help?
    <a href="tel:(+234)8100598268" class="btn-link link-no-underline"
      >Contact us</a
    >
    for support
  </div>
</template>

<script>
export default {
  name: "helpSupportBlock",
};
</script>

<style lang="scss" scoped>
.help-text {
  @include font-height(12.75, 19);

  @include breakpoint-down(xl) {
    @include font-height(12, 18);
  }

  @include breakpoint-down(xs) {
    @include font-height(11.85, 15);
  }
}
</style>