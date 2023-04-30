<template>
  <div
    class="position-relative d-flex justify-content-start"
    :class="{ 'mgb-3': !showPostTextBlock }"
  >
    <div class="spacer"></div>

    <!-- POST CONTENT TEXT -->
    <div class="post-content-text color-text pdt-2" v-if="showPostTextBlock">
      <div class="custom-text mgb-0" v-html="renderPostContent"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postContentText",

  props: {
    content: {
      type: Object,
      default: () => ({
        show_sample: false,
        custom_text: "",
      }),
    },
  },

  computed: {
    showPostTextBlock() {
      return this.content.show_sample || this.content.custom_text.length
        ? true
        : false;
    },

    renderPostContent() {
      return this.URLify(this.content.custom_text);
    },
  },

  methods: {
    URLify(string) {
      let urls = string.match(/(http|www|https)?:\/\/(\S+)/gi);
      if (urls) {
        urls.forEach((url) => {
          string = string.replace(
            url,
            '<a target="_blank" class="post-link" href="' +
              url +
              '">' +
              url +
              "</a>"
          );
        });
      }
      return string.replace("(", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content-text {
  padding: 0 toRem(14) toRem(6);
  @include font-height(12.5, 23);

  @include breakpoint-down(xl) {
    padding: toRem(5) toRem(12) toRem(12);
  }

  @include breakpoint-down(xs) {
    padding: toRem(5) toRem(9) toRem(16);
    @include font-height(11.85, 19.5);
    letter-spacing: 0.025em;
  }

  .custom-text {
    white-space: pre-line;
    word-wrap: break-word;
    position: relative;
  }
}
</style>
