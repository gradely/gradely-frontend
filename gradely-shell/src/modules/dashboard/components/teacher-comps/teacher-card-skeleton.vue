<template>
  <div class="card-wrapper h-auto">
    <div class="teacher-card-skeleton rounded-15">
      <div
        class="avatar"
        :class="loading ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>

      <div
        class="top-text rounded-5 overflow-hidden"
        :class="loading ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>

      <div
        class="base-text rounded-5 overflow-hidden"
        :class="loading ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherCardSkeleton",

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  margin-bottom: toRem(23);
  padding: 0 0.9%;
  width: 25%;

  @include breakpoint-down(lg) {
    padding: 0 0.65%;
  }

  @include breakpoint-down(md) {
    margin-bottom: toRem(10);
    width: 33.33%;
  }

  @include breakpoint-down(sm) {
    padding: 0 1.5%;
    width: 50%;
  }

  @include breakpoint-down(xs) {
    margin-bottom: toRem(12);
  }
}

.teacher-card-skeleton {
  @include flex-column-center;
  background: rgba($white-text, 0.45);
  height: toRem(200);
  width: 100%;

  @include breakpoint-down(lg) {
    height: toRem(180);
  }

  @include breakpoint-down(xs) {
    height: toRem(130);
  }

  .avatar {
    position: relative;
    @include square-shape(64);
    margin-bottom: toRem(20);

    @include breakpoint-down(lg) {
      @include square-shape(50);
    }

    @include breakpoint-down(xs) {
      @include square-shape(40);
    }
  }

  .skeleton-loader {
    z-index: -1;
  }

  .top-text {
    position: relative;
    height: toRem(16);
    width: 60%;
    margin-bottom: toRem(10);

    @include breakpoint-down(xs) {
      height: toRem(14);
      width: 70%;
    }
  }

  .base-text {
    position: relative;
    height: toRem(13);
    width: 80%;

    @include breakpoint-down(xs) {
      height: toRem(12);
      width: 85%;
    }
  }
}
</style>
