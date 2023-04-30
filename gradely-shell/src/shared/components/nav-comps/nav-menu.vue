<template>
  <div class="base-menu-panel position-fixed">
    <!-- SLIDE MENU PANEL -->
    <div
      class="
        slide-out-menu
        position-relative
        top-0
        left-0
        index-99
        h-auto
        rounded-5
        color-ash
        white-text-bg
        overflow-hidden
        pdx-20
        pdt-20
        pdb-0
        mg-0
      "
    >
      <!-- PANEL ROW -->
      <div
        class="panel-row d-flex justify-content-start align-items-start nowrap"
      >
        <!-- AVATAR -->
        <div
          class="
            avatar avatar-square
            rounded-5
            avatar-md
            brand-inverse-light-bg
          "
        >
          <img
            v-lazy="getAuthUser.image"
            :alt="$string.getStringInitials(getAuthUser.full_name)"
            class="avatar-img"
            v-if="getAuthUser.image"
          />
          <div
            class="avatar-text color_white"
            :class="$color.getProfileBgColor(getAuthUser.full_name)"
            v-else
          >
            {{ $string.getStringInitials(getAuthUser.full_name) }}
          </div>
        </div>

        <!-- AVATAR INFO -->
        <div class="d-flex flex-column justify-content-start align-items-start">
          <div
            class="line-one color-text font-weight-600 text-capitalize mgb-3"
          >
            {{ getAuthUser.full_name }}
          </div>

          <template v-if="account_type === 'student'">
            <div class="line-two color-grey-dark text-uppercase">
              SC: {{ getAuthUser.code }}
            </div>
          </template>

          <template v-else>
            <div class="line-three color-grey-dark">
              {{ getAuthUser.email || "No email available" }}
            </div>

            <div
              class="btn-link update-profile-link link-no-underline pointer"
              @click="redirectToProfile"
            >
              Update Profile
            </div>
          </template>
        </div>
      </div>

      <!-- LIST ITEMS -->
      <div
        class="
          list-wrapper
          d-flex
          flex-column
          justify-content-start
          align-items-start
          mgb-15
          mgt--10
        "
      >
        <a
          href=""
          class="
            list-data
            d-flex
            justify-content-start
            align-items-center
            nowrap
          "
          v-if="false"
        >
          <span class="icon icon-reward-pack border-grey-dark"></span>
          <div class="link-text">
            Reward
            <span
              class="
                brand-red-bg
                white-text
                gfont-9-5
                font-weight-500
                rounded-5
                px-2
                py-1
                ml-3
              "
              >New</span
            >
          </div>
        </a>

        <!-- SWITCH TO PARENT -->
        <template v-if="false">
          <router-link
            to
            class="
              list-data
              d-flex
              justify-content-start
              align-items-center
              nowrap
            "
          >
            <span class="icon icon-swap border-grey-dark"></span>
            <div class="link-text">Switch to Parent</div>
          </router-link>
        </template>

        <!-- SCHOOL PROFILE  -->
        <template v-if="getAuthType === 'school'">
          <router-link
            :to="{ name: 'SchoolProfile' }"
            class="
              list-data
              d-flex
              justify-content-start
              align-items-center
              nowrap
            "
          >
            <span class="icon icon-school border-grey-dark"></span>
            <div class="link-text">School Profile</div>
          </router-link>
        </template>

        <!-- SCHOOL PREFERENCES  -->
        <template v-if="getAuthType === 'school'">
          <router-link
            to
            @click.native="redirectToSchoolPreference"
            class="
              list-data
              d-flex
              justify-content-start
              align-items-center
              nowrap
            "
          >
            <span class="icon icon-sliders border-grey-dark"></span>
            <div class="link-text">School Preferences</div>
          </router-link>
        </template>

        <!-- HELP AND SUPPORT -->
        <template>
          <a
            href="https://gradely.ng/help-centre/"
            target="_blank"
            class="
              list-data
              d-flex
              justify-content-start
              align-items-center
              nowrap
            "
          >
            <span
              class="icon icon-circle-question-mark border-grey-dark"
            ></span>
            <div class="link-text">Help & Support</div>
          </a>
        </template>

        <!-- MY CALENDAR  -->
        <template v-if="getAuthType === 'school' || getAuthType === 'teacher'">
          <router-link
            :to="{ name: 'GradelyCalendar' }"
            class="
              list-data
              d-flex
              justify-content-start
              align-items-center
              nowrap
            "
          >
            <span class="icon icon-calendar border-grey-dark"></span>
            <div class="link-text">My Calendar</div>
          </router-link>
        </template>

        <!-- UPDATE PROFILE  -->
        <router-link
          v-if="getAuthType === 'parent' || getAuthType === 'student'"
          to
          @click.native="redirectToProfile"
          class="
            list-data
            d-flex
            justify-content-start
            align-items-center
            nowrap
          "
        >
          <span class="icon icon-user-outline border-grey-dark"></span>
          <div class="link-text">Update Profile</div>
        </router-link>

        <router-link
          to
          @click.native="handleAccountRedirect"
          class="
            list-data
            d-flex
            justify-content-start
            align-items-center
            nowrap
          "
        >
          <span class="icon icon-gear border-grey-dark"></span>
          <div class="link-text">My Account</div>
        </router-link>

        <!-- LOG OUT -->
        <div
          @click="handleLogout"
          class="
            list-data
            d-flex
            justify-content-start
            align-items-center
            nowrap
            pointer
          "
        >
          <span class="icon icon-log-out border-grey-dark"></span>
          <div class="link-text">Log Out</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { REDIRECT_TO_APP } from "@/env";

