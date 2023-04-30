<template>
  <div
    class="
      unauthorized-nav
      w-100
      h-auto
      fixed-top
      smooth-animation
      index-999
      scroll-active
    "
    ref="navTopBar"
  >
    <div class="gradely-container px-2 px-sm-3 mx-auto smooth-animation">
      <!-- BRAND LOGO -->
      <a href="https://gradely.ng" class="brand-logo smooth-animation">
        <img v-lazy="mxStaticImg('Gradely.svg')" alt="Gradely.ng" />
      </a>

      <!-- NAV OPTIONS -->
      <div class="nav-options smooth-animation">
        <a
          :href="base_url + 'for-parent'"
          target="_blank"
          class="nav-item link-item"
          >For Parents</a
        >
        <a
          :href="base_url + 'for-schools'"
          target="_blank"
          class="nav-item link-item"
          >For Schools</a
        >

        <!-- NAV WITH DROPDOWN -->
        <div
          class="nav-item pointer"
          :class="{ 'highlighed-item': show_dropdown }"
        >
          <div
            class="title-pair"
            @click="toggleDropdown"
            v-on-clickaway="hideDropdown"
          >
            <div class="text">More</div>
            <div
              class="icon icon-caret-fill-down smooth-transition"
              :class="{ 'rotate-180': show_dropdown }"
            ></div>
          </div>

          <!-- NAV DROPDOWN -->
          <div
            class="nav-dropdown rounded-5 box-shadow-effect smooth-animation"
            v-if="show_dropdown"
          >
            <a :href="base_url + 'about'" target="_blank" class="item"
              >About Us</a
            >
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
          class="nav-item link-item"
          >Sign Up</a
        >

        <a :href="base_url + '/login'" target="_blank" class="btn btn-accent"
          >Log In</a
        >

        <!-- MENU TOGGLER -->
        <div class="menu-toggler pointer" @click="toggleMobileMenu">
          <div
            class="icon smooth-transition"
            :class="
              show_mobile_menu
                ? ['icon-decline', 'brand-tonic']
                : ['icon-hamburger', 'color-grey-dark']
            "
          ></div>
        </div>
      </div>
    </div>

    <!-- MOBILE TOP NAV -->
    <unauthorized-mobile-nav v-if="show_mobile_menu" />
  </div>
</template>

<script>
import { APP_BASE_URL } from "@/env";
import unauthorizedMobileNav from "@/shared/components/nav-comps/unauthorized-mobile-nav";

export default {
  name: "unauthorizedNav",

  components: {
    unauthorizedMobileNav,
  },

  data() {
    return {
      show_dropdown: false,
      show_mobile_menu: false,
      base_url: APP_BASE_URL,
    };
  },

  mounted() {
    // window.onscroll = () => {
    //   this.$refs.navTopBar.classList.toggle(
    //     "scroll-active",
    //     window.scrollY > 0
    //   );
    // };
  },

  methods: {
    toggleMobileMenu() {
      this.show_mobile_menu = !this.show_mobile_menu;
    },

    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },

    hideDropdown() {
      this.show_dropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.unauthorized-nav {
  padding-top: toRem(10);
  padding-bottom: toRem(12);

  .gradely-container {
    @include flex-row-between-nowrap;

    .brand-logo {
      img {
        @include rectangle-shape(115, 42);

        @include breakpoint-down(xs) {
          @include rectangle-shape(110, 40);
        }

        @include breakpoint-custom-down(350) {
          @include rectangle-shape(105, 38);
        }
      }
    }

    .nav-options {
      @include flex-row-end-nowrap;

      .nav-item {
        transition: all 0.5s ease-in-out;
        padding: toRem(9.5) toRem(16);
        @include font-height(13, 18);
        border-radius: toRem(30);
        margin-right: toRem(30);
        position: relative;
        color: $color-ash;

        @include breakpoint-down(xl) {
          margin-right: toRem(20);
        }

        @include breakpoint-down(lg) {
          @include font-height(12.75, 17);
          padding: toRem(9) toRem(15);
          margin-right: toRem(20);
        }

        @include breakpoint-down(md) {
          display: none;
        }

        &:hover {
          background: rgba($brand-inverse-light, 0.75);
        }

        .title-pair {
          @include flex-row-start-nowrap;

          .icon {
            font-size: toRem(10);
            margin-left: toRem(14);
            color: $color-ash;
          }
        }

        .nav-dropdown {
          background: $white-text;
          padding: toRem(5) 0;
          position: absolute;
          width: toRem(130);
          top: toRem(35);
          left: -25%;

          @include breakpoint-down(lg) {
            width: toRem(136);
          }

          .item {
            padding: toRem(7) toRem(14);
            font-size: toRem(12.45);
            display: block;

            @include breakpoint-down(lg) {
              padding: toRem(6) toRem(12);
            }

            &:hover {
              background: rgba($brand-inverse-light, 0.5);
            }
          }
        }
      }

      .highlighed-item {
        background: rgba($brand-inverse-light, 0.5);
      }

      .link-item {
        &:hover {
          background: rgba($brand-inverse-light, 0.5);
          color: $brand-navy;
        }
      }

      .btn {
        padding: toRem(11.75) toRem(21);
        font-size: toRem(10.95);

        @include breakpoint-down(md) {
          padding: toRem(11.5) toRem(21);
          font-size: toRem(10.5);
        }

        @include breakpoint-down(xs) {
          padding: toRem(10.5) toRem(21);
        }
      }

      .menu-toggler {
        display: none;

        @include breakpoint-down(md) {
          margin-left: toRem(20);
          font-size: toRem(41);
          position: relative;
          display: unset;
          top: toRem(1);
        }

        @include breakpoint-down(xs) {
          margin-left: toRem(8);
          font-size: toRem(39);
        }
      }
    }
  }
}

.scroll-active {
  box-shadow: 0 toRem(1) toRem(3) rgba($brand-black, 0.125);
  background: $white-text;
  padding-top: toRem(7);
  padding-bottom: toRem(9.5);
}
</style>
