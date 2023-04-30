<template>
  <div>
    <!-- <faq-block
      v-if="getFAQs.length"
      :faqList="getFAQs"
      :support_email="getAppInfo.data.support_email"
    /> -->

    <div class="app-support">
      <template>
        <!-- HELP ICON  -->
        <img v-lazy="mxStaticImg('HelpIcon.svg', 'dashboard')" alt="" />

        <div class="text-info color-text text-center">
          For help with questions, suggestions, or problems, contact our
          <a :href="'mailto:' + getAppInfo.data.support_email" class="btn-link"
            >support team</a
          >.
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import faqBlock from "@/modules/dashboard/components/app-info-comps/faq-block";

export default {
  name: "appSupport",

  metaInfo: {
    title: "App Support",
  },

  components: {
    faqBlock,
  },

  computed: {
    ...mapGetters({
      getAppInfo: "dbApp/getAppInfo",
    }),

    getFAQs() {
      return Object.keys(this.getAppInfo.data).length
        ? this.getAppInfo.data.faqs
        : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.app-support {
  @include flex-column-center;
  height: toRem(310);

  @include breakpoint-down(xl) {
    height: toRem(280);
  }

  @include breakpoint-down(lg) {
    height: toRem(260);
  }

  @include breakpoint-down(md) {
    height: toRem(220);
  }

  @include breakpoint-down(xs) {
    height: toRem(200);
  }

  img {
    margin-bottom: toRem(30);
    @include square-shape(100);

    @include breakpoint-down(xl) {
      @include square-shape(90);
    }

    @include breakpoint-down(sm) {
      @include square-shape(80);
    }

    @include breakpoint-down(xs) {
      margin-bottom: toRem(15);
      @include square-shape(70);
    }
  }

  .text-info {
    width: 35%;
    @include font-height(15, 26);

    @include breakpoint-down(xl) {
      @include font-height(14.5, 22);
    }

    @include breakpoint-down(md) {
      width: 60%;
    }

    @include breakpoint-down(sm) {
      @include font-height(13.5, 20);
      width: 70%;
    }

    @include breakpoint-down(xs) {
      @include font-height(12, 18);
      width: 85%;
    }
  }
}
</style>
