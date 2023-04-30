<template>
  <div class="app-info-top-bar white-text-bg fixed-top w-100 index-999">
    <div
      class="gradely-container px-2 px-sm-3 px-md-5 px-lg-4 px-xl-5 h-auto mx-auto"
    >
      <!-- NAVBAR ROW -->
      <div class="d-flex justify-content-between align-items-center nowrap">
        <!-- LEFT SECTION  -->
        <router-link :to="{ name: 'DashboardAppStore' }" class="left-section">
          <img :src="mxStaticImg('GradelyIcon.svg')" alt="" />

          <!-- TEXT  -->
          <div class="text brand-navy">Apps Directory</div>
        </router-link>

        <!-- MID SECTION  -->
        <div class="mid-section"></div>

        <!-- RIGHT SECTION  -->
        <div class="right-section">
          <!-- AVATAR  -->
          <div class="user-avatar avatar rounded-5">
            <img
              v-lazy="getAuthUser.image"
              alt=""
              class="avatar-img"
              v-if="getAuthUser.image"
            />
            <div
              class="avatar-text color-white"
              :class="$color.getProfileBgColor(getAuthUser.school_name)"
              v-else
            >
              {{ $string.getStringInitials(getAuthUser.school_name) }}
            </div>
          </div>

          <!-- SCHOOL NAME  -->
          <div class="text-name color-text">
            {{ getAuthUser.school_name }}
          </div>

          <!-- DROPDOWN  -->
          <div
            class="dropdown-option avatar smooth-transition pointer"
            v-if="false"
          >
            <div class="icon icon-caret-fill-down color-text"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "appInfoTopBar",
};
</script>

<style lang="scss" scoped>
.app-info-top-bar {
  left: 0;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  padding: toRem(15) 0;

  @include breakpoint-down(xl) {
    padding: toRem(13) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(11) 0;
  }

  .left-section {
    @include flex-row-start-nowrap;

    img {
      margin-right: toRem(15);
      @include square-shape(38);

      @include breakpoint-down(xl) {
        margin-right: toRem(13);
      }

      @include breakpoint-down(md) {
        @include square-shape(35);
        margin-right: toRem(12);
      }

      @include breakpoint-down(xs) {
        @include square-shape(32);
      }
    }

    .text {
      @include font-height(16, 19);

      @include breakpoint-down(xl) {
        @include font-height(15.5, 18);
      }

      @include breakpoint-down(md) {
        @include font-height(14, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(13.5, 18);
      }
    }
  }

  .right-section {
    @include flex-row-end-nowrap;

    .user-avatar {
      @include square-shape(32);

      @include breakpoint-down(xl) {
        @include square-shape(31);
      }

      .avatar-text {
        font-size: toRem(12);

        @include breakpoint-down(xl) {
          font-size: toRem(10.5);
        }
      }
    }

    .text-name {
      @include font-height(15, 22);
      margin: 0 toRem(10);

      @include breakpoint-down(xl) {
        @include font-height(13.75, 19);
        margin: 0 toRem(8);
      }

      @include breakpoint-down(md) {
        @include font-height(13, 18);
        margin: 0 toRem(8);
      }

      @include breakpoint-down(xs) {
        display: none;
      }
    }

    .dropdown-option {
      position: relative;
      @include square-shape(32);

      @include breakpoint-down(md) {
        @include square-shape(18);
      }

      .icon {
        @include center-placement;
        font-size: toRem(11);
        margin-top: toRem(1.5);

        @include breakpoint-down(md) {
          font-size: toRem(9.5);
          margin-top: toRem(2);
        }
      }

      &:hover {
        background: $brand-inverse-light;
      }
    }
  }
}
</style>
