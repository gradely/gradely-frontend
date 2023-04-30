<template>
  <a
    :href="article.reference_link"
    target="_blank"
    class="
      article-card
      rounded-12
      brand-inverse-light-bg
      position-relative
      overflow-hidden
      pointer
    "
  >
    <!-- ARTICLE TITLE -->
    <div class="article-title font-weight-600 white-text text-capitalize">
      {{ article.title }}
    </div>

    <!-- ARTICLE IMAGE -->
    <img :src="article.image" alt="" class="article-img" />
  </a>
</template>

<script>
export default {
  name: "articleCard",

  props: {
    article: Object,
  },
};
</script>

<style lang="scss" scoped>
.article-card {
  @include rectangle-shape(165, 237);
  margin: auto toRem(4);
  padding: toRem(15);

  @include breakpoint-down(sm) {
    @include rectangle-shape(147, 230);
    padding: toRem(13) toRem(10);
  }

  &:first-of-type {
    margin-left: 0;
  }

  .article-title {
    @include font-height(13, 20);
    position: relative;
    z-index: 9;

    @include breakpoint-down(sm) {
      @include font-height(12, 20);
    }
  }

  .article-img {
    @include background-cover;
    left: 0;
    top: 0;
  }
}
</style>