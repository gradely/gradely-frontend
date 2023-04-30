<template>
  <div
    :class="customClass"
    class="header-top white-text-bg navigation-shadow-effect h-auto index-9"
  >
    <slot name="inner-main-body"> </slot>
  </div>
</template>
<script>
export default {
  name: "HeaderTop",
  props: {
    customClass: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.header-top {
  position: relative;
  z-index: 99;
  box-shadow: 0px 1px 4px #00000026;
}
</style>
