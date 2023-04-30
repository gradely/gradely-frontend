<template>
  <div :class="{ 'd-md-none': inExceptionList }">
    <div
      v-if="$route.meta.type === 'School Base' || inExceptionList"
      class="gradely-top-sub-bar w-100 box-shadow-effect index-99 white-text-bg"
      :class="
        $route.meta.type === 'School Base' || inExceptionList
          ? 'school-sub-top-bar'
          : null
      "
    >
      <div
        class="gradely-container px-2 px-sm-3 px-md-4 px-xl-5 h-auto mx-auto"
      >
        <div
          class="d-flex align-items-center nowrap"
          :class="
            account_type === 'school'
              ? 'justify-content-between'
              : ' justify-content-center'
          "
        >
          <!-- BACK BUTTON  -->
          <div class="d-flex justify-content-start align-items-center">
            <router-link
              :to="{
                name: inExceptionList ? 'DashboardStudent' : 'DashboardHome',
              }"
              v-if="account_type === 'school'"
              class="
                back-link
                d-flex
                justify-content-start
                align-items-center
                pointer
              "
            >
              <div class="icon icon-tachometer"></div>
              <div class="text mgl-10 font-weight-600">Home</div>
            </router-link>

            <!-- MORE ITEMS SWITCHER -->
            <div class="nav-switcher-area" v-if="account_type === 'school'">
              <div class="separator-line"></div>
              <school-nav-switcher />
            </div>
          </div>

          <!-- NAV ITEMS  -->
          <nav-items :base_navs="base_navs" padding_style="pdt-18 pdb-10" />

          <!-- PAGE TITLE DISPLAY  -->
          <div
            class="page-title-display text-capitalize color-ash d-md-none"
          ></div>

          <div class="invisible" v-if="account_type === 'school'">text</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navItems from "@/shared/components/nav-comps/nav-items";
import schoolNavSwitcher from "@/shared/components/nav-comps/school-nav-switcher";

export default {
  name: "navTopSubBar",

  components: {
    navItems,
    schoolNavSwitcher,
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

    inExceptionList() {
      return this.exception_list.includes(this.$route.name) ? true : false;
    },
  },

  data: () => ({
    exception_list: ["DashboardActivateStudent"],
  }),
};
</script>

<style lang="scss" scoped>
.gradely-top-sub-bar {
  position: fixed;
  top: toRem(66);
  padding: toRem(3) 0;

  @include breakpoint-down(lg) {
    top: toRem(64);
  }

  @include breakpoint-down(md) {
    top: toRem(63);
    display: none;
  }

  @include breakpoint-down(xs) {
    padding: toRem(3.5) 0;
  }
  .back-link {
    position: relative;
    top: toRem(2.5);
    color: $brand-navy;
    padding: toRem(7.5) toRem(12);
    width: max-content;
    border-radius: toRem(13);
    @include transition(0.45s);
    background: $color-white;

    @include breakpoint-down(md) {
      padding: toRem(9.5) toRem(12);
      top: toRem(0.5);
    }

    &:hover {
      background: $brand-inverse-light;
    }

    .icon {
      @include font-height(17, 16);
      position: relative;
      top: toRem(0.5);

      @include breakpoint-down(md) {
        @include font-height(18, 19);
      }

      @include breakpoint-down(sm) {
        @include font-height(17, 18);
        top: 0;
      }
    }

    .text {
      @include font-height(12.75, 17);

      @include breakpoint-down(sm) {
        margin-left: toRem(8) !important;
        @include font-height(12.5, 17);
      }
    }
  }

  .nav-switcher-area {
    @include flex-row-start-nowrap;
    display: none;

    @include breakpoint-down(md) {
      @include flex-row-start-nowrap;
      margin: toRem(6) 0;
    }

    .separator-line {
      position: relative;
      margin: 0 toRem(18) 0 toRem(15);
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

  .page-title-display {
    @include font-height(15.5, 22);
    padding: toRem(18) 0 toRem(16);

    @include breakpoint-down(sm) {
      @include font-height(14.5, 20);
    }

    @include breakpoint-down(xs) {
      @include font-height(14, 19);
    }

    @include breakpoint-custom-down(380) {
      @include font-height(13.5, 19);
    }
  }
}

.school-sub-top-bar {
  @include breakpoint-down(md) {
    top: 0 !important;
  }
}
</style>
