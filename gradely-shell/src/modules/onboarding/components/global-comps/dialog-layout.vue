<template>
  <div
    class="
      verification-dialog
      gradely-container
      px-0 px-sm-3 px-md-4 px-xl-4
      mx-auto
    "
  >
    <!-- GRADELY LOGO  -->
    <div class="gradely-logo position-relative">
      <img :src="mxStaticImg('Gradely.svg')" loading="lazy" alt="Gradely.Ng" />
    </div>

    <!-- VERIFICATION BLOCK  -->
    <div class="row mx-auto w-100">
      <div class="col-12 col-sm-10 col-md-7 col-lg-6 mx-auto wrapper">
        <div class="verification-block white-text-bg rounded-12 w-100">
          <!-- VERIFICATION AVATAR  -->
          <div class="verify-avatar">
            <img
              :src="
                isServerImage
                  ? dialog_image
                  : mxStaticImg(dialog_image, 'onboarding')
              "
              alt="Gradely.Ng"
              loading="lazy"
            />
          </div>

          <!-- CONTENT AREA  -->
          <div class="content-area">
            <!-- TITLE TEXT  -->
            <div class="title-text text-center brand-navy font-weight-700">
              {{ dialog_title }}
            </div>

            <!-- META TEXT  -->
            <div
              class="meta-text text-center color-ash"
              v-if="dialog_title === 'Verify your Account'"
            >
              <template v-if="user_contact === 'No contact'">
                You currently do not have any contact available, to verify your
                account.
                <span
                  class="btn-link pointer"
                  @click="$emit('toggleProfileUpdate')"
                  >Update Contact</span
                >
              </template>

              <template v-else>
                Enter the 6 digit code sent to
                <span class="font-weight-600"> {{ user_contact }} </span>to
                verify your account.
              </template>
            </div>

            <div class="meta-text text-center color-ash" v-else>
              {{ welcome_text }}
            </div>

            <!-- DYNAMIC CONTENT ENTRY POINT  -->
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dialogLayout",

  props: {
    dialog_image: {
      type: String,
      required: true,
    },

    dialog_title: {
      type: String,
      required: true,
    },

    user_contact: String,
    welcome_text: String,
  },

  computed: {
    isServerImage() {
      return this.dialog_image.startsWith("http");
    },
  },
};
</script>

<style lang="scss" scoped>
.verification-dialog {
  @include flex-column-center;
  justify-content: flex-start;
  height: 100%;

  .gradely-logo {
    margin-top: toRem(50);
    margin-bottom: toRem(35);

    img {
      @include rectangle-shape(155, 54);

      @include breakpoint-custom-down(890) {
        @include rectangle-shape(145, 45);
      }

      @include breakpoint-custom-down(380) {
        @include rectangle-shape(138, 40);
      }
    }
  }

  .wrapper {
    padding: toRem(10) toRem(35) 0 !important;

    @include breakpoint-down(xl) {
      padding: 0 toRem(28) !important;
    }

    @include breakpoint-down(lg) {
      padding: 0 toRem(22) !important;
    }

    @include breakpoint-down(md) {
      padding: 0 toRem(30) !important;
    }

    @include breakpoint-down(xs) {
      padding: 0 toRem(10) !important;
    }
  }

  .verification-block {
    box-shadow: 0 0 toRem(3) rgba($black-text, 0.15);
    padding: toRem(45) toRem(50) toRem(47);
    margin-bottom: toRem(40);

    @include breakpoint-down(lg) {
      padding: toRem(35) toRem(40) toRem(46);
    }

    @include breakpoint-custom-down(890) {
      padding: toRem(35) toRem(26) toRem(46);
    }

    @include breakpoint-down(sm) {
      padding: toRem(35) toRem(40) toRem(46);
    }

    @include breakpoint-down(xs) {
      padding: toRem(35) toRem(30) toRem(46);
    }

    @include breakpoint-custom-down(380) {
      padding: toRem(35) toRem(15) toRem(46);
    }

    @include breakpoint-custom-down(340) {
      padding: toRem(30) toRem(5) toRem(35);
    }

    .verify-avatar {
      @include flex-row-center-nowrap;
      margin-bottom: toRem(20);

      img {
        @include rectangle-shape(225, 166);

        @include breakpoint-down(xs) {
          @include rectangle-shape(200, 150);
        }
      }
    }

    .content-area {
      .title-text {
        @include font-height(21.5, 30);
        margin-bottom: toRem(16);

        @include breakpoint-custom-down(890) {
          @include font-height(19, 28);
        }

        @include breakpoint-custom-down(380) {
          @include font-height(18, 26);
        }

        @include breakpoint-custom-down(340) {
          @include font-height(17, 25);
        }
      }

      .meta-text {
        @include font-height(13.25, 22);
        margin-bottom: toRem(20);

        @include breakpoint-custom-down(890) {
          @include font-height(12.5, 21.5);
        }
      }
    }
  }
}
</style>
