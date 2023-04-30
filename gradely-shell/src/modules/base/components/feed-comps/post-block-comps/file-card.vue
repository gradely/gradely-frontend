<template>
  <div class="file-card rounded-5 w-100 border-border-grey mgb-10 pd-10">
    <!-- LEFT  -->
    <div class="left">
      <div class="avatar avatar-square off-white-bg">
        <div class="icon" :class="$doc.getDocIconStyle(file.type)"></div>
      </div>

      <div class="info">
        <div class="title color-text mgb-2">File name goes here</div>
        <div class="meta color-grey-dark">Powerpoint. 122KB</div>
      </div>
    </div>

    <!-- RIGHT  -->
    <div class="right">
      <div class="avatar pointer" title="Remove file">
        <div class="icon icon-trash color-grey-dark"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fileCard",

  props: {
    file: Object,
  },
};
</script>

<style lang="scss" scoped>
.file-card {
  @include flex-row-between-nowrap;

  @include breakpoint-down(sm) {
    padding: toRem(8) !important;
  }

  .left {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(40);
      margin-right: toRem(10);

      @include breakpoint-down(sm) {
        @include square-shape(36);
        margin-right: toRem(8);
      }

      @include breakpoint-down(xs) {
        @include square-shape(34);
        margin-right: toRem(7);
      }

      .icon {
        @include center-placement;
        font-size: toRem(27);

        @include breakpoint-down(sm) {
          font-size: toRem(24);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(21);
        }
      }
    }

    .title {
      @include font-height(13, 19);

      @include breakpoint-down(lg) {
        @include font-height(13.25, 18);
        margin-bottom: toRem(1) !important;
      }

      @include breakpoint-down(sm) {
        @include font-height(13, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
      }
    }

    .meta {
      @include font-height(11.5, 16);

      @include breakpoint-down(lg) {
        @include font-height(11, 14);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.5, 13.4);
      }
    }
  }

  .right {
    .avatar {
      @include square-shape(30);
      border: 1px solid $border-grey;
      @include transition(0.4s);

      @include breakpoint-down(sm) {
        @include square-shape(28);
      }

      .icon {
        @include center-placement;
        @include transition(0.4s);
        font-size: toRem(15);

        @include breakpoint-down(sm) {
          font-size: toRem(14);
        }
      }

      &:hover {
        border: 1px solid $brand-red-light;
        .icon {
          color: $brand-tonic !important;
        }
      }
    }
  }
}
</style>
