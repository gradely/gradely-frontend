<template>
  <div
    class="remedial-alert-card rounded-10 border-brand-inverse brand-inverse-light-bg mgb-30"
  >
    <!-- AVATAR  -->
    <div class="avatar avatar-square">
      <img
        v-lazy="mxStaticImg('Eniola.jpg', 'base')"
        alt=""
        class="avatar-img"
      />
    </div>

    <!-- INFO SECTION  -->
    <div class="info">
      <!-- TITLE TEXT  -->
      <div class="title-text font-weight-600">Eniola from Gradely</div>

      <!-- DESCRIPTION  -->
      <div class="description">
        Sometimes your students will need your friendly face to drive home the
        point of a topic. This is why we recommend remedial classes. See how
        easy it is to create a remedial class.
      </div>

      <!-- BUTTON CTA  -->
      <div class="btn-cta rounded-30 white-text-bg pointer">
        <div class="icon icon-videocam brand-inverse"></div>
        <div class="text font-weight-600 brand-navy">
          Schedule a Remedial Class
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "remedialAlertCard",
};
</script>

<style lang="scss" scoped>
.remedial-alert-card {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  padding: toRem(20);

  @include breakpoint-down(sm) {
    padding: toRem(15);
  }

  @include breakpoint-down(xs) {
    padding: toRem(13) toRem(10);
  }

  @include breakpoint-custom-down(360) {
    padding: toRem(12) toRem(8);
  }

  .avatar {
    @include square-shape(44);
    margin-right: toRem(15);

    @include breakpoint-down(sm) {
      @include square-shape(41);
      margin-right: toRem(12);
    }

    @include breakpoint-down(xs) {
      @include square-shape(38);
      margin-right: toRem(10);
    }
  }

  .title-text {
    @include font-height(14.75, 18);
    margin-bottom: toRem(7);

    @include breakpoint-down(sm) {
      @include font-height(14, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(13.5, 17);
    }
  }

  .description {
    @include font-height(12.75, 21);
    margin-bottom: toRem(18);

    @include breakpoint-down(sm) {
      @include font-height(12.5, 21);
    }

    @include breakpoint-down(xs) {
      @include font-height(12, 22);
    }

    @include breakpoint-custom-down(360) {
      @include font-height(11.5, 21);
    }
  }

  .btn-cta {
    @include flex-row-start-nowrap;
    padding: toRem(9) toRem(16);
    width: max-content;
    @include transition(0.4s);

    .icon {
      font-size: toRem(19);
      margin-right: toRem(8);
      @include transition(0.4s);
    }

    .text {
      font-size: toRem(11);
      @include transition(0.4s);

      @include breakpoint-down(xs) {
        // font-size: toRem(10.7);
      }
    }

    &:hover {
      box-shadow: 0 toRem(1) toRem(4) rgba($brand-black, 0.15);
      background: $brand-primary !important;
      .icon,
      .text {
        color: $white-text !important;
      }
    }
  }
}
</style>
