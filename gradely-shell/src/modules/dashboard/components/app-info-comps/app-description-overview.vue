<template>
  <div class="app-description-overview">
    <div v-html="getAppInfo.data.information"></div>
    <!-- READ MORE BUTTON  -->
    <button class="btn btn-default-outline" v-if="false">Read More</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "appDescriptionOverview",

  computed: {
    ...mapGetters({
      getAppInfo: "dbApp/getAppInfo",
    }),
  },
};
</script>

<style lang="scss" scoped>
.app-description-overview {
  h2 {
    @include font-height(15, 19);
    font-size: 14px !important;
    margin-bottom: toRem(20);
    color: $color-text;
    font-weight: 600;

    @include breakpoint-down(xl) {
      margin-bottom: toRem(17);
    }

    @include breakpoint-down(lg) {
      @include font-height(18, 17);
      margin-bottom: toRem(15);
    }

    @include breakpoint-down(sm) {
      @include font-height(15.75, 15);
      margin-bottom: toRem(14);
    }

    @include breakpoint-down(xs) {
      @include font-height(15.25, 15);
      margin-bottom: toRem(12);
    }

    @include breakpoint-custom-down(370) {
      @include font-height(14, 15);
    }

    &:last-of-type {
      @include font-height(17, 26);
      margin-bottom: toRem(15);

      @include breakpoint-down(xl) {
        @include font-height(17, 25);
        margin-bottom: toRem(12);
      }

      @include breakpoint-down(lg) {
        @include font-height(15.75, 24);
        margin-bottom: toRem(10);
      }

      @include breakpoint-down(sm) {
        @include font-height(15, 22);
        margin-bottom: toRem(8);
      }

      @include breakpoint-down(xs) {
        @include font-height(13, 20);
        margin-bottom: toRem(6);
      }

      @include breakpoint-custom-down(370) {
        @include font-height(12.5, 22);
      }
    }
  }

  p {
    @include font-height(14.75, 25);
    margin-bottom: toRem(30);
    color: $color-ash;

    @include breakpoint-down(lg) {
      @include font-height(13.75, 24);
    }

    @include breakpoint-down(sm) {
      @include font-height(13.25, 22);
      margin-bottom: toRem(25);
    }

    @include breakpoint-down(xs) {
      @include font-height(13, 21);
      margin-bottom: toRem(20);
    }

    @include breakpoint-custom-down(370) {
      @include font-height(12.5, 23);
    }

    &:last-of-type {
      margin-bottom: toRem(10);
    }
  }

  ul {
    padding-left: 0;
    list-style: inside;
    color: $color-ash;

    li {
      @include font-height(14.25, 29);

      @include breakpoint-down(xl) {
        @include font-height(13.5, 25);
      }

      @include breakpoint-down(lg) {
        @include font-height(13.25, 24);
      }

      @include breakpoint-down(sm) {
        @include font-height(13, 24);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.3, 22);
      }

      @include breakpoint-custom-down(370) {
        @include font-height(11.75, 22);
      }
    }
  }

  .btn {
    margin-top: toRem(22);
    font-size: toRem(11);
    padding: toRem(10) toRem(24);

    @include breakpoint-down(xl) {
      font-size: toRem(11);
      padding: toRem(11) toRem(26);
    }

    @include breakpoint-down(lg) {
      font-size: toRem(10.5);
      padding: toRem(10) toRem(26);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(10);
      padding: toRem(10) toRem(26);
    }

    @include breakpoint-custom-down(370) {
      font-size: toRem(9);
      padding: toRem(9) toRem(23);
    }
  }
}
</style>
