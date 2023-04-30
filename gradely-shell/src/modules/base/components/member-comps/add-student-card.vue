<template>
  <div class="card-wrapper">
    <div class="add-student-card rounded-10 pointer smooth-transition">
      <div class="avatar">
        <div class="icon icon-user-plus smooth-transition"></div>
      </div>

      <div class="text-title smooth-transition">Add Student</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addStudentCard",
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 25%;
  margin-bottom: toRem(15);
  padding: 0 0.9%;

  @include breakpoint-down(lg) {
    padding: 0 1%;
    width: 33.33%;
  }

  @include breakpoint-down(sm) {
    width: 100%;
    margin-bottom: toRem(7);
  }

  .add-student-card {
    position: relative;
    height: toRem(200);
    border: toRem(1) dashed $border-grey-dark;
    @include flex-column-center;

    @include breakpoint-down(xl) {
      height: toRem(180);
    }

    @include breakpoint-down(sm) {
      @include flex-row-start-nowrap;
      height: toRem(70);
      padding: toRem(12);
    }

    @include breakpoint-down(xs) {
      height: toRem(55);
      padding: toRem(10);
      border-radius: toRem(5) !important;
    }

    @include breakpoint-custom-down(360) {
      height: toRem(52);
      padding: toRem(7);
    }

    .avatar {
      @include square-shape(62);
      margin-bottom: toRem(12);

      @include breakpoint-down(xl) {
        @include square-shape(54);
      }

      @include breakpoint-down(sm) {
        @include square-shape(46);
        margin-bottom: 0;
        margin-right: toRem(10);
      }

      @include breakpoint-down(xs) {
        @include square-shape(38);
        margin-right: toRem(8);
      }

      .icon {
        @include center-placement;
        font-size: toRem(42);
        color: $border-grey-dark;

        @include breakpoint-down(xl) {
          font-size: toRem(38);
        }

        @include breakpoint-down(sm) {
          font-size: toRem(32);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(23);
        }
      }
    }

    .text-title {
      @include font-height(13.25, 19);
      color: $color-text;

      @include breakpoint-down(xl) {
        @include font-height(12.25, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
      }
    }

    &:hover {
      border: toRem(1) dashed $brand-accent;

      .avatar {
        .icon {
          color: $brand-accent;
        }
      }

      .text-title {
        color: darken($brand-accent, 5%);
      }
    }
  }
}
</style>
