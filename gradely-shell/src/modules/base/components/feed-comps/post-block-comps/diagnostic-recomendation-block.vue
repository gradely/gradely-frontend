<template>
  <div class="recommendation-block">
    <template v-if="false">
      <post-summer-block
        v-if="show_summer_school"
        @closeSummerSchool="show_summer_school = false"
      />
    </template>

    <template v-if="showDiagnostic">
      <post-diagnostics-block />
    </template>

    <template>
      <post-recomendation-block />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "diagnosticRecommendationBlock",

  components: {
    postDiagnosticsBlock: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/post-diagnostics-block"
      ),
    postRecomendationBlock: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/post-recomendation-block"
      ),
    postSummerBlock: () =>
      import(
        /* webpackChunkName: "FeedEntry" */ "@/modules/base/components/feed-comps/post-block-comps/post-summer-block"
      ),
  },

  computed: {
    ...mapGetters({ getParentChildren: "general/getParentChildren" }),

    showDiagnostic() {
      if (this.getAuthType === "student") return true;
      else return this.getParentChildren?.length ? true : false;
    },
  },

  data: () => ({
    show_summer_school: false,
  }),

  created() {
    setTimeout(() => (this.show_summer_school = true), 1500);
  },
};
</script>

<style lang="scss" scoped>
.recommendation-block {
}
</style>