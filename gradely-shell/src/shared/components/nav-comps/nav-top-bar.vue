<template>
  <div :class="isSchoolBase || inExceptionList ? 'school-top-bar' : null">
    <div
      class="gradely-top-bar fixed-top w-100 box-shadow-effect index-999"
      :class="
        $route.meta.type === 'CatchUp' ? 'black-text-bg' : 'white-text-bg'
      "
    >
      <div
        class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 h-auto mx-auto"
      >
        <!-- NAVBAR ROW -->
        <div class="d-flex justify-content-between align-items-center nowrap">
          <div class="d-flex justify-content-start align-items-center">
            <!-- BRAND LOGO -->
            <div
              class="brand-logo pdy-13"
              :class="inMobileLogoExclusion ? 'logo-exclusion' : null"
            >
              <router-link to="/">
                <img v-lazy="mxStaticImg('Gradely.svg')" alt="Gradely.ng" />
              </router-link>
            </div>

            <div
              class="mobile-brand-logo pdy-13"
              :class="inMobileLogoExclusion ? 'mobile-logo-exclusion' : null"
            >
              <router-link to="/">
                <img v-lazy="mxStaticImg('logoMarker.svg')" alt="Gradely.ng" />
              </router-link>
            </div>

            <!-- MORE ITEMS SWITCHER -->
            <div class="nav-switcher-area" v-if="showSwitcher">
              <div class="separator-line"></div>
              <component :is="setupUserNavSwitcher()"></component>
            </div>
          </div>

          <!-- NAV ITEMS  -->
          <template v-if="isSchoolBase"> </template>
          <template v-else-if="isDashboardBase">
            <nav-items-top
              :base_navs="base_navs"
              padding_style="pdt-23 pdb-11"
            />
          </template>

          <!-- NAV OPTION SET -->
          <nav-option-set :account_type="account_type" />
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="join_class_invite">
        <join-class-invite-modal
          :has_class="has_class"
          @closeTriggered="toggleJoinClassInvite"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import navItemsTop from "@/shared/components/nav-comps/nav-items-top";
import navOptionSet from "@/shared/components/nav-comps/nav-option-set";

export default {
  name: "navTopBar",

  components: {
    navItemsTop,
    navOptionSet,
    schoolNavSwitcher: () =>
      import(
        /* webpackChunkName: "Switcher" */ "@/shared/components/nav-comps/school-nav-switcher"
      ),
    teacherNavSwitcher: () =>
      import(
        /* webpackChunkName: "Switcher" */ "@/shared/components/nav-comps/teacher-nav-switcher"
      ),
    parentNavSwitcher: () =>
      import(
        /* webpackChunkName: "Switcher" */ "@/shared/components/nav-comps/parent-nav-switcher"
      ),
    joinClassInviteModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/shared/modals/join-class-invite-modal"
      ),
  },

  props: {
    base_navs: Array,
    account_type: String,
  },

  computed: {
    isSchoolBase() {
      return this.account_type === "school" &&
        this.$route.meta.type === "School Base"
        ? true
        : false;
    },

    isDashboardBase() {
      return this.account_type === "school" &&
        this.$route.meta.type === "Dashboard"
        ? true
        : false;
    },

    showSwitcher() {
      return this.account_type !== "student" &&
        this.$route.meta.type !== "Dashboard"
        ? true
        : false;
    },

    inExceptionList() {
      return this.exception_list.includes(this.$route.name) ? true : false;
    },

    inMobileLogoExclusion() {
      return this.mobile_logo_exclusion.includes(this.$route.name)
        ? true
        : false;
    },
  },

  watch: {
    $route: {
      handler(value) {
        setTimeout(
          () => value.query?.class_invite && this.toggleJoinClassInvite(),
          2000
        );
      },
      immediate: true,
    },
  },

  data: () => ({
    exception_list: ["DashboardActivateStudent"],
    mobile_logo_exclusion: [
      "DashboardHome",
      "DashboardTeacher",
      "DashboardStudent",
      "DashboardAppStore",
      "SchoolProfile",
      "WeeklyHomework",
      "WeeklyDiscussions",
      "WeeklyExams",
      "WeeklyPendingExams",
      "WeeklyLessons",
      "WeeklyLiveClass",
      "WeeklyEvents",
    ],

    has_class: false,
    join_class_invite: false,
  }),

  created() {
    this.$bus.$on("childInSchool", (has_class) => (this.has_class = has_class));
  },

  methods: {
    setupUserNavSwitcher() {
      if (this.getAuthType === "school") return "schoolNavSwitcher";
      else if (this.getAuthType === "teacher") return "teacherNavSwitcher";
      else if (this.getAuthType === "parent") return "parentNavSwitcher";
      else return false;
    },

    toggleJoinClassInvite() {
      this.join_class_invite = !this.join_class_invite;
    },
  },
};
</script>

<style lang="scss" scoped>
.gradely-top-bar {
  .brand-logo {
    @include breakpoint-down(sm) {
      display: none;
    }

    @include breakpoint-down(xs) {
      padding-top: 9px !important;
      padding-bottom: 9px !important;
    }

    img {
      position: relative;
      left: -6px;

      @include rectangle-shape(133, 43);

      @include breakpoint-down(lg) {
        @include rectangle-shape(118, 38);
      }

      @include breakpoint-down(md) {
        @include rectangle-shape(120, 37);
      }

      @include breakpoint-down(xs) {
        @include rectangle-shape(116, 38);
      }
    }
  }

  .mobile-brand-logo {
    display: none;

    @include breakpoint-down(sm) {
      display: unset;

      img {
        @include square-shape(38);
      }
    }

    @include breakpoint-down(xs) {
      padding-top: 7.5px !important;
      padding-bottom: 7.5px !important;
    }
  }

  .nav-switcher-area {
    @include flex-row-start-nowrap;

    .separator-line {
      position: relative;
      margin: 0 toRem(18) 0 toRem(5);
      width: toRem(1.5);
      top: toRem(2);
      height: 36px;
      background: $border-grey;

      @include breakpoint-down(sm) {
        top: 0;
        margin: 0 toRem(12) 0 toRem(12);
      }

      @include breakpoint-down(xs) {
        width: 0;
        margin: 0 0 0 toRem(12);
      }
    }
  }
}

.school-top-bar {
  @include breakpoint-down(md) {
    // display: none;
  }
}

.logo-exclusion {
  @include breakpoint-down(sm) {
    display: unset !important;
  }
}

.mobile-logo-exclusion {
  @include breakpoint-down(sm) {
    display: none !important;
  }
}
</style>
