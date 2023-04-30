<template>
  <div
    class="class-select-card rounded-5 white-text-bg mgb-5 box-shadow-effect position-relative overflow-hidden pointer smooth-transition"
  >
    <!-- LABEL  -->
    <div class="label brand-accent-bg position-absolute top-0 h-100"></div>

    <div class="child-info">
      <!-- CHILD AVATAR  -->
      <div class="avatar avatar-square">
        <div class="avatar-text">
          AO
        </div>
      </div>

      <div>
        <div class="child-name color-text mgb-1 font-weight-700">
          Andrew Oshinaga
        </div>

        <div class="child-code color-grey-dark">FDR/2021/432</div>
      </div>
    </div>

    <div class="avatar brand-inverse-bg">
      <div class="icon icon-correct white-text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "classSelectCard",
};
</script>

<style lang="scss" scoped>
.class-select-card {
  padding: toRem(16) toRem(10) toRem(16) toRem(20);
  @include flex-row-between-nowrap;

  @include breakpoint-down(sm) {
    padding: toRem(13) toRem(10) toRem(13) toRem(15);
  }

  @include breakpoint-down(xs) {
    padding: toRem(13) toRem(10) toRem(13) toRem(12);
  }

  &:hover {
    transform: scale(0.99);
  }

  .label {
    left: 0;
    width: toRem(6);

    @include breakpoint-down(sm) {
      width: toRem(4);
    }

    @include breakpoint-down(xs) {
      width: toRem(3.75);
    }
  }

  .child-info {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(42);
      margin-right: toRem(10);

      @include breakpoint-down(lg) {
        @include square-shape(38);
      }

      @include breakpoint-down(xs) {
        margin-right: toRem(8);
        @include square-shape(34);
      }
    }
  }

  .child-name {
    @include font-height(13.5, 19);

    @include breakpoint-down(lg) {
      @include font-height(13, 18);
    }

    @include breakpoint-down(sm) {
      @include font-height(12.25, 17);
      padding-right: toRem(10);
    }
  }

  .child-code {
    @include font-height(11.75, 16);

    @include breakpoint-down(lg) {
      @include font-height(11.5, 16);
    }

    @include breakpoint-down(md) {
      @include font-height(11, 16);
    }
  }

  .avatar {
    @include square-shape(21);

    @include breakpoint-down(sm) {
      @include square-shape(18);
    }

    .icon {
      @include center-placement;
      font-size: toRem(10);

      @include breakpoint-down(sm) {
        font-size: toRem(8);
      }
    }
  }
}
</style>
