<template>
  <div :class="`${mainClass}`" class="progress-bar-main">
    <div :class="`${backgroundClass}`" class="background">
      <div
        :class="`${fillClass}`"
        :style="{ width: `${fill}%` }"
        class="fill"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    fill: {
      type: Number,
      default: 20,
    },
    fillClass: {
      type: String,
      default: "",
    },
    backgroundClass: {
      type: String,
      default: "",
    },
    mainClass: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.progress-bar-main {
  width: 100%;
  height: 20px;
  border-radius: 30px;
  .background {
    background: #e5e5e5;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    .fill {
      background: #faa017;
      border-radius: 30px;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      transition: 0.5s;
    }
  }
}
</style>
