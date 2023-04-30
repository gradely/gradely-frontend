<template>
  <div class="school-banner w-100 position-relative smooth-animation">
    <!-- BANNER IMAGE  -->
    <div class="banner-overlay box-overlay">
      <template name="fade" mode="out-in">
        <img
          v-lazy="
            banner
              ? banner
              : `${getAssetBaseURL(
                  'cloud',
                  'gradely'
                )}/image/upload/v1639028855/ClassDoodle_hplcdp.png`
          "
          alt="ClassDoodle"
          class="img img-overlay"
        />
      </template>
    </div>

    <!-- BANNER CONTAINER -->
    <div
      class="
        banner-container
        gradely-container
        px-2 px-sm-3 px-md-4 px-xl-5
        index-1
        h-100
      "
    >
      <!-- IMAGE LOGO  -->
      <div
        class="image-block position-relative mgr-15 rounded-10 overflow-hidden"
        v-if="logo"
      >
        <img v-lazy="logo" alt="schoolLogo" />
      </div>

      <!-- TEXT LOGO  -->
      <div class="avatar avatar-xl avatar-square mgr-12" v-else>
        <div class="avatar-text white-text-bg brand-navy font-weight-700">
          {{
            $string.getFirstCharacter(
              getAuthUser.school_name
                ? getAuthUser.school_name
                : "Gradely Schools"
            )
          }}
        </div>
      </div>

      <!-- SCHOOL INFO  -->
      <div class="school-info index-1">
        <!-- NAME  -->
        <div class="school-name font-weight-700 color-white">
          {{
            getAuthUser.school_name
              ? getAuthUser.school_name
              : "Gradely Schools"
          }}
        </div>

        <!-- LOCATION  -->
        <div class="school-location brand-inverse-light mgb-10 text-capitalize">
          {{ getAuthUser.state ? `${getAuthUser.state}, ` : "" }}
          {{ getAuthUser.country ? getAuthUser.country : "Nigeria" }}
        </div>

        <!-- UPDATE LINK  -->
        <div
          class="meta-link btn-link link-no-underline pointer"
          @click="redirectToProfile"
        >
          Update school profile
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { REDIRECT_TO_APP } from "@/env";

export default {
  name: "schoolBanner",

  data: () => ({
    logo: null,
    banner: null,
  }),

  mounted() {
    this.fetchSchoolProfileData();
  },

  methods: {
    ...mapActions({
      getSchoolProfile: "dbProfile/getSchoolProfileData",
    }),

    // FETCH SCHOOL PROFILE
    fetchSchoolProfileData() {
      this.getSchoolProfile()
        .then((response) => {
          if (response.code === 200) {
            this.logo = response.data.logo;
            this.banner = response.data.banner;
          } else this.logo = this.banner = null;
        })
        .catch(() => (this.logo = this.banner = null));
    },

    redirectToProfile() {
      location.href = REDIRECT_TO_APP(this.getAuthType, "settings");
    },
  },
};
</script>

<style lang="scss">
.school-banner {
  margin-bottom: toRem(25);
  height: toRem(220);

  @include breakpoint-down(md) {
    margin-bottom: toRem(30);
    height: toRem(180);
  }

  @include breakpoint-down(sm) {
    margin-bottom: toRem(20);
    height: toRem(150);
  }

  @include breakpoint-down(xs) {
    margin-bottom: toRem(10);
  }

  .banner-overlay {
    @include background-cover;
    background: lighten($brand-navy, 6%);

    .img {
      @include background-cover;

      &-overlay {
        mix-blend-mode: overlay;
        opacity: 0.8;
      }
    }
  }

  .banner-container {
    @include flex-row-start-nowrap;

    .avatar {
      @include breakpoint-down(md) {
        @include square-shape(80);
        margin-right: 10px !important;
      }

      @include breakpoint-down(sm) {
        @include square-shape(70);
        .avatar-text {
          @include font-height(32, 34);
        }
      }

      @include breakpoint-down(xs) {
        @include square-shape(55);
      }
    }

    .image-block {
      img {
        min-width: toRem(80);
        width: auto;
        max-width: toRem(100);
        height: auto;
        max-height: toRem(100);

        @include breakpoint-down(xs) {
          min-width: toRem(60);
          width: auto;
          max-width: toRem(80);
          height: auto;
          max-height: toRem(90);
        }
      }
    }

    .school-name {
      @include font-height(29, 40);

      @include breakpoint-down(md) {
        @include font-height(20, 32);
      }

      @include breakpoint-down(sm) {
        @include font-height(18, 32);
        font-weight: 600 !important;
      }

      @include breakpoint-down(xs) {
        @include font-height(15.25, 28);
      }
    }

    .school-location {
      @include font-height(13.5, 22);

      @include breakpoint-down(md) {
        @include font-height(12, 18);
        margin-bottom: 5px !important;
      }

      @include breakpoint-down(sm) {
        @include font-height(11.25, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.5, 15);
        margin-bottom: 0 !important;
      }
    }

    .meta-link {
      @include font-height(12.5, 16.3);

      @include breakpoint-down(md) {
        @include font-height(11.5, 15);
      }

      @include breakpoint-down(sm) {
        @include font-height(11, 14);
      }

      @include breakpoint-down(xs) {
        @include font-height(10.5, 14);
      }
    }
  }
}
</style>
