<template>
  <div class="d-flex align-item chip white-text">
    <div class="gfont-13">Presentation</div>
    <div class="icon white-text" :class="getIcon"></div>
  </div>
</template>

<script>
export default {
  name: 'TitleChip',

  props: {
    type: {
      type: String,
      default: '',
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.chip {
  background: rgba(0, 0, 0, 0.3);
  border-radius: toRem(30);
  padding: toRem(8) toRem(16);
  gap: 0 toRem(3);
}
</style>