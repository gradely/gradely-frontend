<template>
  <div
    class="
      onboarding-layout
      gradely-container
      px-0 px-sm-1 px-md-1 px-xl-4
      mx-auto
    "
  >
    <div class="row mx-auto w-100 d-flex flex-column">
      <!-- NAV ROW  -->
      <div class="col-12 col-sm-10 col-md-7 mx-auto nav-row mgb-33 mgt-15">
        <!-- GRADELY LOGO  -->
        <div class="gradely-logo position-relative">
          <img v-lazy="mxStaticImg('Gradely.svg')" alt="GradelyNg" />
        </div>

        <!-- BACK BUTTON  -->
        <button class="btn" v-if="show_back" @click="$router.go(-1)">
          <div class="icon icon-arrow-left"></div>
          <div class="text">BACK</div>
        </button>
      </div>

      <div class="col-12 col-sm-10 col-md-7 onboarding-wrapper mx-auto">
        <div class="onboarding-block white-text-bg rounded-12 w-100">
          <!-- SKIP BUTTON  -->
          <button
            class="btn btn-default-outline skip-btn index-1"
            v-if="show_skip"
            @click="$emit('skip')"
          >
            Skip
          </button>

          <!-- DYNAMIC CONTENT  -->
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "onboardingNavLayout",

  props: {
    show_skip: {
      type: Boolean,
      default: false,
    },

    show_back: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.onboarding-layout {
  @include flex-column-center;
  justify-content: flex-start;
  padding-top: toRem(70);
  height: 100%;

  @include breakpoint-down(sm) {
    padding-top: toRem(50);
  }

  @include breakpoint-down(xs) {
    padding-top: toRem(45);
  }

  .nav-row {
    @include flex-row-between-nowrap;
    padding: 0 toRem(35) !important;

    @include breakpoint-down(xl) {
      padding: 0 toRem(28) !important;
    }

    @include breakpoint-down(lg) {
      padding: 0 toRem(22) !important;
    }

    @include breakpoint-custom-down(930) {
      padding: 0 toRem(5) !important;
    }

    @include breakpoint-down(md) {
      padding: 0 toRem(30) !important;
    }

    @include breakpoint-down(xs) {
      padding: 0 toRem(10) !important;
      margin-bottom: toRem(25) !important;
    }

    .gradely-logo {
      img {
        position: relative;
        left: toRem(-11);
        @include rectangle-shape(148, 45);

        @include breakpoint-custom-down(380) {
          @include rectangle-shape(138, 40);
        }
      }
    }

    .btn {
      @include flex-row-between-nowrap;
      background: $brand-inverse-light;
      padding: toRem(12) toRem(26);
      color: $brand-primary;

      @include breakpoint-down(xs) {
        padding: toRem(11) toRem(24);
      }

      .icon {
        font-size: toRem(15);
        margin-right: toRem(10);
        font-weight: 600;

        @include breakpoint-down(xs) {
          margin-right: toRem(6);
        }
      }

      .text {
        font-size: toRem(10.5);

        @include breakpoint-down(xs) {
          font-size: toRem(10);
        }
      }

      &:hover,
      &:focus {
        background: $brand-accent;
        color: $brand-navy !important;
        box-shadow: toRem(1) toRem(3) toRem(6) 0 rgba($brand-black, 0.4);
      }
    }
  }

  .onboarding-wrapper {
    padding: 0 toRem(25) !important;

    @include breakpoint-down(lg) {
      padding: 0 toRem(22) !important;
    }

    @include breakpoint-custom-down(930) {
      padding: 0 toRem(5) !important;
    }

    @include breakpoint-down(md) {
      padding: 0 toRem(30) !important;
    }

    @include breakpoint-down(xs) {
      padding: 0 toRem(10) !important;
    }

    .onboarding-block {
      box-shadow: 0 0 toRem(3) rgba($black-text, 0.15);
      padding: toRem(30) toRem(32) toRem(45);
      margin-bottom: toRem(40);

      @include breakpoint-custom-down(890) {
        padding: toRem(35) toRem(20) toRem(46);
      }

      @include breakpoint-down(sm) {
        padding: toRem(35) toRem(40) toRem(46);
      }

      @include breakpoint-down(xs) {
        padding: toRem(35) toRem(15) toRem(46);
      }

      @include breakpoint-custom-down(380) {
        padding: toRem(35) toRem(15) toRem(46);
      }

      @include breakpoint-custom-down(340) {
        padding: toRem(20) toRem(10) toRem(25);
      }

      .skip-btn {
        margin-left: auto;
        padding: toRem(8) toRem(22);
        font-size: toRem(11);

        @include breakpoint-down(xs) {
          padding: toRem(9) toRem(20);
        }
      }
    }
  }
}
</style>
