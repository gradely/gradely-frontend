<template>
  <div
    class="app-banner position-relative white-text-bg rounded-7 overflow-hidden"
  >
    <div class="content index-1">
      <!-- TITLE TEXT  -->
      <div class="title-text font-weight-600 brand-navy">
        Extend Gradely for your school.
      </div>

      <!-- DESCRIPTION  -->
      <div class="description color-ash">
        Create report cards, mark attendance, collect payments and more - all
        within Gradely
      </div>

      <!-- BUTTON  -->
      <button class="btn btn-accent" v-if="false">Discover Apps</button>
    </div>

    <!-- ADD ONS  -->
    <div class="add-ons">
      <!-- APP DISCOVERY  -->
      <img
        v-lazy="mxStaticImg('AppDiscovery.png', 'dashboard')"
        alt=""
        class="position-absolute app-discovery"
      />

      <!-- APP STARS  -->
      <img
        v-lazy="mxStaticImg('AppStars.png', 'dashboard')"
        alt=""
        class="position-absolute app-stars"
      />

      <!-- APP ICONS  -->
      <img
        v-lazy="mxStaticImg('AppIcons.png', 'dashboard')"
        alt=""
        class="position-absolute app-icons"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "appBanner",
};
</script>

<style lang="scss" scoped>
.app-banner {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  @include flex-row-start-nowrap;
  height: toRem(275);
  padding: 0 toRem(50);

  @include breakpoint-down(xl) {
    padding: 0 toRem(40);
  }

  @include breakpoint-down(lg) {
    padding: 0 toRem(25);
  }

  @include breakpoint-down(sm) {
    padding: 0 toRem(18);
  }

  @include breakpoint-down(xs) {
    height: toRem(220);
  }

  @include breakpoint-custom-down(390) {
    padding: 0 toRem(10);
  }

  .content {
    width: 40%;

    @include breakpoint-down(xl) {
      width: 50%;
    }

    @include breakpoint-down(md) {
      width: 60%;
    }

    @include breakpoint-down(sm) {
      width: 80%;
    }
    @include breakpoint-down(xs) {
      width: 90%;
    }

    @include breakpoint-custom-down(390) {
      width: 100%;
    }

    .title-text {
      @include font-height(24, 35);
      margin-bottom: toRem(9);

      @include breakpoint-down(xl) {
        @include font-height(22, 32);
      }

      @include breakpoint-down(lg) {
        @include font-height(20.5, 30);
      }

      @include breakpoint-down(sm) {
        @include font-height(18, 28);
      }

      @include breakpoint-down(xs) {
        @include font-height(17.5, 25);
      }

      @include breakpoint-custom-down(380) {
        @include font-height(16, 22);
      }
    }

    .description {
      @include font-height(14.75, 26);
      // margin-bottom: toRem(30);

      @include breakpoint-down(xl) {
        @include font-height(14, 25);
      }

      @include breakpoint-down(lg) {
        @include font-height(13.25, 23);
      }

      @include breakpoint-down(sm) {
        @include font-height(13, 22);
        // margin-bottom: toRem(25);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.45, 20);
        // margin-bottom: toRem(20);
      }
    }

    .btn {
      font-size: toRem(10.5);
      padding: toRem(12) toRem(27);

      @include breakpoint-down(sm) {
        font-size: toRem(10);
        padding: toRem(11) toRem(24);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(10);
        padding: toRem(10) toRem(22);
      }
    }
  }

  .add-ons {
    .app-discovery {
      bottom: 0;
      left: 0;

      @include breakpoint-down(sm) {
        @include rectangle-shape(180, 110);
      }

      @include breakpoint-down(xs) {
        @include rectangle-shape(160, 80);
      }
    }

    .app-stars {
      top: 0;
      right: 0;

      @include breakpoint-down(sm) {
        top: toRem(-20);
        right: toRem(-20);
        @include rectangle-shape(300, 160);
      }

      @include breakpoint-down(xs) {
        top: toRem(-40);
        right: toRem(-40);
        @include rectangle-shape(270, 130);
      }

      @include breakpoint-custom-down(350) {
        top: toRem(-60);
        right: toRem(-60);
      }
    }

    .app-icons {
      @include center-y;
      right: toRem(50);

      @include breakpoint-down(xl) {
        right: toRem(40);
      }

      @include breakpoint-down(lg) {
        right: toRem(25);
      }

      @include breakpoint-down(sm) {
        right: toRem(-60);
      }

      @include breakpoint-down(xs) {
        right: toRem(-140);
      }

      @include breakpoint-custom-down(390) {
        right: toRem(-210);
      }

      @include breakpoint-custom-down(350) {
        display: none;
      }
    }
  }
}
</style>
