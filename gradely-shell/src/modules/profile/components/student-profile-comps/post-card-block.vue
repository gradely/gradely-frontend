<template>
  <div class="post-card-block mgb-10">
    <post-card
      v-for="(post, index) in posts"
      :key="index"
      :author="post.student"
      :post="post"
    />
  </div>
</template>

<script>
import postCard from "@/modules/profile/components/student-profile-comps/post-card";

export default {
  name: "postBlock",

  components: {
    postCard,
  },

  props: {
    author: {
      type: Object,
      default: () => ({
        full_name: "Efemena Elvis",
        image: "",
      }),
    },

    posts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card-block {
  @include flex-row-start-nowrap;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
