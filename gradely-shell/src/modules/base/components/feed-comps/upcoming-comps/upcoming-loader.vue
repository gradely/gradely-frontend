<template>
  <div class="upcoming-loader w-100">
    <div class="avatar skeleton-loader"></div>

    <div class="info w-100">
      <div class="line-one rounded-5 mgb-4 skeleton-loader"></div>
      <div class="line-two rounded-5 skeleton-loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "upcomingLoader",
};
</script>

<style lang="scss" scoped>
.upcoming-loader {
  @include flex-row-start-nowrap;

  .avatar {
    background: rgba($brand-black, 0.4);
    @include square-shape(36);
    margin-right: toRem(10);
  }

  .line-one {
    background: rgba($brand-black, 0.4);
    height: toRem(16);
    width: 95%;
  }

  .line-two {
    background: rgba($brand-black, 0.4);
    height: toRem(12);
    width: 60%;
  }
}
</style>
