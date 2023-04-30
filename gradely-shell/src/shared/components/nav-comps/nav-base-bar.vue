<template>
  <div :class="{ 'd-none': inExceptionList }">
    <div
      class="mobile-base w-100 h-auto d-md-none index-99 smooth-transition"
      :class="
        $route.meta.type === 'CatchUp' ? 'black-text-bg' : 'white-text-bg'
      "
    >
      <!-- NAVIGATION-->
      <div
        class="mobile-nav w-25 h-auto pdt-12 pdb-8"
        v-for="(item, index) in loadNavigations"
        :key="index"
      >
        <!-- DARK THEMES -->
        <template v-if="$route.meta.type === 'CatchUp'">
          <router-link
            :to="{ name: item.route }"
            :class="
              $route.meta.title === item.text
                ? 'dark-active'
                : 'border-grey-dark'
            "
          >
            <span class="gfont-22 border-grey-dark" :class="item.icon"></span>
            <div class="nav-text gfont-13">{{ item.text }}</div>
          </router-link>
        </template>

        <!-- LIGHT THEMES -->
        <template v-else>
          <router-link
            :to="{ name: item.route }"
            :class="$route.meta.title === item.text ? 'active' : null"
          >
            <span class="gfont-22 border-grey-dark" :class="item.icon"></span>
            <div class="nav-text gfont-13">{{ item.text }}</div>
          </router-link>
        </template>
      </div>
      <!-- NAVIGATION -->
    </div>
  </div>
</template>

<script>
export default {
  name: "navBaseBar",

  props: {
    account_type: String,
    base_navs: Array,
    base_sub_navs: Array,
  },

  computed: {
    loadNavigations() {
      return this.account_type === "school" &&
        this.$route.meta.type === "School Base"
        ? this.base_sub_navs
        : this.base_navs;
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
.mobile-base {
  @include flex_row_between_nowrap;
  position: fixed;
  bottom: 0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);

  .mobile-nav {
    @include breakpoint-down(xs) {
      padding-top: 9px !important;
      padding-bottom: 6px !important;
    }

    a {
      @include flex-column-center;
      @include transition(0.3s);
      color: $color-text;

      .nav-icon {
        @include square-shape(22);
        margin-bottom: 7px;

        @include breakpoint-down(sm) {
          @include square-shape(20);
          margin-bottom: 2px;
        }

        @include breakpoint-down(xs) {
          @include square-shape(19);
          margin-bottom: 0px;
        }
      }

      span {
        @include transition(0.3s);

        @include breakpoint-down(sm) {
          font-size: 18px !important;
        }
      }

      .nav-text {
        @include breakpoint-down(sm) {
          font-size: toRem(12) !important;
        }

        @include breakpoint-custom-down(360) {
          font-size: toRem(11.5) !important;
        }
      }

      &:hover {
        color: #08384d !important;
        font-weight: bold;
        @include transition(0.3s);

        span {
          color: $brand-inverse !important;
        }
      }
    }

    .active {
      color: #08384d !important;
      font-weight: bold;
      @include transition(0.3s);

      span {
        color: $brand-inverse !important;
      }
    }

    .dark-active {
      color: $brand-inverse-light !important;
      font-weight: bold;
      @include transition(0.3s);

      span {
        color: $brand-inverse !important;
      }
    }
  }
}
</style>
