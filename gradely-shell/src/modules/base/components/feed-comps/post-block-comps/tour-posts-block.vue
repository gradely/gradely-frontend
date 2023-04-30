<template>
  <div class="tour-posts-block">
    <post-block
      :key="index"
      :post_index="index"
      v-for="(post, index) in getTourPost"
      :post="post"
    />
  </div>
</template>

<script>
import TOUR_POSTS from "@/modules/base/components/feed-comps/post-block-comps/TOUR_POSTS";

export default {
  name: "tourPostsBlock",

  components: {
    postBlock: () =>
      import(
        /* FeedEntry */ "@/modules/base/components/feed-comps/post-block-comps/post-block"
      ),
  },

  props: {
    posts: Array,
  },

  computed: {
    getTourPost() {
      return this.tour_posts.filter((post) =>
        this.posts.includes(post.tour_id)
      ) ?? [];
    },
  },

  data() {
    return {
      tour_posts: TOUR_POSTS,
    };
  },
};
</script>

<style lang="scss" scoped>
.tour-posts-block {
}
</style>