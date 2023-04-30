<template>
  <div class="faq-block">
    <div class="title-text font-weight-700 color-text">
      Frequently Asked Questions
    </div>

    <!-- FAQ LIST -->
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 mgb-35"
        v-for="(faq, index) in faqList"
        :key="index"
      >
        <faq-card :faq="faq" />
      </div>
    </div>

    <!-- FAQ BOTTOM -->
    <div class="faq-bottom w-100">
      <!-- HELP ICON  -->
      <img v-lazy="mxStaticImg('HelpIcon.svg', 'dashboard')" alt="" />

      <div class="info">
        <div class="title-text font-weight-700 color-text mgb-4">
          Have more Questions?
        </div>

        <div class="description color-ash">
          For help with questions, suggestions, or problems, contact our
          <a :href="'mailto:' + support_email" class="btn-link">
            support team.</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import faqCard from "@/modules/dashboard/components/app-info-comps/faq-card";

export default {
  name: "faqBlock",

  components: {
    faqCard,
  },

  props: {
    faqList: {
      type: Array,
    },
    support_email: {
      type: String,
      default: "support@gradely.ng",
    },
  },
};
</script>

<style lang="scss" scoped>
.faq-block {
  .title-text {
    @include font-height(21, 29);
    margin-bottom: toRem(40);

    @include breakpoint-down(xl) {
      @include font-height(18, 26);
    }

    @include breakpoint-down(lg) {
      @include font-height(15.5, 21);
      margin-bottom: toRem(30);
    }

    @include breakpoint-down(md) {
      @include font-height(14, 19);
    }

    @include breakpoint-down(sm) {
      @include font-height(13.5, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.75, 16);
      margin-bottom: toRem(20);
    }
  }

  .faq-bottom {
    border-top: toRem(1) solid $border-grey;
    @include flex-row-start-nowrap;
    margin-bottom: toRem(30);
    padding-top: toRem(24);
    margin-top: toRem(25);

    @include breakpoint-down(lg) {
      margin-bottom: toRem(20);
    }

    @include breakpoint-down(md) {
      margin-bottom: toRem(15);
    }

    @include breakpoint-down(sm) {
      margin-top: toRem(15);
      padding-top: toRem(18);
    }

    img {
      margin-right: toRem(20);
      @include square-shape(50);

      @include breakpoint-down(md) {
        margin-right: toRem(15);
        @include square-shape(40);
      }
    }

    .title-text {
      @include font-height(16, 26);

      @include breakpoint-down(lg) {
        @include font-height(15, 23);
      }

      @include breakpoint-down(md) {
        @include font-height(14, 21);
      }

      @include breakpoint-down(sm) {
        @include font-height(12.75, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 16);
      }
    }

    .description {
      @include font-height(14, 23);

      @include breakpoint-down(lg) {
        @include font-height(12, 21);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.5, 19);
      }
    }
  }
}
</style>
