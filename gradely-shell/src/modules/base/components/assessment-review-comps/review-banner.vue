<template>
  <div class="review-banner brand-navy-bg">
    <div class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 mx-auto">
      <div class="top-row">
        <!-- TOP COLUMN  -->
        <div
          to="getAssessmentBackLink"
          class="top-back-link pointer"
          @click="navigate"
        >
          <div class="avatar rounded-12">
            <div class="icon icon-caret-left"></div>
          </div>

          <!-- TEXT  -->
          <div class="text mgl-10">Back</div>
        </div>

        <!-- ASSESSMENT TITLE -->
        <div class="page-info-text white-text font-weight-500 text-capitalize">
          {{ title }}
        </div>

        <div class="invisible">Null</div>
      </div>

      <!-- PAGE TABS  -->
      <div class="page-tabs">
        <router-link
          :to="{
            name: 'AssessmentSummaryReview',
            query: { title, tour: this.$route.query.tour ? true : null },
          }"
          v-if="showTabs"
          class="page"
          :class="
            getCurrentRoute === 'AssessmentSummaryReview' ? 'page-active' : null
          "
        >
          Summary
        </router-link>

        <router-link
          :to="{
            name: 'AssessmentParticipantReview',
            query: { title, tour: this.$route.query.tour ? true : null },
          }"
          v-if="showTabs"
          class="page"
          :class="
            getCurrentRoute === 'AssessmentParticipantReview'
              ? 'page-active'
              : null
          "
        >
          Participants
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reviewBanner",

  props: {
    title: {
      type: String,
      default: "Title here...",
    },

    back_link: {
      type: String,
      default: "",
    },
  },

  watch: {
    back_link: {
      handler(link) {
        if (link) localStorage.setItem("back_link", link);
      },
      immediate: true,
    },

    isActive: {},
  },

  computed: {
    getCurrentRoute() {
      return this.$route.name;
    },

    getAssessmentBackLink() {
      if (this.back_link) return { path: this.back_link };

      return this.getAuthType === "parent" || this.getAuthType === "student"
        ? { name: "GradelyUserCompletedAssessment" }
        : { name: "GradelyAssessmentPublished" };
    },

    showTabs() {
      return this.getAuthType === "parent" || this.getAuthType === "student"
        ? false
        : true;
    },
  },

  methods: {
    navigate() {
      localStorage.removeItem("back_link");
      this.$router.push(this.getAssessmentBackLink);
    },

    navigateBack() {
      let get_back_link = localStorage.getItem("assessment_back_link");

      get_back_link === "/" || !get_back_link
        ? this.$router.go(-1)
        : this.$router.push(get_back_link);
    },
  },
};
</script>

<style lang="scss" scoped>
.review-banner {
  padding: toRem(25) 0 0;
  margin-bottom: toRem(40);

  @include breakpoint-down(sm) {
    padding: toRem(25) 0 0;
    margin-bottom: toRem(25);
  }

  @include breakpoint-down(xs) {
    margin-bottom: toRem(18);
  }

  .top-row {
    padding-bottom: toRem(30);
    @include flex-row-between-nowrap;
    // margin-bottom: toRem(30);

    @include breakpoint-down(sm) {
      @include flex-row-start-nowrap;
    }
  }

  .top-back-link {
    @include flex-row-start-nowrap;
    color: $white-text;
    width: max-content;

    .avatar {
      background: $color-white;

      @include breakpoint-down(xs) {
        @include square-shape(30);
      }

      .icon {
        @include center-placement;
        font-size: toRem(12);
        color: $brand-navy;
      }
    }

    .text {
      @include font-height(12.5, 18);

      @include breakpoint-down(md) {
        @include font-height(11.5, 17);
      }

      @include breakpoint-down(sm) {
        display: none;
      }
    }

    &:hover {
      color: $brand-accent;

      .icon {
        color: $brand-accent !important;
      }
    }
  }

  .page-info-text {
    @include font-height(20, 28);

    @include breakpoint-down(md) {
      @include font-height(19, 25);
    }

    @include breakpoint-down(sm) {
      @include font-height(17.5, 23);
      margin-left: toRem(14);
    }

    @include breakpoint-down(xs) {
      @include font-height(15.25, 20);
    }
  }

  .page-tabs {
    @include flex-row-start-nowrap;

    .page {
      @include font-height(11.5, 15);
      @include transition(0.4s);
      padding: toRem(8) toRem(15);
      margin-right: toRem(10);
      color: $border-grey;
      cursor: pointer;

      @include breakpoint-down(xs) {
        @include font-height(12.5, 16);
        padding: toRem(10) toRem(17);
      }

      &:hover {
        color: $brand-accent;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }

    .page-active {
      border-bottom: toRem(2) solid $brand-accent;
      font-weight: 600;
    }
  }
}
</style>
