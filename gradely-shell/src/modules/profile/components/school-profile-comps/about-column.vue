<template>
  <div class="about-column">
    <div class="title-text color-text font-weight-700">About Us</div>

    <!-- ABOUT ME DESCRIPTION  -->
    <div class="description">
      {{
        school.about
          ? school.about
          : "This section displays a detailed description of your school..."
      }}
    </div>

    <!-- TITLE TEXT  -->
    <div class="title-text color-text font-weight-700">Demographics</div>

    <!-- DEMOGRAPHIC ROW  -->
    <div class="demographic-row">
      <div class="column">
        <gender-block :demographics="school.demographics" />
      </div>

      <div class="column">
        <age-block :demographics="school.demographics" />
      </div>
    </div>
  </div>
</template>

<script>
import genderBlock from "@/modules/profile/components/school-profile-comps/gender-block";
import ageBlock from "@/modules/profile/components/school-profile-comps/age-block";

export default {
  name: "aboutColumn",

  components: {
    genderBlock,
    ageBlock,
  },

  props: {
    school: {
      type: Object,
      default: () => ({
        about: "",
        demographics: {},
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.about-column {
  .title-text {
    @include font-height(19, 22);
    margin-bottom: toRem(26);

    @include breakpoint-down(xl) {
      @include font-height(18, 21);
    }

    @include breakpoint-down(lg) {
      @include font-height(16, 19);
    }

    @include breakpoint-down(xs) {
      @include font-height(15, 18);
      margin-bottom: toRem(20);
    }

    @include breakpoint-custom-down(390) {
      @include font-height(14.5, 17);
      margin-bottom: toRem(15);
    }
  }

  .description {
    @include font-height(14, 25);
    color: rgba($color-text, 0.85);
    margin-bottom: toRem(55);

    @include breakpoint-down(xl) {
      @include font-height(13.8, 26);
    }

    @include breakpoint-down(lg) {
      @include font-height(13.25, 25.5);
    }

    @include breakpoint-down(xs) {
      @include font-height(13, 24);
      margin-bottom: toRem(45);
    }

    @include breakpoint-custom-down(380) {
      @include font-height(12.5, 24);
      margin-bottom: toRem(42);
    }
  }

  .demographic-row {
    @include flex-row-start-wrap;
    align-items: flex-start;

    .column {
      margin-right: toRem(60);

      @include breakpoint-down(xs) {
        margin-right: toRem(40);
      }

      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
