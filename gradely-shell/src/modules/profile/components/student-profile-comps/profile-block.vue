<template>
  <div class="profile-block white-text-bg rounded-5 w-100">
    <!-- TOP ROW  -->
    <div class="top-row">
      <!-- TITLE  -->
      <div class="title-text color-text font-weight-600">{{ title }}</div>

      <!-- MORE  -->
      <router-link
        v-if="show_more"
        :to="{ name: more_link.url, params: { id: more_link.param } }"
        class="more btn-link link-no-underline "
      >
        See More
      </router-link>

      <!-- EXTRA CONTENT -->
      <slot name="extra"></slot>
    </div>

    <!-- CONTENT SECTION  -->
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "profileBlock",

  props: {
    title: {
      type: String,
      default: "Title here",
    },

    show_more: {
      type: Boolean,
      default: false,
    },

    more_link: {
      type: Object,
      default: () => ({
        url: "Hi",
        param: "",
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-block {
  padding: toRem(22);
  margin-bottom: toRem(30);

  @include breakpoint-down(lg) {
    padding: toRem(18) toRem(15);
    margin-bottom: toRem(25);
  }

  @include breakpoint-down(md) {
    margin-bottom: toRem(18);
  }

  @include breakpoint-down(sm) {
    padding: toRem(18) toRem(10);
    margin-bottom: toRem(15);
  }

  @include breakpoint-down(xs) {
    padding: toRem(16) toRem(8);
  }

  .top-row {
    @include flex-row-between-nowrap;
    margin-bottom: toRem(25);

    .title-text {
      @include font-height(13, 19);
      text-transform: uppercase;

      @include breakpoint-down(lg) {
        @include font-height(12.75, 18);
      }

      @include breakpoint-down(sm) {
        @include font-height(12.5, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
      }
    }

    .more {
      @include font-height(12.25, 17);

      @include breakpoint-down(lg) {
        @include font-height(12, 17);
      }
    }
  }
}
</style>
