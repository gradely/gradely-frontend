<template>
  <div
    class="post-comment-display-area brand-inverse-light-bg padded-area pdb-0"
    v-if="comment_data.length"
  >
    <comment-row
      v-for="(comment, index) in comment_data"
      :key="index"
      :comment="comment"
      :post_id="post_id"
    >
      <!-- CHILD COMMENT  -->
      <template slot="child-comment" v-if="false">
        <comment-row child="true" />
      </template>
    </comment-row>
  </div>
</template>

<script>
import commentRow from "@/modules/base/components/feed-comps/post-block-comps/comment-row";

export default {
  name: "postCommentDisplay",

  components: {
    commentRow,
  },

  props: {
    post_id: {
      type: Number,
    },

    comments: {
      type: Array,
    },
  },

  computed: {
    getComments() {
      return this.$route.name === "GradelyFeedThread"
        ? this.comments
        : this.comments.slice(0, 1).reverse();
    },
  },

  watch: {
    comments: {
      handler() {
        this.comment_data = this.getComments;
      },
      immediate: true,
    },
  },

  data() {
    return {
      comment_data: [],
    };
  },

  created() {
    this.$bus.$on("addToComment", ({ comment, id }) => {
      if (this.post_id === id) this.comment_data.push(comment);
    });

    this.$bus.$on("extractDeletedComment", (payload) => {
      if (payload.feed_id === this.post_id) {
        let comment_index = this.comment_data.findIndex(
          (comment) => comment.id === payload.comment_id
        );

        this.comment_data.splice(comment_index, 1);
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
