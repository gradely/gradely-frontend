<template>
  <div class="card-wrapper position-relative">
    <div class="member-student-card w-100 rounded-10 position-relative">
      <!-- USER IMAGE  -->
      <div
        class="avatar"
        :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>

      <!-- USER INFO  -->
      <div class="info w-100">
        <div
          class="line-one rounded-5 mgb-5"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
        <div
          class="line-two rounded-5"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
      </div>

      <!-- BOTTOM  -->
      <div class="bottom">
        <template>
          <div
            class="line-three rounded-5"
            :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "memberStudentSkeleton",

  props: {
    loading_state: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  margin-bottom: toRem(15);
  padding: 0 0.6%;
  width: 25%;

  @include breakpoint-down(lg) {
    padding: 0 1%;
    width: 33.33%;
  }

  @include breakpoint-down(sm) {
    margin-bottom: toRem(7);
    padding: 0 0.5%;
    width: 100%;
  }

  .member-student-card {
    background: rgba($white-text, 0.5);
    @include flex-column-center;
    height: toRem(210);

    @include breakpoint-down(xl) {
      height: toRem(200);
    }

    @include breakpoint-down(sm) {
      @include flex-row-start-nowrap;
      padding: toRem(12);
      height: toRem(70);
    }

    @include breakpoint-down(xs) {
      border-radius: toRem(5) !important;
      padding: toRem(10);
      height: toRem(65);
    }

    @include breakpoint-custom-down(360) {
      height: toRem(60);
      padding: toRem(7);
    }

    .avatar {
      @include square-shape(75);
      margin-bottom: toRem(15);
      margin-top: toRem(-18);

      @include breakpoint-down(xl) {
        @include square-shape(62);
      }

      @include breakpoint-down(md) {
        @include square-shape(68);
      }

      @include breakpoint-down(sm) {
        @include square-shape(46);
        margin-bottom: 0;
        margin-right: toRem(10);
        margin-top: unset;
        border-radius: toRem(7) !important;
      }

      @include breakpoint-down(xs) {
        @include square-shape(38);
        margin-right: toRem(8);
      }
    }

    .info {
      @include flex-column-center;

      .line-one {
        width: 50%;
        height: toRem(15);
      }

      .line-two {
        width: 70%;
        height: toRem(12);
      }
    }

    .bottom {
      @include flex-row-center-nowrap;
      margin-top: toRem(13);
      padding-top: toRem(10);
      margin-bottom: toRem(-25);
      width: 92%;

      @include breakpoint-down(xl) {
        padding-top: toRem(12);
      }

      @include breakpoint-down(sm) {
        display: none;
      }

      .line-three {
        width: 80%;
        height: toRem(15);
      }
    }
  }
}
</style>
