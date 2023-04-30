<template>
  <div
    class="unauthorized-mobile-nav smooth-animation w-100 index-9 white-text-bg"
  >
    <a :href="base_url + 'for-parent'" target="_blank" class="nav-item"
      >For Parents</a
    >

    <a :href="base_url + 'for-schools'" target="_blank" class="nav-item"
      >For Schools</a
    >

    <div class="nav-item mt-0">
      <div
        class="title-pair"
        @click="toggleMobileDropdown"
        v-on-clickaway="hideMobileDropdown"
      >
        <div class="text">More</div>
        <div
          class="icon icon-caret-down smooth-transition"
          :class="{ 'rotate-180': show_mobile_dropdown }"
        ></div>
      </div>

      <!-- NAV DROPDOWN -->
      <div class="nav-dropdown smooth-transition" v-if="show_mobile_dropdown">
        <a :href="base_url + 'about'" target="_blank" class="item">About Us</a>
        <a :href="base_url + 'blog'" target="_blank" class="item">Blog</a>
        <a :href="base_url + 'help-center'" target="_blank" class="item"
          >Help Center</a
        >
        <a :href="base_url + 'contact'" target="_blank" class="item"
          >Contact Us</a
        >
      </div>
    </div>

    <a
      href="https://app.gradely.ng/signup/lander"
      target="_blank"
      class="nav-item"
      >Sign Up</a
    >
  </div>
</template>

<script>
import { APP_BASE_URL } from "@/env";

export default {
  name: "unauthorizedmobileNav",

  data: () => ({
    show_mobile_dropdown: false,
    base_url: APP_BASE_URL,
  }),

  methods: {
    toggleMobileDropdown() {
      this.show_mobile_dropdown = !this.show_mobile_dropdown;
    },

    hideMobileDropdown() {
      this.show_mobile_dropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.unauthorized-mobile-nav {
  border-top: toRem(2) solid $brand-accent;
  padding: toRem(35) toRem(20) toRem(30);
  @include flex-column-center;
  justify-content: flex-start;
  margin-top: toRem(10);
  height: 100vh;

  .nav-item {
    @include font-height(14, 19);
    margin-bottom: toRem(35);
    color: $color-grey-dark;
    position: relative;

    &:last-of-type {
      margin-bottom: 0;
      margin-top: toRem(35);
    }

    .title-pair {
      @include flex-row-center-nowrap;

      .icon {
        font-size: toRem(10);
        margin-left: toRem(14);
        color: $color-ash;
      }
    }

    .nav-dropdown {
      margin-top: toRem(30);
      text-align: center;
      width: auto;

      .item {
        margin-bottom: toRem(25);
        font-size: toRem(12.45);
        display: block;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
