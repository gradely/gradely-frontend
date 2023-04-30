<template>
  <div class="about-me-block">
    <!-- BIO TEXT  -->
    <div class="bio-text color-text">
      {{
        teacher.profile.about
          ? teacher.profile.about
          : "This section shows a short profile description about your selected teacher..."
      }}
    </div>

    <!-- EXTRA INFO  -->
    <div class="extra-info rounded-5">
      <!-- PHONE  -->
      <div class="info-column">
        <div class="avatar">
          <div class="icon icon-phone"></div>
        </div>
        <div class="text">
          {{ teacher.phone ? teacher.phone : "080*********545" }}
        </div>
      </div>

      <!-- EMAIL  -->
      <div class="info-column">
        <div class="avatar">
          <div class="icon icon-email"></div>
        </div>
        <div class="text">
          {{ teacher.email ? teacher.email : "teacher********@gradely.ng" }}
        </div>
      </div>

      <!-- ADDRESS  -->
      <div class="info-column">
        <div class="avatar">
          <div class="icon icon-map"></div>
        </div>
        <div class="text">
          {{
            teacher.profile.address ? teacher.profile.address : "Lagos, Nigeria"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutMeBlock",

  props: {
    teacher: {
      type: Object,
      default: () => ({
        phone: "",
        email: "",
        profile: {
          about: "",
          address: "",
        },
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.about-me-block {
  .bio-text {
    @include font-height(14, 26);
    margin-bottom: toRem(20);

    @include breakpoint-down(lg) {
      @include font-height(13.5, 25);
    }

    @include breakpoint-down(sm) {
      @include font-height(13, 24);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.5, 24);
    }

    @include breakpoint-custom-down(380) {
      @include font-height(12, 24);
    }
  }

  .extra-info {
    padding: toRem(19) toRem(18);
    background: rgba(#e5e5e5, 0.8);

    @include breakpoint-down(lg) {
      padding: toRem(15);
    }

    @include breakpoint-down(sm) {
      padding: toRem(11);
    }

    @include breakpoint-custom-down(380) {
      padding: toRem(6);
    }

    .info-column {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(5);

      &:last-of-type {
        margin-bottom: 0;
      }

      .avatar {
        @include square-shape(28);
        margin-right: toRem(13);

        @include breakpoint-down(xs) {
          margin-right: toRem(8);
        }

        @include breakpoint-custom-down(380) {
          margin-right: toRem(5);
        }

        .icon {
          @include center-placement;
          color: $brand-inverse;
          font-size: toRem(16);

          @include breakpoint-down(sm) {
            font-size: toRem(15);
          }

          @include breakpoint-custom-down(380) {
            font-size: toRem(14);
          }
        }
      }

      .text {
        @include font-height(13, 18);
        color: $color-text;

        @include breakpoint-down(lg) {
          @include font-height(13, 18);
        }

        @include breakpoint-down(sm) {
          @include font-height(12.5, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(12, 16);
        }

        @include breakpoint-custom-down(380) {
          @include font-height(11.5, 15);
        }
      }
    }
  }
}
</style>
