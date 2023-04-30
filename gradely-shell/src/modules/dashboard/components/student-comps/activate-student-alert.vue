<template>
  <div
    class="activate-student-alert border-brand-inverse brand-inverse-light-bg rounded-5"
  >
    <div class="left">
      <img v-lazy="mxStaticImg('Lock.svg')" alt="" />

      <div class="text brand-primary">
        Manage which student can use the app.

        <router-link
          :to="{ name: 'DashboardActivateStudent' }"
          class="text-link font-weight-600 link-underline smooth-transition"
        >
          Activate your Students now
        </router-link>
      </div>
    </div>

    <div class="right">
      <div class="avatar pointer smooth-transition" @click="goToActivationPage">
        <div class="icon icon-arrow-right smooth-transition"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activateStudentAlert",

  methods: {
    goToActivationPage() {
      this.$router.push({ name: "DashboardActivateStudent" });
    },
  },
};
</script>

<style lang="scss" scoped>
.activate-student-alert {
  @include flex-row-between-nowrap;
  padding: toRem(12) toRem(17);
  margin-bottom: toRem(45);

  @include breakpoint-down(xl) {
    padding: toRem(12) toRem(16);
  }

  @include breakpoint-down(lg) {
    padding: toRem(10) toRem(14);
    margin-bottom: toRem(38);
  }

  @include breakpoint-down(md) {
    margin-bottom: toRem(32);
  }

  @include breakpoint-down(xs) {
    padding: toRem(8) toRem(12);
  }

  .left {
    @include flex-row-start-nowrap;

    img {
      @include square-shape(21);
      margin-right: toRem(8);
      margin-top: toRem(-2);
    }

    .text {
      @include font-height(13, 18);

      @include breakpoint-down(lg) {
        @include font-height(12.25, 17);
      }

      @include breakpoint-down(md) {
        @include font-height(12, 16);
      }

      @include breakpoint-down(sm) {
        @include font-height(11.5, 15);
        padding-right: toRem(15);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 17);
      }

      .text-link {
        &:hover {
          color: $brand-accent !important;
        }
      }
    }
  }

  .right {
    .avatar {
      @include square-shape(32);
      background: $brand-accent;

      @include breakpoint-down(xl) {
        @include square-shape(30);
      }

      .icon {
        @include center-placement;
        font-size: toRem(13.5);
        color: $brand-primary;

        @include breakpoint-down(xl) {
          font-size: toRem(12);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(11);
        }
      }

      &:hover {
        background: $brand-primary;
        .icon {
          color: $white-text;
        }
      }
    }
  }
}
</style>
