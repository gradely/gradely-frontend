<template>
  <div class="no-subscription-state">
    <!-- CLOSE TRIGGER -->
    <div
      class="close-trigger pointer rounded-circle smooth-transition"
      title="Close"
      @click="$emit('closeOpenState')"
    >
      <div class="wrapper position-relative w-100 h-100">
        <div class="icon icon-close"></div>
      </div>
    </div>

    <img :src="mxStaticImg('NoSubscription.png')" alt="no-payment" />

    <div class="info">
      <div class="title-text font-weight-600 brand-navy">
        No Active Subscription !!
      </div>

      <div class="description color-grey-dark">
        Hi {{ getAuthUser.full_name }}, you currently do not have any active
        subscription to proceed with the post creation.
        <a href="" class="font-weight-600"> Subscribe now</a> and retry!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "noSubscriptionState",

  methods: {},
};
</script>

<style lang="scss" scoped>
.no-subscription-state {
  @include flex-row-center-nowrap;
  padding: toRem(50) toRem(40);
  position: relative;

  @include breakpoint-down(xs) {
    padding: toRem(50) toRem(30);
    align-items: flex-start;
  }

  @include breakpoint-custom-down(370) {
    padding: toRem(50) toRem(8);
  }

  .close-trigger {
    @include square-shape(28);
    @include square-shape(28);
    background: $color-white;
    position: absolute;
    overflow: hidden;
    top: toRem(20);
    right: toRem(20);

    @include breakpoint-down(xs) {
      @include square-shape(27);
      top: toRem(10);
      right: toRem(10);
    }

    .icon {
      @include center-placement;
      font-size: toRem(14);
      color: $border-grey-dark;

      @include breakpoint-down(xs) {
        font-size: toRem(13.5);
      }
    }

    &:hover {
      background: rgba($brand-accent-light, 0.5);
    }
  }

  img {
    margin-right: toRem(20);
    width: toRem(120);
    height: auto;

    @include breakpoint-down(lg) {
      width: toRem(110);
      margin-right: toRem(15);
    }

    @include breakpoint-down(md) {
      width: toRem(120);
    }

    @include breakpoint-down(xs) {
      width: toRem(90);
      margin-right: toRem(10);
    }

    @include breakpoint-custom-down(370) {
      width: toRem(80);
    }
  }

  .title-text {
    margin-bottom: toRem(12);
    @include font-height(15.5, 19);

    @include breakpoint-down(sm) {
      @include font-height(14.25, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(13.5, 17);
    }

    @include breakpoint-custom-down(370) {
      @include font-height(13.25, 17);
    }
  }

  .description {
    @include font-height(12.25, 22);

    @include breakpoint-down(xs) {
      @include font-height(11.5, 22);
    }

    @include breakpoint-custom-down(370) {
      @include font-height(11.25, 22);
    }

    a {
      color: $brand-inverse;

      &:hover {
        color: $brand-accent;
      }
    }
  }
}
</style>
