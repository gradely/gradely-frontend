<template>
  <div class="post-library-block smooth-transition">
    <!-- ASSESSMENTS  -->
    <div class="card-wrapper">
      <library-card
        :library="{
          title: 'Assessment',
          count: library.assessment,
          route: 'GradelyLibraryAssessment',
        }"
      />
    </div>

    <!-- DOCUMENTS  -->
    <div class="card-wrapper">
      <library-card
        :library="{
          title: 'Documents',
          count: library.document,
          route: 'GradelyLibraryDocument',
        }"
      />
    </div>

    <!-- VIDEOS  -->
    <div class="card-wrapper">
      <library-card
        :library="{
          title: 'Videos',
          count: library.video,
          route: 'GradelyLibraryVideo',
        }"
      />
    </div>

    <!-- DISCUSSIONS  -->
    <div class="card-wrapper">
      <library-card
        :library="{
          title: 'Discussions',
          count: library.discussion,
          route: 'GradelyLibraryDiscussion',
        }"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "postLibraryBlock",

  components: {
    libraryCard: () =>
      import(
        /* webpackChunkName: "libraryCard" */ "@/modules/base/components/feed-comps/post-library-comps/library-card"
      ),
  },

  watch: {
    $route: {
      handler() {
        this.fetchLibrarySummaryCount();
      },
      immediate: true,
    },
  },

  data() {
    return {
      library: {
        assessment: 0,
        document: 0,
        video: 0,
        discussion: 0,
      },
    };
  },

  methods: {
    ...mapActions({
      getLibrarySummary: "dbFeeds/getLibrarySummary",
    }),

    // FETCH LIBRARY SUMMARY COUNT
    fetchLibrarySummaryCount() {
      this.getLibrarySummary(this.$route.params.id)
        .then((response) => {
          if (response.code === 200) {
            this.library.assessment = response.data.assessment;
            this.library.document = response.data.document;
            this.library.video = response.data.video;
            this.library.discussion = response.data.discussion;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-library-block {
  @include flex-row-between-wrap;

  @include breakpoint-down(sm) {
    padding: 0 toRem(7);
  }

  .card-wrapper {
    width: 48%;

    @include breakpoint-down(sm) {
      width: 48.5%;
    }

    @include breakpoint-down(xs) {
      width: 49.25%;
    }
  }
}
</style>
