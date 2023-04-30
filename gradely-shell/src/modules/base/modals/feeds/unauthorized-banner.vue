<template>
  <div class="unauthorized-banner w-100 h-auto brand-inverse-bg index-9">
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5">
      <!-- INFO SECTION -->
      <div class="info-section">
        <!-- TOP TEXT -->
        <div class="top-text font-weight-600 brand-navy">
          Find and interact with top teachers around you
        </div>

        <!-- BOTTOM TEXT -->
        <div class="bottom-text brand-navy">
          Gradely is the one app you need to engage your student and develop
          launch your teaching career. Sign up to continue.
        </div>
      </div>

      <!-- CTA SECTION -->
      <div class="cta-section">
        <a
          :href="`${base_url}/auth/signup-lander`"
          class="btn btn-accent mgb-5 smooth-transition"
        >
          New? Sign Up on Gradely
        </a>

        <a
          :href="`${base_url}/auth/login`"
          class="btn btn-whitish mgt-5 smooth-transition"
        >
          Have an account? Log In
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { APP_BASE_URL } from "@/env";

export default {
  name: "unauthorizedBanner",

  data() {
    return {
      base_url: APP_BASE_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
.unauthorized-banner {
  padding: toRem(22) 0;
  position: fixed;
  bottom: 0;
  left: 0;

  .gradely-container {
    @include flex-row-between-nowrap;

    @include breakpoint-down(sm) {
      @include flex-row-between-wrap;
    }

    .info-section {
      width: 50%;

      @include breakpoint-down(md) {
        width: 65%;
      }

      @include breakpoint-down(sm) {
        margin-bottom: toRem(10);
        width: 100%;
      }

      .top-text {
        @include font-height(15.75, 28);
        margin-bottom: toRem(7);

        @include breakpoint-down(md) {
          @include font-height(14, 24);
          margin-bottom: toRem(5);
        }
      }

      .bottom-text {
        @include font-height(13.5, 24);

        @include breakpoint-down(md) {
          @include font-height(13, 22);
        }
      }
    }

    .cta-section {
      @include flex-column-end-end;
      width: 50%;

      @include breakpoint-down(md) {
        width: 45%;
      }

      @include breakpoint-down(sm) {
        @include flex-row-start-wrap;
        width: 100%;
      }

      .btn {
        @include breakpoint-down(md) {
          font-size: toRem(10.5);
        }

        @include breakpoint-down(sm) {
          margin: 0 !important;

          &:first-of-type {
            margin-right: toRem(9) !important;
          }
        }

        @include breakpoint-down(xs) {
          width: 100%;
          margin: 0 !important;

          &:first-of-type {
            margin-bottom: toRem(10) !important;
          }
        }
      }
    }
  }
}
</style>