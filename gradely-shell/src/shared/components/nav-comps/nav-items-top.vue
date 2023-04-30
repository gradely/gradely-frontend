<template>
  <div
    class="nav-items d-flex justify-content-center align-items-center nowrap"
    :class="padding_style"
  >
    <div
      class="nav-item position-relative w-auto pdx-5 smooth-transition"
      v-for="(item, index) in base_navs"
      :key="index"
    >
      <template v-if="$route.meta.type === 'CatchUp'">
        <router-link
          :to="{ name: item.route }"
          class="dark-nav-item smooth-transition"
          :class="$route.meta.title === item.text ? 'dark-active' : null"
        >
          <span
            class="border-grey-dark smooth-transition"
            :class="item.icon"
          ></span>
          <div class="nav-text smooth-transition">
            {{ item.text }}
          </div>
        </router-link>
      </template>

      <template v-else>
        <router-link
          :to="{ name: item.route }"
          class="smooth-transition"
          :class="$route.meta.title === item.text ? 'active' : null"
        >
          <span
            class="border-grey-dark smooth-transition"
            :class="item.icon"
          ></span>
          <div class="nav-text smooth-transition">
            {{ item.text }}
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "navItems",

  props: {
    base_navs: Array,
    padding_style: String,
  },
};
</script>

<style lang="scss" scoped>
// ACTIVE NAV ITEM STYLING PLACEHOLDER
%active-nav-item {
  &:after {
    content: "";
    position: absolute;
    top: toRem(34.5);
    left: -9.25%;
    width: 124%;
    height: toRem(2.4);
    background: $brand-inverse;
  }

  span {
    color: $brand-inverse !important;
  }
}

// NAV ITEMS STYLING
.nav-items {
  .nav-item {
    margin-right: toRem(30);

    @include breakpoint-down(lg) {
      margin-right: toRem(20);
    }

    &:last-of-type {
      margin-right: 0;
    }

    a {
      @include flex-row-start-nowrap;
      @include transition(0.45s);
      color: $color-ash;

      span {
        @include transition(0.4s);
        font-size: toRem(19);
        margin-right: toRem(14);

        @include breakpoint-down(lg) {
          font-size: toRem(17.5);
          margin-right: toRem(13);
        }
      }

      .nav-text {
        @include font-height(13, 18);

        @include breakpoint-down(lg) {
          @include font-height(12.25, 17);
        }
      }

      &:hover {
        position: relative;
        color: #08384d !important;
        // ON ACTIVE
        @extend %active-nav-item;

        span {
          color: $brand-inverse !important;
        }
      }
    }

    .dark-nav-item {
      color: $border-grey-dark !important;

      &:hover {
        color: $border-grey !important;
      }
    }

    .active {
      position: relative;
      color: #08384d !important;
      font-weight: 600;
      @include transition(0.4s);
      // ON ACTIVE
      @extend %active-nav-item;
    }

    .dark-active {
      color: $brand-inverse-light !important;
      @include transition(0.3s);
      position: relative;
      font-weight: 500;
      // ON ACTIVE
      @extend %active-nav-item;

      &:hover {
        color: $brand-inverse !important;
      }
    }
  }

  @include breakpoint-down(md) {
    display: none !important;
  }
}
</style>
