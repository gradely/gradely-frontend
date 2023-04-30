<template>
  <div class="profile-banner w-100 position-relative">
    <div class="banner-overlay box-overlay color-text-bg">
      <template name="fade" mode="out-in">
        <img
          v-lazy="
            school.banner
              ? school.banner
              : `${getAssetBaseURL(
                  'cloud',
                  'gradely'
                )}/image/upload/v1639028855/ClassDoodle_hplcdp.png`
          "
          alt="Profile Bg"
          class="img img-overlay"
        />
      </template>
    </div>

    <div
      class="
        banner-container
        border
        gradely-container
        px-1 px-sm-3 px-md-4 px-xl-5
        index-1
        h-100
      "
    >
      <button class="btn btn-accent" @click="redirectToSchoolSettings">
        Settings
      </button>
    </div>
  </div>
</template>

<script>
import { REDIRECT_TO_APP } from "@/env";

export default {
  name: "profileBanner",

  props: {
    school: {
      type: Object,
      default: () => ({
        banner: "",
      }),
    },
  },

  methods: {
    redirectToSchoolSettings() {
      location.href = REDIRECT_TO_APP(this.getAuthType, "settings/");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-banner {
  height: toRem(250);

  @include breakpoint-down(lg) {
    margin-bottom: toRem(30);
    height: toRem(210);
  }

  @include breakpoint-down(md) {
    height: toRem(180);
  }

  @include breakpoint-down(sm) {
    margin-bottom: toRem(20);
    height: toRem(150);
  }

  @include breakpoint-down(xs) {
    margin-bottom: toRem(15);
    height: toRem(140);
  }

  .banner-overlay {
    @include background-cover;
    .img {
      @include background-cover;

      &-overlay {
        opacity: 0.65;
      }
    }
  }

  .banner-container {
    @include flex-row-end-nowrap;
    align-items: flex-start;
    padding-top: toRem(40);

    @include breakpoint-down(md) {
      padding-top: toRem(30);
    }

    @include breakpoint-down(sm) {
      padding-top: toRem(25);
    }

    @include breakpoint-down(xs) {
      // padding-top: toRem(20);
    }

    .btn {
      padding: toRem(11) toRem(26);
      font-size: toRem(11);

      @include breakpoint-down(xs) {
        font-size: toRem(10);
        padding: toRem(10) toRem(24);
      }
    }
  }
}
</style>
