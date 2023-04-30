<template>
  <div class="breakdown-block row">
    <div
      class="col-12 col-md-6"
      v-for="(topic, index) in topic_list"
      :key="index"
    >
      <breakdown-column :topic="topic" />
    </div>

    <!-- SEE MORE  -->
    <div class="col-12 mgt-10" v-if="show_more">
      <div
        class="see-more-btn color-white-bg text-center color-grey-dark font-weight-700 rounded-5 pointer smooth-transition"
        @click="showMoreTopics"
      >
        See {{ text_addon }} Topics
      </div>
    </div>
  </div>
</template>

<script>
import breakdownColumn from "@/modules/profile/components/student-profile-comps/breakdown-column";

export default {
  name: "breakdownBlock",

  props: {
    topics: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    breakdownColumn,
  },

  props: {
    topics: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    topics: {
      handler() {
        this.loadTopics();
      },
      immediate: true,
    },
  },

  data: () => ({
    base_topic_list: [],
    topic_list: [],
    shrinked: true,
    text_addon: "more",
    topic_length: 6,
    show_more: false,
  }),

  methods: {
    loadTopics() {
      this.base_topic_list = this.topic_list = this.topics;

      if (this.topic_list.length > this.topic_length) {
        this.show_more = true;
        this.text_addon = "more";
        this.topic_list = this.topic_list.slice(0, this.topic_length);
      } else this.show_more = false;
    },

    showMoreTopics() {
      this.shrinked = !this.shrinked;

      if (this.shrinked) {
        if (this.topic_list.length > this.topic_length)
          this.topic_list = this.topic_list.slice(0, this.topic_length);
        this.text_addon = "more";
      } else {
        this.topic_list = this.base_topic_list;
        this.text_addon = "less";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.breakdown-block {
  .see-more-btn {
    @include font-height(12.5, 18);
    padding: toRem(9);

    @include breakpoint-down(xs) {
      @include font-height(12, 16);
    }

    &:hover {
      background: $brand-accent-light !important;
      color: $color-text !important;
    }
  }
}
</style>