export default {
  name: "navMenu",

  props: {
    account_type: String,
  },

  data: () => ({}),

  methods: {
    ...mapActions({
      logoutUser: "auth/logoutUser",
    }),

    handleLogout() {
      this.$bus.$emit("show_page_loader", "Logging Out...");
      setTimeout(() => this.logoutUser(), 2000);
    },

    redirectToProfile() {
      location.href = REDIRECT_TO_APP(this.getAuthType, "settings");
    },

    redirectToSchoolPreference() {
      location.href = REDIRECT_TO_APP(
        this.getAuthType,
        "settings/preferences/school"
      );
    },

    handleAccountRedirect() {
      this.getAuthType === "school"
        ? this.redirectToMyAccount()
        : this.redirectToMyAccountUser();
    },

    redirectToMyAccount() {
      location.href = REDIRECT_TO_APP(this.getAuthType, "settings/user");
    },

    redirectToMyAccountUser() {
      console.log("Parent");
      location.href = REDIRECT_TO_APP(this.getAuthType, "settings/preferences");
    },
  },
};
</script>

<style lang="scss" scoped>
// BASE MENU PANEL
.base-menu-panel {
  @include transition(0.4s);
  top: toRem(50);
  right: toRem(20);
  width: toRem(300);
  z-index: 1999;
  animation: panel-slide-right 0.45s ease-in-out forwards;

  @include breakpoint-down(lg) {
    width: toRem(300);
  }

  @include breakpoint-down(md) {
    right: toRem(6);
    animation: panel-slide-left 0.45s ease-in-out forwards;
  }

  @include breakpoint-down(sm) {
    width: toRem(280);
    right: toRem(8);
  }

  @include breakpoint-down(xs) {
    width: 85%;
    top: toRem(53);
    right: toRem(5);
  }
}

// SLIDE OUT MENU
.slide-out-menu {
  box-sizing: border-box;
  box-shadow: 0 0 0 toRem(1) rgba(rgb(104, 104, 104), 0.1),
    0 toRem(3) toRem(5) 0 rgba(rgb(104, 104, 104), 0.2);
  border: none;

  .panel-row {
    border-bottom: toRem(1) solid rgba($border-grey, 0.6);
    padding-bottom: toRem(12);
    margin-bottom: toRem(8);
  }

  li {
    @include font-height(13.75, 19);
    padding: toRem(15) toRem(10);
    text-transform: capitalize;
    white-space: nowrap;
    width: 100%;

    @include breakpoint-down(lg) {
      padding: toRem(13) toRem(8);
    }

    &:last-of-type {
      margin-bottom: toRem(-2.5) !important;
    }

    &:hover {
      background: rgba($brand-inverse, 0.15);
      color: $brand-black;
    }
  }

  .avatar {
    margin-right: toRem(10);

    @include breakpoint-down(sm) {
      @include square-shape(34);
      margin-right: toRem(10);
    }

    .avatar-img {
      @include background-cover;
    }

    .avatar-text {
      font-size: toRem(16);

      @include breakpoint-down(lg) {
        font-size: toRem(14);
      }

      @include breakpoint-down(sm) {
        font-weight: 600 !important;
        font-size: toRem(13);
      }
    }
  }

  .line-one {
    @include font-height(13.75, 21);
    letter-spacing: 0.015em;

    @include breakpoint-down(lg) {
      font-size: toRem(14);
    }

    @include breakpoint-down(sm) {
      margin-bottom: toRem(1) !important;
      font-size: toRem(13.25);
    }
  }

  .line-two,
  .line-three {
    @include font-height(12.5, 17);
    margin-bottom: toRem(8);

    @include breakpoint-down(lg) {
      font-size: toRem(12);
    }

    @include breakpoint-down(sm) {
      margin-bottom: toRem(7);
      font-size: toRem(11.65);
    }
  }

  .line-two {
    @include font-height(11.75, 17);
  }

  .update-profile-link {
    @include font-height(12, 17);
    margin-bottom: toRem(4);
  }

  .update-cta {
    @include font-height(14, 19);
    letter-spacing: 0.02em;

    @include breakpoint-down(lg) {
      font-size: toRem(12);
    }

    @include breakpoint-down(sm) {
      font-size: toRem(11.75);
    }
  }

  .list-wrapper {
    @include breakpoint-down(sm) {
      margin-bottom: toRem(10) !important;
    }
  }

  .list-data {
    display: block;
    width: 100%;
    padding: toRem(13) toRem(5);
    @include transition(0.4s);

    &:hover {
      background: rgba($brand-inverse, 0.15);
      color: $brand-black;
    }

    @include breakpoint-down(sm) {
      margin-left: toRem(-5);
    }

    .icon {
      display: block;
      margin-right: toRem(15.5);
      font-size: toRem(20);

      @include breakpoint-down(sm) {
        font-size: toRem(18);
        margin-right: toRem(14.5);
        margin-top: toRem(-1);
      }
    }
  }

  .link-text {
    @include font-height(12.75, 18);
    letter-spacing: 0.035em;
    color: $color-ash;

    @include breakpoint-down(lg) {
      font-size: toRem(12.5);
    }

    @include breakpoint-down(sm) {
      letter-spacing: 0.01em;
    }
  }
}
</style>
