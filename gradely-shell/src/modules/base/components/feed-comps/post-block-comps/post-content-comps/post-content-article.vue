<template>
  <div class="position-relative d-flex justify-content-start w-100 h-auto">
    <div class="spacer"></div>

    <div class="post-content-area padded-area pt-0">
      <div class="info-text color-ash mgb-13">
        Discover help articles and videos to help you make the most of your
        Gradely app
      </div>

      <!-- STUDENT PERFORMANCE -->
      <template v-if="hasArticle">
        <div class="article-row">
          <article-card
            v-for="(article, index) in post.reference"
            :key="index"
            :article="article"
          />
        </div>
      </template>

      <!-- RECOMMENDATION BUTTON -->
      <a
        href="https://gradely.ng/help-center"
        target="_blank"
        class="btn btn-secondary mgt-14 w-100"
      >
        Visit our Help Center
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostContentArticle",

  components: {
    articleCard: () =>
      import(
        /* webpackChunkName: 'articleCard' */ "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/article-card"
      ),
  },

  props: {
    post: {
      type: Object,
    },
  },

  computed: {
    hasArticle() {
      return this.post?.reference?.length ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content-area {
  width: 92%;

  @include breakpoint-down(sm) {
    width: 100%;
  }

  .info-text {
    @include font-height(12.5, 17);

    @include breakpoint-down(sm) {
      @include font-height(11.85, 18.5);
    }
  }

  .article-row {
    @include flex-row-start-nowrap;
    overflow: auto;
  }

  .btn {
    background: darken($color-white, 4%) !important;
    font-weight: 500 !important;
    text-transform: capitalize;

    &:hover {
      background: $brand-accent-light !important;
    }
  }
}
</style>
