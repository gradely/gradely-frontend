<template>
  <div class="school-profile-page gradely-app-container topnav-base-offset">
    <!-- PROFILE BANNER  -->
    <profile-banner :school="school" />

    <div
      class="
        gradely-container
        px-2 px-sm-3 px-md-4 px-xl-5
        mx-auto
        smooth-animation
      "
    >
      <!-- SCHOOL INTRO ROW  -->
      <school-intro-row :school="school" />

      <!-- SCHOOL INFO BLOCK  -->
      <div class="school-info-block">
        <!-- LEFT SECTION  -->
        <div class="left-section">
          <about-column :school="school" />
        </div>

        <!-- RIGHT SECTION  -->
        <div class="right-section">
          <contact-column :school="school" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "schoolProfilePage",

  metaInfo: {
    title: "School Profile",
  },

  components: {
    profileBanner: () =>
      import(
        /* webpackChunkName: "schoolProfile" */ "@/modules/profile/components/school-profile-comps/profile-banner"
      ),
    schoolIntroRow: () =>
      import(
        /* webpackChunkName: "schoolProfile" */ "@/modules/profile/components/school-profile-comps/school-intro-row"
      ),
    aboutColumn: () =>
      import(
        /* webpackChunkName: "schoolProfile" */ "@/modules/profile/components/school-profile-comps/about-column"
      ),
    contactColumn: () =>
      import(
        /* webpackChunkName: "schoolProfile" */ "@/modules/profile/components/school-profile-comps/contact-column"
      ),
  },

  data: () => ({
    school: {},
  }),

  mounted() {
    // this.$color.setPageBackgroundColor("#FFF");
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
          // console.log(response);
          if (response.code === 200) this.school = response.data;
          else return this.showErrorState();
        })
        .catch(() => this.showErrorState());
    },

    showErrorState() {
      this.$bus.$emit("show_response_alert", {
        message: "An error occured while loading school profile data",
        type: "error",
      });

      this.school = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.school-profile-page {
  .school-info-block {
    margin-top: toRem(30);
    @include flex-row-between-wrap;
    align-items: flex-start;

    @include breakpoint-down(lg) {
      margin-top: toRem(10);
    }

    @include breakpoint-down(xs) {
      margin-top: toRem(20);
    }

    .left-section {
      width: 60%;

      @include breakpoint-down(xl) {
        width: 62.75%;
      }

      @include breakpoint-down(md) {
        width: 100%;
      }
    }

    .right-section {
      width: 33%;

      @include breakpoint-down(xl) {
        width: 32.5%;
      }

      @include breakpoint-down(md) {
        margin-top: toRem(40);
        width: 100%;
      }
    }
  }
}
</style>
