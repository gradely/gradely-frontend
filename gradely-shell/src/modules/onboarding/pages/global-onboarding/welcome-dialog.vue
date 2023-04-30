<template>
  <div>
    <dialog-layout
      :dialog_image="
        getAuthType === 'teacher'
          ? `${getAssetBaseURL(
              'cloud',
              'gradely'
            )}/image/upload/v1639030545/WelcomeAvatar_yask0w.png`
          : `${getAssetBaseURL(
              'cloud',
              'richy-jones'
            )}/image/upload/v1650314259/pixeltrue-idea-1_1.png`
      "
      dialog_title="Welcome to Gradely"
      welcome_text="To get you on your way, please go through our onboarding setup to get boarded."
    >
      <template slot="content">
        <!-- BTN SECTION  -->
        <div class="btn-section mgt-30">
          <template v-if="getAuthType === 'teacher'">
            <router-link
              :to="{ name: 'TeacherConnectSchool' }"
              class="btn mgb-24"
              >Use with School</router-link
            >
            <router-link :to="{ name: 'TeacherCreateClass' }" class="btn"
              >Use without School</router-link
            >
          </template>

          <template v-if="getAuthType === 'student'">
            <router-link :to="{ name: 'StudentFindSchool' }" class="btn mgb-24"
              >Use with a School</router-link
            >
            <router-link :to="{ name: 'StudentSelectAvatar' }" class="btn"
              >Use without a School</router-link
            >
          </template>
        </div>
      </template>
    </dialog-layout>
  </div>
</template>

<script>
import dialogLayout from "@/modules/onboarding/components/global-comps/dialog-layout";

export default {
  name: "welcomeDialog",

  metaInfo: {
    title: "Welcome to Gradely",
  },

  components: {
    dialogLayout,
  },

  methods: {
    handleOnboardingRouting() {
      if (this.getAuthType === "school")
        this.$router.push({ name: "SchoolSetup" });
      else if (this.getAuthType === "teacher")
        this.$router.push({ name: "TeacherConnectSchool" });
      else if (this.getAuthType === "parent")
        this.$router.push({ name: "ParentAddChild" });
      else if (this.getAuthType === "student")
        this.$router.push({ name: "StudentSecurityQuestion" });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-section {
  @include flex-column-center;
  justify-content: flex-start;

  .btn {
    background: $brand-accent-light;
    min-width: 95% !important;
    width: 95%;
    font-size: toRem(11.25);
    padding: toRem(14) toRem(40);
    color: $color-text;
    text-transform: unset;
    font-weight: 600 !important;
    border: toRem(1) solid $brand-accent;

    &:hover {
      border: toRem(1) solid $brand-inverse;
      background: $brand-inverse-light;
    }
  }
}
</style>
