<template>
  <router-link
    :to="{ name: tab.route }"
    class="weekly-select-card rounded-30 pointer smooth-transition"
    :class="isActive ? 'active-tab' : null"
  >
    <div class="avatar">
      <img
        v-lazy="mxStaticImg(tab.image, 'dashboard')"
        alt=""
        v-if="tab.image"
      />
      <div class="icon" :class="tab.style" v-else></div>
    </div>
    <div class="text">{{ tab.title }}</div>
  </router-link>
</template>

<script>
export default {
  name: "weeklySelectCard",

  props: {
    tab: Object,
  },

  computed: {
    isActive() {
      return this.tab.route === this.$route.name ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-select-card {
  @include flex-row-center-nowrap;
  border: toRem(1) solid $border-grey;
  padding: toRem(2) toRem(15) toRem(2) toRem(7);
  margin-right: toRem(20);

  @include breakpoint-down(sm) {
    margin-right: toRem(15);
  }

  @include breakpoint-down(xs) {
    margin-right: toRem(8);
  }

  @include breakpoint-down(xl) {
    padding: toRem(1) toRem(15) toRem(1) toRem(7);
  }

  @include breakpoint-down(xs) {
    padding: toRem(2) toRem(13) toRem(2) toRem(5);
  }

  .avatar {
    margin-right: toRem(2);

    @include breakpoint-down(xl) {
      @include square-shape(28);
    }

    @include breakpoint-down(xs) {
      @include square-shape(26);
    }

    .icon {
      @include center-placement;
      font-size: toRem(18);

      @include breakpoint-down(sm) {
        font-size: toRem(16);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(15);
      }
    }

    img {
      @include center-placement;
      @include square-shape(18);

      @include breakpoint-down(xl) {
        @include square-shape(16);
      }

      @include breakpoint-down(sm) {
        @include square-shape(14);
      }

      @include breakpoint-down(xs) {
        @include square-shape(13);
      }
    }
  }

  .text {
    @include font-height(13, 18);
    color: $color-grey-dark;
    white-space: nowrap;

    @include breakpoint-down(md) {
      @include font-height(12.5, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(12, 16);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.75, 15);
    }
  }

  &:hover {
    border: toRem(1) solid $brand-inverse;
    background: $brand-inverse-light;
  }
}

.active-tab {
  border: toRem(1) solid $brand-inverse;
  background: $brand-inverse-light;

  .text {
    color: $brand-navy;
  }
}
</style>
